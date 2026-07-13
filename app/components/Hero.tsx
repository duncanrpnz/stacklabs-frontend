"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const cleanups: (() => void)[] = [];

    if (window.matchMedia("(pointer: fine)").matches) {
      const tracer = el.querySelector<HTMLElement>(".hero-tracer");
      let raf = 0;
      let loop = 0;
      let targetX = 0;
      let targetY = 0;
      let dotX = 0;
      let dotY = 0;

      const tick = () => {
        dotX += (targetX - dotX) * 0.09;
        dotY += (targetY - dotY) * 0.09;
        if (tracer) {
          tracer.style.transform = `translate(${dotX}px, ${dotY}px)`;
        }
        loop = requestAnimationFrame(tick);
      };

      const onEnter = (e: PointerEvent) => {
        const rect = el.getBoundingClientRect();
        targetX = dotX = e.clientX - rect.left;
        targetY = dotY = e.clientY - rect.top;
        if (!loop) loop = requestAnimationFrame(tick);
      };

      const onMove = (e: PointerEvent) => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const rect = el.getBoundingClientRect();
          targetX = e.clientX - rect.left;
          targetY = e.clientY - rect.top;
          el.style.setProperty("--mx", `${targetX}px`);
          el.style.setProperty("--my", `${targetY}px`);
          el.classList.add("hero-tracking");
        });
      };

      const onLeave = () => {
        el.classList.remove("hero-tracking");
        if (loop) {
          cancelAnimationFrame(loop);
          loop = 0;
        }
      };

      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      cleanups.push(() => {
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
        if (loop) cancelAnimationFrame(loop);
      });
    }

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        el.style.setProperty(
          "--scroll",
          `${Math.min(window.scrollY, el.offsetHeight)}`,
        );
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="hero" id="home" ref={ref}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-parallax" aria-hidden="true">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
      </div>
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-tracer" aria-hidden="true" />
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
