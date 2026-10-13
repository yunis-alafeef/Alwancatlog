import Link from 'next/link';
import { Menu } from 'lucide-react';

const navItems = [
  { href: '/', label: 'الرئيسية' },
  { href: '/about', label: 'من نحن' },
  { href: '/services', label: 'خدماتنا' },
  { href: '/works', label: 'أعمالنا' },
  { href: '/blog', label: 'المدونة' },
  { href: '/contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-lg font-black text-gold">HB</div>
          <div>
            <div className="text-lg font-black text-white">حلول بصرية</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">VISUAL SOLUTIONS</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-300 transition hover:text-gold">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="/admin/login" className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white">لوحة التحكم</Link>
        </div>

        <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 md:hidden">
          <Menu className="h-5 w-5 text-white" />
        </button>
      </div>
    </header>
  );
}
