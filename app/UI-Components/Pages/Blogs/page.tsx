import Image from "next/image";
import Link from "next/link";

import sectionbanner from "@/public/section-banner.png";

import ArticlesData from "@/app/JsonData/BlogsData.json";

export default function Blogs() {
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
                href="/UI-Components/Pages/Blogs"
                className="uppercase text-sm font-unbounded"
              >
                Blogs
              </Link>
            </li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-unbounded">Our Articles</h2>
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {ArticlesData.map((blog, index) => (
            <div key={index} className="h-full">
              <Link
                href={`/UI-Components/Pages/Blogs/${blog.id}`}
                className="block h-full"
              >
                <div className="flex flex-col group h-full">
                  <div className="blog-image relative overflow-hidden rounded-lg">
                    <Image
                      src={blog.img}
                      width={1000}
                      height={1000}
                      alt={blog.author}
                      className="w-full h-full object-contain group-hover:scale-105 transition-all duration-300"
                    />

                    <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
                  </div>

                  <div className="flex flex-col grow my-5 px-5">
                    <h2 className="text-2xl hover:text-prim transition-all duration-200 line-clamp-1 min-h-8">
                      {blog.title}
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-3">
                      <h2 className="text-xl">
                        <i className="bi bi-calendar4-week"></i> {blog.date}
                      </h2>

                      <h2 className="text-lg">
                        <i className="bi bi-chat-dots"></i> {blog.comments}
                      </h2>
                    </div>

                    <div className="mt-auto">
                      <button className="btn text-black font-semibold px-5 py-2 rounded-lg mt-5 border border-black transition-all duration-300 cursor-pointer">
                        <div className="btn-text">
                          Explore More
                          <i className="bi bi-arrow-right ps-2"></i>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
