import Countries from "@/components/Countries/Countries";

export default function Home() {
  return (
    <>
      <main className="col-span-8 h-100 grid row-2 auto-rows-fr gap-6">
        <Countries />
        <div className="bg-amber-600 h-full row-span-1"></div>
      </main>
      <aside className="col-span-4 bg-slate-400"> </aside>
    </>
  );
}
