// src/+types/home.ts
export namespace Route {
  export interface ComponentProps {
    loaderData: {
      categories: { 
        _id: string;
        name: string;
        slug: { current: string };
        publishedAt: string;
      }[];
    };
  }
}
