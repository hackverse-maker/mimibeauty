import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const replaceLinks = (content) => {
  content = content.replace(/import \{.*?Link.*?\} from '@tanstack\/react-router';?/g, "import Link from 'next/link';");
  content = content.replace(/<Link\s+to=/g, "<Link href=");
  content = content.replace(/params=\{\{\s*slug:\s*p\.slug\s*\}\}/g, "");
  // Replace to="/product/$slug" with href={`/product/${p.slug}`}
  content = content.replace(/href="\/product\/\$slug"\s*onClick=\{([^}]+)\}/g, "href={`/product/${p.slug}`} onClick={$1}");
  content = content.replace(/href="\/product\/\$slug"/g, "href={`/product/${p.slug}`}");
  
  // same for collection
  content = content.replace(/params=\{\{\s*slug:\s*c\.slug\s*\}\}/g, "");
  content = content.replace(/href="\/collection\/\$slug"/g, "href={`/collection/${c.slug}`}");
  return content;
}

const dirs = [path.join(process.cwd(), 'src', 'components'), path.join(process.cwd(), 'src', 'lib'), path.join(process.cwd(), 'app')];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, (filePath) => {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = replaceLinks(content);
        if (content !== newContent) {
          fs.writeFileSync(filePath, newContent);
          console.log('Fixed', filePath);
        }
      }
    });
  }
});
