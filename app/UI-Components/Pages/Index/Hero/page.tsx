"use client";

import slidebanner1 from "@/public/freshbite-slidebanner1.png";
import slidebanner2 from "@/public/freshbite-slidebanner2.png";
import slidebanner3 from "@/public/freshbite-slidebanner3.png";

import { Icon } from "@iconify/react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    {
      img: slidebanner1.src,
      title: "Organic Seeds",
      subtitle: "100% organic products",
    },
    {
      img: slidebanner2.src,
      title: "Fresh Fruits",
      subtitle: "Healthy & Natural",
    },
    {
      img: slidebanner3.src,
      title: "Organic Vegetables",
      subtitle: "Direct from farms",
    },
  ];

  return (
    <>
      <div className="hero px-2 lg:px-8 xl:px-12 py-[1%] flex justify-between items-stretch lg:flex-row flex-col gap-3 lg:gap-6 w-full h-200 lg:h-125 xl:h-150 xxl:h-125">
        <div className="w-full lg:w-[30%] bg-[url('/freshbite-banner1.png')] bg-cover bg-center flex justify-center items-start h-full rounded-lg relative overflow-hidden">
          <div className="content h-full pt-20 z-1">
            <h3 className="text-white text-4xl font-medium mb-3 text-center">
              Bakery <br /> Products
            </h3>

            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-prim text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-md flex items-center cursor-pointer text-md font-bold uppercase w-fit mx-auto"
            >
              Shop Now
              <Icon
                icon="lucide:shopping-bag"
                width={18}
                height={18}
                className="ms-1"
              />
            </Link>
          </div>

          <div className="absolute bg-black/10 top-0 left-0 h-full w-full"></div>
        </div>

        <div className="w-full lg:w-[40%] h-full relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={1000}
            pagination={{ clickable: true }}
            className="w-full h-full relative"
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full rounded-md bg-cover bg-center flex items-start justify-center"
                  style={{ backgroundImage: `url(${slide.img})` }}
                >
                  <div className="pt-20 text-center">
                    <span className="underline text-sm xl:text-xl uppercase font-bold block mb-2">
                      {slide.subtitle}
                    </span>

                    <h3 className="text-black text-3xl xl:text-5xl font-bold mb-4">
                      {slide.title.split(" ")[0]}{" "}
                      {slide.title.split(" ")[1]}{" "}
                    </h3>
                    <Link
                      href="/UI-Components/Pages/Shop"
                      className="bg-white hover:bg-black hover:text-white transition-all duration-300 px-4 py-2 mt-2 rounded-md inline-flex items-center font-bold uppercase"
                    >
                      Shop Now
                      <Icon
                        icon="lucide:shopping-bag"
                        width={18}
                        height={18}
                        className="ms-1"
                      />
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="w-full lg:w-[30%] bg-[url('/freshbite-banner2.png')] bg-cover bg-center flex justify-center items-start h-full rounded-lg relative overflow-hidden">
          <div className="content h-full pt-20 z-1">
            <h3 className="text-white text-4xl font-medium mb-3 text-center">
              Fresh
              <br /> Vegetables
            </h3>

            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-prim text-white hover:bg-black transition-colors duration-300 px-4 py-2 rounded-md flex items-center cursor-pointer text-md font-bold uppercase w-fit mx-auto"
            >
              Shop Now
              <Icon
                icon="lucide:shopping-bag"
                width={18}
                height={18}
                className="ms-1"
              />
            </Link>
          </div>

          <div className="absolute bg-black/10 top-0 left-0 h-full w-full"></div>
        </div>
      </div>
    </>
  );
}
