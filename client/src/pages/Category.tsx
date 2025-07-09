import { useEffect, useState } from "react";
import { Products } from "../components/Products/Products";
import { useParams } from "react-router-dom";
import { SanityDocument } from "@sanity/client";
import { client } from "../services/sanity.service";


const categories_QUERY = `*[_type == "clothe_color" && clothe->category->slug.current == $category]`;

const Category = () => {

  const [clothes, setClothes] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  const { sex } = useParams()
  const { category } = useParams()

  useEffect(() => {
      if (!category) return;
  
      client.fetch<SanityDocument[]>(categories_QUERY, { category }).then((data) => {
        setClothes(data);
        setLoading(false);
      });
    }, [category]);
  
  useEffect(() => {
    document.title = "CrystalGym | Category";
  })

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
console.log(clothes)
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