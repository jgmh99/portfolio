"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/projects", label: "실무 프로젝트" },
  { href: "/resume", label: "경력기술서" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/projects" className="brand">
          제갈민혁 포트폴리오
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link${pathname.startsWith(link.href) ? " is-active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
