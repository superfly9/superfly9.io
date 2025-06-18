"use client";

import { useEffect, useState } from "react";
import { ColorSchemePreference, STORAGE_KEY } from "@/constants/theme";

const DEFAULT_MODE = "light";
const ThemeSwitcher = () => {
  const [mode, setMode] = useState<ColorSchemePreference>(DEFAULT_MODE);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    setMode(saved === "dark" ? "dark" : "light");
    window.updateDOM();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    window.updateDOM();
  }, [mode]);

  const handleModeSwitch = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
  };

  return <button className="switch" onClick={handleModeSwitch} />;
};

export default ThemeSwitcher;
