import Link from "next/link";
import Reveal from "./Reveal";
import { services } from "../lib/services";

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">What we do</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 60}>
              <Link href={`/services/${s.slug}`} className="service-card">
                <span className="service-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.card}</p>
                <span className="service-more">More about {s.title.toLowerCase()} →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
