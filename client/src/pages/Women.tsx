import ProductsAdvertisement from "../components/ProductsAdvertisement/ProductsAdvertisement"
import gym_clothes from "../assets/json/women/advertisement/gym-clothes.json"
import tops from "../assets/json/women/advertisement/tops.json"

import Carousel from "../components/Carousel/Carousel"
import { useEffect, useState } from "react"
import { SanityDocument } from "@sanity/client"
import { client } from "../services/sanity.service"

const gym_clothes_QUERY = `*[_type == "advertisement" && slug.current == "female-hoodies"][0]`;
const training_tops_QUERY = `*[_type == "advertisement" && slug.current == "tops"][0]`;


const Women = () => {

  useEffect(() => {
    document.title = "Women | CrystalGym";
  })

    const [gymClothes, setGymClothes] = useState<SanityDocument | null>(null);
    const [trainingTops, setTrainingTops] = useState<SanityDocument | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
  
      client.fetch<SanityDocument>(gym_clothes_QUERY).then((data) => {
        setGymClothes(data);
      });

      client.fetch<SanityDocument>(training_tops_QUERY).then((data) => {
        setTrainingTops(data);
      });
  
    }, []);
    
    useEffect(() => {
  
      if (!gymClothes || !trainingTops) return;
  
      setLoading(false);
  
    }, [gymClothes, trainingTops]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="max-w-screen overflow-x-hidden font-roboto lg:w-11/12 lg:m-auto xl:9/12">
      <header>
        <Carousel
          advertisement={gym_clothes.advertisement} mobileImages={gym_clothes.mobileImages} desktopImages={gym_clothes.desktopImages}
        />
      </header>
      {
        gymClothes && (
          <ProductsAdvertisement products={gymClothes?.clothes} title={gymClothes?.title} link="/female/hoodies" />
        )
      }
      <Carousel
        advertisement={tops.advertisement} mobileImages={tops.mobileImages} desktopImages={tops.desktopImages}
      />
      {
        trainingTops && (
          <ProductsAdvertisement products={trainingTops?.clothes} title={trainingTops?.title} link="/female/tops" />
        )
      }
    </main>
  )
}

export default Women;