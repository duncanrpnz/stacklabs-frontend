import Reveal from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Discover",
    description:
      "We get into the problem first: understanding the user, the business goal, and the constraints, before writing any code.",
  },
  {
    num: "02",
    title: "Prototype",
    description:
      "Build a working version fast and get it in front of real users. Refine based on what you learn, not what you assumed.",
  },
  {
    num: "03",
    title: "Build",
    description:
      "Move into production with proper engineering. The kind of work that holds up in production.",
  },
  {
    num: "04",
    title: "Scale",
    description:
      "Support growth with iteration, reliable operations, and honest advice about what to do next.",
  },
];

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="container">
        <h2 className="section-title">How we work</h2>
        <div className="process-track">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 80}>
              <div className="process-step">
                <span className="step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
