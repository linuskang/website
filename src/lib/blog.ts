import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const postsDirectory = path.join(process.cwd(), "public/blog");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  formattedDate: string;
  readingTime: string;
  contentHtml?: string;
}

function formatDate(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  const month = d
    .toLocaleDateString("en-US", { month: "short", timeZone: "UTC" })
    .toLowerCase();
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return `${month} ${day}, ${year}`;
}

function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export async function getPostBySlug(
  slug: string,
  options: { includeHtml?: boolean } = { includeHtml: true },
): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  let contentHtml: string | undefined;
  if (options.includeHtml) {
    contentHtml = await marked.parse(content, { gfm: true, breaks: true });
  }

  const rawDate = data.date ? String(data.date) : "";

  return {
    slug,
    title: data.title || slug,
    description: data.description || "",
    date: rawDate,
    formattedDate: formatDate(rawDate),
    readingTime: calculateReadingTime(content),
    contentHtml,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, { includeHtml: false })),
  );

  return (posts.filter(Boolean) as Post[]).sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}
