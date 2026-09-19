import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GitHubIcon = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"
    />
  </svg>
);

/**
 * The OMR answer sheet — ExamVault's native artifact — as the hero visual.
 * One bubble "fills" in a loop, like a scanner reading the sheet.
 */
const AnswerSheetArtifact = () => {
  const rows = [
    { n: 1, marked: 2 },
    { n: 2, marked: 0 },
    { n: 3, marked: 3 },
    { n: 4, marked: 1 },
    { n: 5, marked: 3 },
  ];
  return (
    <div className="relative reveal-artifact">
      {/* the sheet */}
      <div className="sheet relative rounded-md p-6 sm:p-8 w-full max-w-md mx-auto rotate-2">
        <div className="flex items-baseline justify-between mb-6">
          <p className="font-mono-plex text-[10px] tracking-[0.2em] uppercase text-[var(--ink-faint)]">
            Answer sheet · Form B
          </p>
          <p className="font-mono-plex text-[10px] text-[var(--ink-faint)]">
            Sample course
          </p>
        </div>

        <div className="space-y-4">
          {rows.map((row) => (
            <div key={row.n} className="flex items-center gap-4 omr-row">
              <span className="font-mono-plex text-xs w-5 text-[var(--ink-soft)]">
                {row.n}.
              </span>
              <div className="flex items-center gap-3">
                {['A', 'B', 'C', 'D'].map((letter, i) => {
                  const isMarked = row.marked === i;
                  const isCorrect = row.n === 2 && i === 0;
                  return (
                    <span key={letter} className="flex items-center gap-1.5">
                      <span
                        className={
                          isMarked
                            ? 'omr-bubble omr-scan-bubble is-marked text-[var(--marker)]'
                            : isCorrect
                              ? 'omr-bubble is-correct'
                              : 'omr-bubble text-[var(--ink)]'
                        }
                        style={
                          isMarked
                            ? ({
                                fill: 'var(--marker)',
                              } as React.CSSProperties)
                            : undefined
                        }
                        aria-hidden="true"
                      />
                      <span className="font-mono-plex text-[10px] text-[var(--ink-faint)]">
                        {letter}
                      </span>
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* registration marks */}
        <div className="mt-6 pt-4 border-t border-dashed border-[rgba(27,36,49,0.25)] flex items-center justify-between">
          <p className="font-mono-plex text-[10px] text-[var(--ink-faint)]">
            SAMPLE ANSWER SHEET
          </p>
          <div className="flex gap-1.5">
            <span className="w-2 h-2 bg-[var(--ink)]" />
            <span className="w-2 h-2 border border-[var(--ink)]" />
            <span className="w-2 h-2 bg-[var(--ink)]" />
          </div>
        </div>
      </div>

      {/* grading stamp */}
      <div className="absolute -right-3 -bottom-5 sm:-right-8 bg-[var(--correct)] text-white font-mono-plex text-xs tracking-widest uppercase px-4 py-2 rotate-[-4deg] border-[1.5px] border-[var(--ink)] shadow-[3px_3px_0_var(--ink)]">
        OMR ready
      </div>
    </div>
  );
};

const steps = [
  {
    n: '01',
    title: 'Bank your questions',
    desc: 'Write once, reuse forever. Tag by topic and difficulty in per-course question banks.',
  },
  {
    n: '02',
    title: 'Generate variants',
    desc: 'One click produces many unique papers — question order and answer keys shuffled per student.',
  },
  {
    n: '03',
    title: 'Print OMR-ready',
    desc: 'Export PDF or DOCX with answer sheets the scanner can read. No manual formatting.',
  },
  {
    n: '04',
    title: 'Scan & analyze',
    desc: 'Upload results and get score distributions, question difficulty, and similarity flags.',
  },
];

const features = [
  {
    q: 'Q1',
    title: 'Variant engine',
    desc: 'Every student can sit a different exam from the same blueprint — built-in fairness, less cheating surface.',
    options: ['shuffles order', 'unique keys', 'per-course banks'],
    marked: 1,
  },
  {
    q: 'Q2',
    title: 'OMR-native exports',
    desc: 'Papers and answer sheets come out print-ready, registration marks included — the scanner workflow is first-class, not an afterthought.',
    options: ['pdf', 'docx', 'csv results'],
    marked: 0,
  },
  {
    q: 'Q3',
    title: 'Results analytics',
    desc: 'Score distributions, per-question performance, and answer-similarity flags land the moment results are in.',
    options: ['difficulty', 'skew', 'similarity'],
    marked: 2,
  },
];

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen paper grain relative overflow-hidden text-[var(--ink)]">
      {/* ======================= Masthead ======================= */}
      <header className="relative max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between">
        <a
          href="#"
          className="font-display text-2xl font-semibold tracking-tight"
        >
          ExamVault<span className="text-[var(--marker)]">.</span>
        </a>
        <nav className="flex items-center gap-3 sm:gap-6">
          <a
            href="https://github.com/RikepilB/ExamVault"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex link-underline font-medium text-sm items-center gap-1.5"
          >
            <GitHubIcon /> Source
          </a>
          {!isAuthenticated && (
            <Link to="/login" className="font-medium text-sm link-underline">
              Sign in
            </Link>
          )}
          <Link
            to={isAuthenticated ? '/dashboard' : '/signup'}
            className="btn-marker !py-2 !px-4 text-sm"
          >
            {isAuthenticated ? 'Open app' : 'Get started'}
          </Link>
        </nav>
      </header>

      {/* ======================= Hero ======================= */}
      <section className="relative max-w-6xl mx-auto px-6 pt-14 pb-20 sm:pt-24 sm:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
        <div>
          <p className="reveal reveal-1 font-mono-plex text-xs tracking-[0.25em] uppercase text-[var(--ink-soft)] mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-[var(--marker)] mr-2 align-middle" />
            Exam management for educators
          </p>
          <h1 className="reveal reveal-2 font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] font-semibold tracking-tight mb-6">
            One question bank.
            <br />
            <span className="italic font-medium">Every exam ready</span>
            <span className="text-[var(--marker)]">.</span>
          </h1>
          <p className="reveal reveal-3 text-lg sm:text-xl text-[var(--ink-soft)] max-w-xl mb-10 leading-relaxed">
            Build distinct exam variants from the questions you already wrote.
            Export papers and answer sheets, then bring the results back for
            analysis.
          </p>
          <div className="reveal reveal-4 flex flex-wrap items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-marker text-base">
                Go to your dashboard →
              </Link>
            ) : (
              <Link to="/signup" className="btn-marker text-base">
                Create an instructor account →
              </Link>
            )}
            <a href="#product-preview" className="btn-ink text-base">
              See the workflow ↓
            </a>
          </div>
          <p className="reveal reveal-5 mt-8 font-mono-plex text-xs text-[var(--ink-faint)]">
            Question bank / variant generation / print export / result analysis
          </p>
        </div>

        <AnswerSheetArtifact />
      </section>

      <section
        id="product-preview"
        className="relative border-y border-[rgba(27,36,49,0.25)] bg-[var(--paper-deep)] scroll-mt-6"
      >
        <div className="max-w-6xl mx-auto px-6 py-16 sm:py-20">
          <div className="max-w-2xl mb-10">
            <p className="font-mono-plex text-xs uppercase tracking-[0.2em] text-[var(--marker)] mb-3">
              Inside ExamVault
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-3">
              See the exam builder
            </h2>
            <p className="text-[var(--ink-soft)]">
              Actual screens from the exam creation walkthrough in the
              repository. Configure the paper, review the variant strategy, and
              generate the set.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <figure className="sheet rounded-lg overflow-hidden">
              <img
                src="/images/exam-wizard-start.png"
                alt="Exam information step with sample course, exam name and date fields"
                loading="lazy"
                className="block w-full aspect-[16/10] object-cover object-top"
              />
              <figcaption className="border-t border-[var(--rule)] px-5 py-4 text-sm">
                <span className="font-mono-plex text-[var(--marker)] mr-3">
                  01
                </span>
                Set up the exam
              </figcaption>
            </figure>
            <figure className="sheet rounded-lg overflow-hidden">
              <img
                src="/images/exam-wizard-review.png"
                alt="Review step showing sample exam summary and variant configuration"
                loading="lazy"
                className="block w-full aspect-[16/10] object-cover object-top"
              />
              <figcaption className="border-t border-[var(--rule)] px-5 py-4 text-sm">
                <span className="font-mono-plex text-[var(--marker)] mr-3">
                  02
                </span>
                Review and generate variants
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ======================= Scanner rail ======================= */}
      <section className="relative border-y border-[rgba(27,36,49,0.25)] bg-[var(--paper-deep)]">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="flex items-baseline justify-between mb-10 flex-wrap gap-2">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              From bank to bell curve in four moves
            </h2>
            <p className="font-mono-plex text-xs uppercase tracking-[0.2em] text-[var(--ink-faint)]">
              the full workflow
            </p>
          </div>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(27,36,49,0.2)] border border-[rgba(27,36,49,0.2)]">
            {steps.map((s) => (
              <li
                key={s.n}
                className="bg-[var(--paper-deep)] p-6 group hover:bg-[#fdfaf2] transition-colors"
              >
                <p className="font-mono-plex text-sm text-[var(--marker)] font-semibold mb-3">
                  {s.n}
                </p>
                <h3 className="font-display text-xl font-semibold mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                  {s.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ======================= Features as exam questions ======================= */}
      <section className="relative max-w-6xl mx-auto px-6 py-24">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Why instructors keep the key
        </h2>
        <p className="text-[var(--ink-soft)] mb-12 max-w-2xl">
          Three capabilities you would otherwise assemble from four different
          tools — here they are one graded workflow.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <article
              key={f.q}
              className="sheet rounded-lg p-7 flex flex-col gap-4 transition-transform duration-200 hover:-translate-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-plex text-sm font-semibold text-[var(--marker)]">
                  {f.q}.
                </span>
                <div className="flex gap-2">
                  {f.options.map((o, i) => (
                    <span
                      key={o}
                      className="flex items-center gap-1 font-mono-plex text-[10px] text-[var(--ink-faint)]"
                    >
                      <span
                        className={
                          i === f.marked
                            ? 'omr-bubble is-marked text-[var(--marker)]'
                            : 'omr-bubble text-[var(--ink-faint)]'
                        }
                      />
                      {o}
                    </span>
                  ))}
                </div>
              </div>
              <h3 className="font-display text-2xl font-semibold">{f.title}</h3>
              <p className="text-sm text-[var(--ink-soft)] leading-relaxed">
                {f.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ======================= Closing CTA ======================= */}
      <section className="relative border-t border-[rgba(27,36,49,0.25)]">
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <p className="font-mono-plex text-xs uppercase tracking-[0.25em] text-[var(--ink-faint)] mb-6">
            final question
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
            Ready when you write your next exam
            <span className="text-[var(--marker)]">?</span>
          </h2>
          <p className="text-[var(--ink-soft)] max-w-lg mx-auto mb-10">
            Create an account, add a course, and generate your first variant set
            today.
          </p>
          <Link
            to={isAuthenticated ? '/dashboard' : '/signup'}
            className="btn-marker text-lg !px-8 !py-4"
          >
            {isAuthenticated
              ? 'Open ExamVault →'
              : 'Create an instructor account →'}
          </Link>
        </div>
      </section>

      {/* ======================= Footer ======================= */}
      <footer className="relative border-t border-[rgba(27,36,49,0.25)]">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display font-semibold">
            ExamVault<span className="text-[var(--marker)]">.</span>
          </p>
          <p className="font-mono-plex text-xs text-[var(--ink-faint)]">
            © {new Date().getFullYear()} ExamVault · MIT licensed
          </p>
          <div className="flex items-center gap-5 text-sm">
            <a
              href="https://github.com/RikepilB/ExamVault"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5"
            >
              <GitHubIcon /> GitHub
            </a>
            <Link to="/Help" className="link-underline">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
