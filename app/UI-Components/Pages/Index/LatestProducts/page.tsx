"use client";

import { useEffect, useRef, useState } from "react";
import TopProducts from "@/app/JsonData/TopProducts.json";
import TrendingProducts from "@/app/JsonData/TrendingProducts.json";
import RecentlyProducts from "@/app/JsonData/RecentlyProducts.json";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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

export default function LatestProducts() {
  const topSellingRef = useRef<SwiperType | null>(null);
  const trendingRef = useRef<SwiperType | null>(null);
  const recentlyRef = useRef<SwiperType | null>(null);

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
      <div className="grid  grid-cols-1 md:grid-cols-1 lg:grid-cols-2  xl:grid-cols-3 gap-5 xl:gap-10 px-2 lg:px-8 xl:px-12 py-8 sm:py-16  relative">
        <div className="top-product-item bg-white shadow-2xl p-5 sm:p-10 rounded-sm w-full">
          <div className="flex justify-between items-center mb-10 w-full">
            <h2 className="text-2xl lg:text-3xl font-bold">Top selling</h2>

            <div className="flex items-center gap-2">
              <Icon
                onClick={() => topSellingRef.current?.slidePrev()}
                icon="mingcute:arrow-left-line"
                width={20}
                height={20}
                className="cursor-pointer"
              />

              <Icon
                onClick={() => topSellingRef.current?.slideNext()}
                icon="mingcute:arrow-right-line"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            className="w-full product-swiper"
            loop={true}
            navigation={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (topSellingRef.current = swiper)}
          >
            <SwiperSlide>
              {TopProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="relative flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>

            <SwiperSlide>
              {TopProducts.slice(3, 6).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="trending-product-item bg-white shadow-2xl p-5 sm:p-10 rounded-sm w-full">
          <div className="flex justify-between items-center mb-10 w-full">
            <h2 className="text-2xl lg:text-3xl font-bold">
              Trending products
            </h2>

            <div className="flex items-center gap-2">
              <Icon
                onClick={() => trendingRef.current?.slidePrev()}
                icon="mingcute:arrow-left-line"
                width={20}
                height={20}
                className="cursor-pointer"
              />

              <Icon
                onClick={() => trendingRef.current?.slideNext()}
                icon="mingcute:arrow-right-line"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            className="w-full product-swiper"
            loop={true}
            navigation={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (trendingRef.current = swiper)}
          >
            <SwiperSlide>
              {TrendingProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>

            <SwiperSlide>
              {TrendingProducts.slice(3, 6).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>

            <SwiperSlide>
              {TrendingProducts.slice(6, 9).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>

            <SwiperSlide>
              {TrendingProducts.slice(9, 12).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>
          </Swiper>
        </div>

        <div className="recently-product-item bg-white shadow-2xl p-5 sm:p-10 rounded-sm w-full">
          <div className="flex justify-between items-center mb-10 w-full">
            <h2 className="text-2xl lg:text-3xl font-bold">Recently added</h2>

            <div className="flex items-center gap-2">
              <Icon
                onClick={() => recentlyRef.current?.slidePrev()}
                icon="mingcute:arrow-left-line"
                width={20}
                height={20}
                className="cursor-pointer"
              />

              <Icon
                onClick={() => recentlyRef.current?.slideNext()}
                icon="mingcute:arrow-right-line"
                width={20}
                height={20}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            className="w-full"
            loop={true}
            navigation={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => (recentlyRef.current = swiper)}
          >
            <SwiperSlide>
              {RecentlyProducts.slice(0, 3).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>

            <SwiperSlide>
              {RecentlyProducts.slice(3, 6).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>

            <SwiperSlide>
              {RecentlyProducts.slice(6, 9).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>

            <SwiperSlide>
              {RecentlyProducts.slice(9, 12).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center group gap-4 rounded-lg p-4 bg-white cursor-pointer"
                >
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

                  <div className="relative h-30 w-30 sm:w-35 sm:h-35 rounded-lg overflow-hidden">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1 cursor-pointer">
                      {product.title}
                    </h3>

                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          icon="material-symbols:star-rounded"
                          className="text-orange-400"
                          width={18}
                          height={18}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-bold text-black">
                        {product.price}
                      </span>

                      <span className="line-through text-gray-400 text-sm">
                        {product.lessprice}
                      </span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center gap-2 bg-gray-100 hover:bg-black hover:text-white px-4 py-2 rounded text-sm font-semibold transition-colors duration-300 cursor-pointer"
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
              ))}
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
