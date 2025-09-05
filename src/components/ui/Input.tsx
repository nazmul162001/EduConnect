import { cn } from "@/utils/cn";
import React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ className, label, error, id, ...props }: InputProps) {
  const input = (
    <input
      id={id}
      className={cn(
        "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-800 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100",
        error && "border-red-300 focus:border-red-400 focus:ring-red-200",
        className
      )}
      {...props}
    />
  );

  if (!label) return input;
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </span>
      {input}
      {error ? (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      ) : null}
    </label>
  );
}
