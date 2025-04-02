import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import SearchFilter from "@/components/SearchFilter";
import { getAllPosts } from "@/lib/api";

const allPosts = getAllPosts();

export default function Index() {
  const heroPost = allPosts[0];

  return (
    <main>
      <Container>
        <Intro />
        <SearchFilter allPosts={allPosts} />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
      </Container>
    </main>
  );
}
