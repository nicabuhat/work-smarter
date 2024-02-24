import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import XlsxPopulate from "xlsx-populate";
import Column from "@/models/Column";
import { generateColumns, populateData } from "./xlsx";

export async function POST(req: NextRequest) {
  // Retrieve body data
  const body = await req.json();
  const data: Column[] = body.data;

  // Sort columns category, publishers first
  const columnsFromData = data.sort(
    (a, b) => a!.parent_category!.id - b!.parent_category!.id
  );

  const getColumnCount = (column: string) => {
    return columnsFromData.reduce((count, col) => {
      if (column === "publisher")
        if (col.parent_category?.id === 1) {
          count++;
        }
      if (column === "context")
        if (col.parent_category?.id === 3) {
          count++;
        }
      if (count === 0) return 1;
      else return count;
    }, 0);
  };

  const publishersCount = getColumnCount("publisher");
  const contextCount = getColumnCount("context");

  console.log(publishersCount);

  // Load excel file
  const workbook = await XlsxPopulate.fromFileAsync(
    join(process.cwd(), "/public/", "template.xlsx")
  );

  // Read template
  const template = workbook.sheet(0);

  // Read output sheet
  const output = workbook.sheet(1);

  // Generate Columns
  await generateColumns(template, output, publishersCount, contextCount);

  // Populate Data
  await populateData(output, columnsFromData);

  // Save to excel file
  const buffer = await workbook.outputAsync();

  // Set headers
  const headers = new Headers();
  headers.append("Content-Disposition", 'attachment; filename="output.xlsx"');
  headers.append(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );

  // Send Excel data as response
  // const fileContent = await readFile(filePath);
  return new NextResponse(buffer, {
    status: 200,
    statusText: "OK",
    headers,
  });
}
