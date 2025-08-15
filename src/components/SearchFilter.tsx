"use client";

import { Input } from "@/components/ui/input";
import { Category } from "@/interfaces/post";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  searchTerm: string;
  selectedCategory: string;
  categories: Category[];
  onSearch: (value: string) => void;
  onCategoryChange: (value: Category) => void;
}

const styles = {
  container: "flex flex-col gap-4 mb-8 sm:flex-row border border-gray-300 dark:border-gray-600 rounded-[10px] p-4",
  input: "flex-1 rounded-[10px] border border-gray-300 dark:border-gray-600",
  buttonContainer: "flex gap-2",
  buttonBase: "px-4 py-2 rounded-[10px] border font-medium transition-all",
  buttonActive: "bg-blue-500 text-white border-blue-500",
  buttonInactive: "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-slate-700"
};

export function SearchFilter({
  searchTerm,
  selectedCategory,
  categories,
  onSearch,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className={styles.container}>
      <Input
        type="search"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className={styles.input}
      />
      <div className={styles.buttonContainer}>
        <button
          onClick={() => onCategoryChange("all" as Category)}
          className={cn(
            styles.buttonBase,
            selectedCategory === "all" ? styles.buttonActive : styles.buttonInactive
          )}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              styles.buttonBase,
              selectedCategory === category ? styles.buttonActive : styles.buttonInactive
            )}
          >
            {category === "daily" ? "일상" : "개발"}
          </button>
        ))}
      </div>
    </div>
  );
}
