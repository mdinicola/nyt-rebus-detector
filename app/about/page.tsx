import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | NYT Crossword Rebus Detector",
  description: "General information about the NYT Crossword Rebus Detector",
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
            A rebus is a crossword gimmick where a square can hold more than one letter, 
            a number, or a symbol.
          </p>
          <p>
            For example, let&apos;s say a clue is &quot;Source of morning caffeine&quot; and there are 5 squares.  
            The answer is &quot;COFFEE&quot; but that&apos;s too long and doesn&apos;t fit into 5 squares.
          </p>
          <p>
            The rebus square could contain &quot;CO&quot; while the rest of the 4 tiles 
            contain &quot;F&quot;, &quot;F&quot;, &quot;E&quot;, &quot;E&quot;.  
          </p>
          <p>
            Note that this is just an example for illustrative purposes.  A rebus square is not guaranteed
            to occur at the beginning of the answer and can contain any amount of characters.
          </p>
          <p>
            Do rebuses count for both the across and down clue that intersects it?{" "}
            Not always. It depends on the crossword.
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
          <h2>Why does this site exist?</h2>
          <p>
            I am not a fan of rebuses, often opting to skip crosswords where they
            are present.  Unfortunately, it&apos;s not always clear when a puzzle contains a rebus
            until you&apos;re actually doing it.  Looking it up online risks spoilers for other 
            parts of the puzzle.
          </p>
          <p>
            I built this site to give a straightforward answer: <br /> 
            <strong>Does the selected puzzle contain a rebus?</strong>{" "}Yes or No
          </p>
          <p>
            It doesn&apos;t say where or what the rebus is, just that at least one exists.
            From that, the player can decide whether to tackle it or skip it and try again the next day.
          </p>
        </section>
      </article>
    </main>
  );
}
