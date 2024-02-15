import Countries from "@/components/Countries/Countries";
import Column from "@/app/components/Column/Column";

export default function Home() {
  return (
    <>
      <main className="h-100 flex flex-col gap-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <Countries />
          </div>
          <aside className="bg-slate-400 col-span-4" />
        </div>

        <div className="h-full w-full">
          <Column />
        </div>
      </main>
    </>
  );
}
