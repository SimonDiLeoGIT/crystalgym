import { Link } from "react-router-dom"
import { lazy, useEffect, useState } from "react"
import ProductService from "../../services/product.service"
import { Variants } from "../../interfaces/VariantInterfaces"


// const ImageLoad = lazy(() => import("../ImageLoad/ImageLoad"))

interface Props {
  productId: number
  currentSku: string
}

export const ProductVariants: React.FC<Props> = ({ productId, currentSku })  => {

  const [productColors, setProductColors] = useState<Variants[]>([]);

  useEffect(() => {
    const fetchProductVariants = async () => {
      try {
        const data = await ProductService.getVariantByProductId(productId.toString());
        if (data) {
          setProductColors(data);
        }
      } catch (e) {
        console.error('Error requesting product variants: ' + e);
      }
    };

    if (productId) {
      fetchProductVariants();
    }
  }, [productId])

  return (
    <section className="text-center">
      {
        productColors?.map(product => {
            return (
              <Link to={`/product/${product.sku}`} key={product.id}>
                <article className="w-24 mx-4 inline-block">
                  {/* <ImageLoad
                    imageUrl={product.images[0]}
                    imageBlurHash={product.hashcode}
                    alt={product.name}
                    imageStyles={`border-2 ${product.colorId.toString() === colorId ? "-border--color-black" : "-border--color-very-light-grey"}`}
                    loading="lazy"
                  /> */}
                  <img src={import.meta.env.VITE_BACKEND_URL+product.image?.image} alt={product.name} className={`border-2 ${product?.sku ===  currentSku ? "border-black" : "border-gray-200"}`} loading="lazy"/>
                  <p className="-text--color-black font-semibold text-sm">
                    {product?.color?.name}
                  </p>
                </article>
              </Link>
            )
        })
      }
    </section>
  )
}