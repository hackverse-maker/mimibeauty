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
    if (filePath.endsWith('.tsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      let newContent = content;
      // 1. Fix `to="/product/$slug"` with href
      // Wait, it needs the actual slug from `p.slug`.
      // The original code was `<Link to="/product/$slug" params={{ slug: p.slug }}`
      // If `params` was removed by my previous script, I have to reconstruct it.
      // Let's just replace `to="/product/$slug"` with `href={\`/product/\${p.slug}\`}`
      newContent = newContent.replace(/to="\/product\/\$slug"/g, 'href={`/product/${p.slug}`}');
      
      // 2. Fix any remaining `to=` in Links to `href=`
      newContent = newContent.replace(/\bto=/g, 'href=');
      
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Fixed Link to= in', filePath);
      }
    }
  });
}

processFiles('app');
processFiles('src');
