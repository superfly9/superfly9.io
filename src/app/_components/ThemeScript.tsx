import { STORAGE_KEY } from "@/constants/theme";

declare global {
  interface Window {
    __themeUpdateDOM?: () => void;
  }
}

function ThemeScript() {
  const script = `(function () {
    const [DARK, LIGHT] = ["dark", "light"];
    const storageKey = "${STORAGE_KEY}";

    function applyMode(mode) {
      const root = document.documentElement;
      const resolvedMode = mode === 'dark' ? 'dark' : 'light';

      // 현재 클래스와 다를 때만 변경
      if (!root.classList.contains(resolvedMode)) {
        if (resolvedMode === 'dark') {
          root.classList.replace('light', 'dark');
        } else {
          root.classList.replace('dark', 'light');
        }
      }
    }

    // 초기 실행 - 저장된 설정이 있고 기본값과 다를 때만 변경
    const savedMode = localStorage.getItem(storageKey);
    if (savedMode === 'dark') {
      applyMode('dark');
    }

    window.__themeUpdateDOM = () => {
      const mode = localStorage.getItem(storageKey) === 'dark' ? 'dark' : 'light';
      applyMode(mode);
    };
  })()`;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}

export default ThemeScript;
