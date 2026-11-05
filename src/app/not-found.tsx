"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center min-h-screen items-center">
      <h1 className="font-semibold text-2xl">404 not found :(</h1>
      <p className="font-semibold">
        You might be lost. Return to the <Link href="/">Homepage</Link>.
      </p>
    </div>
  );
}
