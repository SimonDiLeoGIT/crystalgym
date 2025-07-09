import { lazy } from "react";
import { Link } from "react-router-dom";
import add_to_bag_icon from "../../assets/icons/nav icons/bag-plus-1122-svgrepo-com.svg"
import like_icon from "../../assets/icons/like-icon.svg"
import { useCart } from "../../hook/useCart";
import { CategoryDataInterface } from "../../interfaces/CategoryInterfaces";
import { ClotheDataInterface } from "../../interfaces/ClothesInterfaces";
import { useUser } from "../../hook/useUser";
import { SanityDocument } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "../../services/sanity.service";

const ImageLoad = lazy(() => import("../ImageLoad/ImageLoad"))

type productType = ClotheDataInterface

interface Props {
  product: SanityDocument
  category: string | undefined
}

export const ProductImg: React.FC<Props> = ({ product, category }) => {

  const { addToCart } = useCart()

  const { user } = useUser()


  // function addProduct(product: productType) {
  //   addToCart(product)
  // }

  function getImageUrl(source: SanityImageSource) {
    const urlFor = imageUrlBuilder(client).image(source);
    return urlFor;
  }

  return (
    <figure className="lg:h-full">
      <div className="relative overflow-hidden w-full h-72 sm:h-[400px] xl:h-[450px] 2xl:h-[360px]">
        <Link to={`/product/${category}/${product._id}`} className="h-full w-full block">
          {/* <ImageLoad
            imageUrl={getImageUrl(product.images[0]).url()}
            // imageBlurHash={product.image.hashcode}
            alt={product.name}
            imageStyles="h-full w-full object-cover duration-500 hover:scale-125"
            loading="lazy"
          /> */}
          <img
            src={getImageUrl(product.images[0]).url()}
            // imageBlurHash={product.image.hashcode}
            alt={product.name}
            className="h-full w-full object-cover duration-500 hover:scale-125"
            loading="lazy"
          />
        </Link>
        {
          user?.id_role !== 1 &&
            <>
              {/* <button onClick={() => addProduct(product)} className="absolute top-2 right-2 -bg--color-white rounded-full p-2 duration-150 hover:bg-opacity-60 hover:scale-105 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-white"> <img src={add_to_bag_icon} alt="bag icon" className="w-4" />  </button> */}
              <button className="absolute bottom-2 right-2 -bg--color-white rounded-full p-2 duration-150 hover:bg-opacity-60 hover:scale-105 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-white"> <img src={like_icon} alt="like icon" className="w-4" /> </button>
            </>
        }
        {product.new &&
          <span className="absolute bottom-2 left-2 -bg--color-white rounded-2xl px-2 py-1 text-sm font-bold -text--color-black">
            New
          </span>
        }
      </div>
      <figcaption className="p-4 text-sm -text--color-black md:text-base">
        <h1 className="font-semibold text-nowrap overflow-x-hidden text-ellipsis md:font-bold ">{product.name}</h1>
        {/* <p className="">{category.name}</p> */}
        <p className="">${product.price}</p>
      </figcaption>
    </figure>
  )
}