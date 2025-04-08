"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  searchTerm: string;
  selectedCategory: string;
  categories: string[];
  onSearch: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export function SearchFilter({
  searchTerm,
  selectedCategory,
  categories,
  onSearch,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className="flex flex-col gap-4 mb-8 sm:flex-row">
      <Input
        type="search"
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1"
      />
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="카테고리 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">전체</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category === "daily" ? "일상" : "개발"}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
