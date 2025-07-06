export type Category = "daily" | "dev";
export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  PostPreview: string;
  ogImage?: {
    url: string;
  };
  category: Category
  content: string;
  preview: string;
};
