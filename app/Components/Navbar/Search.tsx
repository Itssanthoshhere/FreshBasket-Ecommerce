"use client";

import products from "@/app/JsonData/OrganicProducts.json";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  searchTerm: string;
  onClose: () => void;
};

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

export default function Search({ searchTerm, onClose }: Props) {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedWeight, setSelectedWeight] = useState<{
    [key: string]: string;
  }>({});
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () =>
      document.removeEventListener("mousedown", handleClickOutSide);
  }, [onClose]);

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
    const selectedQty = qty[product.id] || 1;

    let multiplier = 1;
    if (weight === "2kg") multiplier = 2;
    if (weight === "3kg") multiplier = 3;
    if (weight === "5kg") multiplier = 5;

    const updated: CartProduct[] = [
      ...stored,
      {
        ...product,
        weight,
        qty: selectedQty,
        priceNumber: basePrice * multiplier,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cart-updated"));
    window.dispatchEvent(new Event("cart-open"));

    setIsCartOpen(true);
    toast.success(`${product.title} added to cart 🛒`);
  };

  const priceBySize: Record<string, string> = {
    "1 KG": selectedProduct?.price || "0.00",
    "2 KG": "3,800.00",
    "3 KG": "5,400.00",
    "5 KG": "8,500.00",
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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

  return (
    <>
      <div
        ref={searchRef}
        className="absolute top-48 left-0 z-9999 w-full h-143 overflow-y-scroll hide-scrollbar shadow-2xl rounded-sm p-10 bg-gray-light"
      >
        <h2 className="mb-5">
          <span>Suggestion</span>
          <strong>: {searchTerm}</strong>
        </h2>

        {filteredProducts.length === 0 && (
          <p className="text-gray-500">No Products Found</p>
        )}

        <div className="grid lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredProducts.map((product) => (
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
                          setOpenId(openId === product.id ? null : product.id)
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
      </div>
    </>
  );
}
