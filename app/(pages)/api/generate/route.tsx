import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { join } from "path";
import { readFile } from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    // Read existing Excel file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(
      join(process.cwd(), "/public/", "template.xlsx")
    );

    // Get the first worksheet
    const worksheet = workbook.getWorksheet(1);

    // Write data to the worksheet
    const body = await req.json();
    const data = body.data;

    data!.forEach((rowData: string, index: number) => {
      worksheet!.getCell(`${"H"}${18 + index}`).value = rowData;
    });

    // Save the workbook
    const filePath = join(process.cwd(), "output.xlsx");
    await workbook.xlsx.writeFile(filePath);

    const headers = new Headers();
    // Set headers
    headers.append(
      "Content-Disposition",
      'attachment; filename="example.xlsx"'
    );
    headers.append(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    // Send Excel data as response
    const fileContent = await readFile(filePath);
    return new NextResponse(fileContent!, {
      status: 200,
      statusText: "OK",
      headers,
    });
  } catch (error) {
    return new NextResponse(null, {
      status: 500,
      statusText: `Error generating Excel file ${error}`,
    });
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     // Logic to generate Excel data
//     const excelData = [["Hello", "World"]];
//     const ws = XLSX.utils.aoa_to_sheet(excelData);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//     const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
//     const headers = new Headers();
//     // Set headers
//     headers.append(
//       "Content-Disposition",
//       'attachment; filename="example.xlsx"'
//     );
//     headers.append(
//       "Content-Type",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
//     );

//     // Send Excel data as response
//     return new NextResponse(excelBuffer, {
//       status: 200,
//       statusText: "OK",
//       headers,
//     });
//   } catch (error) {
//     return new NextResponse(null, {
//       status: 500,
//       statusText: `Error generating Excel file ${error}`,
//     });
//   }
// }
