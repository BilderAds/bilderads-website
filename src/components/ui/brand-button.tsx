"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type AsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
    href?: never;
  };

type AsAnchor = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as: "a";
    href: string;
  };

type AsAnchorAuto = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    as?: never;
  };

type Props = AsButton | AsAnchor | AsAnchorAuto;

const sizeMap: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[12px]",
  md: "px-5 py-3 text-[13px]",
  lg: "px-6 py-3.5 text-[14px]",
};

const variantMap: Record<Variant, string> = {
  primary:
    "bg-[#3a0460] text-white shadow-[0_8px_24px_-10px_rgba(58,4,96,0.9)] " +
    "hover:bg-[#52097f] hover:shadow-[0_12px_28px_-10px_rgba(82,9,127,0.95)] " +
    "active:translate-y-[1px]",
  outline:
    "bg-transparent text-white ring-1 ring-white/70 hover:ring-white hover:bg-white/[0.06]",
  ghost: "bg-transparent text-white/85 hover:text-white",
};

export function BrandButton(props: Props) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const cls = cn(
    "inline-flex items-center justify-center rounded-[11px] font-medium tracking-tight",
    "transition-all duration-200 ease-out",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
    sizeMap[size],
    variantMap[variant],
    className,
  );

  if ("href" in rest && rest.href) {
    return (
      <a className={cls} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={cls}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
