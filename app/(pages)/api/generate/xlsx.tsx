import { join } from "path";
import XlsxPopulate from "xlsx-populate";

export const generateColumns = async () => {
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
  return buffer;
};
