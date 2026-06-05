import bannerOffer1 from "@/public/banneroffers-01.webp";
import bannerOffer2 from "@/public/banneroffers-02.webp";
import bannerOffer3 from "@/public/banneroffers-03.webp";
import Image from "next/image";
import Link from "next/link";

export default function BannerOffers() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-2 lg:px-8 xl:px-12 relative py-8 sm:py-16">
        <div className="offer-banner relative w-full h-75 rounded-sm overflow-hidden">
          <Image
            src={bannerOffer1}
            alt="offer-image"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 left-0 w-full h-full pt-16 pl-10">
            <span className="text-white underline uppercase font-medium">
              Get 29% off
            </span>

            <h3 className="text-4xl text-white max-w-5">Seafood calamari</h3>

            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-yellow-300 px-4 w-fit flex items-center py-2 mt-8 rounded-sm cursor-pointer hover:bg-black hover:text-white duration-300 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="offer-banner relative w-full h-75 rounded-sm overflow-hidden">
          <Image
            src={bannerOffer2}
            alt="offer-image"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 left-0 w-full h-full py-16 px-10">
            <span className="text-white underline uppercase font-medium">
              Get 49% off
            </span>

            <h3 className="text-4xl text-white max-w-75">
              Freshly baked bread toast
            </h3>

            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-yellow-300 px-4 w-fit flex items-center py-2 mt-8 rounded-sm cursor-pointer hover:bg-black hover:text-white duration-300 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>

        <div className="offer-banner relative w-full h-75 rounded-sm overflow-hidden">
          <Image
            src={bannerOffer3}
            alt="offer-image"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-0 left-0 w-full h-full py-16 px-10">
            <span className="text-white underline uppercase font-medium">
              Get 49% off
            </span>

            <h3 className="text-4xl text-white max-w-75">
              Fruits and vegetables
            </h3>

            <Link
              href="/UI-Components/Pages/Shop"
              className="bg-yellow-300 px-4 w-fit flex items-center py-2 mt-8 rounded-sm cursor-pointer hover:bg-black hover:text-white duration-300 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
