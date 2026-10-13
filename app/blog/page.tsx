import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays } from 'lucide-react';
import { getArticles } from '@/lib/content';

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold">المدونة</p>
        <h1 className="mt-4 text-4xl font-black text-white">أفكار وقصص من عالم الإعلان والطباعة</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <article key={article.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 shadow-glow">
            <Image src={article.image} alt={article.title} width={900} height={600} className="h-56 w-full object-cover" />
            <div className="p-6">
              <div className="mb-4 flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays className="h-4 w-4 text-gold" />
                {article.date}
              </div>
              <h2 className="text-2xl font-bold text-white">{article.title}</h2>
              <p className="mt-4 text-slate-300">{article.excerpt}</p>
              <Link href={`/blog/${article.slug}`} className="mt-5 inline-flex items-center gap-2 text-gold">
                اقرأ المزيد <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
