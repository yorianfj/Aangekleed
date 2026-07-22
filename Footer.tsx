import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy text-ivory/80">
      <div className="section flex flex-col gap-10 py-16 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-5">
          <span className="flex h-12 w-12 items-center justify-center border border-ivory/25 font-serif text-xl text-ivory">
            A.
          </span>
          <div>
            <Logo className="!text-ivory" />
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-ivory/60">
              Zie je outfit vóór je hem koopt. Een digitale stijlservice voor
              mannen die het rustig, doordacht en persoonlijk houden.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <Link href="/#waarom" className="hover:text-ivory">Waarom</Link>
          <Link href="/#voorbeeld" className="hover:text-ivory">Voorbeeld</Link>
          <Link href="/#prijzen" className="hover:text-ivory">Prijzen</Link>
          <Link href="/#werkwijze" className="hover:text-ivory">Werkwijze</Link>
          <Link href="/intake" className="hover:text-ivory">Start je rapport</Link>
        </nav>
      </div>

      <div className="border-t border-ivory/10">
        <div className="section flex flex-col gap-2 py-6 text-xs text-ivory/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} AANGEKLEED. Alle rechten voorbehouden.</p>
          <p>Amsterdam, Nederland</p>
        </div>
      </div>
    </footer>
  );
}
