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
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix `export default function Page() { return () => (`
    content = content.replace(/export default function Page\(\) \{ return \(\) => \(/g, "export default function Page() { return (");
    
    // Fix `),; }`
    content = content.replace(/\),\s*;\s*\}/g, "); }");
    
    fs.writeFileSync(filePath, content);
  }
});
