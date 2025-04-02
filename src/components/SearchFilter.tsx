"use client";

import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { Input } from "@/components/ui/input";
import { Post } from "@/interfaces/post";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useSearch } from "@/hooks/useSearch";

interface Props {
  allPosts: Post[];
}

export default function SearchFilter({ allPosts }: Props) {
  const { searchTerm, handleChange, filtered } = useSearch(allPosts);

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
