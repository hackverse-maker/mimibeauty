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
    
    // Fix `, \n component: ... });` pattern
    // This matches `,` followed by any whitespace/newlines, `component:`, anything up to `});`
    content = content.replace(/,\s*component:\s*[a-zA-Z0-9]+,\s*\}\);?/g, "");
    
    // Fix `, \n component: () => (` pattern which doesn't have a simple closing `});`
    // Actually, if it's `component: () => ( ... )`, the previous file probably exported it inline.
    // Wait, let's look at blog.tsx: it has `component: () => ( <> <section> ... </section> </> ) });`
    content = content.replace(/,\s*component:\s*\(\)\s*=>\s*\([\s\S]*?\}\);?/g, function(match) {
        // We should convert `component: () => ( ... )` into `export default function Page() { return ( ... ) }`
        let body = match.substring(match.indexOf('('));
        body = body.substring(0, body.lastIndexOf('}')); // remove `});`
        return `\nexport default function Page() { return ${body.trim()}; }\n`;
    });
    
    // Fix product/[slug]/page.tsx loader syntax error: ` => { ... }`
    // It looks like ` => {\n const product = ...`
    if (filePath.includes('product')) {
       // Just delete the broken loader, we will write a generic loader inside the component if needed.
       // Actually, the easiest is to just remove the syntax error and let the component handle it.
       // The error starts at ` => {`
       // Let's replace `\s*=>\s*\{[\s\S]*?return\s*\{[^\}]+\}\s*\},\s*component:\s*Product,\s*\}\);?` with nothing.
       content = content.replace(/\s*=>\s*\{[\s\S]*?component:\s*[A-Za-z0-9]+,?\s*\}\);?/g, "");
    }
    
    fs.writeFileSync(filePath, content);
  }
});
