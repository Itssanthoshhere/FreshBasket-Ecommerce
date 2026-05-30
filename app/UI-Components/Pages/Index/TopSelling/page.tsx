"use client";

import Image from "next/image";

import titleicon from "@/public/freshbite-title-icon1.png";
import products from "../../../../JsonData/TopSelling.json";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Icon } from "@iconify/react";
import { use, useEffect, useState } from "react";

export interface Product {
  id: string;
  image1: string;
  image2: string;
  image3?: string;
  image4?: string;
  image5?: string;
  title: string;
  price: string;
  lessPrice?: number;
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

type TopSellingProps = {
  product: Product[];
};

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TopSelling({ product }: TopSellingProps) {
  const router = useRouter();

  const [openId, setOpenId] = useState<string | null>(null);
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

  // Popup Modal for wishlist updates
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const [mainImage, setMainImage] = useState("");

  const [selectedSize, setSelectedSize] = useState("1 KG");

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setMainImage(selectedProduct.image1);
      setSelectedSize("1 KG");
    }
  }, [selectedProduct]);

  const priceBySize: Record<string, string> = {
    "1 KG": selectedProduct?.price || "0.00",
    "2 KG": "3,800.00",
    "3 KG": "5,400.00",
    "5 KG": "8,500.00",
  };

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const handleUpdate = () => {
      const stored: string[] = JSON.parse(
        localStorage.getItem("wishlist") || "[]",
      );
      setWishlist(stored);
    };

    handleUpdate();
    window.addEventListener("wishlistUpdated", handleUpdate);

    return () => {
      window.removeEventListener("wishlistUpdated", handleUpdate);
    };
  }, []);

  const toggleWishlist = (product: Product) => {
    const stored: string[] = JSON.parse(
      localStorage.getItem("wishlist") || "[]",
    );

    let updated: string[];

    if (stored.includes(product.id)) {
      updated = stored.filter((id) => id !== product.id);

      toast(`${product.title} Removed from wishlist 💔`);
    } else {
      updated = [...stored, product.id];
      toast.success(`${product.title} Added to wishlist ❤️`);
    }

    localStorage.setItem("wishlist", JSON.stringify(updated));

    setWishlist(updated);
    window.dispatchEvent(new Event("wishlistUpdated"));
  };

  const [cart, setCart] = useState<CartProduct[]>([]);

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
      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16 relative">
        <div className="section-title flex flex-wrap pb-10 md:ps-5 gap-3">
          <h2 className="text-3xl md:text-5xl font-bold">
            Top selling products
          </h2>

          <p className="text-black/50 flex items-center flex-wrap gap-4 text-lg md:text-xl font-medium">
            <Image src={titleicon} alt="title-icon" />
            Fresh and fabulous from farm to table!
          </p>
        </div>

        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          className="w-full product-swiper"
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={1500}
          breakpoints={{
            1600: { slidesPerView: 5 },
            1400: { slidesPerView: 4 },
            1100: { slidesPerView: 3 },
            768: { slidesPerView: 2.5 },
            600: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          <SwiperSlide>
            <div className="grid grid-cols-1 gap-10">
              {products.slice(0, 1).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 mt-8">
              {products.slice(1, 2).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="grid grid-cols-1 gap-10">
              {products.slice(2, 3).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 mt-8">
              {products.slice(3, 4).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="grid grid-cols-1 gap-10">
              {products.slice(4, 5).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 mt-8">
              {products.slice(5, 6).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="grid grid-cols-1 gap-10">
              {products.slice(6, 7).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 mt-8">
              {products.slice(7, 8).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="grid grid-cols-1 gap-10">
              {products.slice(8, 9).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 mt-8">
              {products.slice(9, 10).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="grid grid-cols-1 gap-10">
              {products.slice(10, 11).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-10 mt-8">
              {products.slice(11, 12).map((product) => (
                <div key={product.id}>
                  <div className="group border border-gray-200 w-full rounded-lg bg-white relative hover:shadow-xl transition-all duration-500">
                    {(() => {
                      if (product.megasale) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.megasale}
                          </span>
                        );
                      }

                      if (product.offer) {
                        return (
                          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.offer}
                          </span>
                        );
                      }

                      if (product.supersaver) {
                        return (
                          <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.supersaver}
                          </span>
                        );
                      }

                      if (product.seller) {
                        return (
                          <span className="absolute top-3 left-3 bg-secondary-dark text-white text-xs font-medium px-2 py-1 rounded z-10">
                            {product.seller}
                          </span>
                        );
                      }

                      return null;
                    })()}

                    <div className="w-full h-62.5 relative rounded-lg overflow-hidden">
                      <img
                        src={product.image1}
                        alt={product.title}
                        className="w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-all duration-500"
                      />

                      <img
                        src={product.image2}
                        alt={product.title}
                        className="w-full h-full object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      />

                      <div className="absolute border border-gray-200 rounded-sm top-0 right-0 m-3 transform translate-x-10 group-hover:translate-x-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <Icon
                          icon={
                            wishlist.includes(product.id)
                              ? "mdi:heart"
                              : "line-md:heart"
                          }
                          width={30}
                          height={30}
                          onClick={() => toggleWishlist(product)}
                          className={`border-b border-gray-200 p-1
                             cursor-pointer transition-all duration-300 ease-in-out ${wishlist.includes(product.id) ? "text-red-600 scale-110" : "text-black scale-100"}`}
                        />

                        <Icon
                          icon="iconamoon:eye-light"
                          width={30}
                          height={30}
                          className="border-gray-200 p-1 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(product);
                            setOpenModal(true);
                          }}
                        />
                      </div>
                    </div>

                    <div className="product-content p-5">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="text-xl font-semibold mb-3 group-hover:text-prim duration-500 cursor-pointer"
                      >
                        {product.title}
                      </button>

                      <div className="flex items-center justify-between mb-3 gap-3 relative">
                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenId(
                                openId === product.id ? null : product.id,
                              )
                            }
                            className="border border-gray-200 rounded px-3 py-2 text-md flex items-center gap-2 w-full justify-between cursor-pointer"
                          >
                            {selectedWeight[product.id] || "1 kg"}

                            <Icon
                              icon="iconamoon:arrow-down-2-duotone"
                              width={20}
                              height={20}
                              className={`transition-transform duration-300 ${openId === product.id ? "rotate-180" : ""}`}
                            />
                          </button>

                          <ul
                            className={`absolute left-0 top-full mt-1 w-full bg-white border border-gray-200 rounded z-10 transition-all duration-300 ease-in-out ${openId === product.id ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
                          >
                            {weights.map((item) => (
                              <li
                                key={item}
                                onClick={() => {
                                  setSelectedWeight((prev) => ({
                                    ...prev,
                                    [product.id]: item,
                                  }));

                                  setOpenId(null);
                                }}
                                className="px-3 py-2 text-md cursor-pointer hover:bg-prim/10"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex items-center border border-gray-200 rounded">
                          <button
                            onClick={() => decreaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-minus"
                              width={20}
                              height={20}
                            />
                          </button>

                          <span className="px-3 text-lg">
                            {qty[product.id] || 1}
                          </span>

                          <button
                            onClick={() => increaseQty(product.id)}
                            className="px-3 py-2 cursor-pointer"
                          >
                            <Icon
                              icon="ic:baseline-plus"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-semibold text-black text-md">
                          {product.price}
                        </span>

                        <span className="line-through font-semibold text-black text-md">
                          {product.lessprice}
                        </span>

                        {product.review && (
                          <span className="ml-auto flex items-center bg-green-100 text-green-700 text-md px-3 py-1 rounded font-bold">
                            <Icon
                              icon="material-symbols:star-rounded"
                              width={14}
                              height={14}
                              className="me-1"
                            />
                            {product.review}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full rounded py-2 font-semibold text-md bg-gray-light hover:bg-black transition-colors duration-300 hover:text-white cursor-pointer flex items-center justify-center"
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
                </div>
              ))}
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* POPUP MODAL */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm top-0 left-0 transition-opacity duration-300 ${openModal ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <div
          className={`relative bg-white max-w-6xl w-full mx-4 rounded-sm p-5 lg:p-10 flex lg:flex-row flex-col overflow-y-auto max-h-175 gap-10 transform transition-all duration-300 ease-out ${openModal ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
        >
          <button
            onClick={() => setOpenModal(false)}
            className="absolute top-0 right-0 z-50 text-xl font-bold hover:bg-black cursor-pointer transition-colors duration-300 bg-prim-dark text-white p-2"
          >
            <Icon icon="material-symbols-light:close" width={24} height={24} />
          </button>

          <div className="w-full lg:w-1/2 h-full">
            <div className="overflow-hidden border border-gray-200 rounded-sm">
              {(mainImage || selectedProduct?.image1) && (
                <Image
                  src={mainImage || selectedProduct.image1}
                  alt="Product"
                  width={500}
                  height={500}
                  className="w-full h-112.5 lg:h-112.5 object-cover"
                />
              )}
            </div>

            <div className="flex justify-between items-center overflow-x-auto gap-2 mt-4">
              {[1, 2, 3, 4, 5, 6].map((i) => {
                const img = selectedProduct?.[`image${i}`];
                if (!img) return null;

                return (
                  <Image
                    key={`${selectedProduct?.id}-${i}`}
                    src={img}
                    alt="thumb"
                    width={100}
                    height={100}
                    className="border border-gray-200 rounded-sm cursor-pointer object-cover h-24 w-full"
                    onClick={() => setMainImage(img)}
                  />
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-full lg:overflow-y-auto lg:h-150 hide-scrollbar">
            <h3 className="text-2xl font-semibold mb-2">
              {selectedProduct?.title}
            </h3>

            <p className="mb-3 text-gray-600">
              Tax included. Shipping calculated at checkout.
            </p>

            <div className="flex items-center gap-4 mb-4">
              <div className="text-2xl font-bold">
                Rs. {priceBySize[selectedSize].replace("Rs.", "").trim()}
              </div>

              {selectedProduct?.lessprice && (
                <div className="font-semibold line-through text-gray-500 text-md">
                  Rs. {selectedProduct.lessprice.replace(/Rs\.?/i, "").trim}
                </div>
              )}
            </div>

            <span className="text-gray-500">
              Tax included. Shipping calculated at checkout.
            </span>

            <div className="flex items-center gap-2 border-b border-gray-200 pb-5 pt-2 mb-4">
              <svg width="15" height="15" aria-hidden="true">
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="7.5"
                  fill="rgb(62,214,96, 0.3)"
                ></circle>
                <circle
                  cx="7.5"
                  cy="7.5"
                  r="5"
                  stroke="rgb(255, 255, 255)"
                  strokeWidth="1"
                  fill="rgb(62,214,96)"
                ></circle>
              </svg>
              13 in stock
            </div>

            <p className="mb-3 text-gray-500">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry dummy text and typesetting industry
            </p>

            <div className="mb-4">
              <strong>Size:</strong>
              <span className="ml-2 text-sm font-medium text-gray-500">
                {selectedSize}
              </span>

              <ul className="flex gap-2 mt-3">
                {["1 KG", "2 KG", "3 KG", "5 KG"].map((size) => (
                  <li
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border border-gray-200 rounded-sm px-4 py-1 cursor-pointer transition ${selectedSize === size ? "bg-black text-white" : "hover:bg-black hover:text-white"}`}
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>

            {selectedProduct && (
              <div className="flex items-center border border-gray-200 rounded w-fit mb-5">
                <button
                  onClick={() => decreaseQty(selectedProduct.id)}
                  className="px-3 py-2 cursor-pointer"
                >
                  <Icon icon="ic:baseline-minus" width={20} height={20} />
                </button>

                <span className="px-3 text-lg">
                  {qty[selectedProduct.id] || 1}
                </span>

                <button
                  onClick={() => increaseQty(selectedProduct.id)}
                  className="px-3 py-2 cursor-pointer"
                >
                  <Icon icon="ic:baseline-plus" width={20} height={20} />
                </button>
              </div>
            )}

            <div className="w-full flex flex-col sm:flex-row gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (!selectedProduct) return;

                  addToCart(selectedProduct);
                  window.dispatchEvent(new Event("cart-open"));
                  setOpenModal(false);
                }}
                className="bg-prim text-white px-6 py-3 rounded hover:bg-black transition duration-300 cursor-pointer font-bold w-full"
              >
                ADD TO CART
              </button>

              <button className="bg-black text-white px-6 py-3 rounded hover:bg-prim transition duration-300 w-full cursor-pointer text-center">
                BUY IT NOW
              </button>
            </div>

            <div className="py-5">
              <span className="text-xl font-medium">
                Payment &amp; Security
              </span>

              <ul className="flex gap-2 items-center pt-2 cursor-pointer">
                <li>
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="38"
                    height="24"
                    aria-labelledby="pi-visa"
                  >
                    <title id="pi-visa">Visa</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    ></path>
                    <path
                      d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z"
                      fill="#142688"
                    ></path>
                  </svg>
                </li>

                <li>
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="38"
                    height="24"
                    aria-labelledby="pi-master"
                  >
                    <title id="pi-master">Mastercard</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    ></path>
                    <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                    <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                    <path
                      fill="#FF5F00"
                      d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"
                    ></path>
                  </svg>
                </li>

                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-labelledby="pi-american_express"
                    viewBox="0 0 38 24"
                    width="38"
                    height="24"
                  >
                    <title id="pi-american_express">American Express</title>
                    <path
                      fill="#000"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3Z"
                      opacity=".07"
                    ></path>
                    <path
                      fill="#006FCF"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32Z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M22.012 19.936v-8.421L37 11.528v2.326l-1.732 1.852L37 17.573v2.375h-2.766l-1.47-1.622-1.46 1.628-9.292-.02Z"
                    ></path>
                    <path
                      fill="#006FCF"
                      d="M23.013 19.012v-6.57h5.572v1.513h-3.768v1.028h3.678v1.488h-3.678v1.01h3.768v1.531h-5.572Z"
                    ></path>
                    <path
                      fill="#006FCF"
                      d="m28.557 19.012 3.083-3.289-3.083-3.282h2.386l1.884 2.083 1.89-2.082H37v.051l-3.017 3.23L37 18.92v.093h-2.307l-1.917-2.103-1.898 2.104h-2.321Z"
                    ></path>
                    <path
                      fill="#FFF"
                      d="M22.71 4.04h3.614l1.269 2.881V4.04h4.46l.77 2.159.771-2.159H37v8.421H19l3.71-8.421Z"
                    ></path>
                    <path
                      fill="#006FCF"
                      d="m23.395 4.955-2.916 6.566h2l.55-1.315h2.98l.55 1.315h2.05l-2.904-6.566h-2.31Zm.25 3.777.875-2.09.873 2.09h-1.748Z"
                    ></path>
                    <path
                      fill="#006FCF"
                      d="M28.581 11.52V4.953l2.811.01L32.84 9l1.456-4.046H37v6.565l-1.74.016v-4.51l-1.644 4.494h-1.59L30.35 7.01v4.51h-1.768Z"
                    ></path>
                  </svg>
                </li>

                <li>
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    width="38"
                    height="24"
                    role="img"
                    aria-labelledby="pi-paypal"
                  >
                    <title id="pi-paypal">PayPal</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    ></path>
                    <path
                      fill="#003087"
                      d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z"
                    ></path>
                    <path
                      fill="#3086C8"
                      d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z"
                    ></path>
                    <path
                      fill="#012169"
                      d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z"
                    ></path>
                  </svg>
                </li>

                <li>
                  <svg
                    viewBox="0 0 38 24"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    width="38"
                    height="24"
                    aria-labelledby="pi-diners_club"
                  >
                    <title id="pi-diners_club">Diners Club</title>
                    <path
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
                    ></path>
                    <path
                      d="M12 12v3.7c0 .3-.2.3-.5.2-1.9-.8-3-3.3-2.3-5.4.4-1.1 1.2-2 2.3-2.4.4-.2.5-.1.5.2V12zm2 0V8.3c0-.3 0-.3.3-.2 2.1.8 3.2 3.3 2.4 5.4-.4 1.1-1.2 2-2.3 2.4-.4.2-.4.1-.4-.2V12zm7.2-7H13c3.8 0 6.8 3.1 6.8 7s-3 7-6.8 7h8.2c3.8 0 6.8-3.1 6.8-7s-3-7-6.8-7z"
                      fill="#3086C8"
                    ></path>
                  </svg>
                </li>

                <li>
                  <svg
                    viewBox="0 0 38 24"
                    width="38"
                    height="24"
                    role="img"
                    aria-labelledby="pi-discover"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title id="pi-discover">Discover</title>
                    <path
                      fill="#000"
                      opacity=".07"
                      d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
                    ></path>
                    <path
                      d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32z"
                      fill="#fff"
                    ></path>
                    <path
                      d="M3.57 7.16H2v5.5h1.57c.83 0 1.43-.2 1.96-.63.63-.52 1-1.3 1-2.11-.01-1.63-1.22-2.76-2.96-2.76zm1.26 4.14c-.34.3-.77.44-1.47.44h-.29V8.1h.29c.69 0 1.11.12 1.47.44.37.33.59.84.59 1.37 0 .53-.22 1.06-.59 1.39zm2.19-4.14h1.07v5.5H7.02v-5.5zm3.69 2.11c-.64-.24-.83-.4-.83-.69 0-.35.34-.61.8-.61.32 0 .59.13.86.45l.56-.73c-.46-.4-1.01-.61-1.62-.61-.97 0-1.72.68-1.72 1.58 0 .76.35 1.15 1.35 1.51.42.15.63.25.74.31.21.14.32.34.32.57 0 .45-.35.78-.83.78-.51 0-.92-.26-1.17-.73l-.69.67c.49.73 1.09 1.05 1.9 1.05 1.11 0 1.9-.74 1.9-1.81.02-.89-.35-1.29-1.57-1.74zm1.92.65c0 1.62 1.27 2.87 2.9 2.87.46 0 .86-.09 1.34-.32v-1.26c-.43.43-.81.6-1.29.6-1.08 0-1.85-.78-1.85-1.9 0-1.06.79-1.89 1.8-1.89.51 0 .9.18 1.34.62V7.38c-.47-.24-.86-.34-1.32-.34-1.61 0-2.92 1.28-2.92 2.88zm12.76.94l-1.47-3.7h-1.17l2.33 5.64h.58l2.37-5.64h-1.16l-1.48 3.7zm3.13 1.8h3.04v-.93h-1.97v-1.48h1.9v-.93h-1.9V8.1h1.97v-.94h-3.04v5.5zm7.29-3.87c0-1.03-.71-1.62-1.95-1.62h-1.59v5.5h1.07v-2.21h.14l1.48 2.21h1.32l-1.73-2.32c.81-.17 1.26-.72 1.26-1.56zm-2.16.91h-.31V8.03h.33c.67 0 1.03.28 1.03.82 0 .55-.36.85-1.05.85z"
                      fill="#231F20"
                    ></path>
                    <path
                      d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                      fill="url(#pi-paint0_linear)"
                    ></path>
                    <path
                      opacity=".65"
                      d="M20.16 12.86a2.931 2.931 0 100-5.862 2.931 2.931 0 000 5.862z"
                      fill="url(#pi-paint1_linear)"
                    ></path>
                    <path
                      d="M36.57 7.506c0-.1-.07-.15-.18-.15h-.16v.48h.12v-.19l.14.19h.14l-.16-.2c.06-.01.1-.06.1-.13zm-.2.07h-.02v-.13h.02c.06 0 .09.02.09.06 0 .05-.03.07-.09.07z"
                      fill="#231F20"
                    ></path>
                    <path
                      d="M36.41 7.176c-.23 0-.42.19-.42.42 0 .23.19.42.42.42.23 0 .42-.19.42-.42 0-.23-.19-.42-.42-.42zm0 .77c-.18 0-.34-.15-.34-.35 0-.19.15-.35.34-.35.18 0 .33.16.33.35 0 .19-.15.35-.33.35z"
                      fill="#231F20"
                    ></path>
                    <path
                      d="M37 12.984S27.09 19.873 8.976 23h26.023a2 2 0 002-1.984l.024-3.02L37 12.985z"
                      fill="#F48120"
                    ></path>
                    <defs>
                      <linearGradient
                        id="pi-paint0_linear"
                        x1="21.657"
                        y1="12.275"
                        x2="19.632"
                        y2="9.104"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F89F20"></stop>
                        <stop offset=".25" stopColor="#F79A20"></stop>
                        <stop offset=".533" stopColor="#F68D20"></stop>
                        <stop offset=".62" stopColor="#F58720"></stop>
                        <stop offset=".723" stopColor="#F48120"></stop>
                        <stop offset="1" stopColor="#F37521"></stop>
                      </linearGradient>
                      <linearGradient
                        id="pi-paint1_linear"
                        x1="21.338"
                        y1="12.232"
                        x2="18.378"
                        y2="6.446"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#F58720"></stop>
                        <stop offset=".359" stopColor="#E16F27"></stop>
                        <stop offset=".703" stopColor="#D4602C"></stop>
                        <stop offset=".982" stopColor="#D05B2E"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </li>
              </ul>
            </div>

            <p className="text-gray-500 mb-3">
              Your payment information is processed securely. We do not store
              credit card details nor have access to your credit card
              information.
            </p>

            <ul className="flex justify-between items-center flex-wrap gap-5 border border-gray-200 p-5 mb-3">
              <li className="flex items-center text-center flex-col">
                <Icon icon="akar-icons:location" width={30} height={30} />

                <h6 className="font-semibold text-md pt-2">Store pickup</h6>
              </li>

              <li className="flex items-center text-center flex-col">
                <Icon icon="grommet-icons:rotate-left" width={30} height={30} />

                <h6 className="font-semibold text-md pt-2">Return policy</h6>
              </li>

              <li className="flex items-center text-center flex-col">
                <Icon icon="ic:round-attach-money" width={30} height={30} />

                <h6 className="font-semibold text-md pt-2">Money back</h6>
              </li>
            </ul>

            <div>
              {/* Offers */}
              <div className="border-t border-gray-200 py-3">
                <button
                  onClick={() => toggle(0)}
                  className="flex justify-between items-center w-full cursor-pointer"
                >
                  <div className="flex justify-between items-center w-full cursor-pointer">
                    <div className="flex items-center">
                      <Icon
                        icon="material-symbols:percent"
                        width={20}
                        height={20}
                        className="me-2"
                      />

                      <span className="font-medium text-lg">
                        Offers available for you
                      </span>
                    </div>

                    <Icon
                      icon={
                        openIndex === 0
                          ? "ic:baseline-minus"
                          : "ic:baseline-plus"
                      }
                      width={24}
                      height={24}
                      className="transition-transform duration-300"
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === 0 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <ul className="space-y-2">
                    <li>
                      <Link href="/">
                        👉 Get up to <strong>50% off</strong> on selected
                        products!
                      </Link>
                    </li>

                    <li>
                      <Link href="/">
                        👉 Buy <strong>2</strong> &amp; get{" "}
                        <strong>15% off</strong> —<strong> BUY2SAVE</strong>
                      </Link>
                    </li>

                    <li>
                      <Link href="/">
                        👉 Get <strong>11% off</strong> first order —{" "}
                        <strong>11%OFF</strong>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* PICKUP */}
              <div className="border-t border-b border-gray-200 py-3">
                <button
                  onClick={() => toggle(1)}
                  className="flex justify-between items-center w-full cursor-pointer"
                >
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center">
                      <Icon
                        icon="mingcute:truck-line"
                        width={20}
                        height={20}
                        className="me-2"
                      />

                      <span className="font-medium text-lg">
                        Choose pickup and save time!
                      </span>
                    </div>

                    <Icon
                      icon={
                        openIndex === 1
                          ? "ic:baseline-minus"
                          : "ic:baseline-plus"
                      }
                      width={24}
                      height={24}
                      className="transition-transform duration-300"
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === 1 ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-gray-500">
                    Opt for our convenient pickup option and get items faster.
                    <br />
                    <Link className="text-black font-medium" href="/">
                      View Information
                    </Link>
                  </p>
                </div>
              </div>

              {/* RETURN */}
              <div className="border-b border-gray-200 py-3">
                <button
                  onClick={() => toggle(2)}
                  className="flex justify-between items-center w-full cursor-pointer"
                >
                  <div className="flex items-center">
                    <Icon
                      icon="solar:refresh-bold"
                      width={20}
                      height={20}
                      className="me-2"
                    />

                    <span className="font-medium text-lg">
                      {" "}
                      Flexible returns
                    </span>
                  </div>

                  <Icon
                    icon={
                      openIndex === 2 ? "ic:baseline-minus" : "ic:baseline-plus"
                    }
                    width={24}
                    height={24}
                    className="transition-transform duration-300"
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === 2 ? "max-h-40 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
                >
                  <p className="text-gray-500">
                    30-day return window — shop with confidence!
                    <br />
                    <Link className="text-black font-medium" href="/">
                      Learn More
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-right" />
    </>
  );
}
