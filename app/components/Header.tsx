"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/#home" className="brand">
          <span className="brand-stack">Stack</span>
          <span className="brand-labs">Labs</span>
        </Link>
        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          className={`site-nav${open ? " open" : ""}`}
          aria-label="Main navigation"
        >
          <Link href="/#services" onClick={() => setOpen(false)}>
            Services
          </Link>
          <Link href="/work" onClick={() => setOpen(false)}>
            Work
          </Link>
          <Link href="/#process" onClick={() => setOpen(false)}>
            Process
          </Link>
          <Link href="/#about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/estimate" className="nav-cta" onClick={() => setOpen(false)}>
            Start a project
          </Link>
        </nav>
      </div>
    </header>
  );
}
