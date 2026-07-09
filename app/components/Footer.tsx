import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p className="footer-brand">
          <span className="brand-stack">Stack</span>
          <span className="brand-labs">Labs</span>
          <span className="footer-ltd"> Ltd</span>
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/#services">Services</Link>
          <Link href="/how-much-does-software-cost">Pricing</Link>
          <Link href="/#process">Process</Link>
          <Link href="/#about">About</Link>
          <a href="mailto:hello@stacklabs.co.nz">Contact</a>
        </nav>
        <p className="footer-copy">© 2025 StackLabs Ltd, Cambridge NZ</p>
      </div>
    </footer>
  );
}
