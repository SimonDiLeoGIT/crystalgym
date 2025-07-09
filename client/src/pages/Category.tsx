import { useEffect, useState } from "react";
import clothe_data from '../assets/json/shop/clothes.json'
import { Products } from "../components/Products/Products";
import { useParams } from "react-router-dom";
import { ProductInterface } from "../interfaces/ProductInterfaces";
import { SanityDocument } from "@sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../services/sanity.service";


type product = ProductInterface;

const categories_QUERY = `*[_type == "clothe" && category->slug.current == $category]`;

const Category = () => {

  // const clothes = clothe_data.all

  const [clothes, setClothes] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesImageUrl, setCategoriesImageUrl] = useState<string | null>(null);

  const { sex } = useParams()
  const { category } = useParams()

  useEffect(() => {
      if (!category) return;
  
      client.fetch<SanityDocument[]>(categories_QUERY, { category }).then((data) => {
        setClothes(data);
        // setCategoriesImageUrl(data.image ? urlFor(data.image)?.width(550)?.height(310)?.url() : null);
        setLoading(false);
      });
    }, [category]);
  
    // useEffect(() => {
    //   client.fetch<SanityDocument>(categories_QUERY).then((data) => {
    //     setClothes(data);
    //     setCategoriesImageUrl(data.image ? urlFor(data.image)?.width(550)?.height(310)?.url() : null)
    //     setLoading(false);
    //   });
    // }, []);


  // function getClotheList(): product[] {
  //   const clotheList: product[] = [];
  //   clothes.map((clothe) => {
  //     if ((category === clothe.category) && (sex === clothe.sex)) {
  //       const c: product = clothe
  //       clotheList.push(c)
  //     }
  //   })
  //   return clotheList
  // }

  useEffect(() => {
    document.title = "CrystalGym | Category";
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="w-11/12 lg:w-10/12 m-auto">
      <header className="py-2">
        <h1 className="font-semibold text-xl md:font-bold md:text-3xl"> {category?.toUpperCase()} <span className="-text--color-grey text-sm md:text-lg"> {sex?.toUpperCase()} </span> </h1>
      </header>
      <Products products={clothes} category={category} />
    </section>
  )
}

export default Category;