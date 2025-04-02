"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

export function useSearch(allPosts: Post[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [searchTerm, setSearchTerm] = useState(() => searchParams.get("search") || "");
  const [filtered, setFiltered] = useState<Post[]>(allPosts);

  const updateSearchParam = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateSearchParam(value);
  };

  useEffect(() => {
    const keyword = searchParams.get("search")?.toLowerCase() || "";
    const result = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword)
    );
    setFiltered(result);
    setSearchTerm(keyword);
  }, [searchParams, allPosts]);

  return {
    searchTerm,
    filtered,
    handleChange,
  };
}
