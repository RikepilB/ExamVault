import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface AuthPageLayoutProps {
  mode: 'login' | 'signup';
  children: ReactNode;
}

export const AuthPageLayout = ({ mode, children }: AuthPageLayoutProps) => (
  <main className="min-h-screen paper grain relative text-[var(--ink)] px-4 py-6 sm:px-8 sm:py-10">
    <div className="relative z-10 mx-auto max-w-6xl">
      <Link to="/" className="inline-flex min-h-11 items-center font-display text-2xl font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--marker)]">
        ExamVault<span className="text-[var(--marker)]">.</span>
      </Link>
      <div className="mt-6 grid overflow-hidden rounded-xl border border-[rgba(27,36,49,0.35)] bg-[#fdfaf2] shadow-[6px_6px_0_var(--ink)] lg:min-h-[650px] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden bg-[var(--ink)] px-6 py-8 text-[var(--paper)] sm:px-10 sm:py-12 lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="font-mono-plex text-xs uppercase tracking-[0.18em] text-[#f4b6bb]">For educators</p>
            <h2 className="mt-5 max-w-sm font-display text-3xl leading-tight sm:text-4xl">
              {mode === 'login' ? 'Your next exam starts where you left off.' : 'Put your question bank to work.'}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#e5e9ed] sm:text-base">
              {mode === 'login'
                ? 'Return to your courses, question banks and exam variants.'
                : 'Create a course, bring in your questions and build printable exam variants.'}
            </p>
          </div>
          <div className="mt-8 border-t border-white/20 pt-5 font-mono-plex text-xs leading-relaxed text-[#e5e9ed]">
            QUESTIONS <span className="text-[#f4b6bb]">→</span> VARIANTS <span className="text-[#f4b6bb]">→</span> RESULTS
          </div>
        </aside>
        <div className="px-6 py-8 sm:px-10 sm:py-12 lg:flex lg:items-center lg:justify-center lg:px-14">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  </main>
);
