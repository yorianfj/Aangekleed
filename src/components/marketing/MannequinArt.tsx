export function MannequinArt() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
      <div className="absolute inset-0 translate-x-4 translate-y-4 border border-camel" aria-hidden />
      <div className="relative flex h-full w-full items-center justify-center border border-navy bg-offwhite">
        <svg
          viewBox="0 0 220 300"
          className="h-[78%] w-[78%]"
          fill="none"
          stroke="#1B2A41"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* stand */}
          <line x1="110" y1="300" x2="110" y2="248" />
          <ellipse cx="110" cy="300" rx="34" ry="5" stroke="#A9834E" />

          {/* neck rod */}
          <line x1="110" y1="248" x2="110" y2="208" />

          {/* shoulders / torso (jacket silhouette) */}
          <path d="M62 130 C62 108 84 92 110 92 C136 92 158 108 158 130 L166 220 C166 232 150 240 110 240 C70 240 54 232 54 220 Z" />

          {/* lapels */}
          <path d="M100 96 L86 150 L108 140" />
          <path d="M120 96 L134 150 L112 140" />

          {/* center seam / buttons */}
          <line x1="110" y1="140" x2="110" y2="230" strokeDasharray="1 7" />

          {/* neck head form (headless mannequin ball) */}
          <circle cx="110" cy="182" r="0" opacity="0" />
          <ellipse cx="110" cy="70" rx="20" ry="24" stroke="#A9834E" />

          {/* pocket square */}
          <path d="M132 118 L140 112 L146 122" />
        </svg>
      </div>
    </div>
  );
}
