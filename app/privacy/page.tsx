import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | NYT Crossword Rebus Detector",
  description: "Privacy information for the NYT Crossword Rebus Detector.",
};

export default function PrivacyPage() {
  return (
    <main className="content-page page-shell flex-1 px-6 py-20 sm:py-24">
      <article className="mx-auto max-w-2xl">
        <Link className="back-link text-sm" href="/">
          ← Back
        </Link>
        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
          Privacy
        </h1>

        <section>
          <h2>No cookies</h2>
          <p>
            This site does not use cookies. It does not include advertising or
            analytics cookies, and the site itself does not gather personal
            information about you.
          </p>
        </section>

        <section>
          <h2>Your theme preference</h2>
          <p>
            If you choose light or dark mode, that preference is saved in your
            browser&apos;s local storage. It remains entirely on your device and is
            not sent to the site or shared with anyone.
          </p>
        </section>

        <section>
          <h2>Hosting</h2>
          <p>
            This site is hosted on Vercel. As the hosting provider, Vercel may
            process technical information such as IP addresses to securely
            operate and deliver the site. You can learn more in the{" "}
            <a
              href="https://vercel.com/legal/privacy-notice"
              target="_blank"
              rel="noreferrer"
            >
              Vercel Privacy Notice
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            If the site&apos;s privacy practices change, this page will be updated
            to explain what changed.
          </p>
        </section>
      </article>
    </main>
  );
}
