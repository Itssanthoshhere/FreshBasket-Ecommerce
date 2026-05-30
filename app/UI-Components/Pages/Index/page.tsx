import Hero from "./Hero/page";
import Category from "./Category/page";
import TopSelling from "./TopSelling/page";

import products from "@/app/JsonData/TopSelling.json";

export default function Index() {
  return (
    <>
      <Hero />
      <Category />
      <TopSelling product={products} />
    </>
  );
}
