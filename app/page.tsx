import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BarChart3, Camera, Palette, Printer, Star } from 'lucide-react';
import { getServices, getArticles, getWorks } from '@/lib/content';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import BlogCard from '@/components/BlogCard';

export default async function HomePage() {
  const services = await getServices();
  const articles = await getArticles();
  const works = await getWorks();

  return (
    <>
      <section className="bg-hero">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-20 md:grid-cols-2 md:px-8 lg:px-12">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
              <Star className="h-4 w-4 text-yellow-400" />
              خبرة +12 سنة في الدعاية والإعلان
            </div>
            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
              حلول بصرية<br />
              <span className="text-blue-300">لخلق حضور قوي في السوق</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              نُقدم خدمات التصميم والطباعة والإعلان بأعلى جودة، مع تركيز على هويات تجارية قوية، لافتات احترافية، وأعمال إعلانية تتناسب مع كل مشروع.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/services" className="rounded-full bg-gold px-6 py-3 font-bold text-slate-900 transition hover:bg-yellow-400">
                استكشف خدماتنا
              </Link>
              <Link href="/contact" className="rounded-full border border-white/20 bg-white/5 px-6 py-3 font-bold text-white transition hover:bg-white/10">
                تواصل معنا
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-300">
              <div><span className="block text-2xl font-black text-white">1200+</span> مشروع منجز</div>
              <div><span className="block text-2xl font-black text-white">98%</span> رضا العملاء</div>
              <div><span className="block text-2xl font-black text-white">24/7</span> دعم مستمر</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-10 top-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-yellow-400/20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-glow backdrop-blur-sm">
              <Image
                src="/logo.svg"
                width={720}
                height={520}
                alt="حلول بصرية"
                className="rounded-2xl border border-white/10 object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
        <SectionTitle title="لماذا نحن؟" subtitle="لكل مشروع، رؤية مميزة ومخرجات إعلانية تناسبه" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { icon: Palette, title: 'تصميم إبداعي', text: 'تجسيد أفكارك في تصاميم قوية تبرز علامتك التجارية وتضمن حضوراً مميزاً.' },
            { icon: Printer, title: 'طباعة احترافية', text: 'تقنيات طباعة متقدمة بأحجام ومواد متنوعة تناسب احتياجاتك بكفاءة عالية.' },
            { icon: BarChart3, title: 'نتائج قابلة للقياس', text: 'تقوم مشاريعنا على استراتيجيات بعيدة عن التخمين وتراعي أهداف عملك.' },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 shadow-glow">
              <div className="mb-5 inline-flex rounded-2xl bg-blue-500/10 p-4 text-gold">
                <item.icon className="h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              <p className="mt-4 text-slate-300">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/70 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <SectionTitle title="خدماتنا" subtitle="حلول متكاملة لتلبية احتياجاتك الإعلانية" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 4).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-6 py-3 font-bold text-blue-200 transition hover:bg-blue-500/20">
              عرض كل الخدمات <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
        <SectionTitle title="أعمالنا المميزة" subtitle="بعض المشاريع التي نفذناها بأعلى معايير الجودة" />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {works.slice(0, 3).map((work) => (
            <div key={work.id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
              <Image src={work.image} alt={work.title} width={900} height={600} className="h-64 w-full object-cover" />
              <div className="p-6">
                <p className="text-sm text-gold">{work.category}</p>
                <h3 className="mt-3 text-2xl font-bold text-white">{work.title}</h3>
                <p className="mt-3 text-slate-300">{work.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/70 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-12">
          <SectionTitle title="مدونة الحلول" subtitle="مقالات ونصائح لمساعدتك في اتخاذ قرارات إعلانية أفضل" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
        <div className="rounded-[32px] border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-slate-900 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">ابدأ الآن</p>
              <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">أخبرنا عن مشروعك، وسنقدّم لك الحل الأفضل.</h2>
            </div>
            <div className="flex justify-end">
              <Link href="/contact" className="inline-flex items-center gap-3 rounded-full bg-gold px-7 py-4 font-bold text-slate-900 shadow-glow transition hover:bg-yellow-400">
                اطلب عرض سعر <ArrowLeft className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
