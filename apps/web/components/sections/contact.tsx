'use client';

import { useState } from "react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const email = "rithikreddy680@gmail.com";
  const phone = "+61 450 933 183";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-white px-6 py-24 text-black md:px-12 lg:px-20">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl flex-col justify-between">
        <header className="space-y-4">
          <p className="mono-label text-black/60">CLOSING SCENE</p>
          <h2 className="text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tightest">
            LET&apos;S BUILD.
          </h2>
        </header>

        <div className="space-y-12">
          <div className="space-y-6">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="group relative inline-flex items-baseline gap-3 text-2xl md:text-3xl lg:text-4xl tracking-tightest"
            >
              <span className="underline decoration-[3px] decoration-black underline-offset-8">
                {email}
              </span>
              <span className="mono-label text-black/60">CLICK TO COPY</span>
              <span className="pointer-events-none absolute left-0 top-full mt-2 text-xs text-black/70 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                {copied ? "Copied to clipboard" : phone}
              </span>
            </button>

            <nav className="flex flex-col gap-4 md:flex-row md:gap-10 text-sm md:text-base font-medium">
              <ContactLink
                label="LINKEDIN"
                href="https://www.linkedin.com/in/rithik-reddy"
              />
              <ContactLink label="GITHUB" href="https://github.com/yourusername" />
            </nav>
          </div>

          <footer className="flex flex-col gap-2 text-xs text-black/60 md:flex-row md:items-center md:justify-between">
            <p>Designed &amp; engineered by Rithik Reddy.</p>
            <p>Williams Landing, 3027 · Australia · {new Date().getFullYear()}</p>
          </footer>
        </div>
      </div>
    </section>
  );
}

type ContactLinkProps = {
  label: string;
  href: string;
};

function ContactLink({ label, href }: ContactLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group relative inline-block overflow-visible"
    >
      <span className="relative inline-block text-2xl md:text-3xl lg:text-4xl tracking-tightest">
        {label}
        <span className="absolute inset-x-0 bottom-0 h-[3px] origin-center scale-x-0 bg-black transition-transform duration-200 group-hover:scale-x-100" />
        <span className="absolute inset-x-0 bottom-2 h-[2px] bg-black/80 opacity-0 transition-opacity duration-150 group-hover:opacity-100" />
      </span>
    </a>
  );
}

