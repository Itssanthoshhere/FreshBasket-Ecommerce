"use client";

import Image from "next/image";
import Link from "next/link";

import sectionbanner from "@/public/section-banner.png";
import { useParams } from "next/navigation";

import ArticlesData from "@/app/JsonData/BlogsData.json";

import gallery1 from "@/public/blog-det-gallery1.avif";
import gallery2 from "@/public/blog-det-gallery2.webp";
import gallery3 from "@/public/blog-det-gallery3.avif";
import gallery4 from "@/public/blog-det-gallery4.avif";
import gallery5 from "@/public/blog-det-gallery5.avif";
import gallery6 from "@/public/blog-det-gallery6.avif";

import articlesDes1 from "@/public/artical-des1.jpg";
import articlesDes2 from "@/public/artical-des2.webp";

const GalleryData = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
];

const CategoriesData = [
  "Babystore",
  "Bag",
  "Cosmatic",
  "Decorate",
  "Electronic",
  "Fashion",
  "Furniture",
];

const TagsData = ["Fruit", "Grocery", "Vegetable", "Dried Fruit"];

export default function BlogDetails() {
  const { id } = useParams();

  const blog = ArticlesData.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <div className="px-4 lg:px-20 py-24 text-center">
        <h2 className="text-4xl text-gray-400">Blog not found</h2>

        <Link
          href="/UI-Components/Pages/Blogs"
          className="inline-block mt-6 text-(--prim) underline"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

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
                Blogs Details
              </Link>
            </li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-unbounded">
            Articles Details
          </h2>
        </div>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-5 px-2 lg:px-8 xl:px-20 py-12">
        <div className="w-full lg:w-1/2 sticky top-0 left-0 h-full">
          <div>
            <h2 className="text-2xl font-medium">Recent posts</h2>

            <div className="w-full lg:w-3/4 pt-1">
              <div className="border-b rounded-full"></div>
            </div>

            <div className="w-full">
              {ArticlesData.slice(0, 4).map((blog, index) => (
                <Link
                  key={index}
                  href={`/UI-Components/Pages/Blogs/${blog.id}`}
                >
                  <div className="flex gap-3">
                    <div className="w-[200px] md:w-1/2 lg:w-[200px]">
                      <Image
                        src={blog.img}
                        alt={blog.author}
                        width={150}
                        height={150}
                        className="w-full h-fit object-cover rounded-lg"
                      />
                    </div>

                    <div className="w-full py-1">
                      <div className="flex h-full flex-col justify-between">
                        <div className="flex gap-4 mt-3">
                          <span className="font-medium">
                            <i className="bi bi-calendar4-week"></i> {blog.date}
                          </span>
                          <span className="font-medium">
                            <i className="bi bi-chat-dots"></i> {blog.comments}
                          </span>
                        </div>
                        <span className="text-xl font-medium hover:text-prim duration-300 transition-colors">
                          {blog.title}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
              <div>
                <h2 className="text-2xl mt-7 mb-3 font-medium">Categories</h2>

                {CategoriesData.map((category, index) => (
                  <Link
                    key={index}
                    href={`/UI-Components/Pages/Blogs?category=${category}"`}
                    className="flex items-center gap-2 mt-2 ps-2 hover:ps-4 transition-all duration-300"
                  >
                    <span className="font-medium hover:text-prim duration-300 transition-colors">
                      {category}
                    </span>
                  </Link>
                ))}

                <h2 className="text-2xl mt-7 mb-3 font-medium">Tags</h2>
                <div className="flex flex-wrap">
                  {TagsData.map((tags, index) => (
                    <Link
                      key={index}
                      href={`/UI-Components/Pages/Blogs?tags=${tags}`}
                      className="px-4 py-2 border rounded-md me-2 hover:bg-black hover:text-white transition-all duration-300"
                    >
                      <span className="font-medium">{tags}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl mt-7 mb-3 font-medium">Newsletter</h2>
                <div className="flex justify-between items-center gap-2 w-full md:w-3/4 border-b border-gray-300 pb-2 px-2">
                  <input
                    type="text"
                    placeholder="Enter Your Email..."
                    className="w-full outline-none"
                  />
                  <i className="bi bi-envelope"></i>
                </div>

                <h2 className="text-2xl mt-7 mb-3 font-medium">Instagram</h2>
                <div className="grid grid-cols-3 gap-2 w-full md:w-3/4">
                  {GalleryData.map((img, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer group overflow-hidden rounded-lg"
                    >
                      <Image
                        src={img}
                        alt="img"
                        width={1000}
                        height={1000}
                        className="w-full h-full object-cover cursor-pointer rounded-lg transition-all duration-300"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300"></div>

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <i className="bi bi-instagram text-white text-3xl"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/1">
          <div className="blog-image relative overflow-hidden rounded-lg group">
            <Image
              src={blog.img}
              width={1000}
              height={1000}
              alt={blog.author}
              className="w-full h-full object-contain group-hover:scale-105 transition-all duration-300"
            />

            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-30 transition-all duration-300"></div>
          </div>

          <div className="mt-10">
            <div className="flex gap-4 mt-3">
              <h2 className="text-xl">
                <i className="bi bi-calendar4-week"></i> {blog.date}
              </h2>
              <h2 className="text-lg">
                <i className="bi bi-chat-dots"></i> {blog.comments}
              </h2>
              <h2 className="text-lg">
                <i className="bi bi-person"></i> By {blog.author}
              </h2>
            </div>

            <h2 className="mt-5 text-4xl font-semibold hover:text-prim transition-all duration-200">
              {blog.title}
            </h2>

            <p className="mt-5 text-lg text-gray-500 tracking-wide">
              As part of our mission create space for women to express their
              sensuality without shame fear or the patriarchal gaze we’re asking
              women to invite us into their most intimate space. Fashion you can
              buy, but style you possess. The key to style is learning who you
              are, which takes years. There's no how-to road map to style.
            </p>

            <p className="mt-5 text-lg text-gray-500 tracking-wide">
              Style is the only thing you can’t buy. It’s not in a shopping bag,
              a label, or a price tag. It’s something reflected from our soul to
              the outside world - an emotion. I thank you for the recognition of
              the brilliance.
            </p>

            <div className="mt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <Image
                  src={articlesDes1}
                  alt="articlesData1"
                  className="w-full h-full rounded"
                />

                <Image
                  src={articlesDes2}
                  alt="articlesData2"
                  className="w-full h-full rounded"
                />
              </div>
            </div>

            <h2 className="my-8 text-4xl font-semibold">
              I thank you for the recognition of the brilliance. It’s something
              reflecte from our soul to the outside world - an emotion.
            </h2>

            <p className="mt-5 text-lg text-gray-500 tracking-wide">
              Fashion is what you’re offered four times a year by designers. And
              style is what you choose. I think there is beauty in everything.
              What ‘normal’ people would perceive as ugly, I can usually see
              something of beauty in it. Shoes transform your body language and
              attitude. They lift you physically and emotionally.
            </p>

            <div className="flex flex-wrap mt-5">
              {TagsData.map((tags, index) => (
                <Link
                  key={index}
                  href={`/UI-Components/Pages/Blogs?category=${tags}`}
                  className="px-4 py-2 border rounded-md me-2 hover:bg-black hover:text-white transition-all duration-300"
                >
                  <span className="font-medium">{tags}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
