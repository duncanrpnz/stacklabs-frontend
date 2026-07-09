import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EstimateFlow from "../components/EstimateFlow";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us about your project and get a rough sense of size and timeline in a few minutes. A quick guided intake from StackLabs, Cambridge NZ.",
  alternates: { canonical: "/estimate" },
};

export default function EstimatePage() {
  return (
    <>
      <Header />
      <main>
        <section className="estimate-page">
          <div className="container estimate-inner">
            <div className="estimate-intro">
              <p className="hero-location">Tell us more about your project</p>
              <h1>Let&apos;s scope it out.</h1>
              <p className="estimate-lead">
                Answer a few questions and we&apos;ll give you a rough sense of size and timeline -
                then you can decide if you want to take it further. Takes about three minutes.
              </p>
            </div>
            <EstimateFlow />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
