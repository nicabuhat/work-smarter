import { NextRequest, NextResponse } from "next/server";
import { join } from "path";
import XlsxPopulate from "xlsx-populate";

export async function POST(req: NextRequest) {
  // Load template
  const workbook = await XlsxPopulate.fromFileAsync(
    join(process.cwd(), "/public/", "template.xlsx")
  );

  // Read template
  const template = workbook.sheet(0);

  //Read output sheet
  const output = workbook.sheet(1);

  // Specify the range of cells to copy (for example, A1:B5)
  const valuesToCopy = [template.range("D1:D99"), template.range("D1:D99")];

  // Specify the top-left cell where you want to paste the copied cells
  const pasteCell = [output.cell("F1"), output.cell("H1")];

  // Loop through total numbers of columns to be copied
  for (let x = 0; x < valuesToCopy.length; x++) {
    // Get the number of rows and columns in the range to copy
    const numRows =
      valuesToCopy[x].endCell().rowNumber() -
      valuesToCopy[x].startCell().rowNumber() +
      1;
    const numCols =
      valuesToCopy[x].endCell().columnNumber() -
      valuesToCopy[x].startCell().columnNumber() +
      1;

    // Loop through each cell in the range to copy and paste it to the new location
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        // Get the value of the current cell in the range to copy
        const cellValue = valuesToCopy[x].cell(i, j).value();

        // Get the cell to paste into (offset from the pasteCell)
        const pasteTargetCell = pasteCell[x].relativeCell(i, j);

        // Paste the value to the corresponding cell in the new location
        pasteTargetCell.value(cellValue);
      }
    }
  }

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

// export async function POST(req: NextRequest) {
//   try {
//     // Read existing Excel file
//     const workbook = new ExcelJS.Workbook();
//     await workbook.xlsx.readFile(
//       join(process.cwd(), "/public/", "template.xlsx")
//     );

//     // Get the first worksheet
//     const worksheet = workbook.getWorksheet(1)!;

//     // Write data to the worksheet
//     const body = await req.json();
//     const data: Column[] = body.data;

//     // Sort columns category, publishers first
//     const columns = data.sort(
//       (a, b) => a!.parent_category!.id - b!.parent_category!.id
//     );

//     const getColumnCount = (column: string) => {
//       return columns.reduce((count, col) => {
//         if (column === "publisher")
//           if (col.parent_category?.id === 1) {
//             count++;
//           }
//         if (column === "context")
//           if (col.parent_category?.id === 3) {
//             count++;
//           }
//         return count;
//       }, 0);
//     };

//     const publishersCount = getColumnCount("publisher");
//     const contextCount = getColumnCount("context");

//     // Duplicate template columns to be populated with data
//     // Publisher 1P Data

//     // if (publishersCount > 1) {
//     //   console.log(publishersCount);
//     //   const firstCol = 68;
//     //   let firstNum = 68;

//     //   for (let i = 0; i < publishersCount; i++) {
//     //     let firstLetter = String.fromCharCode(firstNum);
//     //     let divider = String.fromCharCode(firstNum + 1);
//     //     let secondLetter = String.fromCharCode(firstNum + 2);
//     //     console.log(firstLetter, secondLetter);
//     //     const columnAValues = worksheet.getColumn(firstLetter).values;
//     //     worksheet.getColumn(secondLetter).eachCell((cell, rowNumber) => {
//     //       cell.value = columnAValues[rowNumber];
//     //     });
//     //     firstNum += 3;
//     //     console.log(firstNum);
//     //   }
//     // }

//     if (publishersCount > 1) {
//       let firstNum = 68;

//       for (let i = 0; i < publishersCount; i++) {
//         let firstLetter = String.fromCharCode(firstNum);
//         let divider = String.fromCharCode(firstNum + 1);
//         let secondLetter = String.fromCharCode(firstNum + 2);

//         // Specify the columns to copy
//         const columnsToCopy = [firstLetter, divider];
//         const targetColumn = secondLetter;

//         columnsToCopy.forEach((column) => {
//           const sourceColumn = worksheet.getColumn(column);

//           // Get the target column
//           const targetColumnData = [] as any;

//           // Iterate over the cells in the source column and store their values
//           sourceColumn.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
//             // Get the value of the cell
//             const value = cell.value;

//             // Push the value to the target column data array
//             targetColumnData[rowNumber] = value;
//           });

//           // Iterate over the target column data and set the values in the target column
//           targetColumnData.forEach((value: any, rowNumber: any) => {
//             // Get or create the cell in the target column
//             const targetCell = worksheet.getCell(
//               `${targetColumn}${rowNumber + 1}`
//             );

//             // Set the value of the cell
//             targetCell.value = value;
//           });
//         });

//         firstNum = +3;
//       }
//     }

//     // columns.forEach((column: Column, index: number) => {
//     //   worksheet!.getCell(`${"H"}${18 + index}`).value = rowData;
//     // });

//     // Save the workbook
//     const filePath = join(process.cwd(), "output.xlsx");
//     await workbook.xlsx.writeFile(filePath);

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
//     const fileContent = await readFile(filePath);
//     return new NextResponse(fileContent!, {
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
