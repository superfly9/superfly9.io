"use client";

import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { Input } from "@/components/ui/input";
import { Post } from "@/interfaces/post";
import { useState } from "react";

interface Props {
  allPosts: Post[];
}

export default function SearchFilter({ allPosts }: Props) {
  const [term, setTerm] = useState("");
  const [filtered, setFiltered] = useState<Post[]>(allPosts);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);

    const lower = value.toLowerCase();
    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(lower) ||
        post.content.toLowerCase().includes(lower)
    );
    setFiltered(filteredPosts);
  };

  return (
    <>
      <div className="mb-8">
        <Input
          placeholder="검색어를 입력하세요..."
          value={term}
          onChange={handleChange}
          className="w-full"
        />

        {filtered.length > 0 && (
          <>
            <HeroPost {...filtered[0]} />
            {filtered.length > 1 && <MoreStories posts={filtered.slice(1)} />}
          </>
        )}
      </div>
    </>
  );
}
