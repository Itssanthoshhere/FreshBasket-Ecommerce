"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";

type CartItem = {
  id: string;
  title: string;
  image1: string;
  weight: string;
  qty: number;
  priceNumber: number;
};

export default function Checkout() {
  const [deliveryOption, setDeliveryOption] = useState<"Ship" | "pickup">(
    "Ship",
  );
  const [cartItem, setCartItem] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      const stored: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      setCartItem(stored);
    };

    loadCart();

  useEffect(() => {
    const loadCart = () => {
      const stored: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]",
      );
      setCartItem(stored);
    };

    loadCart();

    window.addEventListener("cart-updated", loadCart);
    return () => window.removeEventListener("cart-updated", loadCart);
  }, []);

  const totalPrice = cartItem.reduce(
    (acc, item) => acc + item.priceNumber * item.qty,
    0,
  );
  const estimatedTax = +(totalPrice * 0.1).toFixed(2);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const inputs = document.querySelectorAll(
      "input[required], select[required",
    );

    let allFilled = true;

    inputs.forEach((input) => {
      if (!(input as HTMLInputElement).value.trim()) {
        allFilled = false;
        (input as HTMLInputElement).classList.add("border-red-500");
        (input as HTMLInputElement).classList.remove("border-gray-300");
      } else {
        (input as HTMLInputElement).classList.remove("border-red-500");
        (input as HTMLInputElement).classList.add("border-gray-300");
      }
    });

    if (!allFilled) {
      toast.error("Please fill all required fields!");
      return;
    }

    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
    toast.success("Order Placed Successfully");
    setTimeout(() => (window.location.href = "/"), 2000);
  };

  const removeFromCheckout = (id: string, weight: string) => {
    const updated = cartItem.filter(
      (item) => !(item.id === id && item.weight === weight),
    );
    setCartItem(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16 relative">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-4">
            <h5 className="text-2xl font-semibold mb-2">Contact</h5>

            <input
              type="email"
              className="border border-gray-300 rounded w-full p-2"
              placeholder="Email or Mobile Phone number"
              required
            />

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="newsCheck"
                className="w-4 h-4"
                required
              />
              <label htmlFor="newsCheck">Email me with news and offers</label>
            </div>

            <h5 className="text-2xl font-semibold mb-2">Delivery</h5>
            <div className="flex gap-4 mb-3">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  checked={deliveryOption === "Ship"}
                  onChange={() => setDeliveryOption("Ship")}
                  className="w-4 h-4"
                />
                Ship
              </label>

              <label className="flex items-center gap-1">
                <input
                  className="w-4 h-4"
                  type="radio"
                  name="deliveryoption"
                  checked={deliveryOption === "pickup"}
                  onChange={() => setDeliveryOption("pickup")}
                />
                Pickup in store
              </label>
            </div>

            {deliveryOption === "Ship" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <select
                  className="border border-gray-300 rounded p-2 md:col-span-2"
                  required
                >
                  <option>Vietnam</option>
                  <option>France</option>
                  <option>United States</option>
                </select>

                <input
                  className="border border-gray-300 rounded p-2"
                  placeholder="First Name (optional)"
                  type="text"
                />
                <input
                  className="border border-gray-300 rounded p-2"
                  placeholder="Last Name"
                  type="text"
                />
              </div>
            )}

            {deliveryOption === "pickup" && (
              <div className="bg-red-50 text-red-700 border border-red-200 rounded p-3 mb-3">
                <strong>No Stores Available with your item</strong>

                <div>
                  <Link href="#" className="underline">
                    Ship to address
                  </Link>{" "}
                  instead
                </div>
              </div>
            )}

            <input
              className="border border-gray-300 rounded w-full p-2 mb-3"
              placeholder="Address"
              required
              type="text"
            />

            <input
              className="border border-gray-300 rounded w-full p-2 mb-3"
              placeholder="Apartment, suite, etc"
              type="text"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <input
                className="border border-gray-300 rounded w-full p-2"
                placeholder="City"
                required
                type="text"
              />

              <input
                className="border border-gray-300 rounded w-full p-2"
                placeholder="Postal Code (optional)"
                type="text"
              />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <input id="saveInfo" className="w-4 h-4" type="checkbox" />

              <label htmlFor="saveInfo">
                Save this information for next time
              </label>
            </div>

            <h5 className="text-2xl font-semibold mb-2">Shipping Method</h5>

            <div className="flex justify-between items-center border border-green-400 bg-green-50 text-green-600 rounded p-3 mb-3">
              <span>Standard</span>
              <span>FREE</span>
            </div>

            <h4 className="text-2xl font-semibold mt-5 mb-2">Payment</h4>

            <p className="text-gray-500 mb-3">
              All transactions are secure and encrypted.
            </p>

            <div className="border border-gray-200 rounded p-3 mb-3 space-y-2">
              <input
                className="border border-gray-300 rounded w-full p-2"
                placeholder="Card number"
                type="text"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="Expiration date (MM / YY)"
                  required
                  type="text"
                />

                <input
                  className="border border-gray-300 rounded w-full p-2"
                  placeholder="Security Code"
                  required
                  type="text"
                />
              </div>

              <input
                type="text"
                className="border border-gray-300 rounded w-full p-2"
                placeholder="Name on card"
                required
              />

              <button
                type="submit"
                className="w-full py-2 bg-prim cursor-pointer text-white rounded hover:bg-black duration-300 transition-colors"
                onClick={handlePlaceOrder}
              >
                Pay Now
              </button>
            </div>
          </div>

          {/* Right Order Summary */}
          <div className="lg:col-span-5">
            <div className="border border-gray-200 p-4 rounded-sm space-y-3">
              <h5 className="text-xl font-semibold mb-3">🛒 Order Summary</h5>

              {cartItem.length === 0 ? (
                <p className="text-gray-500">Your Cart is empty!</p>
              ) : (
                cartItem.map((item) => (
                  <div key={`${item.id}-${item.weight}`}>
                    <div className="flex items-center mb-3 border-b pb-2 cursor-pointer p-1 rounded">
                      <Image
                        src={item.image1}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="object-cover rounded mr-3"
                      />

                      <div className="grow">
                        <h6 className="font-medium">{item.title}</h6>

                        <p className="text-sm text-gray-500">
                          Size: <strong>{item.weight}</strong> × {item.qty}
                        </p>

                        <p className="font-semibold">
                          Rs. {(item.priceNumber * item.qty).toFixed(2)}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCheckout(item.id, item.weight)}
                        className="text-red-500 text-sm font-semibold hover:text-red-700 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}

              <div className="flex justify-between pt-2">
                <span>Subtotal</span>
                <span>Rs. {totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>Rs. {estimatedTax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between pt-2 font-bold">
                <span>Total</span>
                <span>Rs. {(totalPrice + estimatedTax).toFixed(2)}</span>
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full mt-4 py-2 bg-prim hover:bg-black duration-300 cursor-pointer text-white rounded transition"
              >
                Place Order
              </button>

              <Link
                href="/UI-Components/Pages/Product"
                className="block text-center mt-2 py-2 border rounded transition cursor-pointer"
              >
                Back to Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
