import fs from 'fs';
import path from 'path';

const pages = [
  { file: 'app/page.tsx', main: 'Home' },
  { file: 'app/contact/page.tsx', main: 'Contact' },
  { file: 'app/quiz/page.tsx', main: 'Quiz' },
  { file: 'app/shop/page.tsx', main: 'Shop' }
];

pages.forEach(p => {
  const filePath = path.join(process.cwd(), p.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Revert all `export default function` back to `function`
    content = content.replace(/^export default function /gm, "function ");
    
    // 2. Add `export default ` only to the main component
    const target = `function ${p.main}\\(`;
    content = content.replace(new RegExp(`^${target}`, 'm'), `export default function ${p.main}(`);
    
    fs.writeFileSync(filePath, content);
    console.log('Fixed exports for', p.file);
  }
});
