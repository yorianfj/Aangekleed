"use client";

import { useState } from "react";

interface AccordionItem {
  vraag: string;
  antwoord: string;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.vraag}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="font-serif text-xl text-navy">{item.vraag}</span>
              <span
                className={`shrink-0 font-serif text-2xl text-camel transition-transform duration-200 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl text-[15px] leading-relaxed text-soft-navy">
                  {item.antwoord}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
