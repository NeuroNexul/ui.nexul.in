"use client";

import Container from "@/components/mdx/container";
import { MasonryRowGrid } from "@/registry/layouts/masonry/masonry-row";

const items = Array.from({ length: 20 }, () => ({
  id: crypto.randomUUID(),
  color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%)`,
  width: Math.floor(Math.random() * 200) + 100,
  height: Math.floor(Math.random() * 200) + 100,
}));

export function Example1() {
  return (
    <Container
      resizable
      className="h-150"
      containerProps={{ className: "block overflow-auto" }}
    >
      <MasonryRowGrid
        containerProps={{ className: "w-full min-h-full" }}
        items={items}
        gap={8}
        targetHeight={270}
        renderItem={(item, index, measures) => (
          <div
            className={`rounded-md h-full w-full grid place-items-center`}
            style={{ backgroundColor: item.color }}
          >
            <div>
              <h2 className="font-bold text-lg text-black">Item {index}</h2>
              <p className="text-md text-black">
                {measures.width.toFixed(0)} x {measures.height.toFixed(0)}
              </p>
            </div>
          </div>
        )}
      />
    </Container>
  );
}
