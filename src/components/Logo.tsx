import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 36, showText = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Precision SVG matching Image 9: Graduation cap + Blockchain nodes in vivid blue gradient */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm select-none"
      >
        <defs>
          <linearGradient id="unichain-top-grad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0052FF" />
            <stop offset="50%" stopColor="#0077FE" />
            <stop offset="100%" stopColor="#00D2FF" />
          </linearGradient>
          <linearGradient id="unichain-cube-front" x1="25" y1="45" x2="75" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0047E0" />
            <stop offset="100%" stopColor="#00A3FF" />
          </linearGradient>
          <linearGradient id="unichain-cube-side" x1="20" y1="50" x2="50" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#002D9C" />
            <stop offset="100%" stopColor="#0066FF" />
          </linearGradient>
          <linearGradient id="unichain-tassel" x1="75" y1="35" x2="90" y2="70" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="100%" stopColor="#0047E0" />
          </linearGradient>
        </defs>

        {/* Isometric Cap Top Diamond */}
        <path
          d="M50 12L88 34L50 56L12 34L50 12Z"
          fill="url(#unichain-top-grad)"
        />

        {/* Inner Cutout / Circuit Path on Cap Top */}
        <path
          d="M50 26L72 38L62 44L44 34L50 26Z"
          fill="#FFFFFF"
          fillOpacity="0.95"
        />
        <path
          d="M50 29L66 38L60 41L47 34L50 29Z"
          fill="url(#unichain-top-grad)"
        />

        {/* Layer 1: Blockchain Block Upper Cube */}
        {/* Left Face */}
        <path
          d="M26 44L48 56V69L26 57V44Z"
          fill="url(#unichain-cube-side)"
        />
        {/* Right Face */}
        <path
          d="M48 56L70 44V57L48 69V56Z"
          fill="url(#unichain-cube-front)"
        />

        {/* Layer 2: Blockchain Block Lower Cube */}
        {/* Left Face */}
        <path
          d="M26 61L48 73V86L26 74V61Z"
          fill="url(#unichain-cube-side)"
        />
        {/* Right Face */}
        <path
          d="M48 73L70 61V74L48 86V73Z"
          fill="url(#unichain-cube-front)"
        />

        {/* Graduation Tassel with Blockchain Nodes */}
        {/* Branch wire */}
        <path
          d="M84 36V50H86"
          stroke="url(#unichain-tassel)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M86 50V68"
          stroke="url(#unichain-tassel)"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Node 1 (Upper) */}
        <circle cx="86" cy="46" r="6" fill="#0077FE" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="86" cy="46" r="2.5" fill="#FFFFFF" />

        {/* Node 2 (Lower end) */}
        <circle cx="86" cy="68" r="6.5" fill="#0047E0" stroke="#FFFFFF" strokeWidth="2.5" />
        <circle cx="86" cy="68" r="3" fill="#FFFFFF" />
      </svg>

      {showText && (
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 leading-none">
            <span className="font-extrabold text-[19px] tracking-tight text-slate-900 font-sans">
              Uni<span className="text-blue-600">Chain</span>
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-blue-50 text-blue-700 border border-blue-200/80 rounded">
              Core
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 tracking-wide mt-1 truncate">
            Cổng Quản Trị Cấp Bằng Số
          </span>
        </div>
      )}
    </div>
  );
};
