import Column, { Publisher } from "@/models/Column";

// Globals
let publisherColumnLetters: number[] = [];
let contextColumnLetters: number[] = [];
const categoryRow = 2;
const bannerRow = 5;
const videoRow = 7;
const nativeRow = 9;
const publisherRowStart = 13;
const contextRowStart = 18;

export const generateColumns = async (
  template: any,
  output: any,
  publisherCount: number,
  contextCount: number
) => {
  // Template column to copy
  const publiserTemplate = template.range("D1:D100");
  const searchTemplate = template.range("F1:F100");
  const contextTemplate = template.range("H1:H100");
  const audienceTemplate = template.range("J1:J100");
  // Array for template columns to be copied
  let templateColumns: any[] = [];
  const publihserArray: any[] = Array(...Array(publisherCount)).map(
    () => publiserTemplate
  );
  const contextArray: any[] = Array(...Array(contextCount)).map(
    () => contextTemplate
  );
  templateColumns = [
    ...publihserArray,
    searchTemplate,
    ...contextArray,
    audienceTemplate,
  ];
  // Array for output columns
  let outputColumns: any[] = [];
  const startColumnLetter = "D".charCodeAt(0);
  const publihserAscii: any[] = Array(...Array(publisherCount)).map(
    (x, y) => startColumnLetter + y * 2
  );
  publisherColumnLetters = publihserAscii;
  const startContextColumnLetter =
    startColumnLetter + (publisherCount - 1) * 2 + 4;
  const contextAscii: any[] = Array(...Array(contextCount)).map(
    (x, y) => startContextColumnLetter + y * 2
  );
  contextColumnLetters = contextAscii;
  outputColumns = [
    ...publihserAscii.map((p) => output.cell(String.fromCharCode(p) + 1)),
    output.cell(`${String.fromCharCode(publihserAscii.slice(-1)[0] + 2)}1`),
    ...contextAscii.map((c) => output.cell(String.fromCharCode(c) + 1)),
    output.cell(`${String.fromCharCode(contextAscii.slice(-1)[0] + 2)}1`),
  ];

  // Specify the range of cells to copy (for example, A1:B5)
  const valuesToCopy = templateColumns;
  // Specify the top-left cell where you want to paste the copied cells
  const pasteCell = outputColumns;
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
};

const populateContext = (columns: Column[], output: any) => {
  const contextArray = columns.filter((c) => c.parent_category!.id === 3);

  const contextColStartArray = contextColumnLetters.map((letter) => {
    return `${String.fromCharCode(letter)}${contextRowStart}`;
  });
  const contextCpmArray = contextColumnLetters.map((letter) => {
    return `${String.fromCharCode(letter)}${bannerRow}`;
  });
  const contextCategoryArray = contextColumnLetters.map((letter) => {
    return `${String.fromCharCode(letter)}${categoryRow}`;
  });

  for (let i = 0; i < contextArray.length; i++) {
    for (let j = 0; j < 6; j++) {
      const cell = output.cell(contextCpmArray[i]).relativeCell(j, 0);
      switch (j) {
        case 0:
          cell.value(`${contextArray[i].banner_volume?.value}m`);
          break;
        case 1:
          cell.value(`${contextArray[i].banner_volume?.cpm}`);
          break;
        case 2:
          cell.value(`${contextArray[i].video_volume?.value}m`);
          break;
        case 3:
          cell.value(`${contextArray[i].video_volume?.cpm}`);
          break;
        case 4:
          cell.value(`${contextArray[i].native_volume?.value}m`);
          break;
        case 5:
          cell.value(`${contextArray[i].native_volume?.cpm}`);
          break;
        default:
          return;
      }
      cell.style({ horizontalAlignment: "right" });
    }
  }
  for (let i = 0; i < contextArray.length; i++) {
    for (let j = 0; j < contextArray[i].urls!.length; j++) {
      const cell = output.cell(contextColStartArray[i]).relativeCell(j, 0);
      cell.value(contextArray[i].urls![j]);
      cell.style({ bold: false, indent: 0 });
    }
  }
  for (let i = 0; i < contextArray.length; i++) {
    const cell = output.cell(contextCategoryArray[i]);
    cell.value(contextArray[i].subcategory?.name);
    cell.style({ italic: true, horizontalAlignment: "center" });
  }
};

const populatePublisher = (columns: Column[], output: any) => {
  const publisherColStartArray = (row: any) =>
    publisherColumnLetters.map((letter) => {
      return `${String.fromCharCode(letter)}${row}`;
    });
  const publisherCpmArray = publisherColumnLetters.map((letter) => {
    return `${String.fromCharCode(letter)}${bannerRow}`;
  });

  let currentRow = publisherRowStart;

  const publisherArray = columns.filter((c) => c.parent_category!.id === 1);
  for (let i = 0; i < publisherArray.length; i++) {
    for (let j = 0; j < publisherArray[i].publishers!.length; j++) {
      const cell = output
        .cell(publisherColStartArray(currentRow)[0])
        .relativeCell(j, 0);
      cell.value(publisherArray[i].publishers![j].publisher);
      cell.style({ bold: true, indent: 0 });
      for (
        let l = 0;
        l < publisherArray[i].publishers![j].subPublishers.length;
        l++
      ) {
        const cell = output
          .cell(publisherColStartArray(currentRow)[0])
          .relativeCell(j + 1, 0);
        cell.value(publisherArray[i].publishers![j].subPublishers[l]);
        cell.style({ bold: false, indent: 1 });
        currentRow += 1;
      }
    }
  }
};

export const populateData = async (output: any, columns: Column[]) => {
  populateContext(columns, output);
  populatePublisher(columns, output);
};
