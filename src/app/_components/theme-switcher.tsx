"use client";

import { useEffect, useState } from "react";
import { ColorSchemePreference, STORAGE_KEY } from "@/constants/theme";
import { PiSunFill, PiMoonFill } from "react-icons/pi";

const DEFAULT_MODE = "light";
const ThemeSwitcher = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(DEFAULT_MODE);

  // 초기 로딩 시 localStorage에서 테마 읽기
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setMode(saved === "dark" ? "dark" : "light");
  }, []);

  // 모드 변경 시 localStorage와 DOM 업데이트
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    window.__themeUpdateDOM?.();
  }, [mode]);

  const handleModeSwitch = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
  };

  return (
    <button className="toggle-switch" onClick={handleModeSwitch}>
      <span className={`slider ${mode === "dark" ? "dark" : "light"}`}>
        {mode === "dark" ? <PiMoonFill /> : <PiSunFill />}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
