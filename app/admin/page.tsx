import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import { getServices, getArticles, getWorks, getUsers } from '@/lib/content';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('alwancat_token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    verifyToken(token);
  } catch {
    redirect('/admin/login');
  }

  const services = await getServices();
  const articles = await getArticles();
  const works = await getWorks();
  const users = await getUsers();

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 lg:px-12">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-gold">لوحة التحكم</p>
          <h1 className="mt-2 text-4xl font-black text-white">إدارة المحتوى</h1>
        </div>
        <form action="/api/logout" method="POST">
          <button className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">تسجيل الخروج</button>
        </form>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5"><div className="mb-3 text-3xl text-gold">{services.length}</div><h3 className="text-xl font-bold text-white">الخدمات</h3></div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5"><div className="mb-3 text-3xl text-gold">{articles.length}</div><h3 className="text-xl font-bold text-white">المقالات</h3></div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5"><div className="mb-3 text-3xl text-gold">{works.length}</div><h3 className="text-xl font-bold text-white">الأعمال</h3></div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5"><div className="mb-3 text-3xl text-gold">{users.length}</div><h3 className="text-xl font-bold text-white">المستخدمون</h3></div>
      </div>

      <div className="mt-10 grid gap-8 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-bold text-white">إضافة خدمة</h2>
          <form action="/api/services" method="POST" className="mt-5 space-y-4">
            <input name="title" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="عنوان الخدمة" required />
            <textarea name="description" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" rows={4} placeholder="وصف الخدمة" required />
            <input name="features" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="الميزات (مفصولة بفواصل)" />
            <button className="rounded-full bg-gold px-5 py-3 font-bold text-slate-900">حفظ الخدمة</button>
          </form>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-bold text-white">إضافة مقال</h2>
          <form action="/api/articles" method="POST" className="mt-5 space-y-4">
            <input name="title" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="عنوان المقال" required />
            <input name="excerpt" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="ملخص المقال" required />
            <textarea name="content" className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" rows={4} placeholder="محتوى المقال" required />
            <button className="rounded-full bg-gold px-5 py-3 font-bold text-slate-900">حفظ المقال</button>
          </form>
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">إدارة الأعمال</h2>
        <div className="mt-5 grid gap-6 md:grid-cols-3">
          {works.map((work) => (
            <div key={work.id} className="rounded-2xl border border-slate-700 bg-slate-950 p-4">
              <p className="text-sm text-gold">{work.category}</p>
              <h3 className="mt-2 text-xl font-bold text-white">{work.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{work.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-bold text-white">إدارة المستخدمين</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {users.map((user) => (
            <div key={user.id} className="rounded-2xl border border-slate-700 bg-slate-950 p-4 text-slate-200">
              <div className="font-bold text-white">{user.name}</div>
              <div className="mt-1 text-sm">{user.username}</div>
              <div className="mt-2 text-xs text-gold">{user.role}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/" className="rounded-full border border-slate-700 px-5 py-3 text-white">العودة للموقع</Link>
      </div>
    </div>
  );
}
