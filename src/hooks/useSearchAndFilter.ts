"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Post } from "@/interfaces/post";

export function useSearchAndFilter(posts: Post[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // URL에서 초기값 가져오기
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get("category") || "all");

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const categories = Array.from(new Set(posts.map((post) => post.category)));

  const updateURL = (params: { search?: string; category?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "all") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    const query = newParams.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateURL({ search: value || undefined });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    updateURL({ category: value });
  };

  useEffect(() => {
    let result = posts;

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(searchLower) ||
          post.excerpt.toLowerCase().includes(searchLower)
      );
    }

    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(result);
  }, [searchTerm, selectedCategory, posts]);

  return {
    searchTerm,
    selectedCategory,
    filteredPosts,
    handleSearch,
    handleCategoryChange,
    categories,
  };
} 