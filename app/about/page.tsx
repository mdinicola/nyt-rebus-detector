import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | NYT Crossword Rebus Detector",
  description: "Learn about crossword rebuses and why this detector exists.",
};

export default function AboutPage() {
  return (
    <main className="content-page page-shell flex-1 px-6 py-20 sm:py-24">
      <article className="mx-auto max-w-2xl">
        <Link className="back-link text-sm" href="/">
          ← Back
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          About
        </h1>

        <section>
          <h2>What is a rebus?</h2>
          <p>
            In a crossword, a rebus is a square that holds more than one letter,
            a symbol, or another unexpected answer. Rebuses add an extra twist to
            a puzzle and can be easy to miss when you are getting started.
          </p>
        </section>

        <section>
          <h2>Why does this site exist?</h2>
          <p>
            Sometimes you want a small hint without giving away the puzzle. This
            site answers one question only: whether a dated New York Times daily
            crossword contains a rebus. It does not reveal the answer or where
            the rebus appears.
          </p>
        </section>

        <section>
          <h2>What puzzles are supported?</h2>
          <p>
            The detector is intended for the New York Times daily crossword. The
            Mini and Midi crosswords are not currently supported.
          </p>
        </section>

        <section>
          <h2>Open source</h2>
          <p>
            The source code is available on GitHub for anyone who wants to see
            how the detector works or suggest an improvement.
          </p>
        </section>
      </article>
    </main>
  );
}
