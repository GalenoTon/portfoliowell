import { useEffect, useState } from 'react';

const loadingPhrases = [
  'Construindo presença.',
  'Carregando identidade.',
  'Preparando a experiência.',
];

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('counting');   // counting → reveal → exit
  const [count, setCount] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);

  /* ── counter 0 → 100 ── */
  useEffect(() => {
    const start = performance.now();
    const duration = 2200;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase('reveal');
        setTimeout(() => setPhase('exit'), 900);
        setTimeout(() => onComplete?.(), 1600);
      }
    };

    let raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  /* ── phrase cycling ── */
  useEffect(() => {
    if (phase !== 'counting') return;
    const id = setInterval(() => {
      setPhraseIdx((i) => (i + 1) % loadingPhrases.length);
    }, 700);
    return () => clearInterval(id);
  }, [phase]);

  const isExit = phase === 'exit';
  const isReveal = phase === 'reveal' || phase === 'exit';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&display=swap');

        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-400-normal.woff2') format('woff2');
          font-weight: 400;
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-700-normal.woff2') format('woff2');
          font-weight: 700;
        }
        @font-face {
          font-family: 'Geist';
          src: url('https://cdn.jsdelivr.net/fontsource/fonts/geist-sans@latest/latin-900-normal.woff2') format('woff2');
          font-weight: 900;
        }

        .ls-root {
          position: fixed; inset: 0; z-index: 9999;
          background: #030303;
          display: flex; flex-direction: column;
          font-family: 'Geist', 'Inter', sans-serif;
          overflow: hidden;
          transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1),
                      transform 0.7s cubic-bezier(0.16,1,0.3,1);
        }
        .ls-root.exit {
          opacity: 0;
          transform: scale(1.04);
          pointer-events: none;
        }

        /* noise */
        .ls-noise {
          position: absolute; inset: 0; pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* orange glow orb */
        .ls-orb {
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: #f24405;
          filter: blur(160px);
          opacity: 0.07;
          pointer-events: none;
          transition: opacity 1.2s;
        }
        .ls-orb.bright { opacity: 0.18; }

        /* main content */
        .ls-body {
          position: relative; z-index: 2;
          flex: 1; display: flex; flex-direction: column;
          justify-content: space-between;
          padding: clamp(28px, 5vw, 52px) clamp(28px, 5vw, 52px);
        }

        /* logo row */
        .ls-logo {
          display: flex; align-items: center; gap: 10px;
          opacity: 0; animation: lsFadeUp 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .ls-logo-icon {
          width: 32px; height: 32px;
          background: #f24405;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 900; color: #fff;
        }
        .ls-logo-text {
          font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #fff;
        }
        .ls-logo-text span { color: #f24405; }

        /* center block */
        .ls-center {
          display: flex; flex-direction: column; align-items: flex-start; gap: 32px;
        }

        /* big counter */
        .ls-counter-wrap {
          position: relative;
          opacity: 0; animation: lsFadeUp 0.6s 0.25s cubic-bezier(0.16,1,0.3,1) forwards;
          overflow: hidden;
        }
        .ls-counter {
          font-size: clamp(7rem, 22vw, 18rem);
          font-weight: 900;
          letter-spacing: -0.06em;
          line-height: 0.85;
          color: #fff;
          display: flex; align-items: baseline; gap: 4px;
          user-select: none;
        }
        .ls-counter-pct {
          font-size: clamp(2rem, 5vw, 5rem);
          font-weight: 700;
          color: #f24405;
          letter-spacing: -0.03em;
          align-self: flex-end;
          margin-bottom: 0.5em;
        }

        /* progress bar */
        .ls-bar-track {
          width: 100%; height: 1px;
          background: rgba(255,255,255,0.07);
          position: relative; overflow: hidden;
          opacity: 0; animation: lsFadeUp 0.6s 0.35s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .ls-bar-fill {
          position: absolute; top: 0; left: 0; height: 100%;
          background: #f24405;
          transition: width 0.08s linear;
          box-shadow: 0 0 8px rgba(242,68,5,0.6);
        }
        .ls-bar-dot {
          position: absolute; top: 50%; right: 0;
          transform: translateY(-50%);
          width: 6px; height: 6px; border-radius: 50%;
          background: #f24405;
          box-shadow: 0 0 8px #f24405;
        }

        /* bottom row */
        .ls-bottom {
          display: flex; align-items: flex-end; justify-content: space-between;
          opacity: 0; animation: lsFadeUp 0.6s 0.4s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        .ls-phrase {
          font-size: clamp(11px, 1.4vw, 13px);
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #444;
          transition: opacity 0.35s, transform 0.35s;
          max-width: 300px;
        }
        .ls-phrase.changing {
          opacity: 0; transform: translateY(6px);
        }
        .ls-year {
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.25em; text-transform: uppercase;
          color: #222;
        }

        /* reveal curtain — diagonal wipe */
        .ls-curtain {
          position: absolute; inset: 0; z-index: 10;
          background: #030303;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
          transition: clip-path 0.9s cubic-bezier(0.87,0,0.13,1);
          pointer-events: none;
        }
        .ls-curtain.open {
          clip-path: polygon(0 0, 100% 0, 100% 0%, 0 0%);
        }

        /* corner decorations */
        .ls-corner {
          position: absolute;
          width: 24px; height: 24px;
          opacity: 0.15;
          animation: lsFadeIn 0.5s 0.6s ease forwards;
        }
        .ls-corner-tl { top: 52px; right: clamp(28px,5vw,52px); }
        .ls-corner-br { bottom: 52px; left: clamp(28px,5vw,52px); transform: rotate(180deg); }

        @keyframes lsFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lsFadeIn {
          from { opacity: 0; } to { opacity: 0.15; }
        }
      `}</style>

      <div className={`ls-root${isExit ? ' exit' : ''}`}>
        <div className="ls-noise" />
        <div
          className={`ls-orb${isReveal ? ' bright' : ''}`}
          style={{ top: '30%', left: '50%', transform: 'translate(-50%,-50%)' }}
        />

        {/* diagonal reveal curtain */}
        <div className={`ls-curtain${isReveal ? ' open' : ''}`} />

        {/* corner brackets */}
        <svg className="ls-corner ls-corner-tl" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
          <path d="M24 0 H0 V24" />
        </svg>
        <svg className="ls-corner ls-corner-br" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5">
          <path d="M24 0 H0 V24" />
        </svg>

        <div className="ls-body">
          {/* logo */}
          <div className="ls-logo">
            <div className="ls-logo-icon">A</div>
            <span className="ls-logo-text">Aquele<span>Ton</span></span>
          </div>

          {/* center */}
          <div className="ls-center">
            <div className="ls-counter-wrap">
              <div className="ls-counter">
                <span>{String(count).padStart(3, '0')}</span>
                <span className="ls-counter-pct">%</span>
              </div>
            </div>

            <div style={{ width: '100%', maxWidth: 640 }}>
              <div className="ls-bar-track">
                <div className="ls-bar-fill" style={{ width: `${count}%` }}>
                  <div className="ls-bar-dot" />
                </div>
              </div>
            </div>
          </div>

          {/* bottom */}
          <PhraseRow idx={phraseIdx} phrases={loadingPhrases} />
        </div>
      </div>
    </>
  );
}

function PhraseRow({ idx, phrases }) {
  const [visible, setVisible] = useState(true);
  const [displayed, setDisplayed] = useState(phrases[idx]);

  useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => {
      setDisplayed(phrases[idx]);
      setVisible(true);
    }, 350);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <div className="ls-bottom">
      <span className={`ls-phrase${!visible ? ' changing' : ''}`}>
        {displayed}
      </span>
      <span className="ls-year">© {new Date().getFullYear()}</span>
    </div>
  );
}