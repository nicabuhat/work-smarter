import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";

export async function GET(req, res) {
  // try {
  //   // Generate Excel file
  //   const wb = XLSX.utils.book_new();
  //   const ws = XLSX.utils.aoa_to_sheet([["Hello", "World"]]);
  //   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  //   const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

  //   // Set headers
  //   res.setHeader("Content-Disposition", 'attachment; filename="example.xlsx"');
  //   res.setHeader(
  //     "Content-Type",
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  //   );

  //   // Send Excel file as response
  //   res.status(200).send(excelBuffer);
  // } catch (error) {
  //   console.error("Error generating Excel file:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }

  // Logic to generate Excel data
  const excelData = [["Hello", "World"]];
  const ws = XLSX.utils.aoa_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
  const headers = new Headers();
  // Set headers
  headers.append("Content-Disposition", 'attachment; filename="example.xlsx"');
  headers.append(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  // Send Excel data as response
  return new NextResponse(excelBuffer, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
