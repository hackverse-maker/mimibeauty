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
      
      const hooks = ['useState', 'useEffect', 'useRef', 'useContext', 'useReducer', 'useLayoutEffect', 'useCallback', 'useMemo', 'useMotionValue', 'useSpring', 'useTransform'];
      const usesHooks = hooks.some(hook => content.includes(hook));
      const hasClient = content.includes('"use client"') || content.includes("'use client'");
      
      if (usesHooks && !hasClient) {
        fs.writeFileSync(filePath, '"use client";\n\n' + content);
        console.log('Added use client to', filePath);
      }
    }
  });
}

processFiles('app');
processFiles('src');
