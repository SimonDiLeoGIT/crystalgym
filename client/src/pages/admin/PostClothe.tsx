import { SanityDocument } from "@sanity/client";
import { client } from "../../services/sanity.service";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const POSTS_QUERY = `*[_type == "category"]`;

export default function IndexPage() {

  const [categories, setCategories] = useState<SanityDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.fetch<SanityDocument[]>(POSTS_QUERY).then((data) => {
      setCategories(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <p>Loading...</p>;
  console.log(categories)

  return (
    <main className="container mx-auto min-h-screen max-w-3xl p-8">
      <h1 className="text-4xl font-bold mb-8">Categories</h1>
      <ul className="flex flex-col gap-y-4">
        {categories.map((category) => (
          <li className="hover:underline" key={category._id}>
            <Link to={`/posts/${category?.slug?.current}`}>
              <h2 className="text-xl font-semibold">{category.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}