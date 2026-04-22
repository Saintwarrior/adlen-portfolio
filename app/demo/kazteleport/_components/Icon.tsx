import type { SVGProps } from "react";

type IconName =
  | "dashboard"
  | "news"
  | "people"
  | "documents"
  | "requests"
  | "calendar"
  | "search"
  | "bell"
  | "chevronDown"
  | "chevronRight"
  | "arrowUp"
  | "arrowDown"
  | "arrowRight"
  | "plus"
  | "filter"
  | "check"
  | "clock"
  | "pin"
  | "logout"
  | "book"
  | "shield"
  | "scale"
  | "graph"
  | "lock"
  | "mail"
  | "phone"
  | "telegram";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
  switch (name) {
    case "dashboard":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      );
    case "news":
      return (
        <svg {...common}>
          <path d="M4 5h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
          <path d="M19 8h2v9a2 2 0 0 1-2 2" />
          <path d="M7 9h7M7 13h7M7 17h4" />
        </svg>
      );
    case "people":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17" cy="9" r="2.6" />
          <path d="M21 18.5c0-2.5-1.9-4.5-4-4.5" />
        </svg>
      );
    case "documents":
      return (
        <svg {...common}>
          <path d="M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h7M9 17h5" />
        </svg>
      );
    case "requests":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M8 9h8M8 13h8M8 17h5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 10h17M8 3v4M16 3v4" />
          <circle cx="8" cy="14" r="1" fill="currentColor" />
          <circle cx="12" cy="14" r="1" fill="currentColor" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 9a6 6 0 0 1 12 0v5l1.5 2.5H4.5L6 14z" />
          <path d="M10 19a2 2 0 0 0 4 0" />
        </svg>
      );
    case "chevronDown":
      return (
        <svg {...common}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      );
    case "chevronRight":
      return (
        <svg {...common}>
          <path d="m9 6 6 6-6 6" />
        </svg>
      );
    case "arrowUp":
      return (
        <svg {...common}>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      );
    case "arrowDown":
      return (
        <svg {...common}>
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      );
    case "arrowRight":
      return (
        <svg {...common}>
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M4 5h16l-6 8v5l-4 2v-7z" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 5 5 9-11" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 2v6M7 8h10l-1.5 4H8.5zM12 12v8" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" />
          <path d="M16 8l4 4-4 4M20 12H10" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2z" />
          <path d="M4 19a2 2 0 0 0 2 2h12" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 4 6v6c0 4.5 3.5 8 8 9 4.5-1 8-4.5 8-9V6z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 4v16M4 20h16M6 8l-3 6h6zM18 8l-3 6h6z" />
        </svg>
      );
    case "graph":
      return (
        <svg {...common}>
          <path d="M4 20V4M4 20h16M8 16l3-4 3 3 5-7" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common}>
          <path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      );
    case "telegram":
      return (
        <svg {...common}>
          <path d="m3 11 18-7-3 16-6-3-3 4v-5z" />
          <path d="m9 14 9-7-6 9" />
        </svg>
      );
  }
}
