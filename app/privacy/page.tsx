import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy | NYT Crossword Rebus Detector",
  description: "Privacy information for the NYT Crossword Rebus Detector",
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
          <h2>Privacy &amp; Tracking</h2>
          <p>
            This site does not use cookies, advertising, or analytics. 
            We do not collect, track, or store any personal data from our visitors.
          </p>
        </section>

        <section>
          <h2>Browser Local Storage</h2>
          <p>
            We use your browser&apos;s local storage solely to remember your UI theme preference (light or dark mode). 
            This data is stored entirely on your own device, is not transmitted to our servers, 
            and cannot be used to track or identify you.
          </p>
        </section>

        <section>
          <h2>Hosting &amp; Server Logs</h2>
          <p>
            This site is hosted on Vercel.  As the hosting provider, Vercel automatically processes standard, 
            temporary infrastructure logs (such as IP addresses, browser types, and request timestamps) 
            for secure delivery, security, and maintenance purposes.  For more information, see the {" "}
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
      </article>
    </main>
  );
}
