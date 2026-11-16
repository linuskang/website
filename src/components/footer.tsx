import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-10 pt-8 text-center text-xs text-foreground/60 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
      <span>made by linus</span>
      <span>·</span>
      <Link
        href="https://github.com/linuskang/website"
        target="_blank"
        rel="noopener noreferrer"
        className="no-icon hover:text-primary hover:underline transition-colors"
      >
        source code
      </Link>
      <span>·</span>
      <Link
        href="/rss.xml"
        className="no-icon hover:text-primary hover:underline transition-colors"
      >
        rss
      </Link>
    </footer>
  );
}
