export default function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-gold">حلول بصرية</p>
      <h2 className="mt-4 text-3xl font-black text-white md:text-4xl">{title}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-slate-300">{subtitle}</p>
    </div>
  );
}
