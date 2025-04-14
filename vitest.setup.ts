import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock next/router
vi.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: {},
      asPath: "",
      push: vi.fn(),
      replace: vi.fn(),
    };
  },
}));
