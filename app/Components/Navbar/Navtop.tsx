import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Navtop() {
  return (
    <>
      <div className="bg-gray-100 hidden lg:flex justify-between items-center py-3 px-2 lg:px-8 xl:px-12">
        <span>Delivery on next day from 10:00 am to 11:00 pm</span>

        <ul>
          <li className="flex items-center gap-2">
            <Icon icon="famicons:call-outline" width={24} height={24} />

            <span>
              Need Help? :{" "}
              <Link
                className="ml-1 font-semibold"
                href="UI-Components/Pages/Contact"
              >
                +91 999 888 7778
              </Link>
            </span>
          </li>
        </ul>

        <ul className="flex gap-3">
          <li>
            <Link href="/UI-Components/Pages/Contact">Contact</Link>
          </li>
          <li>
            <Link href="/UI-Components/Pages/Blogs">Blogs</Link>
          </li>
          <li>
            <Link href="/UI-Components/Pages/Contact">Order tracking</Link>
          </li>
        </ul>
      </div>

      <div className="bg-gray-100 py-3 px-2 overflow-hidden lg:hidden">
        <div className="marquee inline-flex items-center gap-10 whitespace-nowrap min-w-full">
          <span>Delivery on next day from 10:00 am to 11:00 pm</span>

          <ul>
            <li className="flex items-center gap-2">
              <Icon icon="famicons:call-outline" width={24} height={24} />

              <span>
                Need Help? :{" "}
                <Link
                  className="ml-1 font-semibold"
                  href="UI-Components/Pages/Contact"
                >
                  +91 999 888 7778
                </Link>
              </span>
            </li>
          </ul>

          <ul className="flex gap-3">
            <li>
              <Link href="/UI-Components/Pages/Contact">Contact</Link>
            </li>
            <li>
              <Link href="/UI-Components/Pages/Blogs">Blogs</Link>
            </li>
            <li>
              <Link href="/UI-Components/Pages/Contact">Order tracking</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
