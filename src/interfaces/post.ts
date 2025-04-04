import { type Author } from "./author";

export type Category = "daily" | "dev";
export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  author: Author;
  excerpt: string;
  ogImage: {
    url: string;
  };
  category: Category
  content: string;
  preview?: boolean;
};
