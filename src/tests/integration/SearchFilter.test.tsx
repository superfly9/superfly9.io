import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { SearchFilter } from "@/components/SearchFilter";

vi.mock("@/components/ui/select", () => ({
  Select: ({
    children,
    onValueChange,
  }: {
    children: React.ReactNode;
    onValueChange: (value: string) => void;
  }) => (
    <div>
      <button onClick={() => onValueChange("dev")}>{children}</button>
    </div>
  ),

  SelectTrigger: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),

  SelectValue: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),

  SelectContent: ({ children }: { children: React.ReactNode }) => (
    <div role="listbox">{children}</div>
  ),

  SelectItem: ({
    children,
    value,
  }: {
    children: React.ReactNode;
    value: string;
  }) => (
    <div role="option" data-value={value}>
      {children}
    </div>
  ),
}));

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

  it("카테고리 선택 시 handleCategoryChange가 호출되어야 한다.", async () => {
    // 1. Select 트리거 클릭
    const selectTrigger = screen.getByRole("listbox"); // <div role="listbox"></div>
    screen.debug(selectTrigger);
    await user.click(selectTrigger);

    // 2. listbox 안의 옵션 선택
    const listbox = screen.getByRole("listbox");
    const devOption = within(listbox).getByText("개발"); // <div role="option" data-value="dev">개발</div>
    const dailyOption = within(listbox).getByText("일상"); // <div role="option" data-value="daily">일상</div>

    expect(devOption).toBeInTheDocument();
    expect(dailyOption).toBeInTheDocument();

    await user.click(devOption);

    // 3. 핸들러 확인
    expect(handleCategoryChange).toHaveBeenCalledWith("dev");
  });
});
