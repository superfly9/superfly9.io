import Link from "next/link";
import { format } from "date-fns";
import { Post } from "@/interfaces/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-lg border p-4 hover:border-gray-400 transition-colors">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      </Link>
      <div className="text-sm text-gray-500 mb-2">
        <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
        <span className="mx-2">•</span>
        <span>{post.author.name}</span>
      </div>
      {post.excerpt && <p className="text-gray-600 mb-4">{post.excerpt}</p>}
    </article>
  );
}
