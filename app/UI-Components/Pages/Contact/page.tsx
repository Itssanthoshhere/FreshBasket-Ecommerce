import Image from "next/image";
import Link from "next/link";

import sectionbanner from "@/public/section-banner.png";
import contactImg01 from "@/public/contact-01.webp";

export default function Contact() {
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
                href="/UI-Components/Pages/Contact"
                className="uppercase text-sm font-unbounded"
              >
                Contact
              </Link>
            </li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-unbounded">Contact</h2>
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="relative w-full lg:w-1/2 overflow-hidden group">
            <Image
              src={contactImg01}
              alt="contact-img"
              className="transition-transform duration-500 ease-in-out group-hover:scale-110 object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2">
            <span className="text-lg">We'd love to hear from you</span>

            <h2 className="text-3xl md:text-4xl font-bold mt-5 mb-15">
              Contact us
            </h2>

            <div className="flex mb-8 gap-5 items-end">
              <i className="bi bi-telephone text-2xl"></i>

              <div>
                <p className="text-black/80 font-medium">LET'S TALK</p>
                <h4 className="font-semibold text-lg hover:text-prim-dark transition cursor-pointer">
                  +999 3222 000 388
                </h4>
              </div>
            </div>

            <div className="flex mb-8 gap-5 items-end">
              <i className="bi bi-envelope text-2xl"></i>

              <div>
                <p className="text-black/80 font-medium">SAY HI!</p>

                <h4 className="font-semibold text-lg hover:text-prim-dark transition cursor-pointer">
                  support@store.com
                </h4>
              </div>
            </div>

            <div className="flex mb-8 gap-5 items-end">
              <i className="bi bi-geo-alt text-2xl"></i>

              <div>
                <p className="text-black/80 font-medium">STORE ADDRESS</p>

                <h4 className="text-black/50 font-semibold text-lg">
                  27 Eden walk eden centre, Broadway, Paris, France
                </h4>
              </div>
            </div>

            <div className="flex gap-4 mt-8 px-10">
              <Link className="cursor-pointer" href="https://www.facebook.com/">
                <i className="bi bi-facebook hover:text-prim-dark hover:-translate-y-1 transition"></i>
              </Link>

              <Link className="cursor-pointer" href="https://x.com/">
                <i className="bi bi-twitter-x hover:text-prim-dark hover:-translate-y-1 transition"></i>
              </Link>

              <Link className="cursor-pointer" href="https://www.linkedin.com/">
                <i className="bi bi-linkedin hover:text-prim-dark hover:-translate-y-1 transition"></i>
              </Link>

              <Link className="cursor-pointer" href="https://www.youtube.com/">
                <i className="bi bi-youtube hover:text-prim-dark hover:-translate-y-1 transition"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-15">
          <div className="flex flex-col items-center">
            <h3 className="uppercase font-semibold mb-2 mt-5">STORE ADDRESS</h3>

            <p className="text-center text-lg text-black/50 lg:w-[75%] font-medium">
              The quickest way to know a womanis to go shopping with her
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="uppercase font-semibold mb-2 mt-5">SAVE PAYMENTS</h3>

            <p className="text-center text-lg text-black/50 lg:w-[75%] font-medium">
              Wealth consists not in having greatpossessions but in having few
              wants
            </p>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="uppercase font-semibold mb-2 mt-5">24/7 SUPPORT</h3>

            <p className="text-center text-black/50 lg:w-[75%] font-medium text-lg">
              Successful people are always lookingfor opportunities to help
              others.
            </p>
          </div>
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-8 lg:py-0 sm:py-16">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.32835516133!2d77.20898509999999!3d28.5273522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1781117870585!5m2!1sen!2sin"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16">
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg mb-3">Keep in touch with us</span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Let's get in touch with us
          </h2>
        </div>
        
        <div className="flex flex-col lg:flex-row py-10 gap-8">
          <div className="w-full lg:w-1/2">
            <div className="space-y-6">
              <div className="">
                <input
                  placeholder="Your full name"
                  className="outline-none border border-gray-300 w-full px-5 py-3 rounded-md"
                  type="text"
                />
              </div>
              <div className="">
                <input
                  placeholder="Your email address"
                  className="outline-none border border-gray-300 w-full px-5 py-3 rounded-md"
                  type="text"
                />
              </div>
              <div className="">
                <input
                  placeholder="Your mobile number"
                  className="outline-none border border-gray-300 w-full px-5 py-3 rounded-md"
                  type="text"
                />
              </div>
              <div className="flex gap-5">
                <input className="outline-none" type="checkbox" />
                <p className="text-black/50 text-lg font-medium">
                  I accept the terms &amp; conditions and I understand that my
                  data will be hold securely in accordance with the privacy
                  policy.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="">
              <textarea
                placeholder="Your message here..."
                className="px-5 py-3 outline-none border border-gray-300 w-full rounded-md"
              ></textarea>
            </div>
            <div className="mt-5">
              <button className="uppercase bg-prim text-white px-4 py-2 rounded-md transition-all duration-300 cursor-pointer hover:bg-black">
                send message
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
