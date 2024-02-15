"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setInitialId } from "@/redux/features/columnSlice";
import ParentCategory from "@/app/components/Column/ParentCategory";
import SubCategory from "@/app/components/Column/SubCategory";
import BannerVolume from "@/app/components/Column/BannerVolume";
import AddBtn from "@/app/components/Column/AddBtn";
import DeleteBtn from "@/app/components/Column/DeleteBtn";

export default function Column(): JSX.Element {
  const dispatch = useAppDispatch();

  dispatch(setInitialId());
  return (
    <div className="grid grid-cols-12 items-center justify-center auto-rows-auto gap-2 p-2 bg-white rounded-full">
      <div className="col-span-3">
        <ParentCategory id={1} />
      </div>
      <div className="col-span-3">
        <SubCategory />
      </div>
      <div className="col-span-3">
        <BannerVolume />
      </div>
      <div className="col-span-3 h-full flex gap-1 justify-end">
        <AddBtn />
        <DeleteBtn />
      </div>
    </div>
  );
}
