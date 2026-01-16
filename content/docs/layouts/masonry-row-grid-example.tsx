/* eslint-disable @next/next/no-img-element */
"use client";

import Container from "@/components/mdx/container";
import { useFPS } from "@/lib/useFPS";
import { MasonryRowGrid } from "@/registry/layouts/masonry/masonry-row";

const items = [
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767112251/uploaded/image-1767112234730_xoehkl.jpg",
  },
  {
    width: 300,
    height: (300 * 3264) / 2448,
    url: "/v1767113284/uploaded/image-1767113275676_oe1xni.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767112251/uploaded/image-1767112236866_xmhtsr.jpg",
  },
  {
    width: 300,
    height: (300 * 3729) / 4434,
    url: "/v1767112458/uploaded/image-1767112438435_gebcr5.jpg",
  },
  {
    width: 300,
    height: (300 * 2670) / 4000,
    url: "/v1767112457/uploaded/image-1767112450944_o28d6i.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767112456/uploaded/image-1767112433651_lv7rgh.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767109534/uploaded/image-1767109525282_krfx4s.jpg",
  },
  {
    width: 300,
    height: (300 * 3264) / 4928,
    url: "/v1767112458/uploaded/image-1767112447354_kgf6er.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767109137/uploaded/image-1767109129557_nmnivi.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767109535/uploaded/image-1767109523712_gkj21w.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767112251/uploaded/image-1767112227934_h8wjsw.jpg",
  },
  {
    width: 300,
    height: (300 * 1836) / 3264,
    url: "/v1767112456/uploaded/image-1767112440868_fvbbqj.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767109533/uploaded/image-1767109489417_vqoumo.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767109532/uploaded/image-1767109521752_lp4fr4.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767112251/uploaded/image-1767112230503_xh8a6p.jpg",
  },
  {
    width: 300,
    height: (300 * 2448) / 3264,
    url: "/v1767113102/uploaded/image-1767113096803_cjb3fd.jpg",
  },
  {
    width: 300,
    height: (300 * 831) / 1280,
    url: "/v1767113101/uploaded/image-1767113093689_h9zqpv.jpg",
  },
  {
    width: 300,
    height: (300 * 1667) / 2500,
    url: "/v1767113101/uploaded/image-1767113091714_gl2xoj.jpg",
  },
  {
    width: 300,
    height: (300 * 3072) / 4608,
    url: "/v1767113176/uploaded/image-1767113173570_vgrj0o.jpg",
  },
  {
    width: 300,
    height: (300 * 853) / 1280,
    url: "/v1767113286/uploaded/image-1767113278265_xn0hun.jpg",
  },
];

export function Example1() {
  const fps = useFPS();

  return (
    <Container
      resizable
      className="h-150"
      containerProps={{ className: "block overflow-auto" }}
    >
      <div className="absolute top-0 left-0 bg-background/70 px-2 py-1 rounded z-50">
        FPS: {fps}
      </div>
      <MasonryRowGrid
        containerProps={{ className: "w-full min-h-full" }}
        items={items}
        targetHeight={200}
        scaleFactor={0.1}
        layout="justified"
        renderItem={(item, index) => (
          <div
            className={`rounded-md h-full w-full grid place-items-center relative overflow-hidden`}
            style={{ backgroundColor: item.color }}
          >
            <img
              src={`https://res.cloudinary.com/djoo8ogmp/image/upload/w_${
                item.width
              },h_${Math.floor(item.height)},c_fill${item.url}`}
              alt={`Random image ${index}`}
              className="object-cover w-full h-full"
            />
          </div>
        )}
      />
    </Container>
  );
}
