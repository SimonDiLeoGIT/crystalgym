import { useParams } from "react-router-dom"
import { lazy, useEffect, useState } from "react"
import { useCart } from "../hook/useCart"
import ProductsAdvertisement from "../components/ProductsAdvertisement/ProductsAdvertisement"
import all_clothes from "../assets/json/shop/clothes.json"
import { ProductColors } from "../components/ProductColors/ProductColors"
import { ProductInterface } from "../interfaces/ProductInterfaces"
import { client } from "../services/sanity.service"
import { SanityDocument } from "@sanity/client"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import imageUrlBuilder from "@sanity/image-url"

const ImageLoad = lazy(() => import("../components/ImageLoad/ImageLoad"))
const ArrowButtons = lazy(() => import("../components/ArrowButtons/ArrowButtons"))

type product = ProductInterface

const categories_QUERY = `*[_type == "clothe" && _id == $id][0]`;

const Product = () => {

  // const { id } = useParams()
  // const { colorId } = useParams()
  // const { addToCart } = useCart()

  const { id } = useParams()
  const { category } = useParams()
  
  const [clothe, setClothe] = useState<SanityDocument>();
  const [loading, setLoading] = useState(true);
  // const [categoriesImageUrl, setCategoriesImageUrl] = useState<string | null>(null);
  
  useEffect(() => {
      if (!id) return;
      client.fetch<SanityDocument>(categories_QUERY, { id }).then((data) => {
        setClothe(data);
        // setCategoriesImageUrl(data.image ? urlFor(data.image)?.width(550)?.height(310)?.url() : null);
        setLoading(false);
      });
    }, [id]);

  const [product, setProduct] = useState<product | null>()
  const [currentImage, changeCurrentImage] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    document.title = "Product | CrystalGym";
  })

  // useEffect(() => {
  //   const productAssigned = all_clothes.all.find(clothe => clothe.id.toString() === id && clothe.colorId.toString() === colorId)
  //   setProduct(productAssigned)
  //   changeCurrentImage(0)
  //   setTranslateValue(0)
  //   window.scrollTo(0, 0)
  // }, [id, colorId])

  function getImageUrl(source: SanityImageSource) {
      const urlFor = imageUrlBuilder(client).image(source);
      return urlFor;
    }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <section className="max-w-screen lg:w-11/12 lg:m-auto">
      <section className="md:grid md:grid-cols-2 md:w-11/12 md:m-auto max-w-7xl md:my-10">
        <header className="overflow-x-hidden">
          <div className="relative">
            <section className="max-h-screen flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${translateValue}%)` }}>
              {
                clothe?.images?.map((image: SanityImageSource) => {
                  return (
                    // <ImageLoad
                    //   imageUrl={image}
                    //   imageBlurHash={clothe?.hashcode}
                    //   alt={clothe?.name}
                    //   imageStyles="w-full object-cover"
                    //   loading="eager"
                    // />
                    <img src={getImageUrl(image).url()} alt={clothe?.name} className="w-full object-cover" loading="eager" />
                  )
                })
              }
            </section>
            <ArrowButtons currentImage={currentImage} changeCurrentImage={changeCurrentImage} setTranslateValue={setTranslateValue} carousel={false} />
          </div>
        </header>
        <section className="md:grid">
          <div className="p-6 -text--color-black md:grid place-content-center">
            <h1 className="text-xl">
              <strong>
                {clothe?.name}
              </strong>
              {/* {clothe?.new && <span className="ml-4 -bg--color-very-light-grey rounded-2xl px-2 py-1 text-xs font-extrabold -text--color-black"> NEW </span>} */}
            </h1>
            <p className="my-1">
              {category}
            </p>
            <p className="font-bold">
              ${clothe?.price}
            </p>
          </div>
          <ProductColors />
          {/* {
            product &&
            <button
              onClick={() => addToCart(product)}
              className="block m-auto -bg--color-black -text--color-light-grey-violet font-bold p-4 my-4 rounded-full w-11/12 max-w-md max-h-20 duration-150 hover:opacity-85">
              ADD TO BAG
            </button>
          } */}
        </section>
      </section>
      {/* <ProductsAdvertisement products={all_clothes.all.filter(item => clothe?.accessory ? (item.accessory) : (item.category === clothe?.category && item.sex === product.sex && item.id !== product.id)).slice(0, 6)} title="Similar Products" link={`/${clothe?.accessory ? "accessories/all" : clothe?.sex + "/" + clothe?.category}`} /> */}
    </section >
  )
}

export default Product;