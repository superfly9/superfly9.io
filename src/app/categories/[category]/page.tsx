import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';



interface CategoryProps {
     params: { category: string }
}

function CategoryPage({ params }: CategoryProps) {
    const category = params.category;
    const posts = getPostsByCategory(category);
    return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4 capitalize">{category} Articles</h1>
          <ul>
            {posts.map((post) => (
              <li key={post.slug} className="mb-2">
                <Link href={`/posts/${post.slug}`} className="text-blue-500 hover:underline">
                  {post.title} - {post.date}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
}

interface Post {
    slug: string;
    title: string;
    date: string;
  }

function getPostsByCategory (category:string) : Post [] {
    const categoryPath = path.join(__dirname, '_posts', category);
    if (!fs.existsSync(categoryPath)) return [];

    return fs.readdirSync(categoryPath).filter(file=>file.endsWith('.md'))
        .map((file)=>{
            const filePath = path.join(categoryPath, file);
            const contents = fs.readFileSync(filePath,'utf-8');
            const { data} = matter(contents);
            return {
                slug : file.replace('.md',''),
                title:data.title || '',
                date: data.date || new Date()
            }
        })
}

export default CategoryPage