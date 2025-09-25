"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDark(saved === "dark");
    } else {
      const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDark(prefersDark);
    }
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      aria-pressed={dark}
      aria-label={dark ? "Activate light mode" : "Activate dark mode"}
      onClick={() => setDark(!dark)}
      className="px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      {dark ? "🌞 Light" : "🌙 Dark"}
    </button>
  );
}
