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

function processFiles(dir) {
  walkDir(path.join(process.cwd(), dir), (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      const regex1 = /"use client";\n?/g;
      const regex2 = /'use client';\n?/g;
      
      if (regex1.test(content) || regex2.test(content)) {
        // Remove all instances of "use client"
        let newContent = content.replace(regex1, '').replace(regex2, '');
        // Prepend exactly one "use client"
        newContent = '"use client";\n' + newContent.trimStart();
        
        if (content !== newContent) {
          fs.writeFileSync(filePath, newContent);
          console.log('Fixed use client order in', filePath);
        }
      }
    }
  });
}

processFiles('app');
processFiles('src');
