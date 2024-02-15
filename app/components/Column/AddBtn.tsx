"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import getConfig from "next/config";
import URL from "@/models/URL";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { realpathSync } from "fs";
import ExcelJS from "exceljs";
import { join } from "path";

export default function AddBtn(): JSX.Element {
  const country = useAppSelector((state) => state.countryReducer);
  const column = useAppSelector((state) => state.columnReducer);
  const [urls, setURLs] = useState([] as string[]);
  const [isDownloading, setIsDownloading] = useState(false);

  const getURLs = async () => {
    try {
      const res = await fetch(
        `/api/url?country_code=${country.cca2}&subcategory_id=${column[0].subcategory?.id}`
      );
      const urls = await res.json(); // Use await here

      if (!res.ok) {
        throw new Error("Failed to fetch urls");
      }

      return urls;
    } catch (error) {
      console.error("Catch Error:", error);
    }
  };

  const handleGenerateExcel = async () => {
    try {
      setIsDownloading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data: urls }),
      });

      // Download the Excel file
      const excelBlob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([excelBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "output.xlsx");
      document.body.appendChild(link);
      link.click();
      link!.parentNode!.removeChild(link);
      setIsDownloading(false);
      console.log("downloaded");
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  };
  // const handleGenerateExcel = async () => {
  //   try {
  //     const response = await fetch("/api/generate", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(dataToWrite),
  //     });
  //     const excelBlob = await response.blob();

  //     // Download the Excel file
  //     const url = window.URL.createObjectURL(new Blob([excelBlob]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "example.xlsx");
  //     document.body.appendChild(link);
  //     link.click();
  //     link!.parentNode!.removeChild(link);
  //   } catch (error) {
  //     console.error("Error generating Excel file:", error);
  //   }
  // };

  useEffect(() => {
    getURLs().then((res: URL[]) => {
      res
        ? setURLs(
            res
              .map((r) => r.url)
              .filter(
                (s) =>
                  s.endsWith("com") ||
                  s.endsWith("net") ||
                  s.endsWith(`${country.cca2.toLowerCase()}`)
              )
          )
        : setURLs([]);
    });
  });

  const handleClick = () => {
    handleGenerateExcel();
  };

  return (
    <button
      className="flex items-center justify-center gap-2 bg-secondary text-white h-full rounded-full px-3"
      onClick={handleClick}
      disabled={isDownloading}
    >
      <i className="fa-solid fa-plus text-base text-white"></i>
      <span>Add Column</span>
    </button>
  );
}
