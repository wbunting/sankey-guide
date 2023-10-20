"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium">
      <Link
        className={`transition-colors hover:text-foreground/80 ${
          pathname === "/" ? "text-foreground" : "text-foreground/60"
        }`}
        href="/"
      >
        The Guide
      </Link>
      <Link
        className={`transition-colors hover:text-foreground/80 ${
          pathname === "/components" ? "text-foreground" : "text-foreground/60"
        }`}
        href="/components"
      >
        Components
      </Link>
    </nav>
  );
};

export default Nav;
