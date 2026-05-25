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
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
          <a href="mailto:hello@stacklabs.co.nz">Contact</a>
        </nav>
        <p className="footer-copy">© 2025 StackLabs Ltd, Cambridge NZ</p>
      </div>
    </footer>
  );
}
