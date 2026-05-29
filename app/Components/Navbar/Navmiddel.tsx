"use client";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Navmiddel() {
  const [openMenu, setOpenMenu] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateWishlistCount = () => {
      const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(stored.length);
    };

    updateWishlistCount();
    window.addEventListener("wishlistUpdated", updateWishlistCount);

    return () => {
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalQty = cart.reduce(
        (sum: number, item: any) => sum + (item.qty || 1),
        0,
      );

      setCartCount(totalQty);
    };

    updateCartCount();
    window.addEventListener("cart-updated", updateCartCount);

    return () => window.removeEventListener("cart-updated", updateCartCount);
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <div className="flex relative justify-between items-center py-3 lg:space-y-0 space-y-3 px-2 lg:px-8 xl:px-12">
        <button
          onClick={() => setOpenMenu(true)}
          className="flex lg:hidden cursor-pointer"
        >
          <Icon icon="material-symbols-light:menu" width={30} height={30} />
        </button>

        <Link
          href="/"
          className="logo font-unbounded text-xl sm:text-2xl cursor-pointer"
        >
          Fresh<span className="text-prim">Basket</span>
        </Link>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="hidden lg:flex items-center w-full rounded-sm overflow-hidden max-w-xl bg-white border border-gray-200 relative"
        >
          <span className="ps-4 text-gray-500">
            <Icon icon="iconamoon:search-thin" width={20} height={20} />
          </span>

          <input
            type="text"
            placeholder="Search your groceries items..."
            className="flex-1 px-3 py-3 text-[16px] text-[#222] border-0 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            type="button"
            className="bg-prim text-white hover:bg-black transition-colors duration-300 px-6 py-3 font-semibold text-sm uppercase my-1
            me-1 rounded-sm cursor-pointer"
          >
            Search
          </button>
        </form>

        <ul className="flex space-x-3 lg:space-x-5 items-center justify-end">
          <li className="hidden sm:block">
            <button
              onClick={() => {
                setIsLogin(true);
                setShowModal(true);
              }}
              className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300"
            >
              <Icon icon="lucide:user" width={24} height={24} />
            </button>
          </li>

          <li className="hidden sm:block">
            <Link
              href="/UI-Components/Pages/Wishlist"
              className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300 relative"
            >
              <Icon icon="tabler:heart" width={24} height={24} />
              {wishlistCount > 0 && (
                <span className="bg-prim absolute -top-1 -right-1 font-unbounded w-5 h-5 flex justify-center items-center text-sm rounded-full text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </li>

          <li>
            <button
              onClick={() => window.dispatchEvent(new Event("cart-open"))}
              className="lg:bg-gray-light lg:w-12 lg:h-12 rounded-full flex justify-center items-center cursor-pointer lg:border border-gray-300 relative"
            >
              <Icon icon="lucide:shopping-bag" width={24} height={24} />
              <span className="bg-prim absolute -top-1 -right-1 font-unbounded w-5 h-5 flex justify-center items-center text-sm rounded-full text-white">
                {cartCount}
              </span>
            </button>
          </li>
        </ul>

        <Sidebar open={openMenu} onClose={() => setOpenMenu(false)} />

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop:blur-sm">
            <div className="relative bg-white border border-white/10 rounded-xl p-10 w-112.5 md:w-125 shadow-2xl animate-fadeIn">
              <button
                className="absolute top-5 right-5 text-4xl cursor-pointer hover:text-(--prim) transition-all"
                onClick={() => setShowModal(false)}
              >
                <Icon
                  icon="material-symbols-light:close"
                  width={24}
                  height={24}
                />
              </button>

              <h2 className="clash-font text-3xl font-semibold mb-8">
                {isLogin ? "Login to Your Account" : "Register Your Account"}
              </h2>

              <form className="flex flex-col gap-4">
                {isLogin && (
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full bg-gray-200 border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-(--prim)"
                    required
                  />
                )}

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-gray-200 border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-(--prim)"
                  required
                />

                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-gray-200 border border-white/10 px-4 py-3 rounded-xl focus:outline-none focus:border-(--prim)"
                  required
                />

                <button
                  type="submit"
                  className="w-full mt-3 bg-prim text-white py-3 rounded-xl font-semibold hover:bg-black transition-colors duration-300 cursor-pointer"
                >
                  {isLogin ? "Login" : "Register Now"}
                </button>
              </form>

              <p className="text-center text-sm mt-4 font-semibold cursor-pointer">
                {isLogin ? (
                  <>
                    Don't have an account?{" "}
                    <button
                      className="text-prim hover:underline cursor-pointer"
                      onClick={() => setIsLogin(false)}
                    >
                      Register Here
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      className="text-prim hover:underline cursor-pointer"
                      onClick={() => setIsLogin(true)}
                    >
                      Login Here
                    </button>
                  </>
                )}
              </p>

              <p className="text-center mt-6 pt-4 border-t border-white/20">
                By signing in or signing up to{" "}
                <Link
                  target="#"
                  href="https://santhosh-vs-portfolio.vercel.app/"
                  className="font-bold hover:underline"
                >
                  itssanthoshhere
                </Link>
                , you agree to our{" "}
                <Link href="/UI-Components/Pages/Contact" className="text-prim">
                  {" "}
                  Terms of Use
                </Link>{" "}
                and
                <Link href="/UI-Components/Pages/Contact" className="text-prim">
                  {" "}
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
