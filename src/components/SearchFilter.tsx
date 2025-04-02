"use client";

import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { Input } from "@/components/ui/input";
import { Post } from "@/interfaces/post";
import { useSearch } from "@/hooks/useSearch";
import { PostPreview } from "@/app/_components/post-preview";
import EmptyMessage from "@/app/_components/EmptyMessage";

interface Props {
  allPosts: Post[];
}

export default function SearchFilter({ allPosts }: Props) {
  const { searchTerm, handleChange, filtered } = useSearch(allPosts);

  const isSearching = searchTerm.trim().length > 0;
  const hasSearchResults = filtered.length > 0;
  const hasPosts = allPosts.length > 0;
  const hasMoreThanOnePost = allPosts.length > 1;

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Input
          placeholder="검색어를 입력하세요"
          value={searchTerm}
          onChange={handleChange}
          className="w-full"
        />
      </div>

      {isSearching ? (
        // 검색 결과 표시
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              '{searchTerm}' 검색 결과 ({filtered.length}건)
            </h2>
          </div>
          {hasSearchResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filtered.map((post) => (
                <PostPreview
                  key={post.slug}
                  title={post.title}
                  coverImage={post.coverImage}
                  date={post.date}
                  author={post.author}
                  slug={post.slug}
                  excerpt={post.excerpt}
                />
              ))}
            </div>
          ) : (
            <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
          )}
        </>
      ) : (
        // 검색어가 없을 때 화면
        <>
          {hasPosts ? (
            <>
              <HeroPost {...allPosts[0]} />
              {hasMoreThanOnePost && <MoreStories posts={allPosts.slice(1)} />}
            </>
          ) : (
            <EmptyMessage>등록된 포스트가 없습니다.</EmptyMessage>
          )}
        </>
      )}
    </div>
  );
}
