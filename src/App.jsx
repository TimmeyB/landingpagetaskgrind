import { useEffect, useRef, useState } from 'react'

const STATS_URL = 'https://tgd-web-base.vercel.app/api/stats'

/* Signature element: a grid of applicant dots that resolves from
   "50 applied" down to "10 approved" -- the literal shape of screening. */
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
      <div className="pool-caption">
        <span className="pool-num">{total}</span> applied, <span className="pool-num accent">{approved}</span> approved
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
        <a href="#create-campaign" className="btn btn-moss nav-cta">Create a campaign</a>
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
          <a href="#create-campaign" className="btn btn-moss" onClick={() => setOpen(false)}>Create a campaign</a>
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
          <div className="kicker">Recruiting testers on Telegram right now</div>
          <h1>Stop guessing who your users are.</h1>
          <p className="hero-sub">
            TaskGrind finds the right people for beta tests, feedback rounds, and growth campaigns.
            You set the criteria, applicants apply in, and nothing goes out until you approve who fits.
          </p>
          <div className="cta-row">
            <a href="#create-campaign" className="btn btn-moss">Create a campaign</a>
            <a href="#how-it-works" className="btn btn-ghost">See how it works</a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="pool-frame">
            <div className="pool-frame-head">
              <span className="pool-frame-title">beta testers, round two</span>
              <span className="pool-frame-pill">Pool open</span>
            </div>
            <PoolVisual total={50} approved={10} size="sm" />
          </div>
        </div>
      </div>
    </header>
  )
}

function StatsStrip() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    fetch(STATS_URL)
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {})
  }, [])

  if (!stats || !stats.totalTesters) return null

  return (
    <section className="stats-strip" aria-label="Live platform numbers">
      <div className="wrap stats-inner">
        <div className="stat">
          <span className="stat-num">{stats.totalTesters}</span>
          <span className="stat-label">real testers signed up</span>
        </div>
        <div className="stat">
          <span className="stat-num">2 min</span>
          <span className="stat-label">for a new campaign to go live</span>
        </div>
        <div className="stat">
          <span className="stat-num">100%</span>
          <span className="stat-label">of submissions reviewed by a human</span>
        </div>
      </div>
    </section>
  )
}

function Problem() {
  return (
    <section id="problem">
      <div className="wrap">
        <h2>Finding the right users takes forever, and it is a coin flip when you do.</h2>
        <p className="problem-statement">
          Posting in a group chat gets you volume. It does not get you the right ten people.
          <strong> Most founders end up chasing applicants across DMs and spreadsheets by hand,
          or skip the vetting entirely and hope the feedback turns out useful.</strong>
        </p>
        <div className="problem-reasons">
          <div className="problem-reason">
            <h4>Slow</h4>
            <p>Chasing applicants one by one across chats eats hours you do not have.</p>
          </div>
          <div className="problem-reason">
            <h4>Unreliable</h4>
            <p>No structured screening means no way to tell a fit from a freeloader upfront.</p>
          </div>
          <div className="problem-reason">
            <h4>Wrong audience</h4>
            <p>You get people who will do anything for a payout, not people who match your target user.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { t: 'Create campaign', d: 'Set up what you are running: a beta test, feedback round, or engagement push.' },
    { t: 'Define requirements', d: 'Specify who you need and attach a form to collect structured answers.' },
    { t: 'Open screening pool', d: 'Applicants apply in. Nothing goes out until you say so.' },
    { t: 'Review applicants', d: 'Screen manually, or let automatic rules filter for you.' },
    { t: 'Approve the best fits', d: 'Pick exactly who gets in. Everyone else stays out.' },
    { t: 'Run and collect feedback', d: 'Approved users complete the campaign, and feedback flows back to you.' },
  ]
  return (
    <section id="how-it-works" className="raised">
      <div className="wrap">
        <h2>One pipeline, from who you need to what they said.</h2>
        <p className="section-sub">Every campaign moves through the same six stages, and you are in control at each one.</p>
        <div className="flow">
          {steps.map((s, i) => (
            <div className="flow-row" key={s.t}>
              <span className="flow-index">{i + 1}</span>
              <div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
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
          <h2>Need specific users? Screen them before they get access.</h2>
          <p className="section-sub">
            This is what separates a campaign from a blast. Applicants apply into a pool, and you decide
            who actually gets let in.
          </p>
          <ul className="feature-list">
            <li><strong>Automatic screening.</strong> Set rules once, let qualifying applicants in without touching every submission.</li>
            <li><strong>Manual screening.</strong> Read every answer yourself and approve one by one.</li>
            <li><strong>Applicant answers.</strong> Ask the questions that actually tell you if someone fits.</li>
            <li><strong>Media submissions.</strong> Request a screenshot, recording, or photo as proof before approval.</li>
            <li><strong>Approve only who you want.</strong> Reject the rest. There is no obligation to take everyone who applies.</li>
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
    { t: 'Beta testing', d: 'Get real first time users on your product before a wider launch, with structured feedback attached.' },
    { t: 'User acquisition', d: 'Recruit genuine sign ups and installs from people who complete the full flow.' },
    { t: 'Feedback collection', d: 'Route screened respondents straight into a form built for the answers you actually need.' },
    { t: 'Engagement', d: 'Grow follows, joins, and reviews from real accounts, verified with proof.' },
  ]
  return (
    <section id="campaign-types">
      <div className="wrap">
        <h2>Whatever you are running, it fits the same pipeline.</h2>
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
    <section id="walkthrough" className="raised">
      <div className="wrap">
        <h2>What running a campaign actually looks like.</h2>
        <div className="mock-window">
          <div className="mock-topbar">
            <span className="mock-dot" /><span className="mock-dot" /><span className="mock-dot" />
            <span className="mock-title mono">taskgrind/dashboard</span>
          </div>
          <div className="mock-body-wide">
            <div className="mock-col">
              <span className="mock-col-label">Campaign</span>
              <p className="mock-heavy">Beta testers, round two</p>
              <span className="pill pill-open" style={{ marginTop: 10 }}>Pool open</span>
              <div className="mock-stat-row">
                <div><span className="mock-stat-num">50</span><span className="mock-stat-label">applied</span></div>
                <div><span className="mock-stat-num accent">10</span><span className="mock-stat-label">approved</span></div>
                <div><span className="mock-stat-num">4</span><span className="mock-stat-label">pending</span></div>
              </div>
            </div>
            <div className="mock-col mock-applicants">
              <span className="mock-col-label">Applicants</span>
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
    <section id="results">
      <div className="wrap">
        <h2>Early, real, and still growing.</h2>
        <p className="proof-note">
          TaskGrind has run engagement and growth campaigns since launch. It is early.
          Case studies and customer quotes will go here once there is a campaign worth featuring in detail.
        </p>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Who is TaskGrind for?', a: 'Founders and teams who need real users for beta testing, feedback, or growth campaigns and want to control who gets in.' },
    { q: 'What type of users can I recruit?', a: 'Whoever fits your requirements. You define who you are looking for when you set up the campaign.' },
    { q: 'How does screening work?', a: 'Applicants apply into a pool. You review answers and any media they submit, then approve or reject, or set rules to screen automatically.' },
    { q: 'Can I choose my own requirements?', a: 'Yes. You define the questions, the criteria, and whether screening is manual or automatic.' },
    { q: 'How does feedback collection work?', a: 'Attach a form to your campaign to collect structured responses from approved users once they complete it.' },
    { q: 'How much does it cost?', a: 'Get in touch to talk through pricing for your campaign.' },
    { q: 'How quickly can I launch a campaign?', a: 'Most campaigns can be set up and opened for applicants the same day.' },
  ]
  const [openIdx, setOpenIdx] = useState(null)
  return (
    <section id="faq">
      <div className="wrap">
        <h2>Questions founders ask first.</h2>
        <div className="faq-list">
          {items.map((it, i) => (
            <div className={`faq-item ${openIdx === i ? 'is-open' : ''}`} key={it.q}>
              <button className="faq-q" onClick={() => setOpenIdx(openIdx === i ? null : i)} aria-expanded={openIdx === i}>
                <span>{it.q}</span>
                <span className="faq-icon" aria-hidden="true">{openIdx === i ? '\u2212' : '+'}</span>
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
        <h2 style={{ margin: '0 auto 16px' }}>Have a campaign to run?</h2>
        <p className="section-sub" style={{ margin: '0 auto 40px' }}>Get the users you actually need, not just the ones who showed up first.</p>
        <div className="cta-row">
          <a href="https://tgd-web-base.vercel.app/dashboard/new-campaign" className="btn btn-moss">Create your campaign</a>
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
        <div className="foot-left">TaskGrind. Real users, screened in.</div>
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
      <StatsStrip />
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
