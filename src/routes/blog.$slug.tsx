import { createFileRoute, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { assets } from "@/lib/products";

const posts: Record<string, any> = {
  "barrier-repair-diary": {
    title: "The Barrier Repair Diary",
    excerpt: "How ceramides rebuild the moisture barrier in 28 days.",
    tag: "Journal",
    img: assets.water,
    date: "January 15, 2026",
    readTime: "5 min read",
    content: `
      <p>The skin barrier is your body's first line of defense. When it's compromised, everything suffers—dryness, sensitivity, breakouts.</p>
      <p>Ceramides are the building blocks of a healthy barrier. These lipid molecules hold skin cells together, creating a protective shield that locks in moisture and keeps irritants out.</p>
      <h3>The 28-Day Transformation</h3>
      <p>Our clinical studies show that consistent use of ceramide-rich products can rebuild a damaged barrier in just 28 days. Here's what to expect:</p>
      <ul>
        <li><strong>Week 1:</strong> Reduced sensitivity and less tightness</li>
        <li><strong>Week 2:</strong> Improved hydration and smoother texture</li>
        <li><strong>Week 3:</strong> Visible reduction in fine lines</li>
        <li><strong>Week 4:</strong> Fully restored barrier with lasting protection</li>
      </ul>
      <p>The key is consistency. Apply your ceramide serum morning and night, and let the science do the rest.</p>
    `,
  },
  "on-slow-beauty": {
    title: "On Slow Beauty",
    excerpt: "Why the ritual matters as much as the formula.",
    tag: "Philosophy",
    img: assets.stone,
    date: "January 10, 2026",
    readTime: "4 min read",
    content: `
      <p>In a world of instant gratification, slow beauty feels revolutionary. It's not about quick fixes—it's about intentional care.</p>
      <p>The ritual—the two minutes at the sink, the gentle massage, the moment of presence—is where the magic happens. It's not just about what you put on your skin, but how you put it on.</p>
      <h3>The Practice of Presence</h3>
      <p>When you slow down, you notice. You notice the texture of your skin, the scent of botanicals, the feeling of nourishment. This awareness transforms skincare from a chore into a practice.</p>
      <p>Slow beauty is about quality over quantity, ritual over routine, presence over perfection. It's about choosing products that align with your values and taking the time to use them with intention.</p>
    `,
  },
  "guide-to-layering": {
    title: "A Guide to Layering",
    excerpt: "The right order for serums, oils, and moisturisers.",
    tag: "How-to",
    img: assets.lineup,
    date: "January 5, 2026",
    readTime: "6 min read",
    content: `
      <p>Layering is an art form. When done right, each product enhances the next, creating a synergistic effect that's greater than the sum of its parts.</p>
      <h3>The Golden Rule</h3>
      <p>Always apply from thinnest to thickest consistency. This ensures each layer can penetrate properly without being blocked by heavier products.</p>
      <h3>The Order</h3>
      <ol>
        <li><strong>Cleanser:</strong> Start with a clean canvas</li>
        <li><strong>Toner:</strong> Prep and balance</li>
        <li><strong>Serum:</strong> Active ingredients go here</li>
        <li><strong>Oil:</strong> Seal in the serums</li>
        <li><strong>Moisturizer:</strong> Lock everything in</li>
        <li><strong>SPF (morning):</strong> Protect during the day</li>
      </ol>
      <p>Wait 30-60 seconds between layers for optimal absorption. Your skin will thank you.</p>
    `,
  },
  "notes-on-rose-absolute": {
    title: "Notes on Rose Absolute",
    excerpt: "Why we cold-press instead of steam-distill.",
    tag: "Ingredients",
    img: assets.halo,
    date: "December 28, 2025",
    readTime: "5 min read",
    content: `
      <p>Rose absolute is one of the most precious ingredients in skincare. But not all rose extracts are created equal.</p>
      <h3>Cold-Press vs. Steam Distillation</h3>
      <p>Steam distillation is faster and cheaper, but it destroys delicate compounds. Cold-pressing preserves the full spectrum of beneficial molecules—the antioxidants, the vitamins, the subtle aromatic compounds that make rose so powerful.</p>
      <h3>Why It Matters</h3>
      <p>Cold-pressed rose absolute retains up to 70% more active compounds than steam-distilled alternatives. This means more potency, more efficacy, more visible results.</p>
      <p>It takes 10,000 rose petals to produce just 5ml of our cold-pressed rose absolute. It's expensive, but the results speak for themselves.</p>
    `,
  },
};

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts[params.slug];
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} · MIMIbeauty` },
          { name: "description", content: loaderData.post.excerpt },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="grid min-h-[60vh] place-items-center">
      <p>Article not found. <Link to="/blog" className="text-gold underline">Back to journal</Link></p>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-6 pt-32 pb-24">
      <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold mb-8">
        <ArrowLeft className="h-4 w-4" /> Back to journal
      </Link>
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">{post.tag}</p>
        <h1 className="mt-4 font-display text-5xl md:text-6xl leading-[1.05]">{post.title}</h1>
        
        <div className="mt-6 flex items-center gap-6 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> {post.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4" /> {post.readTime}
          </span>
        </div>

        <div className="mt-8 aspect-[16/9] overflow-hidden rounded-3xl">
          <img src={post.img} alt={post.title} className="h-full w-full object-cover" />
        </div>

        <div 
          className="mt-12 prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </article>
  );
}
