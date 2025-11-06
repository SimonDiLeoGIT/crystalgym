import { useParams } from "react-router-dom"
import { lazy, useEffect, useState } from "react"
import { useCart } from "../hook/useCart"
// import ProductsAdvertisement from "../components/ProductsAdvertisement/ProductsAdvertisement"
import ProductService from "../services/product.service"
import { VariantWithProductInterface } from "../interfaces/VariantInterfaces"
import { ProductVariants } from "../components/ProductVariants/ProductVariants"

const ImageLoad = lazy(() => import("../components/ImageLoad/ImageLoad"))
const ArrowButtons = lazy(() => import("../components/ArrowButtons/ArrowButtons"))

// type product = Product

const Product = () => {

  const { sku } = useParams()
  const { addToCart } = useCart()

  const [product, setProduct] = useState<VariantWithProductInterface | null>()
  const [currentImage, changeCurrentImage] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);

  useEffect(() => {
    document.title = "Product | CrystalGym";
  })

  useEffect(() => {
    const getProduct = async () => {
      if (!sku) {
        return [false, 'SKU param does not exist']
      }
      try {
        const data = await ProductService.getVariantBySku(sku)
        if (data) {
          setProduct(data);
          return [true, 'Product fetched succesfully']
        }
      } catch (e) {
        return [false, 'Error requesting product: ' + e]
      }
    }
    
    getProduct()
    changeCurrentImage(0)
    setTranslateValue(0)
    window.scrollTo(0, 0)
  }, [sku]);

  return (
    <section className="max-w-screen lg:w-11/12 lg:m-auto">
      <section className="md:grid md:grid-cols-2 md:w-11/12 md:m-auto max-w-7xl md:my-10">
        <header className="overflow-x-hidden">
          <div className="relative">
            <section className="max-h-screen flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(${translateValue}%)` }}>
              {
                product?.images?.map((image) => {
                  return (
                    // <ImageLoad
                    //   imageUrl={image}
                    //   imageBlurHash={product?.hashcode}
                    //   alt={product?.name}
                    //   imageStyles="w-full object-cover"
                    //   loading="eager"
                    // />
                    <img 
                      key={image.image}
                      src={import.meta.env.VITE_BACKEND_URL+image.image} 
                      alt={product?.name} 
                      className="w-full object-cover"
                    />
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
                {product?.name}
              </strong>
              {/* {product?.new && <span className="ml-4 -bg--color-very-light-grey rounded-2xl px-2 py-1 text-xs font-extrabold -text--color-black"> NEW </span>} */}
            </h1>
            <p className="my-1">
              {product?.product?.category?.name}
            </p>
            <p className="font-bold">
              ${product?.product?.price}
            </p>
          </div>
          {
            product && sku &&
            <ProductVariants productId={product?.product?.id} currentSku={sku} />
          }
          {
            product &&
            <button
              // onClick={() => addToCart(product)}
              className="block m-auto -bg--color-black -text--color-light-grey-violet font-bold p-4 my-4 rounded-full w-11/12 max-w-md max-h-20 duration-150 hover:opacity-85">
              ADD TO BAG
            </button>
          }
        </section>
      </section>
      {/* <ProductsAdvertisement products={all_clothes.all.filter(item => product?.accessory ? (item.accessory) : (item.category === product?.category && item.sex === product.sex && item.id !== product.id)).slice(0, 6)} title="Similar Products" link={`/${product?.accessory ? "accessories/all" : product?.sex + "/" + product?.category}`} /> */}
    </section >
  )
}

export default Product;