import { STORAGE_KEY } from "@/constants/theme";

declare global {
  interface Window {
    updateDOM: () => void;
  }
}

function ThemeScript() {
  const script = `(function () {
    const [SYSTEM, DARK, LIGHT] = ["system", "dark", "light"];
    const storageKey = "${STORAGE_KEY}";
    const media = matchMedia("(prefers-color-scheme: dark)");

    function resolveMode(mode) {
      return mode === SYSTEM ? (media.matches ? DARK : LIGHT) : mode;
    }

    function applyMode(mode) {
      const resolved = resolveMode(mode);
      const root = document.documentElement;

      root.classList.remove(
        "mode-dark",
        "mode-light",
        "mode-system",
        "dark",
        "light"
      );

      // 커스텀 스타일 클래스
      root.classList.add("mode-" + mode); //  mode-dark
      if (mode === SYSTEM) root.classList.add("mode-system");

      // Tailwind 유틸리티 트리거 클래스
      root.classList.add(resolved); // dark or light
      if (resolved === DARK) root.classList.add("dark");
      else root.classList.remove("dark");
    }

    // 초기 실행
    const mode = localStorage.getItem(storageKey) ?? SYSTEM;
    applyMode(mode);

    // 외부에서 접근 가능하도록
    window.updateDOM = () => {
      const mode = localStorage.getItem(storageKey) ?? SYSTEM;
      applyMode(mode);
    };

    // 시스템 모드 변경 감지
    media.addEventListener("change", window.updateDOM);
  })()`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default ThemeScript;
