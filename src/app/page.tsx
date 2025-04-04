import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import SearchFilter from "@/components/SearchFilter";
import { getAllPosts } from "@/lib/api";

const allPosts = getAllPosts();

export default function Index() {
  return (
    <main>
      <Container>
        <Intro />
        <SearchFilter allPosts={allPosts} />
      </Container>
    </main>
  );
}
