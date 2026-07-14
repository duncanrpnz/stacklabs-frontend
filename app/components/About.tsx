import Image from "next/image";
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
              that&apos;s hard to hand to a large agency: early-stage products where
              decisions matter and moving fast counts.
            </p>
            <p>
              We&apos;re direct about what we think. If an idea isn&apos;t ready to build,
              we&apos;ll say so. If the scope needs to change mid-project, we&apos;ll talk
              about it early. The goal is always to ship something that works,
              not something that looked good in a proposal.
            </p>
            <p>
              We keep the team small on purpose. You work with senior people, not
              a junior who&apos;s been handed your project after the sales call.
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
                Projects where the spec changes weekly and there&apos;s no decision
                maker. We&apos;re not the right choice if you need 10 developers next
                month.
              </p>
            </div>
            <div className="aside-block founder-bio">
              <Image
                src="/founder/duncan-palmer.webp"
                alt="Duncan Palmer, founder of StackLabs"
                width={72}
                height={72}
                className="founder-photo"
              />
              <div className="founder-details">
                <h3>Duncan Palmer</h3>
                <p>
                  Duncan Palmer brings close to a decade of software engineering
                  and architecture experience from large-scale infrastructure and
                  SaaS organisations to StackLabs, where he applies the same
                  senior judgement to smaller, founder-led projects.
                </p>
                <a
                  href="https://www.linkedin.com/in/duncan-palmer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="founder-linkedin"
                >
                  Connect on LinkedIn →
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
