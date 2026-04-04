"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type HeaderNavigationProps = {
  userName: string;
  userEmail: string;
  initial: string;
};

const navItems = [
  { href: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: "Dashboard" },
  { href: "/chat", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z", label: "Chat" },
  { href: "/teachers", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", label: "Faculty" },
  { href: "/campus-map", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 01.553-.894L9 2m0 18l6-3m-6 3V2m6 15l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 2", label: "Campus" },
  { href: "/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: "Events" }
];

export default function HeaderNavigation({ userName, userEmail, initial }: HeaderNavigationProps) {
  const pathname = usePathname();

  const isNavItemActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard" || pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isProfileActive = pathname === "/profile" || pathname.startsWith("/profile/");

  return (
    <>
      <nav className="hidden lg:flex items-center gap-1">
        {navItems.map((item) => {
          const active = isNavItemActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 group ${
                active
                  ? "bg-white/15 text-white ring-1 ring-indigo-400/40 shadow-lg"
                  : "text-gray-300 hover:text-white hover:bg-white/10"
              }`}
            >
              <svg
                className={`w-4 h-4 transition-colors ${active ? "text-indigo-300" : "group-hover:text-indigo-400"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 ml-auto">
        <button className="p-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-gray-400 hover:text-white group">
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        <Link
          href="/profile"
          className={`w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg transition-all ${
            isProfileActive ? "scale-110 ring-2 ring-indigo-300/70" : "hover:scale-105"
          }`}
          title={`${userName} (${userEmail})`}
        >
          {initial}
        </Link>
      </div>
    </>
  );
}
