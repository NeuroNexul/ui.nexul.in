"use client";

import { cn } from "@/lib/utils";
import React from "react";
// import { calculateMasonryLayout } from "./revised";
import { calculateMasonryLayout } from "./calculate-masonry";

export type GridItemProps = {
  width: number;
  height: number;

  // Additional properties can be added as needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type Measures = {
  width: number;
  height: number;
  top: number;
  left: number;

  index: number;
  rowNo: number;
  totalItemsInRow: number;
};

type Props = {
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  itemProps?: React.HTMLAttributes<HTMLDivElement>;
  gap?: number;
  targetHeight?: number;
  scaleFactor?: number;
  items?: GridItemProps[];
  renderItem?: (
    item: GridItemProps,
    index: number,
    measures: Measures
  ) => React.ReactNode;
};

export function MasonryRowGrid({
  containerProps: { className, ...containerProps } = {},
  itemProps: { className: itemClassName, style: itemStyle, ...itemProps } = {},
  gap = 8,
  targetHeight = 300,
  scaleFactor = 0.1,
  items = [],
  renderItem,
}: Props) {
  const [viewportWidth, setViewportWidth] = React.useState<number>(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const layout = React.useMemo(
    () =>
      calculateMasonryLayout({
        viewportWidth,
        items,
        maxRowHeight: targetHeight * (1 + scaleFactor),
      }),
    [viewportWidth, items, targetHeight, scaleFactor]
  );

  // const layout = React.useMemo(
  //   () =>
  //     calculateMasonryLayout({
  //       viewportWidth,
  //       items,
  //       targetHeight: 300,
  //       scaleFactor: 0.1,
  //     }),
  //   [viewportWidth, items]
  // );

  React.useLayoutEffect(() => {
    if (!containerRef.current || containerRef.current === null) return; // Return if the container is not found
    let animationFrameID: number | null = null; // Initialize animation frame ID

    const resizeObserver = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width; // This gives the actual width of the inside of the container
      if (animationFrameID) cancelAnimationFrame(animationFrameID); // Cancel the previous animation frame

      animationFrameID = requestAnimationFrame(() => {
        setViewportWidth(newWidth); // Update the viewport width based on the resize observer
      });
    });
    resizeObserver.observe(containerRef.current); // Observe the container for changes
    return () => {
      resizeObserver.disconnect(); // Cleanup the observer on unmount
      if (animationFrameID) cancelAnimationFrame(animationFrameID); // Cancel the animation frame on unmount
    };
  }, [containerRef, gap, items, targetHeight, scaleFactor]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full flex flex-wrap", className)}
      {...containerProps}
    >
      {items.map((item, index) => {
        const measures = layout[0][index];

        return (
          <div
            key={index}
            className={cn("absolute", itemClassName)}
            style={{
              top: measures.top,
              left: measures.left,
              width: measures.width,
              height: measures.height,

              paddingTop: measures.rowNo === 1 ? gap : gap / 2,
              paddingBottom: measures.rowNo === layout[2] ? gap : gap / 2,
              paddingLeft: measures.index === 0 ? gap : gap / 2,
              paddingRight:
                measures.index === measures.totalItemsInRow - 1 ? gap : gap / 2,

              ...itemStyle,
            }}
            {...itemProps}
          >
            {renderItem ? renderItem(item, index, measures) : null}
          </div>
        );
      })}
    </div>
  );
}

// function calculateMasonryLayout({
//   viewportWidth,
//   items,
//   maxRowHeight,
// }: {
//   viewportWidth: number;
//   items: GridItemProps[];
//   maxRowHeight: number;
// }) {
//   let rows: Measures[] = [];
//   let row: Measures[] = [];
//   let currentWidth = 0;
//   let totalHeight = 0; // Initialize total height
//   let rowNumber = 1; // Initialize row number

//   function finalizeRow() {
//     // Calculate the height of the row based on the width and max height
//     const height =
//       viewportWidth < currentWidth
//         ? (viewportWidth / currentWidth) * maxRowHeight
//         : maxRowHeight;

//     let left = 0;
//     for (let i = 0; i < row.length; i++) {
//       const item = row[i];
//       const width = (height / item.height) * item.width;

//       row[i].width = width;
//       row[i].height = height;
//       row[i].top = totalHeight;
//       row[i].left = left;

//       row[i].index = i; // Update index in the row
//       row[i].totalImagesInRow = row.length; // Update total images in the row
//       left += width;
//     }

//     rows = rows.concat(row);
//     totalHeight += height;
//     row = [];
//     currentWidth = 0;
//     rowNumber += 1; // Increment row number
//   }

//   items.forEach((item) => {
//     row.push({
//       width: item.width,
//       height: item.height,
//       top: 0,
//       left: 0,

//       index: 0, // Placeholder, will be updated later
//       rowNo: rowNumber,
//       totalImagesInRow: 0, // Placeholder, will be updated later
//     });
//     currentWidth += (maxRowHeight / item.height) * item.width;

//     if (currentWidth >= viewportWidth) finalizeRow();
//   });

//   if (row.length > 0) finalizeRow();

//   return [rows, totalHeight, rowNumber] as const;
// }
