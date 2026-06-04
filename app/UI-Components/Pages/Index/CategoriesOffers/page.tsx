"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import titleicon from "@/public/freshbite-title-icon2.webp";

import ctg1 from "@/public/freshbite-ctg-01.webp";
import ctg2 from "@/public/freshbite-ctg-02.webp";
import ctg3 from "@/public/freshbite-ctg-03.webp";
import ctg4 from "@/public/freshbite-ctg-04.webp";
import ctg5 from "@/public/freshbite-ctg-05.webp";
import ctg6 from "@/public/freshbite-ctg-06.webp";

const categories = [
  {
    image: ctg1,
    title: "Dals and pulses",
    offer: "Min 20% Off",
    desc: "Get over $20 in savings",
  },
  {
    image: ctg2,
    title: "Bakery Items",
    offer: "Min 10% off",
    desc: "Get over $20 in savings",
  },
  {
    image: ctg3,
    title: "Fresh Vegetables",
    offer: "Min 15% Off",
    desc: "Healthy & fresh picks",
  },
  {
    image: ctg4,
    title: "Organic Fruits",
    offer: "Min 25% Off",
    desc: "Farm fresh fruits",
  },

  {
    image: ctg5,
    title: "Dairy Products",
    offer: "Min 20% Off",
    desc: "Pure & fresh dairy",
  },
  {
    image: ctg6,
    title: "Snacks & Chips",
    offer: "Min 30% Off",
    desc: "Crunchy snacks",
  },
];

export default function CategoriesOffers() {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 relative py-8 sm:py-16 bg-gray-light bg-[url('/freshbite-cat-bg.webp')] bg-no-repeat bg-contain">
        <div className="section-title flex flex-wrap gap-3 pb-5">
          <h2 className="text-3xl md:text-5xl font-bold">
            Top Category products
          </h2>

          <p className="text-black/50 flex items-center flex-wrap gap-4 text-lg md:text-xl font-medium">
            <Image src={titleicon} alt="title-icon" />
            Stocking up on goodness, one aisle at a time.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          breakpoints={{
            1400: { slidesPerView: 5 },
            1200: { slidesPerView: 4 },
            1000: { slidesPerView: 3 },
            768: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="offer-swiper w-full"
        >
          {categories.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="ctg-item bg-white shadow-xl rounded-md flex justify-center items-center flex-col gap-8 p-6">
                <div className="ctg-image">
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="content text-center">
                  <span className="bg-red-500 text-white px-2 uppercase font-medium text-sm py-1 rounded-sm">
                    {item.offer}
                  </span>

                  <div className="py-5">
                    <h6 className="text-xl font-medium">{item.title}</h6>

                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
