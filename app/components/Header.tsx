"use client";

import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand">
          <span className="brand-stack">Stack</span>
          <span className="brand-labs">Labs</span>
        </a>
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
          <a href="#services" onClick={() => setOpen(false)}>
            Services
          </a>
          <a href="#process" onClick={() => setOpen(false)}>
            Process
          </a>
          <a href="#about" onClick={() => setOpen(false)}>
            About
          </a>
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Get in touch
          </a>
        </nav>
      </div>
    </header>
  );
}
