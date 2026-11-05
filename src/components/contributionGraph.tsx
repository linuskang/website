"use client";

import { useEffect, useState } from "react";
import { ActivityCalendar, Activity } from "react-activity-calendar";

interface GitHubApiResponse {
  total: {
    [year: string]: number;
    lastYear: number;
  };
  contributions: Activity[];
}

const customTheme = {
  dark: [
    "#2a273f", // Level 0
    "#4e4070", // Level 1
    "#6f58a0", // Level 2
    "#9f94f5", // Level 3
    "#c4a7e7", // Level 4
  ],
};

const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function getCachedContributions(username: string) {
  try {
    const cached = localStorage.getItem(`github-contributions-${username}`);
    if (!cached) return null;

    const { data, total, timestamp } = JSON.parse(cached);
    if (data && typeof timestamp === "number") {
      return {
        data,
        total: total ?? null,
        isFresh: Date.now() - timestamp < CACHE_TTL_MS,
      };
    }
  } catch {
    // Ignore localStorage errors (private mode, quota, etc.)
  }
  return null;
}

function setCachedContributions(
  username: string,
  data: Activity[],
  total: number | null,
) {
  try {
    localStorage.setItem(
      `github-contributions-${username}`,
      JSON.stringify({ data, total, timestamp: Date.now() }),
    );
  } catch {
    // Ignore localStorage errors
  }
}

export default function ContributionGraph({
  username = "linuskang",
}: {
  username?: string;
}) {
  const [contributions, setContributions] = useState<{
    data: Activity[];
    total: number | null;
  } | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function loadContributions() {
      // Yield to avoid synchronous setState warning
      await Promise.resolve();

      const cached = getCachedContributions(username);
      if (cached) {
        if (!isCancelled) {
          setContributions({ data: cached.data, total: cached.total });
        }
        if (cached.isFresh) return;
      }

      try {
        const res = await fetch(
          `https://github-contributions-api.linus.my/v4/${username}?y=last`,
        );

        if (!res.ok) {
          throw new Error(`API returned status ${res.status}`);
        }

        const json: GitHubApiResponse = await res.json();
        if (!isCancelled) {
          const data = json.contributions || [];
          const total = json.total?.lastYear ?? null;

          setContributions({ data, total });
          setCachedContributions(username, data, total);
        }
      } catch (err) {
        console.error("Failed to fetch contribution data:", err);
      }
    }

    loadContributions();

    return () => {
      isCancelled = true;
    };
  }, [username]);

  if (!contributions || contributions.data.length === 0) {
    return null;
  }

  return (
    <div className="w-full my-6 flex flex-col">
      <ActivityCalendar
        data={contributions.data}
        theme={customTheme}
        colorScheme="dark"
        blockSize={11}
        blockMargin={4}
        blockRadius={2}
        fontSize={11}
        showColorLegend={false}
        showTotalCount={false}
        showMonthLabels={false}
      />

      {contributions.total !== null && (
        <div className="flex justify-end mt-1.5 text-xs text-foreground/60">
          <span>
            {contributions.total.toLocaleString()} contributions in the last year
          </span>
        </div>
      )}
    </div>
  );
}
