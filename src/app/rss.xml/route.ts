import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = "https://linuskang.au";
  const feedUrl = `${siteUrl}/rss.xml`;

  const escapeXml = (value: string) =>
    value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&apos;");

  const cdata = (value: string) =>
    `<![CDATA[${value.replaceAll("]]>", "]]]]><![CDATA[>")}]]>`;

  const feedItems = posts
    .map((post) => {
      const postUrl = `${siteUrl}/blog/${post.slug}`;

      return `
    <item>
      <title>${cdata(post.title)}</title>
      <description>${cdata(post.description)}</description>
      <link>${escapeXml(postUrl)}</link>
      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("");

  const lastBuildDate = new Date().toUTCString();

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss
  version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <channel>
    <title>linus's blog</title>
    <link>${siteUrl}/blog</link>
    <description>sharing my thoughts about everything</description>
    <language>en</language>

    <atom:link
      href="${feedUrl}"
      rel="self"
      type="application/rss+xml"
    />

    <lastBuildDate>${lastBuildDate}</lastBuildDate>

    ${feedItems}
  </channel>
</rss>`;

  return new Response(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
