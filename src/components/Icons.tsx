import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...rest }: P) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

export const Icon = {
  Cart: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.9a2 2 0 002-1.5L21 8H6.2" />
      <circle cx="9.5" cy="20" r="1.2" />
      <circle cx="17.5" cy="20" r="1.2" />
    </svg>
  ),
  Menu: (p: P) => (
    <svg {...base(p)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  ),
  Close: (p: P) => (
    <svg {...base(p)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  ),
  Check: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  Truck: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  ),
  Package: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
      <path d="M4 7.5l8 4.5 8-4.5M12 12v9" />
    </svg>
  ),
  Undo: (p: P) => (
    <svg {...base(p)}>
      <path d="M9 14L4 9l5-5" />
      <path d="M4 9h10a6 6 0 010 12h-3" />
    </svg>
  ),
  Lock: (p: P) => (
    <svg {...base(p)}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 018 0v3" />
    </svg>
  ),
  Zap: (p: P) => (
    <svg {...base(p)}>
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  ),
  Waves: (p: P) => (
    <svg {...base(p)}>
      <path d="M3 8c2 0 2-1.5 4-1.5S9 8 11 8s2-1.5 4-1.5S17 8 19 8s2-1.5 2-1.5M3 13c2 0 2-1.5 4-1.5S9 13 11 13s2-1.5 4-1.5S17 13 19 13s2-1.5 2-1.5M3 18c2 0 2-1.5 4-1.5S9 18 11 18s2-1.5 4-1.5S17 18 19 18s2-1.5 2-1.5" />
    </svg>
  ),
  Droplet: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3s-6 7-6 11a6 6 0 0012 0c0-4-6-11-6-11z" />
    </svg>
  ),
  Shield: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    </svg>
  ),
  Snow: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
    </svg>
  ),
  Exit: (p: P) => (
    <svg {...base(p)}>
      <path d="M10 4H5a1 1 0 00-1 1v14a1 1 0 001 1h5M14 8l4 4-4 4M18 12H9" />
    </svg>
  ),
  Radio: (p: P) => (
    <svg {...base(p)}>
      <rect x="3" y="9" width="18" height="11" rx="2" />
      <circle cx="8" cy="14.5" r="2.5" />
      <path d="M14 13h4M14 16h3M7 9l9-5" />
    </svg>
  ),
  Flame: (p: P) => (
    <svg {...base(p)}>
      <path d="M12 3c1 3 4 4.5 4 9a4 4 0 01-8 0c0-2 1-3 1-3s.5 2 2 2c0-3-1-5 1-8z" />
    </svg>
  ),
  ArrowRight: (p: P) => (
    <svg {...base(p)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
};
