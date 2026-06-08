"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import brand1 from "@/public/freshbite-br-1.webp";
import brand2 from "@/public/freshbite-br-2.webp";
import brand3 from "@/public/freshbite-br-3.webp";
import brand4 from "@/public/freshbite-br-4.webp";
import brand5 from "@/public/freshbite-br-5.webp";
import brand6 from "@/public/freshbite-br-6.webp";

const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

export default function Brands() {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={30}
          slidesPerView={6}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 6 },
          }}
        >
          {brands.map((brand, index) => (
            <SwiperSlide key={index}>
              <div className="flex items-center justify-center h-24 grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer">
                <Image
                  src={brand}
                  alt={`Brand ${index + 1}`}
                  className="object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
