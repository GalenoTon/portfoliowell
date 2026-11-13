import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ReactLenis } from 'lenis/react';
import Preloader from './Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const EMAIL = 'well.galeno@gmail.com';
const WA = 'https://wa.me/5521964603524';

const CustomStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{font-size:16px}
body{background:#030303;color:#fafafa}
.aq-root{font-family:'Inter',sans-serif;background:#030303;color:#fafafa;overflow-x:hidden;min-height:100vh}
.container-aq{width:100%;max-width:1400px;margin:0 auto;padding:0 clamp(20px,5vw,40px)}
:focus-visible{outline:2px solid #f24405;outline-offset:3px}
@keyframes marquee{to{transform:translateX(-50%)}}
.marquee{display:inline-flex;white-space:nowrap;animation:marquee 30s linear infinite}
.text-stroke{-webkit-text-stroke:1.5px rgba(255,255,255,.55);color:transparent}
.text-gradient{background:linear-gradient(135deg,#f24405,#ff8a3d);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.orange{color:#f24405}
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.fade-up{opacity:0}
.ready .fade-up{animation:fadeUp .7s cubic-bezier(.16,1,.3,1) both}
.d1{animation-delay:.1s!important}.d2{animation-delay:.2s!important}.d3{animation-delay:.3s!important}.d4{animation-delay:.4s!important}.d5{animation-delay:.55s!important}
.reveal{opacity:0;transform:translateY(48px);transition:opacity 1s cubic-bezier(.19,1,.22,1),transform 1s cubic-bezier(.19,1,.22,1)}
.reveal.is-visible{opacity:1;transform:none}
@media (max-width:767px){.reveal{opacity:1;transform:none;transition:none}.aq-glow{display:none}}
@keyframes modalIn{from{opacity:0;transform:scale(.98) translateY(16px)}to{opacity:1;transform:none}}
.modal-box{animation:modalIn .5s cubic-bezier(.16,1,.3,1) both}
.pill{display:inline-flex;align-items:center;gap:8px;font-size:11px;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:#f24405;margin-bottom:20px}
.h2{font-size:clamp(2.4rem,6vw,5.5rem);font-weight:900;letter-spacing:-.04em;text-transform:uppercase;line-height:.98}
.lead{color:#a3a3a3;font-size:16px;font-weight:300;line-height:1.8}
.nav-link{position:relative;color:#a3a3a3;font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;transition:color .3s;background:none;border:0;cursor:pointer;font-family:inherit}
.nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:#f24405;transition:width .3s}
.nav-link:hover{color:#fff}.nav-link:hover::after{width:100%}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;font-family:inherit;font-size:12px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;padding:17px 34px;cursor:pointer;text-decoration:none;transition:all .3s;border:1px solid #f24405}
.btn-p{background:#f24405;color:#fff}.btn-p:hover{background:#fff;color:#000;border-color:#fff}
.btn-o{background:transparent;color:#f24405}.btn-o:hover{background:#f24405;color:#fff}
.input{appearance:none;background:#0a0a0a;border:1px solid rgba(255,255,255,.1);color:#fff;padding:14px 16px;font-family:inherit;font-size:15px;width:100%;outline:none;border-radius:0;transition:border-color .3s}
.input::placeholder{color:#666}.input:focus{border-color:#f24405}
label,.lbl{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#a3a3a3}
.grid-auto{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:1px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06)}
.card{background:#030303;padding:clamp(28px,5vw,44px) clamp(22px,4vw,36px);cursor:pointer;text-align:left;color:inherit;font-family:inherit;border:0;display:flex;flex-direction:column;gap:14px;min-height:300px;position:relative;transition:background .4s}
.card:hover{background:#0b0b0b}
.card h3{font-size:clamp(1.4rem,2.4vw,1.9rem);font-weight:900;letter-spacing:-.03em;text-transform:uppercase;line-height:1.05;white-space:pre-line}
.card p{color:#a3a3a3;font-size:15px;line-height:1.7;font-weight:300}
.card .tag{font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#f24405}
.card .more{margin-top:auto;display:flex;align-items:center;gap:12px;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#a3a3a3}
.arrow{width:36px;height:36px;border:1px solid rgba(255,255,255,.15);border-radius:50%;display:flex;align-items:center;justify-content:center;transition:all .3s}
.card:hover .arrow{background:#f24405;border-color:#f24405}
.stat{background:#030303;padding:36px 24px;text-align:center}
.stat b{display:block;font-size:clamp(2rem,4vw,3rem);font-weight:900;color:#f24405;letter-spacing:-.04em;line-height:1;margin-bottom:10px}
.chip{flex:1 1 auto;padding:12px 16px;background:transparent;border:1px solid rgba(255,255,255,.1);color:#a3a3a3;font:inherit;font-size:13px;cursor:pointer;transition:all .3s;text-align:center;border-radius:0}
.chip:hover{border-color:rgba(255,255,255,.3);color:#fff}
.chip.on{border-color:#f24405;color:#f24405;background:rgba(242,68,5,.06)}
.fab{position:fixed;z-index:70;width:56px;height:56px;border-radius:50%;background:rgba(10,10,10,.95);border:1px solid rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;color:#fff;cursor:pointer;box-shadow:0 8px 32px rgba(0,0,0,.4);transition:all .3s;text-decoration:none}
.fab:hover{background:#f24405;border-color:#f24405}
.wa{bottom:24px;right:24px;color:#25D366}.wa:hover{background:#25D366;color:#fff}
.menu{top:20px;right:20px}
@media (min-width:768px){.menu{display:none}}
.mobile-overlay{position:fixed;inset:0;background:rgba(3,3,3,.99);z-index:60;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;transition:opacity .4s,visibility .4s}
.mobile-overlay.closed{opacity:0;visibility:hidden;pointer-events:none}
.mobile-overlay a{font-size:clamp(2.2rem,8vw,4rem);font-weight:900;text-transform:uppercase;letter-spacing:-.03em;color:#fff;text-decoration:none}
.step{border-top:1px solid rgba(255,255,255,.12);padding-top:28px;position:relative}
.step::before{content:'';position:absolute;top:-4px;left:0;width:8px;height:8px;border-radius:50%;background:#f24405}
.link{color:#a3a3a3;font-size:15px;text-decoration:none;font-weight:300;transition:color .25s}
.link:hover{color:#f24405}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important}.reveal,.fade-up{opacity:1!important;transform:none!important}}
`}} />
);

/* ───────────── DADOS ───────────── */
const stats = [
  { num: '~3.000', label: 'Usuários ativos', sub: 'no sistema que mantive na QWST' },
  { num: '6 anos', label: 'Em dados e desenvolvimento', sub: 'de estagiário de BI a fullstack' },
  { num: '2º lugar', label: "Desafio L'Oréal", sub: 'Semana de Administração, PUC-Rio' },
];

const services = [
  {
    big: '01', tag: 'Dados & contexto', title: 'Análise de\ndados', headline: 'Informação confiável para decisões mais claras.',
    desc: 'Transformo bases dispersas em informação confiável: coleta, limpeza, conferência e análise exploratória com Excel e SQL.',
    details: 'Da preparação dos dados à interpretação dos resultados, com atenção a padrões e tendências que ajudem a decidir.'
  },
  {
    big: '02', tag: 'Dashboards & visualização', title: 'Business\nIntelligence', headline: 'Dar clareza ao que os dados têm a dizer.',
    desc: 'Dashboards no Tableau que mostram o que importa para quem precisa decidir rápido.',
    details: 'Vivência em BI na QWST, com uso diário de Excel e preparação de bases para análise.'
  },
  {
    big: '03', tag: 'Python & integrações', title: 'Automação de\nprocessos', headline: 'Menos tarefas repetitivas. Mais espaço para analisar.',
    desc: 'Rotinas em Python e integrações via APIs REST que tiram o trabalho manual do caminho.',
    details: 'Levantamento de requisitos e organização de workflows para soluções alinhadas a cada operação.'
  },
  {
    big: '04', tag: 'Fullstack & negócios', title: 'Sistemas sob\nmedida', headline: 'Tecnologia construída a partir de problemas reais.',
    desc: 'Sites e sistemas do levantamento de requisitos à entrega, em contato direto com quem usa.',
    details: 'Atuação próxima aos clientes: entender a demanda, validar a solução e acompanhar as entregas. Formação Full-Stack com foco em .NET (Forsoft / Instituto Infnet).'
  },
];

const cases = [
  {
    big: 'CASE', tag: 'PUC-Rio · Design Thinking', title: 'Colmeiah', headline: 'Plataforma de empreendedorismo universitário.',
    desc: 'Projeto eleito o mais promissor da turma de Design Thinking. Conecta estudantes que querem empreender dentro da universidade.',
    details: 'Concepção do produto, PRD e documentação, do problema ao desenho da plataforma.'
  },
  {
    big: 'CASE', tag: 'Sistema web · Mobile first', title: 'Catálogo\nNosso Stock', headline: 'Gestão de produtos pensada para o celular.',
    desc: 'Sistema de catálogo com busca, cadastro, edição e exclusão de produtos, desenhado para uso no dia a dia pelo celular.',
    details: 'Foco em rapidez de operação e em uma interface simples para quem atualiza o catálogo.'
  },
];

const trajectory = [
  {
    big: '2020', tag: 'Jun/2020 — Jul/2021 · QWST', title: 'Do dado bruto\nao dashboard', headline: 'Onde tudo começou: estágio em Business Intelligence.',
    desc: 'Coleta, limpeza, preparação e conferência de dados de diferentes fontes.',
    details: 'Uso diário de Excel, dashboards no Tableau, análise exploratória e automação de tarefas com Python.'
  },
  {
    big: '3.000', tag: 'Jul/2021 — Jun/2023 · QWST', title: 'Sistema com ~3.000\nusuários ativos', headline: 'Desenvolvimento e manutenção para grandes operações.',
    desc: "Na QWST, atuei em sistemas para empresas como Votorantim, Carrefour/Atacadão, Bob's e Marisa.",
    details: 'Manutenção de um sistema de gerenciamento com cerca de 3.000 usuários ativos, dashboards, integrações via APIs REST e melhorias de processos.'
  },
  {
    big: '2023', tag: '2023 — Atual · Freelancer', title: 'Sites e sistemas para o\ncomércio exterior', headline: 'Do briefing à entrega, direto com o cliente.',
    desc: 'Desenvolvimento de sites e sistemas para empresas do setor, como fullstack freelancer.',
    details: 'Levantamento de requisitos, organização de informações e soluções para automatizar processos. Contato direto com clientes para validar soluções e acompanhar entregas.'
  },


];

const education = [
  { step: '2012 — 2015', title: 'Base administrativa', desc: 'Técnico Administrativo (Senac RJ), Assistente Administrativo (SENAI) e Jovem Aprendiz na FMC Technologies do Brasil, em rotinas de documentos, controle e projetos sociais.' },
  { step: '2015', title: 'Full-Stack', desc: 'Forsoft / Instituto Infnet. Desenvolvimento Full-Stack com foco em .NET.' },
  { step: '2026 · Cursando', title: 'Administração', desc: 'Graduação na PUC-Rio. Gestão somada à minha experiência técnica e ao objetivo de empreender.' },
];

const topics = ['Oportunidade profissional', 'Dados e BI', 'Desenvolvimento', 'Parceria para empreender', 'Outro assunto'];

/* ───────────── SOM (opt-in) ───────────── */
let soundOn = true;
const click = () => {
  if (!soundOn) return;
  const a = new Audio('/sounds/soft-click.mp3');
  a.volume = 0.15;
  a.play().catch(() => { });
};

/* ───────────── MODAL ───────────── */
function Modal({ data, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const prev = document.activeElement;
    closeRef.current?.focus();
    const fn = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') { // mantém o foco dentro do modal
        const els = document.querySelectorAll('[role=dialog] a, [role=dialog] button');
        if (!els.length) return;
        const first = els[0], last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', fn);
    return () => { window.removeEventListener('keydown', fn); prev?.focus?.(); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8" onClick={onClose}>
      <div className="absolute inset-0 bg-[#030303]/90 backdrop-blur-xl" />
      <div role="dialog" aria-modal="true" aria-label={data.title.replace('\n', ' ')}
        className="modal-box relative w-full max-w-5xl max-h-[92vh] md:h-[70vh] bg-[#050505] rounded-[2rem] shadow-2xl flex flex-col-reverse md:flex-row overflow-hidden border border-white/5"
        onClick={(e) => e.stopPropagation()}>
        <div className="w-full md:w-3/5 overflow-y-auto flex items-center" style={{ padding: 'clamp(28px,5vw,56px)' }}>
          <div className="w-full max-w-lg mx-auto">
            <span className="pill">{data.tag}</span>
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] text-white mb-6" style={{ whiteSpace: 'pre-line' }}>{data.title}</h3>
            <p className="text-zinc-300 text-lg font-light mb-6 leading-snug">{data.headline}</p>
            <p className="text-zinc-300 text-base leading-relaxed font-light mb-4">{data.desc}</p>
            <p className="text-zinc-400 text-sm leading-relaxed font-light mb-10">{data.details}</p>
            <a href="#contact" onClick={() => { click(); onClose(); }}
              className="inline-flex items-center gap-3 text-white text-xs font-bold tracking-[0.2em] uppercase hover:text-[#f24405] transition-colors pb-2 border-b border-white/20 hover:border-[#f24405]">
              Conversar sobre isso <ArrowRight size={14} />
            </a>
          </div>
        </div>
        <div className="w-full md:w-2/5 h-[22vh] md:h-full relative bg-[#020202] flex items-center justify-center flex-shrink-0 overflow-hidden">
          <span className="text-stroke font-black tracking-tighter select-none" style={{ fontSize: 'clamp(3.5rem,10vw,7rem)' }} aria-hidden="true">{data.big}</span>
          <button ref={closeRef} onClick={() => { click(); onClose(); }} aria-label="Fechar"
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-white hover:bg-[#f24405] hover:border-[#f24405] transition-all">
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

const CardGrid = ({ items, onOpen }) => (
  <div className="grid-auto reveal reveal-d">
    {items.map((it, i) => (
      <button key={i} className="card" onClick={() => { click(); onOpen(it); }}>
        <span className="tag">{it.tag}</span>
        <h3>{it.title}</h3>
        <p>{it.desc}</p>
        <span className="more"><span className="arrow"><ArrowUpRight size={14} color="#fff" /></span>Ver detalhes</span>
      </button>
    ))}
  </div>
);

/* ───────────── APP ───────────── */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState(null);
  const [focus, setFocus] = useState('');
  const [sound, setSound] = useState(false);
  const [copied, setCopied] = useState(false);
  // const glowRef = useRef(null);

  // Preloader só na primeira visita da sessão
  const [isLoading, setIsLoading] = useState(() => {
    try { return !sessionStorage.getItem('seen'); } catch { return true; }
  });
  const [progress, setProgress] = useState(0);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : true);
  const reduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const fn = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  useEffect(() => {
    if (!isLoading) return;
    let p = 0;
    const id = setInterval(() => {
      p = Math.min(100, p + Math.floor(Math.random() * 20) + 10);
      setProgress(p);
      if (p >= 100) {
        clearInterval(id);
        setTimeout(() => { setIsLoading(false); try { sessionStorage.setItem('seen', '1'); } catch { } }, 300);
      }
    }, 100);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -15% 0px', threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [isDesktop]);

  useEffect(() => {
    document.body.style.overflow = menuOpen || modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen, modal]);

  // useEffect(() => {
  //   if (!isDesktop) return;
  //   const fn = (e) => { if (glowRef.current) glowRef.current.style.transform = `translate3d(${e.clientX - 350}px,${e.clientY - 350}px,0)`; };
  //   window.addEventListener('mousemove', fn, { passive: true });
  //   return () => window.removeEventListener('mousemove', fn);
  // }, [isDesktop]);

  const toggleSound = () => { soundOn = !soundOn; setSound(soundOn); click(); };

  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(EMAIL); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { }
  };

  const handleContact = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = `Contato pelo portfólio — ${focus || 'Vamos conversar'}`;
    const body = `Nome: ${f.get('name')}\nE-mail: ${f.get('email')}\nWhatsApp: ${f.get('phone') || 'Não informado'}\n\n${f.get('message')}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const navItems = [['#expertise', 'Competências'], ['#work', 'Trajetória'], ['#contact', 'Contato']];

  const content = (
    <div className={`aq-root ${isLoading ? '' : 'ready'}`}>
      <Preloader isLoading={isLoading} loadProgress={progress} />
      <CustomStyles />
      {/* <div ref={glowRef} className="aq-glow" /> */}
      {modal && <Modal data={modal} onClose={() => setModal(null)} />}

      <a href={WA} target="_blank" rel="noopener noreferrer" className="fab wa" onClick={click} aria-label="Falar no WhatsApp">
        <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 26 }} />
      </a>
      <button className="fab menu" onClick={() => { click(); setMenuOpen(!menuOpen); }} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <nav className={`mobile-overlay ${menuOpen ? '' : 'closed'}`} aria-label="Menu móvel">
        {navItems.map(([href, label]) => (
          <a key={href} href={href} onClick={() => { click(); setMenuOpen(false); }}>{label}</a>
        ))}
      </nav>

      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all .6s cubic-bezier(.16,1,.3,1)',
        padding: scrolled ? '14px 0' : '26px 0', background: scrolled ? 'rgba(3,3,3,.9)' : 'transparent',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,.06)' : 'transparent'}`,
        backdropFilter: scrolled && isDesktop ? 'blur(24px)' : 'none',
      }}>
        <div className="container-aq" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href="#" onClick={click} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <img src="/logo.png" alt="" width="28" height="28" decoding="async" style={{ objectFit: 'contain' }} />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-.02em', color: '#fff' }}>Wellington<span className="orange"> Galeno</span></span>
          </a>
          <nav className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }} aria-label="Principal">
            {navItems.slice(0, 2).map(([href, label]) => <a key={href} href={href} className="nav-link" onClick={click}>{label}</a>)}
            {/* <button className="nav-link" onClick={toggleSound} aria-pressed={sound} title="Som dos cliques">Som: {sound ? 'on' : 'off'}</button> */}
            <a href="#contact" className="btn btn-p" onClick={click} style={{ padding: '12px 26px' }}>Entrar em contato <ArrowUpRight size={14} /></a>
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section style={{ minHeight: '100svh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '10vh', position: 'relative', overflow: 'hidden' }}>

          {/* FUNDO */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }} aria-hidden="true">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop"
              alt=""
              fetchPriority="high"
              decoding="async"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, filter: 'grayscale(0.4)' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #030303 0%, rgba(3,3,3,.4) 45%, #030303 100%)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #030303 20%, transparent 100%)' }} />
          </div>

          <div className="container-aq" style={{ paddingTop: 10, position: 'relative', zIndex: 2 }}>
            {/* ...resto do seu conteúdo, sem mudanças */}
            <div style={{ paddingTop: 120, position: 'relative', zIndex: 2 }}>
              <p className="pill fade-up d1">Analista de dados · Desenvolvedor · Rio de Janeiro</p>
              <h1 className="fade-up d2" style={{ fontSize: 'clamp(2.5rem,11vw,7rem)', fontWeight: 900, letterSpacing: '-.04em', lineHeight: .95, textTransform: 'uppercase', marginBottom: '5vh', maxWidth: 1100 }}>
                Wellington<br /><span className="text-stroke">Jorge C.</span><br /><span className="text-[#f24405]">Galeno</span>
              </h1>
              <p className="lead fade-up d3" style={{ maxWidth: 560, marginBottom: '6vh' }}>
                Há mais de 5 anos transformo dados e código em soluções que empresas realmente usam, de dashboards no Tableau a um sistema com cerca de 3.000 usuários ativos. Hoje estudo Administração na PUC-Rio para construir o meu próprio negócio.
              </p>
              <div className="fade-up d4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <a href="#contact" className="btn btn-p" onClick={click}>Falar comigo <ArrowRight size={16} /></a>
                <a href="#work" className="btn btn-o" onClick={click}>Ver trajetória</a>
                <a href="/Wellington_Galeno_Curriculo.pdf" download className="nav-link">Baixar currículo (PDF) ↗</a>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', borderBottom: '1px solid rgba(255,255,255,.06)', overflow: 'hidden', background: '#050505', padding: '14px 0' }} aria-hidden="true">
          <div className="marquee">
            {[0, 1].map((r) => (
              <div key={r} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {['Análise de Dados', 'Business Intelligence', 'Python', 'SQL', 'Tableau', 'Excel', 'APIs REST', 'Empreendedorismo'].map((t) => (
                  <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 28, paddingRight: 28 }}>
                    <span style={{ color: '#8a8a8a', fontSize: 11, fontWeight: 700, letterSpacing: '.28em', textTransform: 'uppercase' }}>{t}</span>
                    <span className="orange" style={{ fontSize: 8 }}>◆</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* SOBRE */}
        <section id="about" style={{ padding: '120px 0 80px', background: '#020202' }}>
          <div className="container-aq">
            <h2 className="h2 reveal" style={{ maxWidth: 900, marginBottom: 64 }}>
              Do dado ao produto.<br /><span className="orange">Do código ao negócio.</span>
            </h2>
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(32px,7vw,80px)', marginBottom: 72, maxWidth: 1100, alignItems: 'start' }}>
              <img src="/foto.jpg" alt="Wellington Galeno" width="480" height="560" loading="lazy" decoding="async"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ width: '100%', maxWidth: 360, aspectRatio: '6/7', objectFit: 'cover', filter: 'grayscale(.4)', border: '1px solid rgba(255,255,255,.08)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p style={{ color: '#f3f4f6', fontSize: 'clamp(1.15rem,2vw,1.4rem)', lineHeight: 1.5 }}>
                  Me chamo Wellington Jorge. Comecei em 2020 como estagiário de BI na QWST e posteriormente me tornei desenvolvedor fullstack na empresa, entregando e gerenciando sistemas para empresas parceiras como Votorantim, Carrefour/Atacadão, Bob's e Marisa.
                </p>
                <p className="lead">
                  Desde 2023 atuo por conta própria, criando sites e sistemas para o comércio exterior. Em 2026 entrei em Administração na PUC-Rio para somar gestão à técnica e dar base ao meu objetivo: empreender.
                </p>
                <div style={{ borderLeft: '2px solid #f24405', paddingLeft: 22 }}>
                  <p style={{ fontSize: 14, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: '#d1d5db', lineHeight: 1.7 }}>
                    Entender o problema.<br />Construir com propósito. Evoluir com dados.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid-auto reveal">
              {stats.map((s) => (
                <div key={s.label} className="stat">
                  <b>{s.num}</b>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: '#a3a3a3', fontSize: 13 }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJETOS */}
        {/* <section id="cases" style={{ padding: '100px 0 40px', background: '#020202' }}>
          <div className="container-aq">
            <div className="reveal" style={{ marginBottom: 56 }}>
              <span className="pill">Projetos</span>
              <h2 className="h2">O que já<br /><span className="orange">construí</span></h2>
            </div>
            <CardGrid items={cases} onOpen={(it) => setModal(it)} />
          </div>
        </section> */}

        {/* COMPETÊNCIAS */}
        <section id="expertise" style={{ padding: '100px 0', background: '#020202' }}>
          <div className="container-aq">
            <div className="reveal" style={{ marginBottom: 56 }}>
              <span className="pill">O que levo para cada projeto</span>
              <h2 className="h2">O que eu<br /><span className="orange">entrego</span></h2>
            </div>
            <CardGrid items={services} onOpen={(it) => setModal(it)} />
          </div>
        </section>

        {/* TRAJETÓRIA */}
        <section id="work" style={{ padding: '60px 0 100px', background: '#020202' }}>
          <div className="container-aq">
            <div className="reveal" style={{ marginBottom: 56 }}>
              <span className="pill">Experiência aplicada</span>
              <h2 className="h2">Minha<br /><span className="orange">trajetória</span></h2>
            </div>
            <CardGrid items={trajectory} onOpen={(it) => setModal(it)} />
          </div>
        </section>

        {/* FORMAÇÃO */}
        <section id="education" style={{ padding: '60px 0 100px', background: '#020202' }}>
          <div className="container-aq">
            <div className="reveal" style={{ marginBottom: 64 }}>
              <span className="pill">Formação</span>
              <h2 className="h2">Formação<br /><span className="orange">acadêmica.</span></h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(250px,1fr))', gap: 40 }}>
              {education.map((p) => (
                <div key={p.title} className="step reveal">
                  <span className="pill" style={{ marginBottom: 10 }}>{p.step}</span>
                  <h3 style={{ fontSize: 22, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>{p.title}</h3>
                  <p className="lead" style={{ fontSize: 15, maxWidth: 320 }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EMPREENDER */}
        <section id="entrepreneurship" style={{ padding: 'clamp(80px,12vw,160px) 20px', textAlign: 'center', background: 'radial-gradient(ellipse at center,rgba(242,68,5,.08),#020202 70%)' }}>
          <div className="reveal" style={{ maxWidth: 900, margin: '0 auto' }}>
            <span className="pill" style={{ justifyContent: 'center' }}>Foco no horizonte</span>
            <h2 style={{ fontSize: 'clamp(2.5rem,7vw,6.5rem)', fontWeight: 900, letterSpacing: '-.04em', textTransform: 'uppercase', lineHeight: .92, marginBottom: 36 }}>
              Quero transformar<br /><span className="text-gradient">sonhos em realidade.</span>
            </h2>
            <p className="lead" style={{ maxWidth: 560, margin: '0 auto 48px', color: '#ccc' }}>
              Meu objetivo é empreender unindo dados, tecnologia e gestão: encontrar problemas que valem a pena resolver e construir soluções sustentáveis. Se você tem uma ideia, ou quer aprender e construir junto, vamos conversar.
            </p>
            <a href="#contact" className="btn btn-p" onClick={click}>Propor uma parceria <ArrowRight size={16} /></a>
          </div>
        </section>

        {/* CONTATO */}
        <section id="contact" style={{ padding: '80px 0 100px', background: '#020202' }}>
          <div className="container-aq" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'clamp(40px,8vw,100px)' }}>
            <div className="reveal">
              <span className="pill">Contato</span>
              <h2 className="h2" style={{ marginBottom: 24 }}>Vamos<br /><span className="orange">conversar.</span></h2>
              <p className="lead" style={{ maxWidth: 380, marginBottom: 40 }}>Vaga, projeto ou ideia de negócio? Conte em poucas linhas e eu retorno.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="orange" style={{ width: 48, height: 48, background: '#050505', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: 20 }} />
                  </div>
                  <div>
                    <p className="lbl">E-mail direto</p>
                    <a href={`mailto:${EMAIL}`} className="link" style={{ color: '#fff' }}>{EMAIL}</a>
                    <button type="button" onClick={copyEmail} className="nav-link" style={{ marginLeft: 14 }}>{copied ? 'Copiado ✓' : 'Copiar'}</button>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="orange" style={{ width: 48, height: 48, background: '#050505', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: 22 }} />
                  </div>
                  <div>
                    <p className="lbl">WhatsApp</p>
                    <a href={WA} target="_blank" rel="noopener noreferrer" className="link" style={{ color: '#fff' }}>+55 (21) 96460-3524</a>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleContact} className="reveal" style={{ background: '#050505', border: '1px solid rgba(255,255,255,.07)', padding: 'clamp(28px,5vw,48px)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 20, marginBottom: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label htmlFor="c-name">Nome completo</label>
                  <input id="c-name" name="name" required autoComplete="name" className="input" placeholder="Como posso chamar você?" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <label htmlFor="c-phone">WhatsApp (opcional)</label>
                  <input id="c-phone" name="phone" type="tel" autoComplete="tel" className="input" placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                <label htmlFor="c-email">E-mail</label>
                <input id="c-email" name="email" type="email" required autoComplete="email" className="input" placeholder="seu@email.com" />
              </div>
              <fieldset style={{ border: 0, marginBottom: 20 }}>
                <legend className="lbl" style={{ marginBottom: 12 }}>Qual o assunto?</legend>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {topics.map((t) => (
                    <button key={t} type="button" aria-pressed={focus === t} className={`chip ${focus === t ? 'on' : ''}`} onClick={() => { click(); setFocus(t); }}>{t}</button>
                  ))}
                </div>
              </fieldset>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                <label htmlFor="c-msg">Sua mensagem</label>
                <textarea id="c-msg" name="message" required rows={4} className="input" style={{ resize: 'vertical' }} placeholder="Conte sobre a oportunidade, o projeto ou a ideia." />
              </div>
              <button type="submit" className="btn btn-p" style={{ width: '100%' }}>Abrir no meu e-mail <ArrowRight size={16} /></button>
              <p style={{ color: '#8a8a8a', fontSize: 12, textAlign: 'center', marginTop: 16, lineHeight: 1.6 }}>
                O botão abre seu aplicativo de e-mail com a mensagem preenchida. O envio é feito por você.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* RODAPÉ */}
      <footer style={{ background: '#020202', padding: '80px 0 0', borderTop: '1px solid rgba(255,255,255,.05)' }}>
        <div className="container-aq">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 60, justifyContent: 'space-between', paddingBottom: 64 }}>
            <div style={{ flex: '1 1 300px', maxWidth: 420 }}>
              <span style={{ fontWeight: 700, fontSize: 24, letterSpacing: '-.02em', display: 'block', marginBottom: 20 }}>Wellington<span className="orange"> Galeno</span></span>
              <p className="lead" style={{ fontSize: 15, color: '#8a8a8a' }}>Dados, tecnologia e gestão para resolver problemas reais. Rio de Janeiro, RJ.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px,6vw,80px)' }}>
              <nav aria-label="Navegar">
                <h4 className="lbl" style={{ marginBottom: 20 }}>Navegar</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[['#about', 'Sobre mim'], ['#cases', 'Projetos'], ['#expertise', 'Competências'], ['#work', 'Trajetória'], ['#education', 'Formação'], ['#contact', 'Contato']].map(([h, l]) => (
                    <li key={h}><a href={h} className="link" onClick={click}>{l}</a></li>
                  ))}
                </ul>
              </nav>
              <nav aria-label="Contato">
                <h4 className="lbl" style={{ marginBottom: 20 }}>Contato</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[[WA, 'WhatsApp'], ['https://www.linkedin.com/in/wellington-galeno', 'LinkedIn'], [`mailto:${EMAIL}`, 'E-mail']].map(([h, l]) => (
                    <li key={l}><a href={h} className="link" onClick={click} {...(h.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{l} ↗</a></li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '28px 0', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between' }}>
            <span style={{ color: '#8a8a8a', fontSize: 11, fontWeight: 600, letterSpacing: '.14em', textTransform: 'uppercase' }}>© {new Date().getFullYear()} Wellington Galeno. Todos os direitos reservados.</span>
            <a href="/Wellington_Galeno_Curriculo.pdf" download className="nav-link">Baixar currículo</a>
          </div>
        </div>
      </footer>
    </div>
  );

  return isDesktop && !reduced ? <ReactLenis root options={{ lerp: 0.08, duration: 1.2 }}>{content}</ReactLenis> : content;
}