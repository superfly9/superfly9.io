import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostWithCategory() {
  const categories =  fs.readdirSync(postsDirectory).filter(category=>
    fs.statSync(join(postsDirectory, category)).isDirectory());

  let slugs = []
  for (const category of categories) {
    const categoryPath = join(postsDirectory, category);
    const files = fs.readdirSync(categoryPath).filter(file=>file.endsWith('.md'));
    slugs.push(...files.map((file)=>`${category}/${file}`))
  }
  return slugs;
}

export function getPostBySlug(slug: string) {
  const [category, realSlug] = slug.replace(/\.md$/, "").split("/")
  const fullPath = join(postsDirectory,category ,`${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostWithCategory(); // [ 'dev/dynamic-routing.md', 'dev/hello-world.md', 'dev/preview.md' ]
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter(((post): post is Post=>post !==null))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
