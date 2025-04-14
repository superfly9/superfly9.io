import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { SearchFilter } from "@/components/SearchFilter";

describe("Search and Filter Integration", () => {
  let user: UserEvent;
  let handleSearch: ReturnType<typeof vi.fn>;
  let handleCategoryChange: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    user = userEvent.setup();
    handleSearch = vi.fn();
    handleCategoryChange = vi.fn();

    render(
      <SearchFilter
        categories={["dev", "daily"]}
        searchTerm=""
        selectedCategory="all"
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />
    );
  });

  it("검색창과 카테고리 선택 요소가 렌더링되어야 한다.", () => {
    expect(
      screen.getByPlaceholderText("검색어를 입력하세요...")
    ).toBeInTheDocument();
    expect(screen.getByText("전체")).toBeInTheDocument();
  });

  it("검색 입력 시 handleSearch가 호출되어야 한다.", async () => {
    const searchInput = screen.getByPlaceholderText("검색어를 입력하세요...");
    fireEvent.change(searchInput, { target: { value: "React" } }); // 한 번에 전체값 설정 위해서

    expect(handleSearch).toHaveBeenCalledWith("React");
  });
});
