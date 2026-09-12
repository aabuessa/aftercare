"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Today", href: "/today" },
  { label: "Appointments", href: "/appointments" },
  { label: "Care team", href: "/care-team" },
  { label: "Health record", href: "/health-record" },
  { label: "Recovery plan", href: "/recovery-plan" },
  { label: "Messages", href: "/messages" },
];

export default function AppNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6">
        <Link href="/today" className="shrink-0 py-1">
          <Image
            src="/logo.png"
            alt="AfterCare"
            width={220}
            height={92}
            priority
            className="h-12 w-auto sm:h-14"
          />
        </Link>
        <nav className="flex flex-1 gap-1 overflow-x-auto text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-mint text-primary"
                    : "text-muted-foreground hover:bg-mint/50 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
