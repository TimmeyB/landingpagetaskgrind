import { useEffect, useRef, useState } from 'react'

/* ---------- Pool visual: the signature element ----------
   A grid of applicant dots that resolves from "50 applied"
   down to "10 approved" — the literal shape of what screening does. */
function PoolVisual({ total = 50, approved = 10, size = 'lg' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.35 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const approvedSet = useRef(
    new Set(
      Array.from({ length: total }, (_, i) => i)
        .sort(() => 0.5 - Math.random())
        .slice(0, approved)
    )
  ).current

  return (
    <div className={`pool pool-${size}`} ref={ref}>
      <div className="pool-grid" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`pool-dot ${active && approvedSet.has(i) ? 'is-approved' : ''} ${active ? 'is-settled' : ''}`}
            style={{ transitionDelay: `${(i % 10) * 28 + Math.floor(i / 10) * 40}ms` }}
          />
        ))}
      </div>
      <div className="pool-caption mono">
        <span className="pool-num">{total}</span> applied &nbsp;→&nbsp; <span className="pool-num accent">{approved}</span> approved
      </div>
    </div>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <nav>
      <div className="wrap nav-inner">
        <a href="#top" className="logo">Task<span>Grind</span></a>
        <div className="nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#screening">Screening</a>
          <a href="#campaign-types">Campaign types</a>
          <a href="#faq">FAQ</a>
        </div>
        <a href="#create-campaign" className="btn btn-green nav-cta">Create a Campaign</a>
        <button className="nav-burger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </div>
      {open && (
        <div className="nav-mobile wrap">
          <a href="#how-it-works" onClick={() => setOpen(false)}>How it works</a>
          <a href="#screening" onClick={() => setOpen(false)}>Screening</a>
          <a href="#campaign-types" onClick={() => setOpen(false)}>Campaign types</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
          <a href="#create-campaign" className="btn btn-green" onClick={() => setOpen(false)}>Create a Campaign</a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Now recruiting on Telegram</div>
          <h1>Stop guessing who your users are.<br /><span className="accent">Screen them in.</span></h1>
          <p className="hero-sub">
            TaskGrind is where startups find the right people for beta tests, feedback rounds, and
            growth campaigns — then filter down to the ones who actually fit, before a single invite goes out.
          </p>
          <div className="cta-row hero-ctas">
            <a href="#create-campaign" className="btn btn-green">Create a Campaign</a>
            <a href="#how-it-works" className="btn btn-ghost">See how it works ↓</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="mock-window">
            <div className="mock-topbar">
              <span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" />
              <span className="mock-title mono">campaign / beta-testers-v2</span>
            </div>
            <div className="mock-body">
              <div className="mock-row">
                <span className="mock-label mono">STATUS</span>
                <span className="pill pill-open">Pool open</span>
              </div>
              <div className="mock-row">
                <span className="mock-label mono">SCREENING</span>
                <span className="pill pill-manual">Manual review</span>
              </div>
              <PoolVisual total={50} approved={10} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Current status">
      <div className="wrap trust-bar-inner">
        <div className="trust-item">
          <span className="mono trust-tag">LIVE</span>
          <p>Running campaigns for early customers since launch</p>
        </div>
        <div className="trust-item">
          <span className="mono trust-tag">VERIFIED</span>
          <p>Every applicant reviewed before they get access</p>
        </div>
        <div className="trust-item">
          <span className="mono trust-tag">BUILT FOR FOUNDERS</span>
          <p>No agency, no middleman — you run the pool</p>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section id="problem">
      <div className="wrap">
        <div className="section-tag">The problem</div>
        <h2>Finding the right users takes forever, and it's a coin flip when you do.</h2>
        <p className="section-sub">
          Posting in a group chat gets you volume. It doesn't get you the right ten people. Founders end up
          manually chasing applicants across DMs, spreadsheets, and screenshots — or skipping the vetting
          altogether and hoping the feedback is useful.
        </p>
        <div className="problem-grid">
          <div className="problem-card">
            <h4>Slow</h4>
            <p>Chasing applicants one by one across chats eats hours you don't have.</p>
          </div>
          <div className="problem-card">
            <h4>Unreliable</h4>
            <p>No structured screening means no way to tell a fit from a freeloader upfront.</p>
          </div>
          <div className="problem-card">
            <h4>Wrong audience</h4>
            <p>You get people who'll do anything for a payout, not people who match your target user.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { t: 'Create campaign', d: 'Set up what you\u2019re running — beta test, feedback round, or engagement push.' },
    { t: 'Define requirements', d: 'Specify who you need and attach a form to collect structured answers.' },
    { t: 'Open screening pool', d: 'Applicants apply in. Nothing goes out until you say so.' },
    { t: 'Review applicants', d: 'Screen manually, or let automatic rules filter for you.' },
    { t: 'Approve the best fits', d: 'Pick exactly who gets in — everyone else stays out.' },
    { t: 'Run + collect feedback', d: 'Approved users complete the campaign, feedback flows back to you.' },
  ]
  return (
    <section id="how-it-works" className="raised">
      <div className="wrap">
        <div className="section-tag">How TaskGrind works</div>
        <h2>One pipeline, from "who do I need" to "here's what they said."</h2>
        <p className="section-sub">Every campaign moves through the same six stages — you're in control at each one.</p>
        <div className="flow">
          {steps.map((s, i) => (
            <div className="flow-card" key={s.t}>
              <span className="flow-index mono">{String(i + 1).padStart(2, '0')}</span>
              <h4>{s.t}</h4>
              <p>{s.d}</p>
              {i < steps.length - 1 && <span className="flow-arrow" aria-hidden="true">↓</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Screening() {
  return (
    <section id="screening">
      <div className="wrap screening-grid">
        <div>
          <div className="section-tag">The core feature</div>
          <h2>Need specific users? Screen them before they get access.</h2>
          <p className="section-sub" style={{ marginBottom: 32 }}>
            This is what separates a campaign from a blast. Applicants apply into a pool — you decide
            who's actually let in.
          </p>
          <ul className="feature-list">
            <li><strong>Automatic screening.</strong> Set rules once, let qualifying applicants in without touching every submission.</li>
            <li><strong>Manual screening.</strong> Read every answer yourself and approve one by one.</li>
            <li><strong>Applicant answers.</strong> Ask the questions that actually tell you if someone fits.</li>
            <li><strong>Media submissions.</strong> Request a screenshot, recording, or photo as proof before approval.</li>
            <li><strong>Approve only who you want.</strong> Reject the rest — no obligation to take everyone who applies.</li>
          </ul>
        </div>
        <div className="screening-visual">
          <PoolVisual total={50} approved={10} size="lg" />
          <p className="screening-visual-caption">A pool of 50 applicants, screened down to the 10 who fit.</p>
        </div>
      </div>
    </section>
  )
}

function CampaignTypes() {
  const types = [
    { t: 'Beta testing', d: 'Get real first-time users on your product before a wider launch, with structured feedback attached.' },
    { t: 'User acquisition', d: 'Recruit genuine sign-ups and installs from people who complete the full flow.' },
    { t: 'Feedback collection', d: 'Route screened respondents straight into a form built for the answers you actually need.' },
    { t: 'Engagement', d: 'Grow follows, joins, and reviews from real accounts, verified with proof.' },
  ]
  return (
    <section id="campaign-types" className="raised">
      <div className="wrap">
        <div className="section-tag">Built for</div>
        <h2>Whatever you're running, it fits the same pipeline.</h2>
        <div className="type-grid">
          {types.map(t => (
            <div className="type-card" key={t.t}>
              <h4>{t.t}</h4>
              <p>{t.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Walkthrough() {
  return (
    <section id="walkthrough">
      <div className="wrap">
        <div className="section-tag">Inside the dashboard</div>
        <h2>What running a campaign actually looks like.</h2>
        <div className="mock-window mock-wide">
          <div className="mock-topbar">
            <span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" />
            <span className="mock-title mono">taskgrind / dashboard</span>
          </div>
          <div className="mock-body mock-body-wide">
            <div className="mock-col">
              <span className="mock-label mono">CAMPAIGN</span>
              <p className="mock-heavy">Beta testers — v2</p>
              <span className="pill pill-open" style={{ marginTop: 10 }}>Pool open</span>
              <div className="mock-stat-row">
                <div><span className="mock-stat-num">50</span><span className="mock-stat-label mono">applied</span></div>
                <div><span className="mock-stat-num accent">10</span><span className="mock-stat-label mono">approved</span></div>
                <div><span className="mock-stat-num">4</span><span className="mock-stat-label mono">pending</span></div>
              </div>
            </div>
            <div className="mock-col mock-applicants">
              <span className="mock-label mono">APPLICANTS</span>
              {['@dara_t', '@kayodegg', '@ijeoma_dev'].map((h, i) => (
                <div className="applicant-row" key={h}>
                  <span>{h}</span>
                  <span className={`pill ${i === 0 ? 'pill-approved' : 'pill-pending'}`}>{i === 0 ? 'Approved' : 'Reviewing'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  return (
    <section id="results" className="raised">
      <div className="wrap">
        <div className="section-tag">Where things stand</div>
        <h2>Early, real, and still growing.</h2>
        <p className="section-sub">
          TaskGrind has run engagement and growth campaigns since launch. It's early — case studies
          and customer quotes will go here once there's a campaign worth featuring in detail.
        </p>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Who is TaskGrind for?', a: 'Founders and teams who need real users for beta testing, feedback, or growth campaigns and want to control who gets in.' },
    { q: 'What type of users can I recruit?', a: 'Whoever fits your requirements — you define who you\u2019re looking for when you set up the campaign.' },
    { q: 'How does screening work?', a: 'Applicants apply into a pool. You review answers and any media they submit, then approve or reject — or set rules to screen automatically.' },
    { q: 'Can I choose my own requirements?', a: 'Yes. You define the questions, the criteria, and whether screening is manual or automatic.' },
    { q: 'How does feedback collection work?', a: 'Attach a form to your campaign to collect structured responses from approved users once they complete it.' },
    { q: 'How much does it cost?', a: 'Get in touch to talk through pricing for your campaign.' },
    { q: 'How quickly can I launch a campaign?', a: 'Most campaigns can be set up and opened for applicants the same day.' },
  ]
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="faq">
      <div className="wrap">
        <div className="section-tag">FAQ</div>
        <h2>Questions founders ask first.</h2>
        <div className="faq-list">
          {items.map((it, i) => (
            <div className={`faq-item ${openIdx === i ? 'is-open' : ''}`} key={it.q}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>
                <span>{it.q}</span>
                <span className="faq-icon" aria-hidden="true">{openIdx === i ? '−' : '+'}</span>
              </button>
              {openIdx === i && <p className="faq-a">{it.a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section id="create-campaign" className="cta-banner">
      <div className="wrap">
        <div className="section-tag" style={{ margin: '0 auto 14px' }}>Get started</div>
        <h2 style={{ margin: '0 auto 16px' }}>Have a campaign to run?</h2>
        <p className="section-sub" style={{ margin: '0 auto 40px' }}>Get the users you actually need — not just the ones who showed up first.</p>
        <div className="cta-row">
          <a href="https://tgd-web-base.vercel.app/dashboard/new-campaign" className="btn btn-green">Create Your Campaign</a>
          <a href="#how-it-works" className="btn btn-ghost">Revisit how it works</a>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <div className="foot-left">TaskGrind — real users, screened in.</div>
        <div className="foot-links">
          <a href="https://t.me/TaskGrindBot">Bot</a>
          <a href="https://t.me/+EEDVwNc2s345OGVk">Community</a>
          <a href="https://t.me/Skiiddd">Support</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <TrustBar />
      <Problem />
      <HowItWorks />
      <Screening />
      <CampaignTypes />
      <Walkthrough />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  )
}
