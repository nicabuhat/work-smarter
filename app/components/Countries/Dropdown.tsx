"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setCountry } from "@/redux/features/countrySlice";
import Country from "@/models/Country";
import "./dropdown.module.css";

const Dropdown = () => {
  const dispatch = useAppDispatch();

  const [countries, setCountries] = useState([] as Country[]);
  const [inputValue, setInputValue] = useState("" as string);
  const [searchList, setSearchList] = useState([] as Country[]);
  const [checked, setChecked] = useState(false);

  const getCountriesArray = async () => {
    try {
      const res = await fetch("/api/countries");
      const countriesArray = res.json();

      if (!res.ok) {
        throw new Error("Failed to fetch countries");
      }

      return countriesArray;
    } catch (error) {
      console.error("Catch Error:", error);
    }
  };

  const handleChange = (event: ChangeEvent) => {
    setInputValue((event.target as HTMLInputElement).value);
  };

  const handleClick = (country: Country) => {
    dispatch(setCountry(country));
    setInputValue(country.name.common);
    setChecked(false);
  };

  const handleFocus = () => {
    setChecked(true);
  };

  useEffect(() => {
    getCountriesArray().then((res: Country[]) => {
      res
        ? setCountries(
            res.sort((a, b) => a.name.common.localeCompare(b.name.common))
          )
        : setCountries([]);
    });
  }, []);

  useEffect(() => {
    setSearchList(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [countries, inputValue]);

  return (
    <div className="dropdown">
      <div className="dropdown-input border border-gray-300 rounded-3xl p-2 flex items-center justify-between bg-gray-50">
        <input
          type="text"
          placeholder="search country"
          value={inputValue}
          className="text-lg w-full text-gray-950 bg-transparent"
          onChange={handleChange}
          checked={checked}
          onFocus={handleFocus}
        />
        <i className="fa-light fa-caret-down text-xl text-accent"></i>
      </div>
      {checked && (
        <ul className="dropdown-list w-full flex flex-col max-h-48 overflow-auto border border-gray-300 border-t-transparent rounded-b-3xl bg-gray-50">
          {searchList &&
            searchList.map((country) => {
              return (
                <li
                  onClick={() => handleClick(country)}
                  key={country.name.official}
                  className="p-2"
                >
                  <span key={country.name.common}>{country.name.common}</span>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
