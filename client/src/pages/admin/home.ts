// src/+types/home.ts
export namespace Route {
  export interface ComponentProps {
    loaderData: {
      posts: {
        _id: string;
        title: string;
        slug: { current: string };
        publishedAt: string;
      }[];
    };
  }
}
