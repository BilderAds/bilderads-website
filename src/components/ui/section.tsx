import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
  /** Vertical padding preset */
  pad?: "default" | "hero" | "tight";
};

/**
 * Generic page section wrapper. Keeps spacing + horizontal gutters consistent
 * across the marketing site.
 */
export function Section({
  as: Tag = "section",
  pad = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative w-full",
        pad === "hero" && "py-24 md:py-32",
        pad === "default" && "py-24 md:py-28",
        pad === "tight" && "py-16 md:py-20",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">{children}</div>
    </Tag>
  );
}
