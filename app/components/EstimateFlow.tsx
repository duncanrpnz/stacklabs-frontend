"use client";

import { useEffect, useState, type FormEvent } from "react";
import { track } from "@vercel/analytics";

interface Question {
  question: string;
  hint: string;
}

interface Estimate {
  summary: string;
  sizeTier: "Small" | "Medium" | "Large";
  timeline: string;
  keyConsiderations: string[];
  assumptions: string[];
  recommendedNextStep: string;
}

type Step = "intro" | "questions" | "result" | "done";

const LOADING_MESSAGES: Record<Step, string[]> = {
  intro: ["Reading your project…", "Spotting the key unknowns…", "Drafting a few good questions…"],
  questions: ["Pulling your answers together…", "Sizing the work…", "Working out a rough timeline…"],
  result: ["Sending this to StackLabs…"],
  done: [],
};

export default function EstimateFlow() {
  const [step, setStep] = useState<Step>("intro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [project, setProject] = useState("");
  const [budget, setBudget] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Honeypot - hidden from real users; bots that fill it are dropped server-side.
  const [website, setWebsite] = useState("");

  // Cycle the loading copy so longer Opus calls feel alive (clamps on the last line).
  const [msgIndex, setMsgIndex] = useState(0);
  useEffect(() => {
    if (!loading) {
      setMsgIndex(0);
      return;
    }
    const id = setInterval(() => setMsgIndex((i) => i + 1), 2200);
    return () => clearInterval(id);
  }, [loading]);

  const messages = LOADING_MESSAGES[step];
  const loadingMessage = messages[Math.min(msgIndex, messages.length - 1)] ?? "Working…";

  async function submitIntro(e: FormEvent) {
    e.preventDefault();
    if (!project.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ project, budget, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setQuestions(data.questions);
      setAnswers(new Array(data.questions.length).fill(""));
      setStep("questions");
      track("estimate_questions");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswers(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project,
          budget,
          answers: questions.map((q, i) => ({ question: q.question, answer: answers[i] })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setEstimate(data.estimate);
      setStep("result");
      track("estimate_generated", { sizeTier: data.estimate?.sizeTier ?? "unknown" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/estimate/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          project,
          budget,
          answers: questions.map((q, i) => ({ question: q.question, answer: answers[i] })),
          estimate,
          website,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStep("done");
      track("lead_submitted", { sizeTier: estimate?.sizeTier ?? "unknown" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send. Please email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="estimate-card">
      {loading ? (
        <div className="estimate-loading estimate-fade">
          <div className="spinner" aria-hidden="true" />
          <p key={loadingMessage} className="estimate-loading-msg" aria-live="polite">
            {loadingMessage}
          </p>
        </div>
      ) : (
        <div className="estimate-fade" key={step}>
          {step === "intro" && (
            <form onSubmit={submitIntro} className="estimate-step">
              <p className="estimate-eyebrow">Step 1 of 3</p>
              <h2>Tell us about your project</h2>
              <p className="estimate-sub">
                A couple of questions to start. We&apos;ll ask a few follow-ups, then give you a
                rough sense of size and timeline.
              </p>
              <div className="form-group">
                <label htmlFor="project">What are you trying to build?</label>
                <textarea
                  id="project"
                  rows={5}
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  placeholder="Describe the idea, who it's for, and what it needs to do…"
                  maxLength={4000}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="budget">Rough budget (optional)</label>
                <input
                  id="budget"
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. under $20k, $20k–$50k, not sure yet"
                  maxLength={200}
                />
              </div>
              <input
                type="text"
                name="website"
                className="hp-field"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
              {error && <p className="form-error">{error}</p>}
              <button type="submit" className="btn btn-primary btn-full">
                Continue
              </button>
            </form>
          )}

          {step === "questions" && (
            <form onSubmit={submitAnswers} className="estimate-step">
              <p className="estimate-eyebrow">Step 2 of 3</p>
              <h2>A few follow-up questions</h2>
              <p className="estimate-sub">
                These help us scope things properly. Answer what you can - rough is fine.
              </p>
              {questions.map((q, i) => (
                <div className="form-group" key={i}>
                  <label htmlFor={`q-${i}`}>{q.question}</label>
                  {q.hint && <span className="estimate-hint">{q.hint}</span>}
                  <textarea
                    id={`q-${i}`}
                    rows={3}
                    value={answers[i]}
                    onChange={(e) => {
                      const next = [...answers];
                      next[i] = e.target.value;
                      setAnswers(next);
                    }}
                    maxLength={2000}
                  />
                </div>
              ))}
              {error && <p className="form-error">{error}</p>}
              <div className="estimate-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setError(null);
                    setStep("intro");
                  }}
                >
                  Back
                </button>
                <button type="submit" className="btn btn-primary">
                  Get my estimate
                </button>
              </div>
            </form>
          )}

          {step === "result" && estimate && (
            <div className="estimate-step">
              <button
                type="button"
                className="estimate-back"
                onClick={() => {
                  setError(null);
                  setStep("questions");
                }}
              >
                ← Edit answers
              </button>
              <p className="estimate-eyebrow">Step 3 of 3</p>
              <h2>Here&apos;s a rough idea</h2>

              <div className="result-meta">
                <div className="result-badge">
                  <span className="result-badge-label">Size</span>
                  <span className="result-badge-value">{estimate.sizeTier}</span>
                </div>
                <div className="result-badge">
                  <span className="result-badge-label">Timeline</span>
                  <span className="result-badge-value">{estimate.timeline}</span>
                </div>
              </div>

              <p className="estimate-summary">{estimate.summary}</p>

              {estimate.keyConsiderations.length > 0 && (
                <div className="result-block">
                  <h3>What drives the scope</h3>
                  <ul>
                    {estimate.keyConsiderations.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {estimate.assumptions.length > 0 && (
                <div className="result-block">
                  <h3>We assumed</h3>
                  <ul>
                    {estimate.assumptions.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="estimate-disclaimer">
                This is a rough, automated estimate to set expectations - not a quote. Real numbers
                come after a proper conversation.
              </p>

              <div className="result-cta">
                <h3>{estimate.recommendedNextStep}</h3>
                <p className="estimate-sub">
                  Leave your details and we&apos;ll get back to you to take it further.
                </p>
                <form onSubmit={submitLead}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="lead-name">Name</label>
                      <input
                        id="lead-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jane Smith"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lead-email">Email</label>
                      <input
                        id="lead-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@company.com"
                        required
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    name="website"
                    className="hp-field"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  {error && <p className="form-error">{error}</p>}
                  <button type="submit" className="btn btn-primary btn-full">
                    Send this to StackLabs
                  </button>
                </form>
              </div>
            </div>
          )}

          {step === "done" && (
            <div className="estimate-step estimate-done">
              <h2>Thanks - that&apos;s on its way.</h2>
              <p className="estimate-sub">
                We&apos;ve got your project details and the estimate. We&apos;ll be in touch soon to
                take it further. In the meantime you can reach us at{" "}
                <a href="mailto:hello@stacklabs.co.nz" className="contact-link">
                  hello@stacklabs.co.nz
                </a>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
