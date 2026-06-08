import subscribebanner from "@/public/freshbite-news-bg.webp";

import { Icon } from "@iconify/react";
import Image from "next/image";

export default function SubscribeBanner() {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 pt-8 sm:pt-10">
        <div className="subscribe-banner relative py-18 px-8">
          <Image
            src={subscribebanner}
            alt="Newsletter subscription background with fresh produce"
            priority
            className="w-full h-full absolute top-0 left-0 object-cover"
          />

          <div className="subscribe-content z-10 relative w-full text-center">
            <span className="text-white text-sm md:text-xl bg-black p-1.5 rounded-sm">
              Subscribe our newsletter
            </span>
            <h2 className="text-2xl md:text-3xl font-medium text-white mt-4 mb-3">
              Get 20% off discount coupon
            </h2>
            <form className="flex items-center max-w-xl mx-auto bg-black rounded-sm overflow-hidden">
              <input
                type="email"
                name="email"
                aria-label="Email address for newsletter subscription"
                required
                placeholder="Enter Your Email"
                className="bg-white w-full py-4 px-4 outline-none"
              />

              <button
                type="submit"
                className="cursor-pointer w-fit bg-white text-black flex items-center py-4 px-4 border-l border-gray-200"
              >
                <Icon
                  icon="material-symbols:bookmark-outline-rounded"
                  width={24}
                  height={24}
                />
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
