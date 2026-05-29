"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import ctg1 from "@/public/freshbite-cat1.png";
import ctg2 from "@/public/freshbite-cat2.png";
import ctg3 from "@/public/freshbite-cat3.png";
import ctg4 from "@/public/freshbite-cat4.png";
import ctg5 from "@/public/freshbite-cat5.png";
import ctg6 from "@/public/freshbite-cat6.png";
import ctg7 from "@/public/freshbite-cat7.png";
import ctg8 from "@/public/freshbite-cat8.png";

export default function Navbottom() {
  const [catOpen, setCatOpen] = useState(false);

  const categories = [
    { title: "Milk and dairy products", img: ctg1 },
    { title: "Vegetable and fruits", img: ctg2 },
    { title: "Breakfast and cereals", img: ctg3 },
    { title: "Animal biscuits and products", img: ctg4 },
    { title: "Bread, toast and biscuits", img: ctg5 },
    { title: "Chicken, meat and Fish", img: ctg6 },
    { title: "Vitamins and minerals", img: ctg7 },
    { title: "Ice cream and cold drink", img: ctg8 },
  ];

  return (
    <>
      <div className="nav-bottom lg:px-8 xl:px-12 w-full lg:flex justify-between items-center hidden">
        <div className="relative w-[25%] bg-prim-dark p-5 rounded-s-md">
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="w-full text-white flex justify-between items-center cursor-pointer"
          >
            <span className="flex gap-2 items-center">
              <Icon
                icon="material-symbols-light:menu-rounded"
                width={24}
                height={24}
              />
              Shop by categories
            </span>

            <Icon
              icon="ep:arrow-down"
              width={18}
              height={18}
              className={`transition-transform duration-300 ${catOpen ? "rotate-180" : ""}`}
            />
          </button>

          <ul
            className={`absolute left-0 top-full w-full bg-white shadow-lg z-40 transition-all duration-300 overflow-hidden rounded-b-md ${catOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}
          >
            {categories.map((item, i) => (
              <li
                key={i}
                className="flex group items-center gap-3 px-5 py-3 cursor-pointer border-b border-gray-200"
              >
                <Image src={item.img} alt={item.title} width={28} height={28} />

                <span className="text-md group-hover:text-prim duration-300 transition-colors">
                  {item.title}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-[75%] flex justify-between items-center bg-prim p-3 text-white rounded-e-md">
          <ul className="flex gap-8 items-center">
            <li>
              <Link href="/">Home</Link>
            </li>

            <li>
              <Link href="/UI-Components/Pages/Shop">Shop</Link>
            </li>

            <li>
              <Link href="/UI-Components/Pages/Blogs">Blogs</Link>
            </li>

            <li className="relative group">
              <span className="flex items-center gap-1 cursor-pointer">
                Pages
                <Icon
                  icon="ep:arrow-down"
                  width={18}
                  height={18}
                  className={`transition-transform duration-300 group-hover:rotate-180`}
                />
              </span>

              <ul className="absolute top-full left-0 mt-3 w-48 bg-white text-black rounded-md shadow-lg opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-300 z-10">
                <li>
                  <Link
                    href="/UI-Components/Pages/About"
                    className="block px-4 py-2 hover:text-prim duration-300 transition-colors"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/UI-Components/Pages/Faqs"
                    className="block px-4 py-2 hover:text-prim duration-300 transition-colors"
                  >
                    Faq's
                  </Link>
                </li>

                <li>
                  <Link
                    href="/UI-Components/Pages/Contact"
                    className="block px-4 py-2 hover:text-prim duration-300 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>

                <li>
                  <Link
                    href="/UI-Components/Pages/PageNotFound"
                    className="block px-4 py-2 hover:text-prim duration-300 transition-colors"
                  >
                    Page not found
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          <div className="flex gap-3">
            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-secondary text-black px-4 py-2 rounded-md flex items-center cursor-pointer"
            >
              <Icon
                icon="material-symbols:bookmark-outline-rounded"
                width={20}
                height={20}
                className="me-1"
              />
              Deals Today
            </Link>

            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-white text-black px-4 py-2 rounded-md flex items-center cursor-pointer"
            >
              <Icon
                icon="ic:outline-local-offer"
                width={20}
                height={20}
                className="me-1"
              />
              Special Price
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
