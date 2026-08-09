import fs from 'fs';
import path from 'path';

const pages = [
  'app/contact/page.tsx',
  'app/page.tsx',
  'app/quiz/page.tsx',
  'app/shop/page.tsx'
];

pages.forEach(p => {
  const filePath = path.join(process.cwd(), p);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace `function Contact()` with `export default function Contact()`
    // We can just look for `function ` at the beginning of a line that isn't exported.
    content = content.replace(/^function /gm, "export default function ");
    // If it did `export default export default`, fix it
    content = content.replace(/export default export default/g, "export default");
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed', p);
  }
});
