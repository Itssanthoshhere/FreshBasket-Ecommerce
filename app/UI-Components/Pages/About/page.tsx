import Image from "next/image";
import Link from "next/link";

import sectionbanner from "@/public/section-banner.png";
import aboutImg01 from "@/public/about-img-01.webp";

import teamImg01 from "@/public/team-01.webp";
import teamImg02 from "@/public/team-02.webp";
import teamImg03 from "@/public/team-03.webp";
import teamImg04 from "@/public/team-04.webp";

const teamData = [
  {
    img: teamImg01,
    name: "Johnny Walker",
    role: "Web Designer",
  },
  {
    img: teamImg02,
    name: "Emily Carter",
    role: "UI/UX Designer",
  },
  {
    img: teamImg03,
    name: "Sophia Wilson",
    role: "Frontend Developer",
  },
  {
    img: teamImg04,
    name: "Michael Brown",
    role: "Project Managerr",
  },
];

const missionData = [
  {
    icon: "bi bi-bullseye",
    title: "Our mission",
    desc: "The most extraordinary people in the world today don’t have a career. They have a mission.",
  },
  {
    icon: "bi bi-crosshair",
    title: "Our vision",
    desc: "Create the highest vision possible for your life, because you become what you believe.",
  },
  {
    icon: "bi bi-headphones",
    title: "Your support",
    desc: "Create the highest vision possible for your life, because you become what you believe.",
  },
];

const serviceData = [
  {
    icon: "bi bi-geo-alt",
    title: "Order Tracking",
    desc: "Track your orders in real-time from dispatch to doorstep delivery.",
  },
  {
    icon: "bi bi-arrow-counterclockwise",
    title: "90 Days Return",
    desc: "Enjoy hassle-free returns and exchanges within 90 days of purchase.",
  },
  {
    icon: "bi bi-currency-dollar",
    title: "Money Guarantee",
    desc: "Get a full refund if your order does not meet your expectations.",
  },
  {
    icon: "bi bi-credit-card",
    title: "Flexible Payment",
    desc: "Pay securely using cards, UPI, wallets, net banking, and more.",
  },
  {
    icon: "bi bi-shield",
    title: "Secure Checkout",
    desc: "Your personal and payment information is protected with encryption.",
  },
];

export default function page() {
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
                href="/UI-Components/Pages/About"
                className="uppercase text-sm font-unbounded"
              >
                About
              </Link>
            </li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-unbounded">About</h2>
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-lg font-medium uppercase mb-3">
            Since 1982 our story
          </h4>

          <p className="text-center text-black/50 text-lg md:text-xl lg:w-[68%] font-medium">
            In early 1982, founder and creative director had the idea to design
            a bag collection where comfort, fashion, and distinction are key.
            was born a bag brand that believes fashion should go hand in hand
            with comfort.
          </p>
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-5 sm:py-16">
        <div className="flex flex-col lg:items-center lg:flex-row gap-5 lg:gap-15">
          <div className="relative w-full lg:w-1/2 overflow-hidden group">
            <Image
              src={aboutImg01}
              alt="about-img"
              className="transition-transform duration-500 ease-in-out group-hover:scale-110 object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              Story about us
            </h2>

            <p className=" text-black/50 text-lg md:text-xl lg:w-[75%] font-medium mb-5">
              Our mission is to create a safe space where women embrace their
              sensuality without shame or fear. We honor their intimacy, amplify
              their voices, and celebrate self-expression, empowering every
              woman to be boldly unapologetic.
            </p>

            <p className=" text-black/50 text-lg md:text-xl lg:w-[75%] font-medium mb-5">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Delectus
              rerum optio necessitatibus nesciunt id laudantium quaerat, fugit
              sunt voluptates error amet aliquam, possimus incidunt! Illo fuga
              iusto rem? Placeat, aliquam.
            </p>
            <span className="text-lg italic cursor-pointer">Harlie puth</span>
          </div>
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-5 sm:py-16 bg-gray-light">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {missionData.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <i className={`${item.icon} text-3xl`}></i>

              <h3 className="uppercase font-medium mb-2 mt-5">{item.title}</h3>

              <p className="text-center text-black/50 lg:w-[65%] font-medium">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-5 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg mb-3">Highly skiled</span>

          <h2 className="text-3xl md:text-4xl font-bold">Meet our teams</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-15">
          {teamData.map((member, index) => (
            <div key={index} className="group">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={member.img}
                  alt="team-image"
                  className="w-full transition-transform duration-500 ease-in-out transform-gpu group-hover:scale-110"
                />
              </div>

              <div className="text-center mt-5">
                <h4 className="uppercase font-medium text-md">{member.name}</h4>

                <span className="text-black/80 font-medium">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-5 sm:py-16 lg:py-20 bg-gray-light">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {serviceData.map((item, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center"
            >
              <i
                className={`${item.icon} text-3xl transition-transform duration-500 ease-in-out group-hover:scale-x-[-1]`}
              ></i>

              <h3 className="text-xl font-semibold mt-5">{item.title}</h3>

              <p className="text-black/50 text-lg font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
