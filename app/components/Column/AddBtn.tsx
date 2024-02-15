"use client";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import getConfig from "next/config";
import URL from "@/models/URL";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { realpathSync } from "fs";

export default function AddBtn(): JSX.Element {
  const country = useAppSelector((state) => state.countryReducer);
  const column = useAppSelector((state) => state.columnReducer);
  const [urls, setURLs] = useState([] as string[]);

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
      const response = await fetch("/api/generate");
      const excelBlob = await response.blob();

      // Download the Excel file
      const url = window.URL.createObjectURL(new Blob([excelBlob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "example.xlsx");
      document.body.appendChild(link);
      link.click();
      link!.parentNode!.removeChild(link);
    } catch (error) {
      console.error("Error generating Excel file:", error);
    }
  };
  // const handleExport = async () => {
  //   try {
  //     const res = await fetch("/template.xlsx"); // Fetch the template file directly
  //     const templateBlob = await res.blob(); // Convert the response to a Blob

  //     const reader = new FileReader();
  //     reader.onload = async () => {
  //       const data = reader.result as ArrayBuffer;
  //       const workbook = XLSX.read(new Uint8Array(data), { type: "array" }); // Change type to "array"

  //       const modifiedTemplate = modifyTemplateWithData(workbook, urls);
  //       writeToFile(modifiedTemplate);
  //     };
  //     reader.readAsArrayBuffer(templateBlob);
  //   } catch (error) {
  //     console.error("Error exporting data:", error);
  //   }
  // };

  // const modifyTemplateWithData = (
  //   template: XLSX.WorkBook,
  //   newData: string[]
  // ) => {
  //   const worksheet = template.Sheets[template.SheetNames[0]];
  //   newData.forEach((data: string, index: number) => {
  //     worksheet["H" + (18 + index + 1)] = { v: data };
  //   });
  //   return template;
  // };

  // const writeToFile = (modifiedTemplate: XLSX.WorkBook) => {
  //   const wbout = XLSX.write(modifiedTemplate, {
  //     type: "binary", // Change type to "binary"
  //     bookType: "xlsx",
  //   });
  //   const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  //   saveAs(blob, "output.xlsx");
  // };

  // // Utility function to convert string to ArrayBuffer
  // const s2ab = (s: string) => {
  //   const buf = new ArrayBuffer(s.length);
  //   const view = new Uint8Array(buf);
  //   for (let i = 0; i < s.length; i++) {
  //     view[i] = s.charCodeAt(i) & 0xff;
  //   }
  //   return buf;
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
    console.log(urls);
    handleGenerateExcel();
  };

  return (
    <button
      className="flex items-center justify-center gap-2 bg-secondary text-white h-full rounded-full px-3"
      onClick={handleClick}
    >
      <i className="fa-solid fa-plus text-base text-white"></i>
      <span>Add Column</span>
    </button>
  );
}
