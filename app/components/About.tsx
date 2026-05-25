import Reveal from "./Reveal";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about-grid">
        <Reveal>
          <div className="about-copy">
            <h2>About StackLabs</h2>
            <p>
              StackLabs is based in Cambridge, Waikato and focused on the kind of work
              that's hard to hand to a large agency: early-stage products where
              decisions matter and moving fast counts.
            </p>
            <p>
              We're direct about what we think. If an idea isn't ready to build,
              we'll say so. If the scope needs to change mid-project, we'll talk
              about it early. The goal is always to ship something that works,
              not something that looked good in a proposal.
            </p>
            <p>
              We keep the team small on purpose. You work with senior people, not
              a junior who's been handed your project after the sales call.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="about-aside">
            <div className="aside-block">
              <h3>Good fit</h3>
              <p>
                Founders validating an idea. Teams that have outgrown a no-code
                tool. Businesses with existing software that needs a proper
                rebuild.
              </p>
            </div>
            <div className="aside-block">
              <h3>Not the right fit</h3>
              <p>
                Projects where the spec changes weekly and there's no decision
                maker. We're not the right choice if you need 10 developers next
                month.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
