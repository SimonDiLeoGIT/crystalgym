import { Link, useParams } from "react-router-dom"
import { lazy } from "react"
import { SanityDocument } from "@sanity/client"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import imageUrlBuilder from "@sanity/image-url"
import { client } from "../../services/sanity.service";

const ImageLoad = lazy(() => import("../ImageLoad/ImageLoad"))

export const ProductColors = ({ clotheColors: clotheColors }: { clotheColors: SanityDocument[] }) => {

  const { category } = useParams()
  const { id } = useParams()

  function getImageUrl(source: SanityImageSource) {
    const urlFor = imageUrlBuilder(client).image(source);
    return urlFor;
  }
  
  return (
    <section className="text-center">
      {
        clotheColors?.map(clothe => {
            return (
              <Link to={`/product/${category}/${clothe._id}`} >
                <article className="w-24 mx-4 inline-block">
                  <img
                    src={getImageUrl(clothe.images[0]).url()}
                    // imageBlurHash={clothe.hashcode}
                    alt={clothe.name}
                    className={`border-2 ${clothe._id === id ? "-border--color-black" : "-border--color-very-light-grey"}`}
                    loading="lazy"
                  />
                  {/* <ImageLoad
                    imageUrl={clothe.images[0]}
                    imageBlurHash={clothe.hashcode}
                    alt={clothe.name}
                    imageStyles={`border-2 ${clothe._id === id ? "-border--color-black" : "-border--color-very-light-grey"}`}
                    loading="lazy"
                  /> */}
                  <p className="-text--color-black font-semibold text-sm">
                    {clothe.colorName}
                  </p>
                </article>
              </Link>
            )
          }
        )
      }
    </section>
  )
}