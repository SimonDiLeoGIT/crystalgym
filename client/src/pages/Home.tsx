import { lazy, useEffect, useState } from "react"

import new_this_month from "../assets/json/home/advertisement/new-this-month.json"
import off_20 from "../assets/json/home/advertisement/20-off.json"
import { SanityDocument } from "@sanity/client"
import { client } from "../services/sanity.service"

const Carousel = lazy(() => import("../components/Carousel/Carousel"))
const ProductsAdvertisement = lazy(() => import("../components/ProductsAdvertisement/ProductsAdvertisement"))

const advertisements_QUERY = `*[_type == "advertisement" && slug.current == "new-this-month"][0]`;
const off_QUERY = `*[_type == "advertisement" && slug.current == "20-off"][0]`;

const Home = () => {

  const [advertisements, setAdvertisements] = useState<SanityDocument>();
  const [offAdvertisements, setOffAdvertisements] = useState<SanityDocument>();
  const [loading, setLoading] = useState(true);

  const preloadImage = (url: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'image';
    document.head.appendChild(link);
  };

  useEffect(() => {

    client.fetch<SanityDocument>(advertisements_QUERY).then((data) => {
      setAdvertisements(data);
      setLoading(false);
    });

  }, []);
  
  useEffect(() => {

    client.fetch<SanityDocument>(off_QUERY).then((data) => {
      setOffAdvertisements(data);
      setLoading(false);
    });

  }, []);


  useEffect(() => {
    document.title = "Home | CrystalGym";
    preloadImage('/images/home/advertisement/new-this-month/desktop/the-rock-compress.webp');
    preloadImage('/images/home/advertisement/new-this-month/new-this-month-1-compress.webp');
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={new_this_month.advertisement} mobileImages={new_this_month.mobileImages} desktopImages={new_this_month.desktopImages}
        />
      </header>
      <ProductsAdvertisement products={advertisements?.clothes} title={advertisements?.title} link={advertisements?.slug?.current} />
      <Carousel
        advertisement={off_20.advertisement} mobileImages={off_20.mobileImages} desktopImages={off_20.desktopImages}
      />
      <ProductsAdvertisement products={offAdvertisements?.clothes} title={offAdvertisements?.title} link={offAdvertisements?.slug?.current} />
    </main>
  )
}

export default Home;