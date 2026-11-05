"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [greeting, setGreeting] = useState("Hello there,");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning,");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon,");
    } else {
      setGreeting("Good evening,");
    }
  }, []);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen transition-opacity duration-1000 ease-out ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="max-w-xl">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/profile.png"
            alt="Profile picture"
            width={65}
            height={65}
            className="rounded-full inline-block mb-4"
          />

          <h1 className="text-4xl font-semibold">{greeting} I'm Linus.</h1>
        </div>

        <div className="mt-4 text-center flex flex-col gap-4">
          <p className="text-md">
            Student from Australia currently learning full-stack dev. I know how
            to build in Python, JS, TS, and currently learning C# for dotnet.
          </p>

          <p className="text-md">
            I&apos;m currently a PR reviewer at{" "}
            <Link href="https://is-a.dev" target="_blank">
              is-a.dev
            </Link>{" "}
            and{" "}
            <Link href="https://is-a.bot" target="_blank">
              is-a.bot
            </Link>
            , and also maintain a few notable{" "}
            <Link href="/projects" target="_blank">
              projects
            </Link>
            , like{" "}
            <Link href="https://github.com/linuskang/upstream" target="_blank">
              Upstream
            </Link>
            , a really cool logging platform I&apos;m building that&apos;s
            specifically tailored for Next.js!
          </p>

          <p className="text-md">
            Oh, I also have a{" "}
            <Link href="/blog" target="_blank">
              blog
            </Link>{" "}
            that you can check out. I write about pretty much anything tech.
          </p>

          <p className="text-md">
            Want to get in touch? You can reach me preferrably via. email at{" "}
            <Link href="mailto:m@linuskang.au" target="_blank">
              m@linuskang.au
            </Link>
            .
          </p>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <Link
            href="https://github.com/linuskang"
            target="_blank"
            aria-label="GitHub"
            className="no-icon text-foreground/75 hover:text-white transition-colors"
          >
            <span className="social-icon" />
          </Link>

          <Link
            href="https://gitlab.com/linuskang"
            target="_blank"
            aria-label="Gitlab"
            className="no-icon text-foreground/75 hover:text-white transition-colors"
          >
            <span className="social-icon" />
          </Link>

          <Link
            href="https://codeberg.org/linuskang"
            target="_blank"
            aria-label="Codeberg"
            className="no-icon text-foreground/75 hover:text-white transition-colors"
          >
            <span className="social-icon" />
          </Link>

          <Link
            href="https://discord.com/users/"
            area-label="Discord"
            className="no-icon text-foreground/75 hover:text-white transition-colors"
          >
            <span className="social-icon" />
          </Link>

          <Link
            href="mailto:m@linuskang.au"
            aria-label="Email"
            className="no-icon text-foreground/75 hover:text-white transition-colors"
          >
            <span className="social-icon" />
          </Link>

          <Link
            href="https://youtube.com/@linus-kang"
            target="_blank"
            aria-label="YouTube"
            className="no-icon text-foreground/75 hover:text-white transition-colors"
          >
            <span className="social-icon" />
          </Link>

          <Link
            href="https://twitch.tv/linuskang"
            aria-label="Twitch"
            className="no-icon text-foreground/75 hover:text-white transition-colors"
          >
            <span className="social-icon" />
          </Link>
        </div>

        <div>{/*Github contribution graph*/}</div>

        <div className="flex flex-col items-center mt-6">
          <Image src="/not-by-ai.svg" alt="Not by AI" height={80} width={90} />
        </div>
      </div>
    </div>
  );
}
