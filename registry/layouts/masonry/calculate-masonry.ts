import { GridItemProps, Measures } from "./masonry-row";

export function calculateMasonryLayout({
  viewportWidth,
  items,
  maxRowHeight,
}: {
  viewportWidth: number;
  items: GridItemProps[];
  maxRowHeight: number;
}) {
  // !! Debugging purpose !!
  // console.time("Masonry Layout Calculation");

  let rows: Measures[] = [];
  let row: Measures[] = [];
  let currentWidth = 0;
  let totalHeight = 0; // Initialize total height
  let rowNumber = 1; // Initialize row number

  function finalizeRow() {
    // Calculate the height of the row based on the width and max height
    const height =
      viewportWidth < currentWidth
        ? (viewportWidth / currentWidth) * maxRowHeight
        : maxRowHeight;

    let left = 0;
    for (let i = 0; i < row.length; i++) {
      const item = row[i];
      const width = (height / item.height) * item.width;

      row[i].width = width;
      row[i].height = height;
      row[i].top = totalHeight;
      row[i].left = left;

      row[i].index = i; // Update index in the row
      row[i].totalItemsInRow = row.length; // Update total images in the row
      left += width;
    }

    rows = rows.concat(row);
    totalHeight += height;
    row = [];
    currentWidth = 0;
    rowNumber += 1; // Increment row number
  }

  items.forEach((item) => {
    row.push({
      width: item.width,
      height: item.height,
      top: 0,
      left: 0,

      index: 0, // Placeholder, will be updated later
      rowNo: rowNumber,
      totalItemsInRow: 0, // Placeholder, will be updated later
    });
    currentWidth += (maxRowHeight / item.height) * item.width;

    if (currentWidth >= viewportWidth) finalizeRow();
  });

  if (row.length > 0) finalizeRow();

  // console.timeEnd("Masonry Layout Calculation");
  // !! Debugging purpose !!

  return [rows, totalHeight, rowNumber] as const;
}
