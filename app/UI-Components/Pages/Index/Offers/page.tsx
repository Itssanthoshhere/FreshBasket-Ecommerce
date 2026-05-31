import Link from "next/link";

export default function Offers() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-2 items-center lg:px-8 xl:px-12 gap-2 py-12">
        <div className="banner-item text-white p-8 lg:p-10 rounded-xl">
          <p className="text-2xl font-medium">Deals of the week</p>

          <Link
            className="text-secondary font-medium text-md capitalize cursor-pointer"
            href="/"
          >
            View offers
          </Link>
        </div>

        <div className="banner-item text-white p-8 lg:p-10 rounded-xl">
          <p className="text-2xl font-medium">Biggest discounts</p>
          <Link
            className="text-secondary font-medium text-md capitalize cursor-pointer"
            href="/"
          >
            View offers
          </Link>
        </div>

        <div className="banner-item text-white p-8 lg:p-10 rounded-xl">
          <p className="text-2xl font-medium">Combos you can't miss</p>
          <Link
            className="text-secondary font-medium text-md capitalize cursor-pointer"
            href="/"
          >
            View offers
          </Link>
        </div>

        <div className="banner-item text-white p-8 lg:p-10 rounded-xl">
          <p className="text-2xl font-medium">The $19.00 corner</p>
          <Link
            className="text-secondary font-medium text-md capitalize cursor-pointer"
            href="/"
          >
            View offers
          </Link>
        </div>

        <div className="banner-item text-white p-8 lg:p-10 rounded-xl">
          <p className="text-2xl font-medium">Limited time offer</p>
          <Link
            className="text-secondary font-medium text-md capitalize cursor-pointer"
            href="/"
          >
            View offers
          </Link>
        </div>
      </div>
    </>
  );
}
