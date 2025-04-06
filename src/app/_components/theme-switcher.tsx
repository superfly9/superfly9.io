"use client";

import { useEffect, useState } from "react";
import { ColorSchemePreference, modes, STORAGE_KEY } from "@/constants/theme";

const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>("system");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as ColorSchemePreference;
    setMode(saved ?? "system");
    window.updateDOM();
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
    window.updateDOM();
  }, [mode]);

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode);
    const next = modes[(index + 1) % modes.length];
    setMode(next);
  };

  return <button className="switch" onClick={handleModeSwitch} />;
};

export const ThemeSwitcher = () => <Switch />;
