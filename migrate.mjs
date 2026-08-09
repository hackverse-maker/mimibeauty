import fs from 'fs';
import path from 'path';

const srcRoutes = path.join(process.cwd(), 'src', 'routes');
const appDir = path.join(process.cwd(), 'app');

if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir, { recursive: true });
}

// Helper to replace TanStack router imports and components with Next.js ones
function transformContent(content) {
  // Replace Link
  content = content.replace(/import \{.*?Link.*?\} from '@tanstack\/react-router';?/g, "import Link from 'next/link';");
  content = content.replace(/<Link\s+to=/g, "<Link href=");
  
  // Remove createFileRoute
  content = content.replace(/import \{ createFileRoute \} from '@tanstack\/react-router';?\n?/g, "");
  content = content.replace(/export const Route = createFileRoute\('.*?'\)\(\{[\s\S]*?component: (.*?),?\n\}\);?/g, "");
  
  // Replace useLocation, useNavigate if present
  content = content.replace(/import \{.*?useLocation.*?\} from '@tanstack\/react-router';?/g, "import { usePathname } from 'next/navigation';");
  content = content.replace(/import \{.*?useNavigate.*?\} from '@tanstack\/react-router';?/g, "import { useRouter } from 'next/navigation';");
  content = content.replace(/const location = useLocation\(\);?/g, "const pathname = usePathname();");
  content = content.replace(/location\.pathname/g, "pathname");
  content = content.replace(/const navigate = useNavigate\(\);?/g, "const router = useRouter();");
  content = content.replace(/navigate\(\{ to: (.*?) \}\)/g, "router.push($1)");
  
  return '"use client";\n\n' + content; // Next.js pages with hooks need use client
}

const pages = [
  { from: 'index.tsx', to: 'page.tsx' },
  { from: 'about.tsx', to: 'about/page.tsx' },
  { from: 'shop.tsx', to: 'shop/page.tsx' },
  { from: 'collections.tsx', to: 'collections/page.tsx' },
  { from: 'contact.tsx', to: 'contact/page.tsx' },
  { from: 'ingredients.tsx', to: 'ingredients/page.tsx' },
  { from: 'quiz.tsx', to: 'quiz/page.tsx' },
  { from: 'blog.tsx', to: 'blog/page.tsx' },
  { from: 'product.$slug.tsx', to: 'product/[slug]/page.tsx' },
];

for (const page of pages) {
  const fromPath = path.join(srcRoutes, page.from);
  const toPath = path.join(appDir, page.to);
  
  if (fs.existsSync(fromPath)) {
    const dir = path.dirname(toPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    let content = fs.readFileSync(fromPath, 'utf8');
    content = transformContent(content);
    
    fs.writeFileSync(toPath, content);
    console.log(`Migrated ${page.from} to ${page.to}`);
  }
}

// Handle layout separately
if (fs.existsSync(path.join(srcRoutes, '__root.tsx'))) {
  let content = fs.readFileSync(path.join(srcRoutes, '__root.tsx'), 'utf8');
  // Very basic layout transform
  content = content.replace(/import \{.*?Outlet.*?\} from '@tanstack\/react-router';?/g, "");
  content = content.replace(/import \{ createRootRoute \} from '@tanstack\/react-router';?\n?/g, "");
  content = content.replace(/<Outlet \/>/g, "{children}");
  
  // Modify export
  content = content.replace(/export const Route = createRootRoute\(\{[\s\S]*?component: (.*?),?\n\}\);?/g, "export default function RootLayout({ children }: { children: React.ReactNode }) { return <$1 children={children} />; }");
  
  fs.writeFileSync(path.join(appDir, 'layout.tsx'), content);
  console.log('Migrated __root.tsx to layout.tsx');
}
