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

// 1. Fix Route exports in app/
walkDir(path.join(process.cwd(), 'app'), (filePath) => {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Remove export const Route = ... until export default function
    let newContent = content.replace(/export const Route = createFileRoute[\s\S]*?(?=export default function)/, "");
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent);
      console.log('Fixed Route in', filePath);
    }
  }
});

// 2. Add "use client" to files using hooks
const clientFiles = [
  'src/lib/cart.tsx',
  'src/lib/wishlist.tsx',
  'src/components/site/loading-screen.tsx',
  'src/components/site/footer.tsx',
  'src/components/theme-provider.tsx', // if it exists
];

clientFiles.forEach(f => {
  const p = path.join(process.cwd(), f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    if (!content.includes('"use client"')) {
      fs.writeFileSync(p, '"use client";\n\n' + content);
      console.log('Added use client to', p);
    }
  }
});
