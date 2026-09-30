"use client";

import { type SubmitEvent, useState, useSyncExternalStore } from "react";

type Result = boolean | null;
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

function localDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Home() {
  const darkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const [date, setDate] = useState(localDateString);
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleTheme() {
    const nextTheme = darkMode ? "light" : "dark";
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      nextTheme,
    );
    document.documentElement.dataset.theme = nextTheme;
    window.dispatchEvent(new Event("theme-change"));
  }

  async function checkCrossword(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`/api/rebus?date=${encodeURIComponent(date)}`);
      const data: { hasRebus?: boolean; error?: string } = await response.json();

      if (!response.ok || typeof data.hasRebus !== "boolean") {
        throw new Error(data.error ?? "Unable to check this crossword.");
      }

      setResult(data.hasRebus);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to check this crossword.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-shell relative flex min-h-screen items-center justify-center px-6 py-16 transition-colors duration-300">
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        aria-pressed={darkMode}
        className="theme-toggle absolute right-5 top-5 rounded-full border p-2.5 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 sm:right-8 sm:top-8"
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

      <section className="w-full max-w-2xl text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
          Does the NYT crossword contain a rebus?
        </h1>

        <form
          className="mx-auto mt-10 flex w-full max-w-sm items-stretch gap-3"
          onSubmit={checkCrossword}
        >
          <label className="sr-only" htmlFor="crossword-date">
            Crossword date
          </label>
          <input
            id="crossword-date"
            type="date"
            required
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="date-input min-w-0 flex-1 rounded-lg border px-4 py-3 shadow-sm outline-none transition focus:border-neutral-500 focus:ring-2"
          />
          <button
            type="submit"
            disabled={!date || loading}
            className="submit-button rounded-lg px-6 py-3 font-medium shadow-sm transition focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Checking…" : "Go"}
          </button>
        </form>

        <div className="mt-10 min-h-12" aria-live="polite">
          {result !== null && (
            <p
              className={`text-4xl font-semibold ${
                result ? "text-red-600" : "text-green-600"
              }`}
            >
              {result ? "Yes" : "No"}
            </p>
          )}
          {error && (
            <p className="error-message text-sm">{error}</p>
          )}
        </div>
      </section>
    </main>
  );
}
