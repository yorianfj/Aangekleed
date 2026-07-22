"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const NAV_ITEMS = [
  { label: "Waarom", href: "/#waarom" },
  { label: "Voorbeeld", href: "/#voorbeeld" },
  { label: "Prijzen", href: "/#prijzen" },
  { label: "Werkwijze", href: "/#werkwijze" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/90 backdrop-blur">
      <div className="section flex h-20 items-center justify-between">
        <Link href="/" aria-label="AANGEKLEED. home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-soft-navy transition-colors hover:text-navy"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/intake" className="btn-primary">
            Start je rapport
          </Link>
        </div>

        <button
          type="button"
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-navy transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-navy transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 bg-navy transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ivory md:hidden">
          <nav className="section flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 text-sm text-soft-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/intake" className="btn-primary mt-3 w-full" onClick={() => setOpen(false)}>
              Start je rapport
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
