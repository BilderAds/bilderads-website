"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  /** Direction the items travel. `left` = right-to-left. */
  direction?: "left" | "right";
  /** Seconds per full loop */
  speed?: number;
  /** Tailwind gap utility — applied between items, both in the row and between the duplicated rows. */
  gap?: string;
  className?: string;
  children: React.ReactNode;
};

/**
 * Infinite horizontal marquee. Duplicates children twice so the transform
 * can loop seamlessly. Uses Framer Motion's `animate` with linear easing.
 */
export function Marquee({
  direction = "left",
  speed = 30,
  gap = "gap-20",
  className,
  children,
}: MarqueeProps) {
  const xRange = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        className,
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        className={cn("flex w-max flex-nowrap items-center", gap)}
        animate={{ x: xRange }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <div className={cn("flex shrink-0 items-center", gap)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", gap)} aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
