import { useParams } from "react-router-dom"
import { lazy, useEffect, useState } from "react"
import { ProductColors } from "../components/ProductColors/ProductColors"
import { client } from "../services/sanity.service"
import { SanityDocument } from "@sanity/client"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import imageUrlBuilder from "@sanity/image-url"

const ArrowButtons = lazy(() => import("../components/ArrowButtons/ArrowButtons"))


const CLOTHE_COLOR_QUERY = `*[_type == "clothe_color" && _id == $id][0]`;

const ALL_CLOTHE_COLORS_QUERY = `*[_type == "clothe_color" && clothe._ref == $clotheId]`

const Product = () => {

  const { id } = useParams()
  const { category } = useParams()
  
  const [clothe, setClothe] = useState<SanityDocument>();
  const [clotheColors, setClotheColors] = useState<SanityDocument[]>();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!id) return;
    client.fetch<SanityDocument>(CLOTHE_COLOR_QUERY, { id }).then((data) => {
      setClothe(data);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (!clothe) return;
    const clotheId = clothe.clothe._ref;
    client.fetch<SanityDocument[]>(ALL_CLOTHE_COLORS_QUERY, { id, clotheId }).then((data) => {
      setClotheColors(data);
    });
  }, [clothe]);

  const [currentImage, changeCurrentImage] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    document.title = "Product | CrystalGym";
  })

  useEffect(() => {
    changeCurrentImage(0)
    setTranslateValue(0)
    window.scrollTo(0, 0)
  }, [id])

  function getImageUrl(source: SanityImageSource) {
      const urlFor = imageUrlBuilder(client).image(source);
      return urlFor;
    }

  if (loading) {
    return <div>Loading...</div>
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
          {
            clotheColors &&
            <ProductColors clotheColors={clotheColors} />
          }
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