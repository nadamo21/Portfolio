import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 disabled:opacity-60 disabled:pointer-events-none";

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

const variants: Record<Variant, string> = {
  primary: "bg-ink text-bg shadow-card hover:bg-accent-strong dark:hover:bg-accent",
  secondary: "border border-line-strong bg-surface text-ink hover:border-accent hover:text-accent-strong",
  ghost: "text-ink hover:text-accent-strong",
  whatsapp: "bg-[#168a4a] text-white shadow-card hover:bg-[#12733d]",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${sizes[size]} ${variants[variant]} ${extra}`;
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
  external?: boolean;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  magnetic = false,
  external = false,
  children,
  ...props
}: ButtonLinkProps) {
  const link = (
    <Link
      className={buttonClass(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </Link>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
