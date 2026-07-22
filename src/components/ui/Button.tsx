import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary";

interface BaseProps {
  variant?: Variant;
  className?: string;
}

interface ButtonAsButton
  extends BaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  href?: undefined;
}

interface ButtonAsLink extends BaseProps {
  href: string;
  children?: ReactNode;
}

type Props = ButtonAsButton | ButtonAsLink;

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const cls = `${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`;

  if ("href" in props && props.href) {
    const { href, children } = props;
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  const { children, ...rest } = props as ButtonAsButton;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
