import React from "react";
import Image from "next/image";
import Dropdown from "./Dropdown";
import styles from "./styles.module.css";

const Countries = () => {
  return (
    <div className={styles.countries}>
      <div className="bg-white rounded-[48px] p-6 w-[50%] relative">
        <Image
          src="/map.svg"
          width={250}
          height={100}
          alt="world map"
          className="absolute top-0 right-5"
        ></Image>
        <div className="h-20">
          <span className="text-3xl-b">PH</span>
        </div>
        <h3 className="text-xl-m">Select Country</h3>
        <p className="my-2">select from dropdown or type</p>
        <Dropdown />
      </div>
    </div>
  );
};

export default Countries;
