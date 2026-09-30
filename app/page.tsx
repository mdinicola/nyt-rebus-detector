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
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
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
            className="min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-neutral-900 shadow-sm outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-200"
          />
          <button
            type="submit"
            disabled={!date || loading}
            className="rounded-lg bg-neutral-900 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
          {error && <p className="text-sm text-neutral-600">{error}</p>}
        </div>
      </section>
    </main>
  );
}
