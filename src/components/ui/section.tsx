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
        pad === "hero" && "py-20 tablet:py-25 desktop:py-40",
        pad === "default" && "py-15 tablet:py-20 desktop:py-30",
        pad === "tight" && "py-10 tablet:py-14 desktop:py-20",
        className,
      )}
      {...props}
    >
      <div className="mx-auto w-full max-w-[1440px] px-5 tablet:px-10 desktop:px-20">{children}</div>
    </Tag>
  );
}
