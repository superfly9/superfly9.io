import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Category } from "@/interfaces/post";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  category: Category;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  category,
  slug,
}: Props) {
  return (
    <Card>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <CardHeader>
        <h3 className="text-3xl mb-3 leading-snug">
          <Link href={`/posts/${category}/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
      </CardHeader>
      <CardContent>
        <div className="text-lg mb-4">
          <DateFormatter dateString={date} />
        </div>
        <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Avatar name={author.name} picture={author.picture} />
      </CardFooter>
    </Card>
  );
}
