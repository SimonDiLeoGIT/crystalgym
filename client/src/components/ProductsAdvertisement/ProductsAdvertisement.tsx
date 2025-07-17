import { Link } from "react-router-dom"
import './ProductsAdvertisement.css'
import { ProductImg } from "../ProductImg/ProductImg"
import { SanityDocument } from "@sanity/client"
import { useEffect, useState } from "react"
import { client } from "../../services/sanity.service"

interface Props {
  products: SanityDocument[]
  title: string
  link: string
}

const productsQuery = `*[_type == "clothe_color" && _id in $ids]{
  _id,
  name,
  stock,
  images,
  price,
  clothe->{
    _id,
    slug,
    category->{
      _id,
      name,
      slug
    }
  }
}`;

const ProductsAdvertisement: React.FC<Props> = ({ products, title, link }) => {

  const [clothes, setClothes] = useState<SanityDocument[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ids = products.map(p => p._ref);
    client.fetch<SanityDocument[]>(productsQuery, { ids }).then((data) => {
      setClothes(data);
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  }, [products]);

  if (loading) return <p>Loading...</p>;
  
  return (
    <section className="p-2 mb-4 lg:w-11/12 lg:m-auto grid place-content-center">
      <h1 className="font-bold text-xl p-2">{title}</h1>
      <section className="flex overflow-x-auto whitespace-nowrap scrollable-images">
        {clothes?.map(clothe => {
          return (
            <article className="min-w-72 mx-1">
              <ProductImg product={clothe} category={clothe.clothe.category.slug.current} />
            </article>
          )
        })}
        <Link to={link}>
          <div className="w-12 h-full rounded-lg overflow-hidden hover:opacity-60">
            <p className="-bg--color-light-grey-violet h-full -text--color-white text-4xl font-bold flex items-center justify-center">+</p>
          </div>
        </Link>
      </section>
    </section>
  )
}

export default ProductsAdvertisement;