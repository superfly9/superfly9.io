import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/api";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://seungchan.io";
  const posts = getAllPosts();

  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
  ];

  const postRoutes = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.category}/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...postRoutes];
}