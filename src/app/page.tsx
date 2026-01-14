"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans">
      <main className="flex w-full max-w-6xl flex-col items-center justify-center gap-4 px-8 py-12 md:flex-row md:gap-0 lg:gap-0">
        <div className="flex-shrink-0">
          <Image
            src="/mascot.webp"
            alt="Madcutter mascot"
            width={320}
            height={606}
            priority
            className="h-auto w-56 md:w-72 lg:w-80"
          />
        </div>

        <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
          <div className="text-3xl font-black tracking-tight md:text-4xl">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              MADCUTTER
            </span>
            <span className="text-zinc-300">.io</span>
          </div>

          <h1 className="max-w-lg text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
            Turn Podcasts Into Viral Clips
          </h1>

          <p className="max-w-md text-base leading-7 text-zinc-400 md:text-lg">
            AI-powered tool that transcribes your podcasts, finds the viral moments,
            and transforms them into 9:16 clips ready for TikTok, Reels & Shorts.
          </p>

          {status === "success" ? (
            <div className="flex flex-col gap-2 pt-2">
              <p className="text-lg font-medium text-green-400">
                Thank you for joining the waitlist!
              </p>
              <p className="text-zinc-400">
                We&apos;ll notify you when we launch.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 pt-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 h-12 rounded-full border border-zinc-700 bg-zinc-900 px-5 text-base text-white placeholder-zinc-500 outline-none transition-colors focus:border-zinc-500"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-6 text-base font-semibold text-white transition-all hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50"
              >
                {status === "loading" ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-sm text-red-400">{errorMessage}</p>
          )}
        </div>
      </main>
    </div>
  );
}
