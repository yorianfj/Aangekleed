const TEXT = "ZIE JE OUTFIT VÓÓR JE HEM KOOPT · BINNEN 48 UUR GELEVERD · NIEUW ÉN TWEEDEHANDS · ";

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-line bg-navy py-4">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        <span className="px-4 font-serif text-lg tracking-wide text-ivory">
          {TEXT.repeat(4)}
        </span>
        <span className="px-4 font-serif text-lg tracking-wide text-ivory" aria-hidden>
          {TEXT.repeat(4)}
        </span>
      </div>
    </div>
  );
}
