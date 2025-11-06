import { Link } from "react-router-dom";
import { useUser } from "../../hook/useUser";
import { Variants } from "../../interfaces/VariantInterfaces";

interface Props {
  product: Variants
}

export const ProductImg: React.FC<Props> = ({ product }) => {

  // const { addToCart } = useCart()

  const { user } = useUser()


  // function addProduct(product: productType) {
  //   addToCart(product)
  // }

  return (
    <figure className="lg:h-full">
      <div className="relative overflow-hidden w-full h-72 sm:h-[400px] xl:h-[450px] 2xl:h-[480px] group">
        <Link to={`/product/${product.sku}`} className="h-full w-full block">
          {/* <ImageLoad
            imageUrl={image}
            imageBlurHash={product.image.hashcode}
            alt={product.name}
            imageStyles="h-full w-full object-cover duration-500 hover:scale-125"
            loading="lazy"
          /> */}
          <img src={import.meta.env.VITE_BACKEND_URL+product.image?.image} alt={product.name} className="h-full w-full object-cover duration-500 hover:scale-125" loading="lazy"/>
        </Link>
        {
          user?.id_role !== 1 &&
            <>
              {/* <button onClick={() => addProduct(product)} className="absolute top-2 right-2 -bg--color-white rounded-full p-2 duration-150 hover:bg-opacity-60 hover:scale-105 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-white"> <img src={add_to_bag_icon} alt="bag icon" className="w-4" />  </button> */}
              {/* <button className="absolute bottom-2 right-2 -bg--color-white rounded-full p-2 duration-150 hover:bg-opacity-60 hover:scale-105 hover:-bg--color-very-light-grey hover:shadow-md hover:-shadow--color-white"> <img src={like_icon} alt="like icon" className="w-4" /> </button> */}
            </>
        }
        <div className="absolute bg-gray-200 bottom-0 w-full opacity-0 group-hover:opacity-100">
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(32px,1fr))] gap-2 bg-white/30 p-4 w-full h-full">
            {
              product?.sizes.map(size => {
                return (
                  <li className="bg-white/90 rounded-md h-[32px] flex items-center justify-center group:">
                    {size.size}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      <figcaption className="p-4 text-sm md:text-base font-semibold text-gray-800">
        <h1 className="text-nowrap overflow-x-hidden text-ellipsis" title={product.name}>{product.name}</h1>
        <p className="text-gray-800/80 text-nowrap overflow-x-hidden text-ellipsis" title={product.category}>{product.category}</p>
        <p className="font-bold">${product.price}</p>
      </figcaption>
    </figure>
  )
}