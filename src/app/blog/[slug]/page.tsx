import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/blog";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeHtml: false });

  if (!post) {
    return {
      title: "post not found",
    };
  }

  return {
    title: `${post.title} - linus kang`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { includeHtml: true });

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between max-w-2xl mx-auto w-full px-6 py-16">
      <div>
        <nav className="mb-10 flex items-center justify-between text-sm">
          <Link
            href="/blog"
            className="no-icon text-primary hover:underline transition-colors flex items-center gap-1"
          >
            {"<"} go back
          </Link>
        </nav>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight">
            {post.title}
          </h1>

          {post.description && (
            <p className="text-base text-foreground/75 italic mt-3">
              {post.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/60 mt-4 font-mono">
            <time dateTime={post.date}>{post.formattedDate}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>
        </header>

        <hr className="border-foreground/15 mb-8" />

        <article
          className="prose prose-invert max-w-none text-foreground/90 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
        />
      </div>

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
