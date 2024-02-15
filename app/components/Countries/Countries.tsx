"use client";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import styles from "./countries.module.css";
import CountryDropdown from "./CountryDropdown";

const Countries = () => {
  const country = useAppSelector((state) => state.countryReducer);

  return (
    <div className={styles.countries}>
      <div
        className={`${styles.container} bg-white rounded-[48px] p-6 pb-20 w-[50%] relative`}
      >
        <Image
          src="/map.svg"
          width={250}
          height={100}
          alt="world map"
          className="absolute top-0 right-5"
        />
        <div className="h-20">
          <span className="text-3xl-b text-accent">{country.cca2}</span>
        </div>
        <h3 className="text-xl-m">Select Country</h3>
        <p className="my-2">select from dropdown or type</p>
        <CountryDropdown />
      </div>
    </div>
  );
};

export default Countries;
