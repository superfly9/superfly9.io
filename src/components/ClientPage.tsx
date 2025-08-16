"use client";

import { Category, Post } from "@/interfaces/post";
import { PostCard } from "@/components/PostCard";
import { SearchFilter } from "@/components/SearchFilter";
import { useSearchAndFilter } from "@/hooks/useSearchAndFilter";

interface ClientPageProps {
  initialPosts: Post[];
  categories: Category[];
}
// 검색,필터링 및 UI 렌더링
export function ClientPage({ initialPosts, categories }: ClientPageProps) {
  const {
    searchTerm,
    selectedCategory,
    filteredPosts,
    handleSearch,
    handleCategoryChange,
  } = useSearchAndFilter(initialPosts);

  return (
    <main className="py-8">
      <h1 className="text-3xl font-bold mb-8">superfly9</h1>

      <SearchFilter
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        categories={categories}
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />

      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">검색 결과가 없습니다.</p>
      )}
    </main>
  );
}
