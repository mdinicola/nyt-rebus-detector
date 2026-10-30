"use client";

import { type SubmitEvent, useState } from "react";

type Result = boolean | null;

function localDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function Home() {
  const [date, setDate] = useState(localDateString);
  const [result, setResult] = useState<Result>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <main className="page-shell flex flex-1 items-center justify-center px-6 py-16 transition-colors duration-300">
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
