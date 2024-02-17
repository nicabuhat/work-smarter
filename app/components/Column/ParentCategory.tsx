"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateCategory } from "@/redux/features/columnsSlice";
import Dropdown from "@/components/Dropdown";
import Category from "@/models/Category";

export default function ParentCategory({ id }: { id: number }): JSX.Element {
  const dispatch = useAppDispatch();

  const [categories, setCategories] = useState([] as Category[]);
  const [inputValue, setInputValue] = useState("" as string);
  const [searchList, setSearchList] = useState([] as Category[]);
  const [checked, setChecked] = useState(false);

  const getCategoriessArray = async () => {
    try {
      const res = await fetch("/api/parent_category");
      const categories = res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }

      return categories;
    } catch (error) {
      console.error("Catch Error:", error);
    }
  };

  const handleChange = (event: ChangeEvent) => {
    setInputValue((event.target as HTMLInputElement).value);
  };

  const handleClick = (category: Category) => {
    dispatch(
      updateCategory({ category: category, type: "parent_category", id: id })
    );
    setInputValue(category.name);
    setChecked(false);
  };

  const handleFocus = () => {
    setChecked(true);
  };

  useEffect(() => {
    getCategoriessArray().then((res: Category[]) => {
      res
        ? setCategories(res.sort((a, b) => a.name.localeCompare(b.name)))
        : setCategories([]);
    });
  }, []);

  useEffect(() => {
    setSearchList(
      categories.filter((category) =>
        category.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [categories, inputValue]);

  return (
    <div className="h-full">
      <Dropdown
        type="Parent Category"
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
