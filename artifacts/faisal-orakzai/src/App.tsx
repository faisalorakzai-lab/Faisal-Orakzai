import { type FormEvent, type ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowRight, Check, ChevronRight, Menu, X } from "lucide-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Link, Route, Switch, Router as WouterRouter, useLocation } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/thinking", label: "Thinking" },
  { href: "/systems", label: "Systems" },
  { href: "/projects", label: "Projects" },
  { href: "/legacy", label: "Legacy" },
  { href: "/journal", label: "Journal" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.75, 0.2, 1] as const } },
};

function Header() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const active = (href: string) => href === "/" ? location === "/" : location.startsWith(href);
  return (
    <>
      <header className="site-header" data-testid="site-header">
        <Link href="/" className="wordmark" data-testid="link-wordmark" onClick={() => setOpen(false)}>
          <span className="wordmark-mark">F</span>
          <span>Faisal Orakzai</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={`nav-link ${active(item.href) ? "active" : ""}`} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={`nav-link ${active("/contact") ? "active" : ""}`} data-testid="link-nav-contact">Contact</Link>
        </nav>
        <div className="header-index"><span>FO / 00{navItems.findIndex((item) => active(item.href)) + 1 || "—"}</span><b>●</b></div>
        <button className="mobile-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} data-testid="button-mobile-menu">
          {open ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
        </button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="mobile-menu open" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {[...navItems, { href: "/contact", label: "Contact" }].map((item) => (
              <Link key={item.href} href={item.href} className={`mobile-link ${active(item.href) ? "active" : ""}`} onClick={() => setOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} Faisal Orakzai</span>
        <span>Built for the long term</span>
        <Link href="/contact" data-testid="link-footer-contact">Private correspondence <ArrowRight size={12} /></Link>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  return <div className="site-shell"><div className="noise" /><Header /><main className="page">{children}</main><Footer /></div>;
}

function PageIntro({ eyebrow, title, number, children }: { eyebrow: string; title: ReactNode; number: string; children?: ReactNode }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-heading">
          <div><div className="eyebrow">{eyebrow}</div><h1 className="section-title reveal">{title}</h1>{children}</div>
          <div className="section-number">{number}</div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  return (
    <>
      <section className="hero">
        <div className="orbit"><span className="orbit-dot" /></div>
        <div className="container hero-content">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="eyebrow">Founder / Investor / System Builder</div>
            <h1 className="display">I build systems<br />that shape <em>industries.</em></h1>
            <div className="hero-subline"><span /> AI. Digital Assets. Real Systems.</div>
            <div className="button-row">
              <Link href="/about" className="button" data-testid="link-hero-about">Enter the archive <ArrowRight size={14} /></Link>
              <Link href="/contact" className="button secondary" data-testid="link-hero-contact">Private correspondence</Link>
            </div>
          </motion.div>
        </div>
        <div className="hero-scroll">Scroll to explore <ArrowDown size={13} /></div>
      </section>
      <section className="section">
        <div className="container"><div className="manifesto reveal"><p>Most build products. <span>Few build systems.</span></p><p className="text-dim" style={{ marginTop: 20 }}>The distinction is everything.</p></div></div>
      </section>
      <section className="section">
        <div className="container split">
          <div><div className="eyebrow">The work</div><h2 className="section-title">From concept<br />to <em>reality.</em></h2></div>
          <div className="story-copy"><p>I build with discipline — from concept to reality.</p><p>My work sits at the intersection of technology, capital, and execution. The goal is not to follow the market. It is to understand the architecture beneath it, then build what should exist.</p><Link href="/thinking" className="button secondary" data-testid="link-home-thinking">Read the thinking <ArrowRight size={14} /></Link></div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-heading"><div><div className="eyebrow">A point of view</div><h2 className="section-title">The future belongs to those who <em>design systems.</em></h2></div><div className="section-number">01 / 03</div></div>
          <div className="portrait-strip">
            <div className="portrait-frame"><img src="/portraits/formal.png" alt="Faisal Orakzai seated in formal attire" /><span className="caption">Focus / Discipline</span></div>
            <div className="portrait-frame"><img src="/portraits/founder-portrait.jpg" alt="Faisal Orakzai in his founder portrait" /><span className="caption">The founder</span></div>
            <div className="portrait-frame"><img src="/portraits/smiling.jpg" alt="Faisal Orakzai in a relaxed setting" /><span className="caption">Human / Direct</span></div>
          </div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <>
      <PageIntro eyebrow="The founder" number="02 / 09" title={<>A long view.<br /><em>A clear standard.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>Faisal Orakzai is an entrepreneur, investor, and system builder working across the edges of technology and capital.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split">
          <div className="portrait-frame about-image"><img src="/portraits/formal.png" alt="Faisal Orakzai seated in a formal chair" /><span className="caption">Faisal Orakzai / Founder</span></div>
          <div className="story-copy"><p>“The work is bigger than the person doing it.”</p><p>Faisal Orakzai founded Orakzai Group to create enduring systems across industries that are being redrawn by technology. His work moves between artificial intelligence, digital assets, and the practical machinery of business.</p><p>He is interested in the hard middle: where a good idea meets constraints, where strategy becomes operating rhythm, and where a company earns the right to compound.</p><Link href="/systems" className="button" data-testid="link-about-systems">Explore the systems <ArrowRight size={14} /></Link></div>
        </div>
      </section>
      <section className="section">
        <div className="container"><div className="eyebrow">The operating code</div><div className="principle-grid" style={{ marginTop: 34 }}>
          {[
            ["01", "System Thinking", "See the whole before optimizing the part."],
            ["02", "Leverage", "Find the small force that changes the field."],
            ["03", "Scale", "Build once. Compound with intent."],
            ["04", "Execution", "Ideas only matter when they become real."],
          ].map(([num, title, copy]) => <div className="principle" key={num}><span className="principle-num">{num}</span><h3>{title}</h3><p>{copy}</p></div>)}
        </div></div>
      </section>
    </>
  );
}

function Thinking() {
  return (
    <>
      <PageIntro eyebrow="Notes from the edge" number="03 / 09" title={<>Think in<br /><em>systems.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>Most visible outcomes are downstream of invisible structures. These are notes on the structures worth seeing.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container"><div className="portrait-frame" style={{ height: "min(62vw, 600px)" }}><img src="/portraits/kurta.jpg" alt="Faisal Orakzai thinking in a library setting" style={{ objectPosition: "center 32%" }} /><div className="caption">A quieter room / A wider lens</div></div></div>
      </section>
      <section className="section">
        <div className="container"><div className="section-heading"><div><div className="eyebrow">Selected propositions</div><h2 className="section-title">Questions before<br /><em>answers.</em></h2></div><div className="section-number">TH / 01</div></div>
          <div className="journal-list">
            {[
              ["01", "The difference between activity and progress", "A system can be busy and still be going nowhere. The first act of leadership is choosing the measure."],
              ["02", "Why durable companies feel inevitable", "The best systems remove friction so completely that, in retrospect, their existence feels obvious."],
              ["03", "Capital is a design problem", "Money is not the strategy. It is the constraint that reveals whether the strategy is real."],
            ].map(([num, title, copy]) => <Link href="/journal" className="journal-item" key={num} data-testid={`link-thinking-${num}`}><span className="journal-date">0{num} / NOTE</span><span><h3>{title}</h3><p>{copy}</p></span><span className="journal-type">Read note <ChevronRight size={13} /></span></Link>)}
          </div>
        </div>
      </section>
    </>
  );
}

function Systems() {
  return (
    <>
      <PageIntro eyebrow="The architecture" number="04 / 09" title={<>Systems are<br /><em>the advantage.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>A company is a living system. I work on the architecture that lets it see, decide, and compound.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container"><div className="systems-list">
          {[
            ["01", "System Thinking", "Map the forces. Find the leverage. Design the feedback loop."],
            ["02", "Leverage", "Technology, capital, and distribution are multipliers — not destinations."],
            ["03", "Scale", "Build an operating model that gets stronger as it gets larger."],
            ["04", "Execution", "The strategy is the sequence of decisions made when no one is watching."],
          ].map(([num, title, copy]) => <Link href="/contact" className="system-row" key={num} data-testid={`link-system-${num}`}><span className="system-row-num">{num}</span><span><h3>{title}</h3><p>{copy}</p></span><ArrowRight className="system-arrow" size={18} /></Link>)}
        </div></div>
      </section>
      <section className="section">
        <div className="container split"><div><div className="eyebrow">A working principle</div><h2 className="section-title">Make the complex<br /><em>legible.</em></h2></div><div className="story-copy"><p>Clarity is not a communication style. It is an operating advantage.</p><p>The work is to reduce noise without reducing truth. To make the essential visible, then give a capable team the space and standards to act on it.</p></div></div>
      </section>
    </>
  );
}

function Projects() {
  return (
    <>
      <PageIntro eyebrow="Selected work" number="05 / 09" title={<>Built for<br /><em>the real world.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>A portfolio of systems in motion — each designed to solve a structural problem, not chase a moment.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container"><div className="project-grid">
          {[["01", "OTC System", "A private market infrastructure for moving with precision when liquidity is not public."], ["02", "Market Systems", "Tools and operating models for reading markets before they become consensus."], ["03", "AI Initiatives", "Applied intelligence for businesses that intend to operate at a different order of magnitude."]].map(([index, title, copy], i) => <Link key={index} href="/contact" className="project-card" data-testid={`card-project-${index}`}><div className="project-content"><span className="project-index">{index} / PROJECT</span><h3>{title}</h3><p>{copy}</p></div><ArrowRight className="arrow" size={17} /></Link>)}
        </div></div>
      </section>
      <section className="section">
        <div className="container split"><div className="portrait-frame about-image"><img src="/portraits/founders-portrait.jpg" alt="Faisal Orakzai in a white suit" /><span className="caption">Orakzai Group / In motion</span></div><div className="story-copy"><p>“Build what the market will need after the market knows it needs it.”</p><p>These projects share a bias toward infrastructure — the quiet layer that determines what becomes possible for everyone else.</p><Link href="/inner-circle" className="button" data-testid="link-projects-inner-circle">Enter the inner circle <ArrowRight size={14} /></Link></div></div>
      </section>
    </>
  );
}

function Legacy() {
  return (
    <>
      <PageIntro eyebrow="The long horizon" number="06 / 09" title={<>What remains<br /><em>is the work.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>Legacy is not a monument. It is the capability you leave behind in people, systems, and institutions.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container"><div className="legacy-quote"><blockquote>The future belongs to those who design systems.</blockquote><cite>— Faisal Orakzai</cite></div></div>
      </section>
      <section className="section">
        <div className="container split"><div><div className="eyebrow">Orakzai Group</div><h2 className="section-title">A family of<br /><em>possibilities.</em></h2></div><div className="story-copy"><p>Orakzai Group is the vehicle for a long-term view.</p><p>It brings together ventures, capital, and people around a shared standard: build with integrity, move with speed, and create things that earn their place in the future.</p><p>The ambition is measured in decades, not announcements.</p></div></div>
      </section>
      <section className="section"><div className="container"><div className="portrait-frame" style={{ height: "min(70vw, 680px)" }}><img src="/portraits/founders-portrait.jpg" alt="Faisal Orakzai standing in a white double-breasted suit" /><span className="caption">The long view</span></div></div></section>
    </>
  );
}

function Journal() {
  return (
    <>
      <PageIntro eyebrow="Private notes" number="07 / 09" title={<>The journal<br /><em>is open.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>Short observations from building, investing, and paying attention.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container"><div className="journal-list">
          {[
            ["07.04.24", "On building slowly in a fast market", "The pressure to move quickly is often a disguise for the fear of choosing correctly.", "Field note"],
            ["22.02.24", "A system is a promise kept repeatedly", "Consistency is what turns a good intention into something other people can build on.", "Principles"],
            ["14.11.23", "The quiet advantage of taste", "Taste is the discipline of noticing what does not belong — and having the courage to remove it.", "Observation"],
            ["03.08.23", "Make the invisible visible", "Every outcome has an architecture. Learn to read the architecture and the outcome becomes less mysterious.", "Systems"],
          ].map(([date, title, copy, type], index) => <article className="journal-item" key={date} data-testid={`article-journal-${index}`}><span className="journal-date">{date}</span><span><h3>{title}</h3><p>{copy}</p></span><span className="journal-type">{type}</span></article>)}
        </div></div>
      </section>
    </>
  );
}

function InnerCircle() {
  return (
    <>
      <PageIntro eyebrow="By invitation" number="08 / 09" title={<>The inner<br /><em>circle.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>A small room for thoughtful people building consequential things.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container split"><div className="portrait-frame about-image"><img src="/portraits/smiling.jpg" alt="Faisal Orakzai smiling in a relaxed setting" /><span className="caption">Direct / Human / Curious</span></div><div className="story-copy"><p>Good conversations are an investment.</p><p>The inner circle is a quiet channel for founders, operators, and capital partners who think beyond the next quarter. No broadcast. No noise. Just an exchange of useful ideas and honest questions.</p><p>If that sounds like your kind of room, start with a note.</p><Link href="/contact" className="button" data-testid="link-inner-circle-contact">Request an introduction <ArrowRight size={14} /></Link></div></div>
      </section>
      <section className="section"><div className="container"><div className="manifesto"><p>“The quality of the room determines the quality of the thinking.”</p></div></div></section>
    </>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSent(true); };
  return (
    <>
      <PageIntro eyebrow="Private correspondence" number="09 / 09" title={<>Make the<br /><em>first move.</em></>}>
        <p className="lead" style={{ marginTop: 28 }}>For considered conversations about systems, capital, or a specific opportunity.</p>
      </PageIntro>
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container contact-layout">
          <div><div className="eyebrow">A quiet channel</div><h2 className="section-title">No pitch deck<br /><em>required.</em></h2><p className="lead" style={{ marginTop: 28 }}>Write with context. A clear question is a good place to start.</p><div className="contact-list"><a href="mailto:hello@faisalorakzai.com" data-testid="link-email">hello@faisalorakzai.com</a><span className="text-dim">Dubai / Global</span></div></div>
          <div className="contact-form">
            {sent ? <div className="success-state" data-testid="status-contact-success"><div className="success-mark"><Check size={20} strokeWidth={1.5} /></div><h3 style={{ fontSize: "2rem", fontWeight: 400, letterSpacing: "-.05em" }}>Message received.</h3><p className="lead">Thank you for writing with intent. I will be in touch when the time is right.</p><button className="button secondary" onClick={() => setSent(false)} data-testid="button-send-another">Send another note</button></div> : <form onSubmit={submit} data-testid="form-contact"><div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your name" data-testid="input-contact-name" /></div><div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@domain.com" data-testid="input-contact-email" /></div><div className="field"><label htmlFor="message">Message</label><textarea id="message" name="message" required placeholder="What are you building?" data-testid="input-contact-message" /></div><button className="button" type="submit" data-testid="button-submit-contact">Send correspondence <ArrowRight size={14} /></button></form>}
          </div>
        </div>
      </section>
    </>
  );
}

function Router() {
  return <ErrorBoundary><Shell><Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
    <Route path="/thinking" component={Thinking} />
    <Route path="/systems" component={Systems} />
    <Route path="/projects" component={Projects} />
    <Route path="/legacy" component={Legacy} />
    <Route path="/journal" component={Journal} />
    <Route path="/inner-circle" component={InnerCircle} />
    <Route path="/contact" component={Contact} />
    <Route component={NotFound} />
  </Switch></Shell></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;