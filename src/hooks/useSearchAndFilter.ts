"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Post, Category } from "@/interfaces/post";

export function useSearchAndFilter(allPosts: Post[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Search state
  const [searchTerm, setSearchTerm] = useState(() => searchParams.get("search") || "");
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    () => (searchParams.get("category") as Category) || null
  );
  
  // Combined filtered results
  const [filtered, setFiltered] = useState<Post[]>(allPosts);

  // Get unique authors and categories for filter options
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));

  // Update URL parameters
  const updateParams = (type: "search" | "author" | "category", value: string | null) => {
    const params = new URLSearchParams(searchParams);
    
    if (value) {
      params.set(type, value);
    } else {
      params.delete(type);
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname);
  };

  // Search handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    updateParams("search", value || null);
  };


  const handleCategoryChange = (category: Category | null) => {
    setSelectedCategory(category);
    updateParams("category", category);
  };

  useEffect(() => {
    const search = searchParams.get("search")?.toLowerCase() || "";
    const category = searchParams.get("category") as Category | null;
    
    setSearchTerm(search);
    setSelectedCategory(category);

    let result = allPosts;

    if (search) {
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(search) ||
          post.content.toLowerCase().includes(search)
      );
    }

    if (category) {
      result = result.filter((post) => post.category === category);
    }

    setFiltered(result);
  }, [searchParams, allPosts]);

  return {
    // url관련
    searchTerm,
    handleSearchChange,
    
    // filter 관련
    selectedCategory,
    categories,
    handleCategoryChange,
    
    // 검색 결과
    filtered,
  };
} 