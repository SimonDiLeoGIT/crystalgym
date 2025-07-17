import ProductsAdvertisement from "../components/ProductsAdvertisement/ProductsAdvertisement"
import male_tshirts from "../assets/json/men/advertisement/gym-clothes.json"
import hoodies from "../assets/json/men/advertisement/hoodies.json"

import Carousel from "../components/Carousel/Carousel"
import { useEffect, useState } from "react"
import { SanityDocument } from "@sanity/client"
import { client } from "../services/sanity.service"

const male_tshirts_QUERY = `*[_type == "advertisement" && slug.current == "male-t-shirts"][0]`;
const all_hoodies_QUERY = `*[_type == "advertisement" && slug.current == "male-hoodies"][0]`;


const Men = () => {

    const [maleTShirts, setMaleTShirts] = useState<SanityDocument | null>(null);
    const [allHoddies, setAllHoodies] = useState<SanityDocument | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
  
      client.fetch<SanityDocument>(male_tshirts_QUERY).then((data) => {
        setMaleTShirts(data);
      });

      client.fetch<SanityDocument>(all_hoodies_QUERY).then((data) => {
        setAllHoodies(data);
      });
  
    }, []);
    
    useEffect(() => {
  
      if (!maleTShirts || !allHoddies) return;
  
      setLoading(false);
  
    }, [maleTShirts, allHoddies]);

  useEffect(() => {
    document.title = "Men | CrystalGym";
  })

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={male_tshirts.advertisement} mobileImages={male_tshirts.mobileImages} desktopImages={male_tshirts.desktopImages}
        />
      </header>
      {maleTShirts && 
        <ProductsAdvertisement products={maleTShirts?.clothes} title={maleTShirts?.title} link="/male/t-shirts" />
      }
      <Carousel
        advertisement={hoodies.advertisement} mobileImages={hoodies.mobileImages} desktopImages={hoodies.desktopImages}
      />
      {allHoddies &&
        <ProductsAdvertisement products={allHoddies?.clothes} title={allHoddies?.title} link="/male/hoodies" />
      }
    </main>
  )
}

export default Men;