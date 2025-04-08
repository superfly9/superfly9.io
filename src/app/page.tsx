import { getAllPosts } from "@/lib/api";
import { ClientPage } from "@/components/ClientPage";

export default function Home() {
  const posts = getAllPosts();
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return <ClientPage initialPosts={posts} categories={categories} />;
}
