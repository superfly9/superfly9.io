"use client";

import { Category } from "@/interfaces/post";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterBarProps {
  categories: Category[];
  selectedCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
}

export default function FilterBar({
  categories,
  selectedCategory,
  onCategoryChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="w-full sm:w-1/2">
        <Select
          value={selectedCategory || ""}
          onValueChange={(value: string) =>
            onCategoryChange((value as Category) || null)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="카테고리 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">모든 카테고리</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category === "daily" ? "일상" : "개발"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedCategory && (
        <Button
          variant="outline"
          onClick={() => {
            onCategoryChange(null);
          }}
          className="w-full sm:w-auto"
        >
          필터 초기화
        </Button>
      )}
    </div>
  );
}
