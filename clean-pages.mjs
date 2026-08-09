import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(path.join(process.cwd(), 'app'), (filePath) => {
  if (filePath.endsWith('.tsx') && !filePath.includes('layout.tsx') && !filePath.includes('providers.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the line with `export default function`
    const defaultExportIdx = content.indexOf('export default function');
    if (defaultExportIdx === -1) return;
    
    // Get everything from export default function onwards
    const mainCode = content.substring(defaultExportIdx);
    
    // Get imports (lines starting with import or "use client")
    const lines = content.substring(0, defaultExportIdx).split('\n');
    const imports = lines.filter(line => 
      line.trim().startsWith('import') || line.trim().startsWith('"use client"')
    ).join('\n');
    
    const newContent = imports + '\n\n' + mainCode;
    
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Cleaned', filePath);
    }
  }
});
