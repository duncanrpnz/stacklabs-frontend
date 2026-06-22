import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-inner">
        <p className="hero-location">Cambridge, New Zealand</p>
        <h1>
          From prototype
          <br />
          to production.
        </h1>
        <p className="hero-lead">
          StackLabs is a small software development studio. We work with
          founders and teams who need to build real software, with someone
          who&apos;ll be straight with them about how to do it.
        </p>
        <div className="hero-actions">
          <Link className="btn btn-primary" href="/estimate">
            Tell us about your project
          </Link>
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
