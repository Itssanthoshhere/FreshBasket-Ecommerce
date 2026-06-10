import Image from "next/image";
import Link from "next/link";

import sectionbanner from "@/public/section-banner.png";
import pagenotfound from "@/public/pagenotfound.webp";

export default function PageNotFound() {
  return (
    <>
      {/* Banner */}
      <div className="page-banner bg-black h-55 flex justify-between items-center relative">
        <Image
          src={sectionbanner}
          alt="sectionbanner"
          className="w-full h-full object-cover absolute top-0 left-0 right-0"
        />

        <div className="content z-0 w-full h-full flex justify-center items-center flex-col">
          <ul className="flex items-center gap-1">
            <li>
              <Link href="/" className="uppercase text-sm font-unbounded">
                Home
              </Link>
            </li>
            <li>-</li>
            <li>
              <Link
                href="/UI-Components/Pages/PageNotFound"
                className="uppercase text-sm font-unbounded"
              >
                404 Not Found
              </Link>
            </li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-unbounded">404 Not Found</h2>
        </div>
      </div>

      <div className="flex justify-center flex-col-reverse items-center lg:flex-row gap-5 px-5 lg:px-8 xl:px-20 py-12">
        <div className="w-full lg:w-1/2">
          <Image
            src={pagenotfound}
            alt="page-not-found"
            className="w-full h-125 object-contain"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col text-center lg:items-start">
          <h3 className="text-6xl font-bold font-unbounded">Oops!</h3>

          <span className="text-gray-500 pb-2 pt-1 text-lg">
            Page not found!
          </span>

          <Link
            className="cursor-pointer bg-prim text-white hover:bg-black hover:text-white transition-colors lg:mx-0 mx-auto w-fit duration-300 p-2 rounded-sm"
            href="/UI-Components/Pages/Shop"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
