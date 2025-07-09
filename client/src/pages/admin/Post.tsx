import { Link, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "@portabletext/react";
import { client } from "../../services/sanity.service";
import { useEffect, useState } from "react";

// const { projectId, dataset } = client.config();
// const urlFor = (source: SanityImageSource) =>
//   projectId && dataset
//     ? imageUrlBuilder({ projectId, dataset }).image(source)
//     : null;

const categories_QUERY = `*[_type == "clothe" && category->slug.current == $slug]`;

export default function post() {

  const { slug } = useParams();

  const [clothes, setClothes] = useState<SanityDocument[]>();
  // const [categoriesImageUrl, setCategoriesImageUrl] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    client.fetch<SanityDocument[]>(categories_QUERY, { slug }).then((data) => {
      setClothes(data);
      // setCategoriesImageUrl(data.image ? urlFor(data.image)?.width(550)?.height(310)?.url() : null);
      setLoading(false);
    });
  }, [slug]);

  // useEffect(() => {
  //   client.fetch<SanityDocument>(categories_QUERY).then((data) => {
  //     setClothes(data);
  //     setCategoriesImageUrl(data.image ? urlFor(data.image)?.width(550)?.height(310)?.url() : null)
  //     setLoading(false);
  //   });
  // }, []);

  function getImageUrl(source: SanityImageSource) {
    const urlFor = imageUrlBuilder(client).image(source);
    return urlFor;
  }

  if (loading) return <p>Loading...</p>;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link to="/" className="hover:underline">
        ← Back to categoriess
      </Link>
      {/* {categoriesImageUrl && (
        <img
          src={categoriesImageUrl}
          alt={categories?.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )} */}
      { clothes?.map(clothe => {
        return (
          <div key={clothe._id}>
            <h1 className="text-4xl font-bold mb-8">{clothe?.name}</h1>
            <div className="prose">
              {
                clothe?.images.map(image => {
                  return (
                    <img
                      src={getImageUrl(image)?.url()}
                      alt={clothe?.name}
                      className=""
                      width="200"
                      // height="310"
                    />
                  )
                })
              }
              <p>Price: {clothe?.price}</p>
              {/* {Array.isArray(categories?.body) && <PortableText value={categories?.body} />} */}
            </div>
          </div>
        )
      })
        }
      {/* <h1 className="text-4xl font-bold mb-8">{categories?.name}</h1>
      <div className="prose">
        <p>Published: {new Date(categories?.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(categories?.body) && <PortableText value={categories?.body} />}
      </div> */}
    </main>
  );
}