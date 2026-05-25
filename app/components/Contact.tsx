"use client";

import { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      project: (form.elements.namedItem("project") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong. Please email us directly.");
    }

    setLoading(false);
  }

  return (
    <section className="contact" id="contact">
      <div className="container contact-inner">
        <div className="contact-copy">
          <h2>Start a conversation</h2>
          <p>
            Tell us what you&apos;re working on. If it sounds like a good fit, we&apos;ll
            set up a call.
          </p>
          <div className="contact-meta">
            <a href="mailto:hello@stacklabs.co.nz" className="contact-link">
              hello@stacklabs.co.nz
            </a>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <p className="form-success">
              Message sent. We&apos;ll be in touch soon.
            </p>
          ) : (
            <>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane@company.com"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="project">What are you building?</label>
                <textarea
                  id="project"
                  name="project"
                  rows={4}
                  placeholder="Describe your idea or project…"
                />
              </div>
              {error && <p className="form-error">{error}</p>}
              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                {loading ? "Sending…" : "Send message"}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
