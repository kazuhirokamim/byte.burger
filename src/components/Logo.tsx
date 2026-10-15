interface LogoProps {
  size?: number;
  withText?: boolean;
  textClassName?: string;
}

export function Logo({ size = 36, withText = true, textClassName = '' }: LogoProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative grid place-items-center rounded-xl"
        style={{
          width: size,
          height: size,
          background: 'linear-gradient(135deg, #1d1d26, #0d0d11)',
          border: '1px solid rgba(249,115,22,0.3)',
          boxShadow: '0 0 24px -6px rgba(249,115,22,0.4)',
        }}
      >
        <svg
          width={size * 0.6}
          height={size * 0.6}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Terminal prompt + burger bun silhouette */}
          <path
            d="M4 6L4 4 L8 4"
            stroke="#f97316"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 13.5c0-3.314 3.134-6 7-6s7 2.686 7 6"
            fill="url(#bun)"
            stroke="#fb923c"
            strokeWidth="0.8"
          />
          <rect x="5" y="14" width="14" height="2" rx="1" fill="#dc2626" />
          <rect x="5" y="16.5" width="14" height="2" rx="1" fill="#f59e0b" />
          <path
            d="M5 19.5c0 0.828 3.134 1.5 7 1.5s7-0.672 7-1.5"
            stroke="#fb923c"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="bun" x1="5" y1="7.5" x2="19" y2="13.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbbf24" />
              <stop offset="1" stopColor="#f97316" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {withText && (
        <div className={`leading-none ${textClassName}`}>
          <span className="font-display text-base font-700 tracking-tight text-white">
            byte
            <span className="text-ember-500">.</span>
            burger
          </span>
          <div className="mono mt-1 text-[9px] uppercase tracking-[0.25em] text-ink-400">
            deploy / eat / commit
          </div>
        </div>
      )}
    </div>
  );
}
