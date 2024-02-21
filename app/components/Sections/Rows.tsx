"use client";
import { useAppSelector } from "@/redux/hooks";
import Column from "@/components/Column/Column";
import RowBtn from "@/components/Column/RowBtn";
import Generate from "@/components/Sections/Generate";

const Rows = () => {
  const columns = useAppSelector((state) => state.columnsReducer);

  return (
    <div className="h-full w-full flex flex-col items-center gap-2">
      {columns?.map((column) => {
        return <Column key={column.id} id={column.id!} />;
      })}
      <RowBtn />
      <Generate />
    </div>
  );
};

export default Rows;
