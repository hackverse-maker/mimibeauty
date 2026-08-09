import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app/product/[slug]/page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Remove the syntax error block completely
const startIdx = content.indexOf(' => {');
const endIdx = content.indexOf('function AccordionItem');
if (startIdx !== -1 && endIdx !== -1) {
  content = content.substring(0, startIdx) + content.substring(endIdx);
}

// 2. Update ProductPage signature and remove Route.useLoaderData
content = content.replace('function ProductPage() {', 'export default function ProductPage({ params }: { params: { slug: string } }) {');
content = content.replace('const { product } = Route.useLoaderData();', 'const product = findProduct(params.slug);\n  if (!product) return <div className="grid min-h-[60vh] place-items-center bg-[#030303] text-foreground"><p>Product not found.</p></div>;');

// Add notFound from next/navigation if needed, but returning div is safer and quicker.

fs.writeFileSync(filePath, content);
console.log('Fixed product page');
