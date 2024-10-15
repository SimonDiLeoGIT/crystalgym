import ImageLoad from "../../../components/ImageLoad/ImageLoad";
import { ClotheDataInterface } from "../../../interfaces/ClothesInterfaces";


type productType = ClotheDataInterface

interface Props {
  product: productType
}

export const ProductImg: React.FC<Props> = ({ product }) => {


  return (
    <figure className="">
      <div className="relative overflow-hidden w-full h-72 lg:h-96">
          <ImageLoad
            imageUrl={product.image.signed_image_url}
            imageBlurHash={product.image.hashcode}
            alt={product.name}
            imageStyles="h-full w-full object-cover duration-500 hover:scale-110"
            loading="lazy"
          />
      </div>
      <figcaption className="p-4 text-sm -text--color-black md:text-base">
        <h1 className="font-semibold text-nowrap overflow-x-hidden text-ellipsis md:font-bold ">{product.name}</h1>
        <p className="">{product.name}</p>
        <p className="">${product.price}</p>
      </figcaption>
    </figure>
  )
}