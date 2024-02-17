"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateVolume } from "@/redux/features/columnsSlice";
import Dropdown from "@/components/Dropdown";

export default function BannerVolume({ id }: { id: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("" as string);
  const [searchList, setSearchList] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    dispatch(updateVolume({ volume: parseInt(inputValue), id: id }));
  }, [inputValue, dispatch, id]);

  return (
    <div className="h-full">
      <Dropdown
        type="Banner Volume"
        checked={checked}
        handleCheckedChange={(check) => setChecked(check)}
        inputValue={inputValue}
        handleInputChange={(input) => setInputValue(input)}
        searchList={searchList}
        handleClick={() => {}}
      />
    </div>
  );
}
