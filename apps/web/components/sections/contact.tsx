'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const CARD_BASE =
  'rounded-xl border border-border/50 backdrop-blur-md dark:border-white/[0.08]';
const INPUT_BASE =
  'w-full rounded-xl border border-foreground/25 bg-foreground/[0.03] px-3.5 py-3 font-narrator text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-foreground/40 focus:bg-foreground/[0.06] hover:border-foreground/30 sm:px-4 sm:py-3.5';

export function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative min-h-screen px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-12 lg:py-24 xl:px-16 xl:py-28">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8 sm:mb-10">
          <p className="font-architect text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:text-[0.7rem]">
            CLOSING SCENE
          </p>
          <h2 className="font-display mt-1 text-2xl leading-none tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
            LET&apos;S BUILD.
          </h2>
          <p className="font-narrator mt-2 max-w-xl text-xs text-muted-foreground sm:text-sm md:text-base">
            Have a project in mind, want to collaborate, or just say hi? Drop a message.
          </p>
        </header>

        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-start lg:gap-12 xl:gap-16">
          <motion.article
            className={`relative w-full min-h-[360px] overflow-hidden sm:min-h-[400px] lg:min-h-[420px] lg:flex-1 ${CARD_BASE} bg-card/70 px-5 py-7 dark:bg-card/50 sm:px-6 sm:py-8 md:px-8 md:py-9 lg:px-10 lg:py-11`}
            style={{
              boxShadow:
                '0 0 0 1px hsl(var(--border)/0.4), 0 4px 24px -4px rgba(0,0,0,0.25), 0 2px 12px -2px rgba(0,0,0,0.15)',
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(250,250,250,0.04),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(0,0,0,0.2),transparent_55%)]" />
            <div className="relative z-10 flex h-full flex-col">
              <p className="font-architect mb-1.5 text-[0.62rem] uppercase tracking-wider text-muted-foreground">
                CONTACT FORM · SEND MESSAGE
              </p>
              <h3 className="font-display mb-6 min-h-[1.75rem] text-lg font-semibold leading-tight tracking-tight md:text-xl">
                GET IN TOUCH
              </h3>

              <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 sm:gap-5">
                <div className="space-y-1.5 sm:space-y-2">
                  <label
                    htmlFor="name"
                    className="font-architect flex items-center gap-2 text-[0.62rem] uppercase tracking-wider text-muted-foreground"
                  >
                    <span className="h-px w-4 shrink-0 bg-foreground/40" />
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={INPUT_BASE}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="font-architect flex items-center gap-2 text-[0.62rem] uppercase tracking-wider text-muted-foreground"
                  >
                    <span className="h-px w-4 shrink-0 bg-foreground/40" />
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={INPUT_BASE}
                    placeholder="your@email.com"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-1.5 sm:space-y-2">
                  <label
                    htmlFor="message"
                    className="font-architect flex items-center gap-2 text-[0.62rem] uppercase tracking-wider text-muted-foreground"
                  >
                    <span className="h-px w-4 shrink-0 bg-foreground/40" />
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${INPUT_BASE} min-h-[100px] flex-1 resize-y sm:min-h-[120px]`}
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="font-architect flex h-11 w-full items-center justify-center rounded-xl border border-foreground/25 bg-foreground/[0.03] text-[0.65rem] uppercase tracking-wider text-foreground transition-colors hover:bg-foreground/[0.08] hover:text-foreground disabled:pointer-events-none disabled:opacity-50 sm:h-12 sm:w-auto sm:min-w-[140px] md:min-w-[160px]"
                    aria-label="Send message"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send'}
                  </button>
                  {status === 'success' && (
                    <p className="font-narrator flex items-center gap-2 text-sm text-foreground/80">
                      <span className="h-px w-4 shrink-0 bg-foreground/40" />
                      Thanks – I&apos;ll get back to you soon.
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="font-narrator flex items-center gap-2 text-sm text-red-400/90">
                      <span className="h-px w-4 shrink-0 bg-red-400/60" />
                      Something went wrong. Try again or email directly.
                    </p>
                  )}
                </div>
              </form>

              <p className="font-architect mt-6 border-t border-border/40 pt-4 text-[0.52rem] uppercase tracking-[0.2em] text-muted-foreground/55">
                // READY TO CONNECT
              </p>
            </div>
          </motion.article>

        </div>
      </div>
    </section>
  );
}

