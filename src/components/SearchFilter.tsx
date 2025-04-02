"use client";

import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { Input } from "@/components/ui/input";
import { Post } from "@/interfaces/post";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Props {
  allPosts: Post[];
}

export default function SearchFilter({ allPosts }: Props) {
  const [filtered, setFiltered] = useState<Post[]>(allPosts);

  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    if (searchTerm) {
      setSearchTerm(searchTerm);
      const lower = searchTerm.toLowerCase();
      const filteredPosts = allPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(lower) ||
          post.content.toLowerCase().includes(lower)
      );
      setFiltered(filteredPosts);
    }
  }, [searchTerm]);

  return (
    <>
      <div className="mb-8">
        <Input
          placeholder="검색어를 입력하세요."
          value={searchTerm}
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
