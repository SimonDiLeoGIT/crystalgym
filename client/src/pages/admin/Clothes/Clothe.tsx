import ImageLoad from "../../../components/ImageLoad/ImageLoad";
import { Image } from "../../../interfaces/ClothesInterfaces";


type productType = Image

interface Props {
  product: productType
}

export const ProductImg: React.FC<Props> = ({ product }) => {


  return (
    <figure className="">
      <div className="relative overflow-hidden w-full h-72 lg:h-96">
          <ImageLoad
            imageUrl={product.signed_image_url}
            imageBlurHash={product.hashcode}
            alt={product.name}
            imageStyles="h-full w-full object-cover duration-500 hover:scale-110"
            loading="lazy"
          />
      </div>
    </figure>
  )
}