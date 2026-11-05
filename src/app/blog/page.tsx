import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "linus's blog",
  description: "my posts i write when im bored",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-2xl mx-auto w-full px-6 py-16">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            linus&apos;s blog
          </h1>
          <p className="text-sm text-foreground/60 mt-1">
            my posts i write when im bored
          </p>
        </div>

        <nav className="flex items-center gap-4 text-md font-medium pt-1">
          <Link
            href="/"
            className="no-icon text-primary hover:underline transition-colors"
          >
            homepage
          </Link>
          <Link
            href="/rss.xml"
            className="no-icon text-primary hover:underline transition-colors"
          >
            rss
          </Link>
        </nav>
      </header>

      <main className="flex-1 mt-10">
        {posts.length === 0 ? (
          <p className="text-sm text-foreground/60 italic">no posts yet.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="no-icon"
              >
                <article
                  key={post.slug}
                  className="flex flex-col hover:bg-foreground/5 p-2 rounded-lg transition-colors sm:flex-row sm:items-start gap-2 sm:gap-6"
                >
                  <time
                    dateTime={post.date}
                    className="w-28 shrink-0 text-sm font-mono text-foreground/50 pt-0.5"
                  >
                    {post.formattedDate}
                  </time>

                  <div className="flex-1">
                    <h2 className="text-lg font-bold leading-snug">
                      {post.title}
                    </h2>

                    {post.description && (
                      <p className="text-sm text-foreground/75 italic mt-1">
                        {post.description}
                      </p>
                    )}

                    <div className="text-xs text-foreground/60 mt-2">
                      <span>{post.readingTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </main>

      <footer className="mt-20 pt-8 text-center text-xs text-foreground/60 flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
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
    </div>
  );
}
