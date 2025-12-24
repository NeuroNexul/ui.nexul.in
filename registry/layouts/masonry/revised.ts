/* eslint-disable */

import { GridItemProps, Measures } from "./masonry-row";

export function calculateMasonryLayout({
  viewportWidth,
  items,
  targetHeight,
  scaleFactor = 0.1,
}: {
  viewportWidth: number;
  items: GridItemProps[];
  targetHeight: number;
  scaleFactor?: number;
}) {
  // if (items.length === 0 || viewportWidth === 0) {
  //   return [[], 0, 0] as const;
  // }

  const minHeight = targetHeight * (1 - scaleFactor);
  const maxHeight = targetHeight * (1 + scaleFactor);

  function bestLayout(lastPivot: number): [number, number[]] {
    let pivot1 = -1; // Definetely found within constraints
    let pivot2 = -1; // May be found exceeding constraints
    let currentWidth = 0;
    let widthAtPivot1 = 0;

    for (let i = lastPivot; i < items.length; i++) {
      currentWidth += (items[i].width / items[i].height) * targetHeight;
      const height = (viewportWidth / currentWidth) * targetHeight;

      // First Pivot - ideal case
      if (currentWidth < viewportWidth) {
        pivot1 = i;
        widthAtPivot1 = currentWidth;
      }

      // Second Pivot - for overshoot / Last resort
      if (currentWidth >= viewportWidth) {
        if (height >= minHeight) pivot2 = i;
        break;
      }
    }

    if (viewportWidth === 0) {
      pivot2 = items.length - 1;
    }

//     console.log(`Last Pivot: ${lastPivot}
// Pivots found: ${pivot1}, ${pivot2}
// Viewport Width: ${viewportWidth}
// Current Width: ${currentWidth}
// Width at Pivot1: ${widthAtPivot1}`);

    // return [0, []]; // Temporary

    // Base Case: pivot at least one item
    if (pivot1 == items.length - 1) {
      const height = (viewportWidth / widthAtPivot1) * targetHeight;
      const diff = Math.abs(targetHeight - height);
      return [diff, [pivot1]];
    }

    if (pivot2 == items.length - 1) {
      const height1 = (viewportWidth / widthAtPivot1) * targetHeight;
      const diff1 = Math.abs(targetHeight - height1);

      const height2 = (viewportWidth / currentWidth) * targetHeight;
      const diff2 = Math.abs(targetHeight - height2);

      if (diff1 <= diff2) {
        return [diff1, [pivot1]];
      } else {
        return [diff2, [pivot2]];
      }
    }

    // Recursive Case: choose best pivot
    const [diff1, pivots1] = bestLayout(pivot1 + 1);
    const height1 = (viewportWidth / widthAtPivot1) * targetHeight;
    const totalDiff1: number = diff1 + Math.abs(targetHeight - height1);

    const [diff2, pivots2] = bestLayout(pivot2 + 1);
    const height2 = (viewportWidth / currentWidth) * targetHeight;
    const totalDiff2: number = diff2 + Math.abs(targetHeight - height2);

    if (totalDiff1 <= totalDiff2) {
      return [totalDiff1, [...pivots1, pivot1]];
    } else {
      return [totalDiff2, [...pivots2, pivot2]];
    }
  }

  const [_diff, bestPivots] = bestLayout(0);

  let rows: Measures[] = [];
  let rowStart = 0;
  let totalHeight = 0;
  let rowNumber = 1;

  for (let p = 0; p < bestPivots.length; p++) {
    const pivot = bestPivots[p];
    let currentWidth = 0;

    for (let i = rowStart; i <= pivot; i++) {
      currentWidth += (items[i].width / items[i].height) * targetHeight;
    }

    const height = (viewportWidth / currentWidth) * targetHeight;
    let left = 0;

    for (let i = rowStart; i <= pivot; i++) {
      const item = items[i];
      const width = (height / item.height) * item.width;
      const measure: Measures = {
        width: width,
        height: height,
        top: totalHeight,
        left: left,
        index: i - rowStart, // Index within the row
        rowNo: rowNumber,
        totalItemsInRow: pivot - rowStart + 1,
      };
      rows.push(measure);
      left += width;
    }
    totalHeight += height;
    rowStart = pivot + 1;
    rowNumber += 1;
  }

  return [rows, totalHeight, rowNumber] as const;
}
