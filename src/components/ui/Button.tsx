"use client";
import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const buttonStyles = cva("btn select-none active:scale-[0.98]", {
  variants: {
    variant: {
      primary: "btn-primary",
      outline: "btn-outline",
      ghost: "",
    },
    size: {
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base px-5 py-3",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & { asChild?: boolean };

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles({ variant, size }), className)}
      {...props}
    />
  );
}
