"use client";

import Image from "next/image";
import Link from "next/link";

import sectionbanner from "@/public/section-banner.png";
import { useState } from "react";

const ShoppingData = [
  {
    question: "How can I contact you?",
    answer:
      "You can reach our support team via email, phone, or through the contact form on our website. We're happy to assist you with any questions.",
  },
  {
    question: "Do you have restock notifications?",
    answer:
      "Yes! If a product is out of stock, simply select your preferred size or variant and click the notification button. We'll send you an email as soon as it's available again.",
  },
  {
    question: "How do I care for my items?",
    answer:
      "Care instructions vary by product. Please check the product label or description page for detailed washing, storage, and maintenance guidelines.",
  },
  {
    question: "How do I know what size I am?",
    answer:
      "You can refer to our size guide available on each product page. If you're unsure, feel free to contact our support team for assistance.",
  },
  {
    question: "How do I use a gift card?",
    answer:
      "Enter your gift card code during checkout in the designated coupon or gift card field. The value will automatically be applied to your order.",
  },
  {
    question: "How often do you restock items?",
    answer:
      "Popular products are restocked regularly, but timing may vary depending on availability and demand.",
  },
  {
    question: "Where are your products made?",
    answer:
      "Our products are sourced from trusted suppliers and manufacturers who meet our quality and sustainability standards.",
  },
];

const ExchangeData = [
  {
    question: "CAN I RETURN OR EXCHANGE SOMETHING IN STORE?",
    answer:
      "Yes, eligible products can be returned or exchanged in-store within the return period. Please bring your receipt or order confirmation along with the item.",
  },
  {
    question: "HOW DO I GET A SHIPPING LABEL?",
    answer:
      "After initiating a return request, a prepaid shipping label will be sent to your registered email address. Print the label and attach it to your package.",
  },
  {
    question: "WHAT DO I DO IF I RECEIVE A DEFECTIVE ITEM?",
    answer:
      "If you receive a damaged or defective item, please contact our support team within 48 hours of delivery with photos of the product for assistance.",
  },
];

const PaymentData = [
  {
    question: "Pellentesque habitant morbi tristique senectus et netus?",
    answer:
      "Our customer support team is available to assist you with any questions regarding orders, shipping, returns, and account-related issues. Contact us via email, phone, or live chat.",
  },
  {
    question: "How much is shipping and how long will it take?",
    answer:
      "Shipping costs are calculated at checkout based on your location and selected delivery method. Standard delivery typically takes 3–7 business days, while express shipping may arrive within 1–3 business days.",
  },
  {
    question: "How long will it take to get my package?",
    answer:
      "Delivery times vary depending on your location. Most orders are processed within 24 hours and delivered within 3–7 business days after dispatch.",
  },
  {
    question: "Branding is simply a more efficient way to sell things?",
    answer:
      "Strong branding helps customers recognize and trust a business. It creates a memorable identity, improves customer loyalty, and makes products easier to distinguish in the marketplace.",
  },
];

export default function Faqs() {
  const [openShopping, setOpenShopping] = useState(0);
  const [openExchange, setOpenExchange] = useState(null);
  const [openPayment, setOpenPayment] = useState(null);

  const toggleShopping = (index: any) => {
    setOpenShopping(openShopping === index ? null : index);
  };

  const toggleExchange = (index: any) => {
    setOpenExchange(openExchange === index ? null : index);
  };

  const togglePayment = (index: any) => {
    setOpenPayment(openPayment === index ? null : index);
  };

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
                href="/UI-Components/Pages/Faqs"
                className="uppercase text-sm font-unbounded"
              >
                Faq's
              </Link>
            </li>
          </ul>

          <h2 className="text-xl sm:text-3xl font-unbounded">Faq's</h2>
        </div>
      </div>

      <div className="px-2 lg:px-8 xl:px-12 pb-8 pt-8 sm:pt-16">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/3 lg:sticky h-full top-0 left-0">
            <span className="text-lg font-medium uppercase">
              Most common questions
            </span>

            <h2 className="text-3xl md:text-4xl font-bold mt-5 mb-15">
              Most popular questions
            </h2>

            <div className="mb-15">
              <span className="text-lg font-medium uppercase">
                ASK US ANYTHING
              </span>

              <div className="flex mt-3 items-center gap-3">
                <i className="bi bi-telephone"></i>

                <div>
                  <h4 className="text-black/80 hover:text-prim-dark transition cursor-pointer">
                    +00-1234567890
                  </h4>
                </div>
              </div>

              <div className="flex mt-2 items-center gap-3">
                <i className="bi bi-envelope"></i>

                <div>
                  <h4 className="text-black/80 hover:text-prim-dark transition cursor-pointer">
                    demo@support.com
                  </h4>
                </div>
              </div>
            </div>

            <div className="">
              <span className="text-lg font-medium uppercase">MY ACCOUNT</span>

              <div className="mt-3 space-y-2">
                <h4 className="font-semibold transition-all duration-300 hover:text-prim-dark cursor-pointer">
                  COMPANY POLICIES
                </h4>

                <h4 className="font-semibold transition-all duration-300 hover:text-prim-dark cursor-pointer">
                  PAYMENT OPTIONS
                </h4>

                <h4 className="font-semibold transition-all duration-300 hover:text-prim-dark cursor-pointer">
                  TERM AND CONDITIONS
                </h4>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/1 lg:border-l border-gray-300 lg:px-18 space-y-5">
            <h2 className="font-bold text-3xl">Shopping Information</h2>

            <div className="space-y-4 w-full">
              {ShoppingData.map((item, index) => (
                <div
                  key={index}
                  className={`overflow-hidden py-4 transition-all duration-300 ${index !== ShoppingData.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleShopping(index)}
                    className="w-full flex justify-between items-center"
                  >
                    <span className="text-md text-left md:text-lg uppercase font-medium">
                      {item.question}
                    </span>

                    {openShopping === index ? (
                      <i className="bi bi-dash text-2xl"></i>
                    ) : (
                      <i className="bi bi-plus text-2xl"></i>
                    )}
                  </button>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${openShopping === index ? "max-h-75 opacity-100 py-3" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-black/50 font-medium">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-bold text-3xl">Returns and exchanges</h2>

            <div className="space-y-4 w-full">
              {ExchangeData.map((item, index) => (
                <div
                  key={index}
                  className={`overflow-hidden py-4 transition-all duration-300 ${index !== ExchangeData.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => toggleExchange(index)}
                    className="w-full flex justify-between items-center"
                  >
                    <span className="text-md text-left md:text-lg uppercase font-medium">
                      {item.question}
                    </span>

                    {openExchange === index ? (
                      <i className="bi bi-dash text-2xl"></i>
                    ) : (
                      <i className="bi bi-plus text-2xl"></i>
                    )}
                  </button>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${openExchange === index ? "max-h-75 opacity-100 py-3" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-black/50 font-medium">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-bold text-3xl">Payment information</h2>

            <div className="space-y-4 w-full">
              {PaymentData.map((item, index) => (
                <div
                  key={index}
                  className={`overflow-hidden py-4 transition-all duration-300 ${index !== PaymentData.length - 1 ? "border-b border-gray-200" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => togglePayment(index)}
                    className="w-full flex justify-between items-center"
                  >
                    <span className="text-md text-left md:text-lg uppercase font-medium">
                      {item.question}
                    </span>

                    {openPayment === index ? (
                      <i className="bi bi-dash text-2xl"></i>
                    ) : (
                      <i className="bi bi-plus text-2xl"></i>
                    )}
                  </button>

                  <div
                    className={`transition-all duration-500 overflow-hidden ${openPayment === index ? "max-h-75 opacity-100 py-3" : "max-h-0 opacity-0"}`}
                  >
                    <p className="text-black/50 font-medium">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
