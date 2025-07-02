import { SanityDocument } from "@sanity/client";
import { client } from "../../services/sanity.service";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;

export default function IndexPage() {

  const [posts, setPosts] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch<SanityDocument[]>(POSTS_QUERY).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(posts)

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Posts</h1>
      <ul className="flex flex-col gap-y-4">
        {posts.map((post) => (
          <li className="hover:underline" key={post._id}>
            <Link to={`/posts/${post?.slug?.current}`}>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}