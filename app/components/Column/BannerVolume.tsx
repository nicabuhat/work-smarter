"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateVolume } from "@/redux/features/columnsSlice";
import Dropdown from "@/components/Dropdown";

export default function BannerVolume({ id }: { id: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("" as string);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (inputValue)
      dispatch(updateVolume({ volume: parseInt(inputValue), id: id }));
  }, [inputValue, dispatch, id]);

  useEffect(() => {
    console.log(inputValue);
  }, [inputValue]);

  return (
    <div className="h-full">
      <Dropdown
        type="Banner Volume"
        checked={checked}
        handleCheckedChange={(check) => setChecked(check)}
        inputValue={inputValue}
        handleInputChange={(inputValue) => {
          setInputValue(inputValue);
        }}
        handleClick={() => {}}
      />
    </div>
  );
}
