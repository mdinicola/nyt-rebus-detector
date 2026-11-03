import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer px-6 py-6 sm:px-8">
      <nav aria-label="Footer navigation" className="flex gap-5 text-sm">
        <Link href="/about">About</Link>
        <Link href="/privacy">Privacy</Link>
        <a
          href="https://github.com/mdinicola/nyt-rebus-detector"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </nav>
    </footer>
  );
}
