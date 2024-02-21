import Countries from "@/components/Countries/Countries";
import Rows from "@/components/Sections/Rows";

export default function Home() {
  return (
    <>
      <main className="h-full flex flex-col gap-6">
        <div className="h-full grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <Countries />
          </div>
          <aside className="bg-slate-400 col-span-4" />
        </div>
        <Rows />
      </main>
    </>
  );
}
