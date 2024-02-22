"use client";
import { useAppSelector } from "@/redux/hooks";
import { generateExcel } from "@/util/helpers";

const Generate = () => {
  const columns = useAppSelector((state) => state.columnsReducer);

  const handleClick = () => {
    generateExcel(columns);
  };

  return (
    <div className="mt-auto">
      <button
        onClick={handleClick}
        className="bg-primary text-white p-4 rounded-full"
      >
        Generate
      </button>
    </div>
  );
};

export default Generate;
