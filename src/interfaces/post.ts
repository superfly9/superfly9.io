import { Author } from "./author";

export type Category = "daily" | "dev";
export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  PostPreview: string;
  ogImage : {
    url: string;
  };
  author: Author
  category: Category
  content: string;
  preview: string;
};
