"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  calculateJustifiedMasonryLayout,
  calculateNaiveMasonryLayout,
} from "./calculate-masonry";
import { mergeRefs } from "@/lib/merge-refs";

export type GridItemProps = {
  /** Original width of the grid item */
  width: number;
  /** Original height of the grid item */
  height: number;

  // Additional properties can be added as needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type Measures = {
  /** Calculated width of the grid item */
  width: number;
  /** Calculated height of the grid item */
  height: number;
  /** Calculated top position of the grid item */
  top: number;
  /** Calculated left position of the grid item */
  left: number;

  /** Row number of the grid item in the row (0-based index) */
  index: number;
  /** Row number of the grid item (1-based index) */
  rowNo: number;
  /** Total items in the row */
  totalItemsInRow: number;
};

export type Props = {
  /** Container props for the masonry grid container */
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Item props for each masonry grid item */
  itemProps?: React.HTMLAttributes<HTMLDivElement>;
  /** Gap between grid items */
  gap?: number;
  /** Target height for each grid item; default is 300 */
  targetHeight?: number;
  /** Scale factor for resizing grid items; default is 0.1 */
  scaleFactor?: number;
  /** Layout type: "naive" or "justified"; default is "naive" */
  layout?: "naive" | "justified";
  /** Array of grid items to be displayed */
  items?: GridItemProps[];
  /** Function to render each grid item */
  renderItem?: (
    /** Props of the grid item to be rendered */
    item: GridItemProps,
    /** Index of the grid item in the array */
    index: number,
    /** Calculated measures for the grid item */
    measures: Measures
  ) => React.ReactNode;
};

const MasonryRowGrid = React.forwardRef<HTMLDivElement, Props>(
  (
    {
      containerProps: { className, ...containerProps } = {},
      itemProps: {
        className: itemClassName,
        style: itemStyle,
        ...itemProps
      } = {},
      gap = 8,
      targetHeight = 300,
      scaleFactor = 0.1,
      layout: layoutType = "naive",
      items = [],
      renderItem,
    }: Props,
    ref
  ) => {
    const [viewportWidth, setViewportWidth] = React.useState<number>(0);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const layout = React.useMemo(
      () =>
        layoutType === "naive"
          ? calculateNaiveMasonryLayout({
              viewportWidth,
              items,
              targetHeight,
              scaleFactor,
            })
          : calculateJustifiedMasonryLayout({
              viewportWidth,
              items,
              targetHeight,
              scaleFactor,
            }),
      [layoutType, viewportWidth, items, targetHeight, scaleFactor]
    );

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
        ref={mergeRefs(containerRef, ref)}
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
                  measures.index === measures.totalItemsInRow - 1
                    ? gap
                    : gap / 2,

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
);
MasonryRowGrid.displayName = "MasonryRowGrid";

export { MasonryRowGrid };
