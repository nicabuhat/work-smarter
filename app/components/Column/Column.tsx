"use client";
import { useAppDispatch } from "@/redux/hooks";
import ParentCategory from "@/components/Column/ParentCategory";
import SubCategory from "@/components/Column/SubCategory";
import BannerVolume from "@/components/Column/BannerVolume";
import AddBtn from "@/components/Column/AddBtn";
import DeleteBtn from "@/components/Column/DeleteBtn";

export default function Column({ id }: { id: number }): JSX.Element {
  return (
    <div className="w-full grid grid-cols-12 items-center justify-center auto-rows-auto gap-2 p-2 bg-white rounded-full">
      <div className="col-span-3">
        <ParentCategory id={id} />
      </div>
      <div className="col-span-3">
        <SubCategory id={id} />
      </div>
      <div className="col-span-3">
        <BannerVolume id={id} />
      </div>
      <div className="col-span-3 h-full flex gap-1 justify-end">
        <AddBtn id={id} />
        <DeleteBtn />
      </div>
    </div>
  );
}
