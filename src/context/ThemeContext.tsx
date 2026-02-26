"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { siteContent } from "@/lib/siteContent";

type Theme = "dark" | "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const colors = siteContent.theme[theme];

    // Helper to convert hex to RGB
    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    };

    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--background-rgb", hexToRgb(colors.background));
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--foreground-rgb", hexToRgb(colors.foreground));
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-rgb", hexToRgb(colors.primary));
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--secondary-rgb", hexToRgb(colors.secondary));
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-rgb", hexToRgb(colors.accent));

    // Update global CSS variables for backward compatibility and easier use
    root.style.setProperty("--bg-color", colors.background);
    root.style.setProperty("--text-color", colors.foreground);
    root.style.setProperty("--text-muted", `rgba(${hexToRgb(colors.foreground)}, 0.6)`);
    root.style.setProperty("--card-bg", `rgba(${hexToRgb(colors.foreground)}, 0.05)`);
    root.style.setProperty("--border-color", `rgba(${hexToRgb(colors.foreground)}, 0.1)`);
    root.style.setProperty("--glass-bg", `rgba(${hexToRgb(colors.background)}, 0.7)`);
    root.style.setProperty("--glass-border", `rgba(${hexToRgb(colors.foreground)}, 0.1)`);
    root.style.setProperty("--shadow-color", theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)");
    root.style.setProperty("--blob-opacity", theme === "dark" ? "0.2" : "0.1");
    root.style.setProperty("--hero-bg", colors.background);

    root.classList.remove("light", "dark");
    root.classList.add(theme);
    root.setAttribute("data-theme", theme);
    
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    (window as any).themeControls = {
      toggleTheme,
      theme
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
