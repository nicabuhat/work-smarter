"use client";

import { useAppDispatch } from "@/app/redux/hooks";
import { addColumn } from "@/redux/features/columnsSlice";
const RowBtn = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addColumn());
  };

  return (
    <button
      onClick={handleClick}
      className="bg-white aspect-square w-8 rounded-full"
    >
      +
    </button>
  );
};

export default RowBtn;
