import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import CourseCard from '../components/CourseCard.jsx';

const STATS = [
  { v: '17+', l: 'Accredited Courses' },
  { v: '6', l: 'Partner HEIs' },
  { v: 'KNQA', l: 'Nationally Registered' },
  { v: 'Free', l: 'Open Access' },
];

const PARTNERS = [
  'University of Nairobi', 'SEKU', 'Laikipia University', 'Egerton University',
  'HAMK University', 'NHL Stenden', 'KNQA', 'Ministry of Education Kenya',
];

const FEATURES = [
  { i: '📚', c: 'j', h: 'Unified SIS & LMS', p: 'Student records, course delivery, and academic administration in one seamless system, with no switching between platforms.' },
  { i: '🎯', c: 'e', h: 'Outcome-Based Education', p: 'CBE-aligned competency tracking from programme to course level. Every skill is measured, mapped, and registered with KNQA.' },
  { i: '📝', c: 's', h: 'Exam Management', p: 'Online proctored exams with AI invigilation, automated transcript generation, and secure result publication.' },
  { i: '🏅', c: 'j', h: 'RPL — Prior Learning', p: 'Earn KNQA credentials for skills gained through work experience. Upload evidence, get assessed, get recognised.' },
  { i: '🤖', c: 'e', h: 'AOC Intelligence (AI)', p: 'Predictive exam readiness, learning-velocity benchmarking, and job matching powered by learning data.' },
  { i: '📱', c: 's', h: 'Mobile & Offline First', p: 'Works in low-bandwidth areas. SMS notifications keep every learner informed, wherever they are.' },
];

export default function Landing() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.courses()
      .then(({ courses }) => setCourses(courses))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="hero-eyebrow">Kenya's Open Agricultural Learning Platform</span>
            <h1>Learn. Earn. Grow.</h1>
            <p className="hero-sub">
              AgriOpen College unifies learning, qualifications, and career pathways for Kenyan
              farmers, students, and professionals. Accredited by KNQA, powered by CBE, free to access.
            </p>
            <div className="hero-ctas">
              <Link to="/signup" className="btn btn-gold btn-lg">Start Learning Free →</Link>
              <a href="#features" className="btn btn-white btn-lg">See how it works</a>
            </div>
            <div className="hero-stats">
              {STATS.map((s) => (
                <div className="h-stat" key={s.l}>
                  <div className="hv">{s.v}</div>
                  <div className="hl">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hc-row">
                <div className="hc-ico">🌱</div>
                <div>
                  <div className="hc-title">Climate-Smart Agriculture</div>
                  <div className="hc-sub">KNQF Level 5 · in progress</div>
                </div>
              </div>
              <div className="mini-prog"><div className="mini-prog-fill" style={{ width: '68%' }} /></div>
            </div>
            <div className="hero-card">
              <div className="hc-title" style={{ marginBottom: 6 }}>Credentials earned</div>
              <span className="hc-badge">CBE verified</span>
              <span className="hc-badge gold">KNQA registered</span>
              <span className="hc-badge">RPL eligible</span>
            </div>
            <div className="hero-card">
              <div className="hc-row">
                <div className="hc-ico">📶</div>
                <div>
                  <div className="hc-title">Works offline</div>
                  <div className="hc-sub">Synced when you're back online</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partner strip */}
      <div className="partner-strip">
        <div className="container partner-inner">
          <span className="partner-label">Partner institutions</span>
          <div className="partners">
            {PARTNERS.map((p, i) => (
              <span key={p} style={{ display: 'inline-flex', gap: 22, alignItems: 'center' }}>
                <span className="p-hei">{p}</span>
                {i < PARTNERS.length - 1 && <span className="p-dot">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="section" id="features">
        <div className="container">
          <div className="section-head">
            <div className="section-label">Platform Features</div>
            <h2 className="section-h2">One platform. Every touchpoint of agricultural education.</h2>
            <p className="section-sub">
              From enrolment to KNQA registration: unified SIS, LMS, outcome-based education, exam
              management, RPL, and AI analytics in a single open platform.
            </p>
          </div>
          <div className="feat-grid">
            {FEATURES.map((f) => (
              <div className="feat-cell" key={f.h}>
                <div className={`feat-ico ${f.c}`}>{f.i}</div>
                <div className="feat-h">{f.h}</div>
                <p className="feat-p">{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course catalogue (live from the API) */}
      <section className="section" id="catalogue" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div className="section-label">Course Catalogue</div>
            <h2 className="section-h2">Practical skills, mapped to national qualifications.</h2>
            <p className="section-sub">Every course carries a KNQF level, so what you learn counts toward recognised credit.</p>
          </div>

          {loading ? (
            <div className="spinner">Loading courses…</div>
          ) : courses.length === 0 ? (
            <div className="empty">
              <strong>No courses yet</strong>
              The catalogue loads once the API has seeded its starter courses.
            </div>
          ) : (
            <div className="grid">
              {courses.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
