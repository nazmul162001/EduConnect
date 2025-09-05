"use client";
import { Input } from "@/components/ui/Input";
import { searchColleges } from "@/lib/data";
import Link from "next/link";
import { useMemo, useState } from "react";

export function SearchBar() {
  const [q, setQ] = useState("");
  const results = useMemo(() => searchColleges(q).slice(0, 5), [q]);

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-slate-600/60 rounded-3xl p-4 sm:p-6 shadow-2xl">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] items-center">
        <Input
          placeholder="Search a college name..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="bg-slate-700/60 border-slate-500/60 text-white placeholder:text-slate-300 focus:border-brand-400 focus:ring-brand-400/30 text-base sm:text-lg py-4 px-5 rounded-2xl shadow-inner"
        />
        <span className="text-sm sm:text-base text-slate-200 sm:justify-self-end text-center sm:text-right font-medium">
          {results.length} result{results.length !== 1 ? "s" : ""}
        </span>
      </div>
      {q && (
        <div className="mt-4 divide-y divide-slate-600/50">
          {results.map((c) => (
            <Link
              key={c.id}
              href={`/colleges/${c.id}`}
              className="flex items-center justify-between py-3 sm:py-4 hover:bg-slate-700/40 rounded-xl px-3 sm:px-4 transition-all duration-200 hover:scale-[1.02]"
            >
              <span className="text-sm sm:text-base font-medium text-white truncate pr-3">
                {c.name}
              </span>
              <span className="text-xs sm:text-sm text-slate-300 flex-shrink-0 bg-slate-600/50 px-2 py-1 rounded-full">
                ⭐ {c.rating.toFixed(1)}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
