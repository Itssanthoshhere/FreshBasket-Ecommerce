"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Link from "next/link";
import { Autoplay } from "swiper/modules";
import toast, { Toaster } from "react-hot-toast";

import products from "@/app/JsonData/TopSelling.json";

export interface Product {
  id: string;
  image1: string;
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  title: string;
  price: string;
  lessprice?: string;
  review?: string;
  offer?: string;
  megasale?: string;
  seller?: string;
  supersaver?: string;
  weight?: string;
  qty?: number;
}

export interface CartProduct extends Product {
  weight: string;
  qty: number;
  priceNumber: number;
}

export default function CartSidebar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openNote, setOpenNote] = useState(true);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [selectedWeight, setSelectedWeight] = useState<{
    [key: string]: string;
  }>({});

  const weights = ["1kg", "2kg", "3kg", "5kg"];

  const [qty, setQty] = useState<Record<string, number>>({});

  const increaseQty = (id: string) => {
    setQty((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQty = (id: string) => {
    setQty((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  useEffect(() => {
    const loadCart = () => {
      const stored: CartProduct[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      setCart(stored);
    };

    const openCart = () => setIsCartOpen(true);

    loadCart();

    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("cart-open", openCart);

    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("cart-open", openCart);
    };
  }, []);

  const addToCart = (product: Product) => {
    const weight = selectedWeight[product.id] || "1kg";
    const stored: CartProduct[] = JSON.parse(
      localStorage.getItem("cart") || "[]",
    );

    const exists = stored.some(
      (item) => item.id === product.id && item.weight === weight,
    );

    if (exists) {
      toast("Already in Cart 🛒");
      return;
    }

    const basePrice = getPriceNumber(product.price);

    let multiplier = 1;
    if (weight === "2kg") multiplier = 2;
    if (weight === "3kg") multiplier = 3;
    if (weight === "5kg") multiplier = 5;

    const updated: CartProduct[] = [
      ...stored,
      {
        ...product,
        weight,
        qty: 1,
        priceNumber: basePrice * multiplier,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cart-updated"));
    window.dispatchEvent(new Event("cart-open"));

    setIsCartOpen(true);
    toast.success(`${product.title} added to cart 🛒`);
  };

  const removeFromCart = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  // Sub Total
  const getPriceNumber = (price?: string) => {
    if (!price) return 0;

    const cleaned = price.replace(/,/g, "").replace(/Rs\.?/g, "").trim();

    const value = parseFloat(cleaned);
    return isNaN(value) ? 0 : value;
  };

  const subtotal = cart.reduce((total, item) => {
    return total + (item.priceNumber || 0) * (item.qty || 1);
  }, 0);

  return (
    <>
      {isCartOpen && (
        <div
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/20 z-60 transition-opacity duration-300 cursor-pointer"
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-70 shadow-xl
        transform transition-transform duration-500 ease-in-out
        overflow-y-auto hide-scrollbar
        w-full sm:w-[80%] lg:w-[45%] xl:w-[35%]
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <p className="text-center bg-gray-100 py-3">
          New customers save 10% with code WELCOME10
        </p>
        <div className="p-5 sm:p-10 border-b border-gray-200 relative">
          <button
            onClick={() => setIsCartOpen(false)}
            className="absolute cursor-pointer top-1 right-1 z-50"
          >
            <Icon icon="material-symbols-light:close" width={30} height={30} />
          </button>

          <h4 className="text-xl font-medium font-unbounded">
            My shopping cart
          </h4>

          <p className="text-gray-500">
            Congratulations , you've got free shipping!
          </p>

          <div className="ship-probar w-full h-1.5 rounded-md mt-5 relative bg-gray-light">
            <Icon icon="mdi:truck-outline" width={30} height={30} />
          </div>
        </div>
        <div className="p-5 sm:p-8 max-h-150 overflow-y-scroll hide-scrollbar">
          {cart.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl font-medium pb-5 flex items-center justify-center gap-3">
                <Icon
                  icon="icon-park-outline:shopping"
                  width={20}
                  height={20}
                />
                Your cart is empty
              </p>
              <Link
                href="/UI-Components/Pages/Shop"
                className="bg-prim px-5 py-3 cursor-pointer text-white font-medium rounded-sm"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            cart.map((product) => (
              <div
                key={`${product.id}-${product.weight}`}
                className="flex items-start h-full gap-5 space-y-5 cursor-pointer"
              >
                <div className="border border-gray-200 w-36 h-36 group relative">
                  <img
                    src={product.image1}
                    alt={product.title}
                    className="w-full h-full object-cover rounded"
                  />

                  <img
                    src={product.image2}
                    alt={product.title}
                    className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                  />
                </div>

                <div>
                  <h3 className="text-md font-semibold group-hover:text-prim mb-1 duration-500">
                    {product.title}
                  </h3>

                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-black text-md">
                      {product.price}
                    </span>

                    <span className="line-through font-semibold text-black shadow-text-md">
                      {product.lessprice}
                    </span>
                  </div>

                  <div className="mb-5">
                    Size: <strong>{product.weight}</strong>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-200 rounded w-fit">
                      <button
                        onClick={() => decreaseQty(product.id)}
                        className="px-3 py-2 cursor-pointer"
                      >
                        <Icon icon="ic:baseline-minus" width={20} height={20} />
                      </button>

                      <span className="px-3 text-lg">
                        {qty[product.id] || 1}
                      </span>

                      <button
                        onClick={() => increaseQty(product.id)}
                        className="px-3 py-2 cursor-pointer"
                      >
                        <Icon icon="ic:baseline-plus" width={20} height={20} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="font-bold cursor-pointer"
                    >
                      <Icon
                        icon="material-symbols:delete-outline"
                        width={24}
                        height={24}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-5 sm:p-10 pt-5 border-t border-b border-gray-200">
          <h5 className="text-xl font-semibold mb-5 capitalize">
            You might also like
          </h5>

          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {products.slice(0, 8).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="flex items-start gap-5">
                  <div className="border border-gray-200 w-36 h-36 group relative">
                    <img
                      src={product.image1}
                      alt={product.title}
                      className="w-full h-full object-cover rounded"
                    />

                    <img
                      src={product.image2}
                      alt={product.title}
                      className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                    />
                  </div>

                  <div>
                    <h3 className="text-md font-semibold group-hover:text-prim mb-1 duration-500">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-black text-md">
                        {product.price}
                      </span>

                      <span className="line-through font-semibold text-black shadow-text-md">
                        {product.lessprice}
                      </span>
                    </div>

                    <div className="flex items-center text-yellow-400 mb-5">
                      <Icon icon="material-symbols:star-rounded" width={20} />
                      <Icon icon="material-symbols:star-rounded" width={20} />
                      <Icon icon="material-symbols:star-rounded" width={20} />
                      <Icon icon="material-symbols:star-rounded" width={20} />

                      <Icon
                        icon="material-symbols:star-outline-rounded"
                        width={20}
                      />
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="rounded py-2 px-3 bg-gray-light hover:bg-black hover:text-white text-sm flex items-center cursor-pointer transition-colors duration-300 font-medium"
                    >
                      ADD TO CART
                      <Icon
                        icon="lucide:shopping-bag"
                        width={20}
                        height={20}
                        className="ms-1"
                      />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="p-5 sm:px-10 pt-5">
          <div
            onClick={() => setOpenNote(!openNote)}
            className="flex justify-between items-center cursor-pointer select-none"
          >
            <label className="font-medium">Order special instructions</label>

            <Icon
              icon="iconamoon:arrow-down-2-light"
              width={24}
              height={24}
              className={`transition-transform duration-300 ${openNote ? "rotate-180" : ""}`}
            />
          </div>

          <div
            className={`transition-all duration-300 overflow-hidden max-h-40 opacity-100`}
          >
            <textarea
              className="border border-gray-200 w-full p-4 mt-2 rounded"
              placeholder="Message"
            />
          </div>
        </div>
        <div className="product-total p-5 sm:px-10 py-3">
          <div className="flex justify-between items-center">
            <span className="text-xl font-unbounded font-medium">Subtotal</span>

            <p className="text-md font-unbounded font-medium">
              Rs.{" "}
              {subtotal.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </p>
          </div>

          <Link
            href="/UI-Components/Pages/Checkout"
            className="bg-prim text-white rounded-sm w-full text-center py-2 text-md font-medium hover:bg-black transition-colors duration-300 mt-3 block"
          >
            Check Out
          </Link>
        </div>
      </div>
    </>
  );
}
