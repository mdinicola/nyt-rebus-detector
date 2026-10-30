"use client";

import { useSyncExternalStore } from "react";

const THEME_STORAGE_KEY = "nyt-rebus-detector-theme";

function subscribeToTheme(callback: () => void) {
  function handleThemeChange() {
    document.documentElement.dataset.theme = getThemeSnapshot()
      ? "dark"
      : "light";
    callback();
  }

  window.addEventListener("storage", handleThemeChange);
  window.addEventListener("theme-change", handleThemeChange);

  return () => {
    window.removeEventListener("storage", handleThemeChange);
    window.removeEventListener("theme-change", handleThemeChange);
  };
}

function getThemeSnapshot() {
  return window.localStorage.getItem(THEME_STORAGE_KEY) === "dark";
}

function getServerThemeSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function toggleTheme() {
    const nextTheme = darkMode ? "light" : "dark";
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new Event("theme-change"));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
      aria-pressed={darkMode}
      className="theme-toggle fixed right-5 top-5 z-10 rounded-full border p-2.5 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 sm:right-8 sm:top-8"
    >
      <svg
        aria-hidden="true"
        className="sun-icon h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          strokeLinecap="round"
          d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
        />
      </svg>
      <svg
        aria-hidden="true"
        className="moon-icon h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.3 15.7A9 9 0 0 1 8.3 3.7a9 9 0 1 0 12 12Z"
        />
      </svg>
    </button>
  );
}
