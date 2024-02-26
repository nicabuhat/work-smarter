"use client";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateCategory } from "@/redux/features/columnsSlice";
import Dropdown from "@/components/Dropdown";
import Category from "@/models/Category";
import { handleClickOutside } from "@/util/utilities";

export default function SubCategory({ id }: { id: number }): JSX.Element {
  const dispatch = useAppDispatch();
  const columns = useAppSelector((state) => state.columnsReducer);
  const currentColumn = columns[columns.findIndex((c) => c.id === id)];
  const [categories, setCategories] = useState([] as Category[]);
  const [inputValue, setInputValue] = useState("" as string);
  const [searchList, setSearchList] = useState([] as Category[]);
  const [checked, setChecked] = useState(false);

  const componentRef = useRef(null);

  const handleChange = (event: ChangeEvent) => {
    setInputValue((event.target as HTMLInputElement).value);
  };

  const handleClick = (category: Category) => {
    dispatch(
      updateCategory({ category: category, type: "subcategory", id: id })
    );
    setInputValue(category.name);
    setChecked(false);
  };

  const handleFocus = () => {
    setChecked(true);
  };

  useEffect(() => {
    const getCategoriessArray = async () => {
      try {
        const res = await fetch(
          `/api/subcategory?category=${currentColumn.parent_category?.id}`
        );
        const categories = res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        return categories;
      } catch (error) {
        console.error("Catch Error:", error);
      }
    };

    getCategoriessArray().then((res: Category[]) => {
      res
        ? setCategories(res.sort((a, b) => a.name.localeCompare(b.name)))
        : setCategories([]);
    });
  }, [currentColumn]);

  useEffect(() => {
    setSearchList(
      categories.filter((category) =>
        category.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [categories, inputValue]);

  useEffect(() => {
    handleClickOutside(componentRef, setChecked);
  }, [componentRef]);

  return (
    <div className="h-full" ref={componentRef}>
      <Dropdown
        type="Subcategory"
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
