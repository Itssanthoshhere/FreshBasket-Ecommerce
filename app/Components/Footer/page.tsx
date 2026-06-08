import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="px-2 lg:px-8 xl:px-12 py-8 sm:py-16 grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-10 bg-[url(/freshbite-footer-bg.webp)] bg-gray-light bg-contain bg-no-repeat bg-center">
        <div className="footer-item">
          <Link
            href="/"
            className="logo font-unbounded text-xl sm:text-2xl cursor-pointer"
          >
            Fresh
            <span className="text-prim">Basket</span>
          </Link>

          <p className="mt-4 mb-2 text-gray-500 text-md">
            Lorem Ipsum simply dummy text of the printing typese
          </p>

          <span className="text-gray-500">
            © 2026 by{" "}
            <Link
              className="text-black"
              href="https://santhosh-vs-portfolio.vercel.app/"
            >
              Itssanthoshhere
            </Link>
          </span>
        </div>

        <div className="footer-item">
          <h4 className="text-2xl font-medium mb-4">My account</h4>
          <ul className="space-y-3">
            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                My account
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                My cart
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/UI-Components/Pages/Wishlist"
              >
                Wishlist
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Order history
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Return policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-item">
          <h4 className="text-2xl font-medium mb-4">Our legal</h4>
          <ul className="space-y-3">
            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Terms &amp; condition
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Accessibility
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Track order
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Store location
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-item">
          <h4 className="text-2xl font-medium mb-4">Information</h4>
          <ul className="space-y-3">
            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Our story
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Keep in touch
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Privacy policy
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Refund policy
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/UI-Components/Pages/Faqs"
              >
                Faq's
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-item">
          <h4 className="text-2xl font-medium mb-4">Contact us</h4>
          <ul className="space-y-3">
            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/UI-Components/Pages/Contact"
              >
                +1234 567 890
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                info@domain.com
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                401 Broadway, 24th Floor,
              </Link>
            </li>

            <li>
              <Link
                className="text-lg font-normal hover:text-prim duration-300 transition-colors"
                href="/"
              >
                Orchard View, Vadodara, India
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
