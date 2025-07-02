import { Link, useParams } from "react-router-dom";
import imageUrlBuilder from "@sanity/image-url";
import { SanityDocument } from "@sanity/client";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableText } from "@portabletext/react";
import { client } from "../../services/sanity.service";
import { useEffect, useState } from "react";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export default function Post() {

  const { slug } = useParams();

  const [post, setPost] = useState<SanityDocument>();
  const [postImageUrl, setPostImageUrl] = useState<string | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    client.fetch<SanityDocument>(POST_QUERY, { slug }).then((data) => {
      setPost(data);
      setPostImageUrl(data.image ? urlFor(data.image)?.width(550)?.height(310)?.url() : null);
      setLoading(false);
    });
  }, [slug]);

  console.log(post)

  // useEffect(() => {
  //   client.fetch<SanityDocument>(POST_QUERY).then((data) => {
  //     setPost(data);
  //     setPostImageUrl(data.image ? urlFor(data.image)?.width(550)?.height(310)?.url() : null)
  //     setLoading(false);
  //   });
  // }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
      <Link to="/" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        <img
          src={postImageUrl}
          alt={post?.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post?.title}</h1>
      <div className="prose">
        <p>Published: {new Date(post?.publishedAt).toLocaleDateString()}</p>
        {Array.isArray(post?.body) && <PortableText value={post?.body} />}
      </div>
    </main>
  );
}