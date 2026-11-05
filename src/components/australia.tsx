"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";

export default function AustralianWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const param = searchParams.get("australia-is-upside-down");
  const [flip, setFlip] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (param === "false") {
      setFlip(false);
      return;
    }

    if (param === "true") {
      setFlip(true);
      return;
    }

    async function detectCountry() {
      try {
        const res = await fetch("https://ip.linus.my");
        const d = await res.json();

        if (d.country_code === "AU") {
          setFlip(true);

          const p = new URLSearchParams(searchParams.toString());

          p.set("australia-is-upside-down", "true");
          router.push(`${pathname}?${p.toString()}`, { scroll: false });
        }
      } catch (error) {
        console.log("Failed to fetch country:", error);
      }
    }

    detectCountry();
  }, [param]);

  return (
    <div
      className={
        flip
          ? "australia-upside-down min-h-full flex flex-col"
          : "min-h-full flex flex-col"
      }
    >
      {children}
    </div>
  );
}
