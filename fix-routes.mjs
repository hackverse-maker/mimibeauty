import fs from 'fs';
import path from 'path';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const cleanFiles = (content) => {
  // Remove import { createFileRoute, ... } from "@tanstack/react-router";
  // Handle multi-line imports just in case
  content = content.replace(/import\s*\{[^}]*createFileRoute[^}]*\}\s*from\s*['"]@tanstack\/react-router['"];?/g, "");
  
  // Also clean up any other @tanstack/react-router imports that might be lingering
  content = content.replace(/import\s*\{[^}]*\}\s*from\s*['"]@tanstack\/react-router['"];?/g, "");
  
  // Remove the export const Route = createFileRoute(...)({ ... }); block
  // We'll use a less restrictive regex that handles nested parens/braces by just removing from `export const Route = createFileRoute` until the first `export default function` or similar top-level export
  content = content.replace(/export const Route = createFileRoute\([^)]+\)\(\{[\s\S]*?\}\);?/g, "");
  
  return content;
}

const dir = path.join(process.cwd(), 'app');

if (fs.existsSync(dir)) {
  walkDir(dir, (filePath) => {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      let newContent = cleanFiles(content);
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log('Fixed', filePath);
      }
    }
  });
}
