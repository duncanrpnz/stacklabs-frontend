import Reveal from "./Reveal";

const services = [
  {
    num: "01",
    title: "Rapid Prototyping",
    description:
      "We build working software quickly. Typically 4 to 8 weeks for a first version you can put in front of real users. The goal is to find out what works before committing to a full build.",
  },
  {
    num: "02",
    title: "Prototype to Production",
    description:
      "If the prototype proves out, we take it further. Proper architecture, test coverage, deployment pipelines. Everything required to run software people actually depend on.",
  },
  {
    num: "03",
    title: "Product Strategy",
    description:
      "Sometimes the problem isn't the code, it's the roadmap. We help teams work out what to build next and why, so engineering effort goes toward work that actually matters.",
  },
  {
    num: "04",
    title: "Technical Leadership",
    description:
      "For teams without a CTO or senior technical lead, we can step into that role: making architecture decisions, reviewing work, and keeping delivery on track.",
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <h2 className="section-title">What we do</h2>
        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.num} delay={i * 60}>
              <article className="service-card">
                <span className="service-num">{s.num}</span>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
