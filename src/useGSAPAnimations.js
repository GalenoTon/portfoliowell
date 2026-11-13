import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   useGSAPAnimations
   Adiciona ao App.jsx:
     1) import useGSAPAnimations from './useGSAPAnimations';
     2) Dentro de App(), após os outros hooks:
          useGSAPAnimations();
   ───────────────────────────────────────────────────────────────── */
export default function useGSAPAnimations() {
  useEffect(() => {

    /* ── aguarda preloader fechar (600ms) antes de iniciar tudo ── */
    const DELAY = 700;
    const ctx = gsap.context(() => {});   // contexto para cleanup

    const boot = setTimeout(() => {

      /* ══════════════════════════════════════════════════════════
         1. TEXT SCRAMBLE REVEAL — h1 hero
         Cada char aparece com ruído de caracteres aleatórios antes
         de resolver para o texto real. Efeito cyberpunk premium.
         ══════════════════════════════════════════════════════════ */
      const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';
      function scrambleIn(el, onComplete) {
        if (!el) return;
        const original = el.innerText;
        let frame = 0;
        const totalFrames = 18;
        const id = setInterval(() => {
          el.innerText = original
            .split('')
            .map((ch, i) => {
              if (ch === ' ' || ch === '\n') return ch;
              if (i < (frame / totalFrames) * original.length) return ch;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('');
          frame++;
          if (frame > totalFrames) {
            clearInterval(id);
            el.innerText = original;
            onComplete?.();
          }
        }, 45);
      }

      /* aplica scramble nos spans filhos do h1 hero */
      const heroH1 = document.querySelector('main section:first-child h1');
      if (heroH1) {
        const spans = heroH1.querySelectorAll('span');
        spans.forEach((span, i) => {
          gsap.delayedCall(0.4 + i * 0.3, () => scrambleIn(span));
        });
      }


      /* ══════════════════════════════════════════════════════════
         2. HERO PARALLAX PROFUNDO — imagem de fundo move mais lento
         ══════════════════════════════════════════════════════════ */
      const heroBg = document.querySelector('main section:first-child img');
      if (heroBg) {
        gsap.to(heroBg, {
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: 'main section:first-child',
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      /* ══════════════════════════════════════════════════════════
         3. HERO TEXT DISSOLVE — texto some suavemente ao scrollar
         ══════════════════════════════════════════════════════════ */
      const heroContent = document.querySelector('main section:first-child > div:last-child');
      if (heroContent) {
        gsap.to(heroContent, {
          opacity: 0,
          y: -60,
          ease: 'power2.in',
          scrollTrigger: {
            trigger: 'main section:first-child',
            start: 'center center',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      /* ══════════════════════════════════════════════════════════
         4. MARQUEE ACELERADO — faixa de texto acelera no scroll
         ══════════════════════════════════════════════════════════ */
      const marqueeTrack = document.querySelector('.aq-marquee-track');
      if (marqueeTrack) {
        let vel = 0;
        ScrollTrigger.create({
          trigger: marqueeTrack.closest('div'),
          start: 'top 90%',
          end: 'bottom 10%',
          onUpdate: self => {
            vel = self.getVelocity();
          },
        });

        gsap.ticker.add(() => {
          if (Math.abs(vel) > 10) {
            const boost = gsap.getProperty(marqueeTrack, '--marquee-boost') || 1;
            const target = 1 + Math.min(Math.abs(vel) / 1200, 5);
            const lerped = boost + (target - boost) * 0.08;
            marqueeTrack.style.animationPlayState = 'running';
            marqueeTrack.style.animationDuration = `${30 / lerped}s`;
            vel *= 0.92;
          } else {
            marqueeTrack.style.animationDuration = '30s';
          }
        });
      }


      /* ══════════════════════════════════════════════════════════
         5. SECTION WIPE — clip-path reveal de baixo pra cima
         Cada section #about, #expertise, #work entra com wipe
         ══════════════════════════════════════════════════════════ */
      const wipeTargets = document.querySelectorAll('#about, #expertise, #work');
      wipeTargets.forEach(section => {
        gsap.fromTo(section,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power3.out',
            duration: 1.2,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });


      /* ══════════════════════════════════════════════════════════
         6. COUNTERS ANIMADOS — números nas stat-cards somam até o valor
         ══════════════════════════════════════════════════════════ */
      const statNumbers = document.querySelectorAll('.stat-card > div:first-child');
      statNumbers.forEach(el => {
        const raw = el.textContent.trim();
        const match = raw.match(/[\d,.]+/);
        if (!match) return;

        const numericStr = match[0].replace(',', '.');
        const numeric = parseFloat(numericStr);
        const prefix = raw.slice(0, raw.indexOf(match[0]));
        const suffix = raw.slice(raw.indexOf(match[0]) + match[0].length);
        const isInt = Number.isInteger(numeric);

        const obj = { val: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              val: numeric,
              duration: 1.8,
              ease: 'power3.out',
              onUpdate: () => {
                const display = isInt
                  ? Math.round(obj.val)
                  : obj.val.toFixed(1);
                el.textContent = `${prefix}${display}${suffix}`;
              },
            });
          },
        });
      });


      /* ══════════════════════════════════════════════════════════
         7. STAGGER CARDS — service-cards e accordion entram em cascata
         com rotação leve + fade
         ══════════════════════════════════════════════════════════ */
      const serviceCards = document.querySelectorAll('.service-card');
      if (serviceCards.length) {
        gsap.fromTo(serviceCards,
          { opacity: 0, y: 80, rotateX: 8 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            ease: 'power3.out',
            stagger: {
              amount: 0.6,
              from: 'start',
            },
            scrollTrigger: {
              trigger: serviceCards[0],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      const accordionPanels = document.querySelectorAll('.accordion-panel');
      if (accordionPanels.length) {
        gsap.fromTo(accordionPanels,
          { opacity: 0, scaleY: 0.85, transformOrigin: 'bottom center' },
          {
            opacity: 1,
            scaleY: 1,
            duration: 1,
            ease: 'expo.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: accordionPanels[0],
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }


      /* ══════════════════════════════════════════════════════════
         8. PROCESS TIMELINE — linha horizontal que "desenha" da esquerda
         para a direita conforme o scroll passa
         ══════════════════════════════════════════════════════════ */
      const processSection = document.querySelector('#expertise + section');
      if (processSection) {
        const lines = processSection.querySelectorAll('div[style*="height: \'1px\'"], div[style*="height:1px"], div[style*="height: 1px"]');
        /* fallback: seleciona todos os divs com height 1px dentro do processo */
        const hrLines = Array.from(processSection.querySelectorAll('div')).filter(
          d => d.style.height === '1px' && d.style.background
        );

        hrLines.forEach((line, i) => {
          const dot = line.querySelector('div');
          gsap.fromTo(line,
            { scaleX: 0, transformOrigin: 'left center' },
            {
              scaleX: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              delay: i * 0.15,
            }
          );
          if (dot) {
            gsap.fromTo(dot,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(2)',
                scrollTrigger: {
                  trigger: line,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
                delay: i * 0.15 + 0.4,
              }
            );
          }
        });
      }


      /* ══════════════════════════════════════════════════════════
         9. SECTION HEADINGS — split por palavra usando TreeWalker
         Opera só em text nodes — não toca em tags/atributos HTML
         ══════════════════════════════════════════════════════════ */
      const bigHeadings = document.querySelectorAll('#about h2, #expertise h2, #work h2');
      bigHeadings.forEach(h2 => {
        /* coleta todos os text nodes (ignora nós vazios) */
        const walker = document.createTreeWalker(h2, NodeFilter.SHOW_TEXT, null);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
          if (node.nodeValue.trim()) textNodes.push(node);
        }

        /* para cada text node, substitui por spans de palavras */
        textNodes.forEach(tn => {
          const frag = document.createDocumentFragment();
          tn.nodeValue.split(/(\s+)/).forEach(chunk => {
            if (/^\s+$/.test(chunk)) {
              frag.appendChild(document.createTextNode(chunk));
            } else if (chunk) {
              const outer = document.createElement('span');
              outer.style.cssText = 'display:inline-block;overflow:hidden;vertical-align:bottom';
              const inner = document.createElement('span');
              inner.className = 'word-inner';
              inner.style.cssText = 'display:inline-block;transform:translateY(110%);opacity:0';
              inner.textContent = chunk;
              outer.appendChild(inner);
              frag.appendChild(outer);
            }
          });
          tn.parentNode.replaceChild(frag, tn);
        });

        const inners = h2.querySelectorAll('.word-inner');
        ScrollTrigger.create({
          trigger: h2,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            gsap.to(inners, {
              y: 0,
              opacity: 1,
              duration: 0.75,
              ease: 'power3.out',
              stagger: 0.06,
            });
          },
        });
      });


      /* ══════════════════════════════════════════════════════════
         10. CTA SECTION — título gigante entra com scale + blur
         ══════════════════════════════════════════════════════════ */
      const ctaH2 = document.querySelector('main > section:nth-last-child(3) h2');
      if (ctaH2) {
        gsap.fromTo(ctaH2,
          { opacity: 0, scale: 0.75, filter: 'blur(20px)' },
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.4,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: ctaH2,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }


      /* ══════════════════════════════════════════════════════════
         11. PARALLAX SUAVE — seções com imagem de fundo no CTA
         ══════════════════════════════════════════════════════════ */
      const ctaSection = document.querySelector('main > section:nth-last-child(3)');
      if (ctaSection) {
        gsap.fromTo(ctaSection,
          { backgroundPositionY: '40%' },
          {
            backgroundPositionY: '60%',
            ease: 'none',
            scrollTrigger: {
              trigger: ctaSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }


      /* ══════════════════════════════════════════════════════════
         12. FOOTER REVEAL — entra com wipe horizontal + fade
         ══════════════════════════════════════════════════════════ */
      const footer = document.querySelector('footer');
      if (footer) {
        gsap.fromTo(footer,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footer,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }


      /* ══════════════════════════════════════════════════════════
         13. MAGNETIC CURSOR — botões primários reagem ao mouse
         ══════════════════════════════════════════════════════════ */
      const magnetBtns = document.querySelectorAll('.aq-btn-primary, .aq-btn-outline');
      magnetBtns.forEach(btn => {
        const strength = 0.35;
        btn.addEventListener('mousemove', e => {
          const rect = btn.getBoundingClientRect();
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = (e.clientX - cx) * strength;
          const dy = (e.clientY - cy) * strength;
          gsap.to(btn, {
            x: dx, y: dy,
            duration: 0.4,
            ease: 'power2.out',
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0, y: 0,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
          });
        });
      });


      /* ══════════════════════════════════════════════════════════
         14. GLITCH NO LOGO — logo pisca com glitch ao passar o mouse
         ══════════════════════════════════════════════════════════ */
      const logoSpan = document.querySelector('header a > span');
      if (logoSpan) {
        let glitchId;
        logoSpan.addEventListener('mouseenter', () => {
          let runs = 0;
          glitchId = setInterval(() => {
            logoSpan.style.transform = `translate(${(Math.random()-0.5)*4}px,${(Math.random()-0.5)*2}px)`;
            logoSpan.style.filter = `hue-rotate(${Math.random()*30}deg)`;
            runs++;
            if (runs > 8) {
              clearInterval(glitchId);
              logoSpan.style.transform = '';
              logoSpan.style.filter = '';
            }
          }, 50);
        });
      }


      /* ══════════════════════════════════════════════════════════
         15. SMOOTH SECTION TRANSITIONS — linha laranja que "varre"
         entre seções (progress indicator lateral)
         ══════════════════════════════════════════════════════════ */
      const progressBar = document.createElement('div');
      progressBar.style.cssText = `
        position: fixed;
        left: 0; top: 0;
        width: 2px;
        height: 0%;
        background: linear-gradient(to bottom, #f24405, rgba(242,68,5,0.2));
        z-index: 9998;
        pointer-events: none;
        transition: height 0.1s linear;
      `;
      document.body.appendChild(progressBar);

      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: self => {
          progressBar.style.height = `${self.progress * 100}%`;
        },
      });


      /* ── refresh ScrollTrigger depois de tudo configurado ── */
      ScrollTrigger.refresh();

    }, DELAY);

    return () => {
      clearTimeout(boot);
      ctx.revert();
      ScrollTrigger.killAll();
      /* remove progress bar */
      const pb = document.querySelector('body > div[style*="position: fixed"][style*="width: 2px"]');
      if (pb) pb.remove();
    };
  }, []);
}