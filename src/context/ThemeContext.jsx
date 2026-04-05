import { createContext, useEffect, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useMediaQuery } from "../hooks/useMediaQuery";

export const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const prefersDark = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = useLocalStorage("portfolio-theme", null);

  const resolvedTheme = theme ?? (prefersDark ? "dark" : "light");

  useEffect(() => {
    const root = document.documentElement;
    if (resolvedTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [resolvedTheme]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const value = useMemo(
    () => ({
      theme: resolvedTheme,
      toggleTheme,
      isDark: resolvedTheme === "dark",
    }),
    [resolvedTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
