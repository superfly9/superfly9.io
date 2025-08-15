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

    function applyMode(mode) {
      const root = document.documentElement;
      const resolvedMode = mode === 'dark' ? 'dark' : 'light';

      root.classList.remove("mode-dark", "mode-light", "dark", "light");
      root.classList.add(resolvedMode);
    }

    // 초기 실행
    const savedMode = localStorage.getItem(storageKey);
    const initialMode = savedMode === 'dark' ? 'dark' : 'light';
    applyMode(initialMode);

    // 외부에서 접근 가능하도록
    window.updateDOM = () => {
      const mode = localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
      applyMode(mode);
    };
  })()`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default ThemeScript;
