import { STORAGE_KEY } from "@/constants/theme";

declare global {
  interface Window {
    updateDOM: () => void;
  }
}

function ThemeScript() {
  const script = `(function () {
    const [DARK, LIGHT] = ["dark", "light"];
    const storageKey = "${STORAGE_KEY}";
    const mediaQuery = matchMedia("(prefers-color-scheme: light)");

    function resolveMode(mode) {
      return localStorage.getItem(storageKey) === 'dark'? 'dark' :'light';
    }

    function applyMode(mode) {
      const resolved = resolveMode(mode);
      const root = document.documentElement;

      root.classList.remove(
        "mode-dark",
        "mode-light",
        "dark",
        "light"
      );
      // 커스텀 스타일 클래스
      root.classList.add("mode-" + mode); //  mode-dark
      // Tailwind 유틸리티 트리거 클래스
      root.classList.add(resolved); // dark or light
    }

    // 초기 실행
    const mode = localStorage.getItem(storageKey);
    applyMode(mode);

    // 외부에서 접근 가능하도록
    window.updateDOM = () => {
      const mode = localStorage.getItem(storageKey) === 'dark'? 'dark' :'light';
      applyMode(mode);
    };

    // 시스템 모드 변경 감지
    mediaQuery.addEventListener("change", window.updateDOM);
  })()`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default ThemeScript;
