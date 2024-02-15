"use client";

import { useEffect } from "react";
import styles from "./dropdown.module.css";

interface DropdownProps {
  type: string;
  checked: boolean;
  handleCheckedChange: (check: boolean) => void;
  inputValue: string;
  handleInputChange: (input: string) => void;
  searchList: any[];
  handleClick: (any: any) => void;
}

export default function Dropdown({
  type,
  checked,
  handleCheckedChange,
  inputValue,
  handleInputChange,
  searchList,
  handleClick,
}: DropdownProps): JSX.Element {
  useEffect(() => {
    if (!checked) {
      console.log(checked);
    }
  }, [checked]);
  return (
    <form className={styles.dropdown}>
      <fieldset
        className={`${
          styles.dropdownInput
        } border border-gray-300 rounded-3xl px-4 py-2 flex items-center justify-between bg-gray-50 ${
          type === "Banner Volume" ? styles.volume : ""
        }`}
      >
        <legend className="ml-6 px-2 text-sm-b">{type}</legend>
        <div className="w-full flex items-center space-between mt-[-6px] mb">
          {type === "Parent Category" && (
            <i className="fa-solid fa-list text-xl text-primary mr-2"></i>
          )}
          {type === "Subcategory" && (
            <i className="fa-solid fa-table text-xl text-primary mr-2"></i>
          )}
          {type === "Banner Volume" && (
            <i className="fa-solid fa-tag text-xl text-primary mr-2"></i>
          )}
          <input
            type="text"
            value={inputValue}
            className="text-base w-full text-gray-950 bg-transparent"
            onChange={(event) =>
              handleInputChange((event.target as HTMLInputElement).value)
            }
            checked={checked}
            onFocus={() => handleCheckedChange(true)}
          />
          {type !== "Banner Volume" && (
            <i className="fa-solid fa-caret-down text-xl text-secondary"></i>
          )}
        </div>
      </fieldset>
      {checked && type !== "Banner Volume" && (
        <ul
          className={`${styles.dropdownList} w-full flex flex-col max-h-48 overflow-auto border border-gray-300 border-t-transparent rounded-b-3xl bg-gray-50 absolute`}
        >
          {searchList &&
            searchList.map((searhcItem) => {
              return (
                <li
                  onClick={() => handleClick(searhcItem)}
                  key={searhcItem.name}
                  className="py-2 pl-12"
                >
                  <span key={searhcItem.name}>{searhcItem.name}</span>
                </li>
              );
            })}
        </ul>
      )}
    </form>
  );
}
