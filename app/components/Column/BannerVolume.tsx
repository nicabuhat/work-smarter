"use client";
import { useState } from "react";
import Dropdown from "@/components/Dropdown";

export default function BannerVolume(): JSX.Element {
  const [inputValue, setInputValue] = useState("" as string);
  const [searchList, setSearchList] = useState([]);
  const [checked, setChecked] = useState(false);

  const handleClick = () => {};

  return (
    <div className="h-full">
      <Dropdown
        type="Banner Volume"
        checked={checked}
        handleCheckedChange={(check) => setChecked(check)}
        inputValue={inputValue}
        handleInputChange={(input) => setInputValue(input)}
        searchList={searchList}
        handleClick={handleClick}
      />
    </div>
  );
}
