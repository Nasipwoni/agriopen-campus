import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import CourseCard from '../components/CourseCard.jsx';

const ACCREDITORS = ['KNQA', 'TVETA', 'CUE', 'KUCCPS', 'Erasmus+'];

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
      <section className="hero">
        <div className="container hero-inner">
          <span className="eyebrow">Open agricultural learning · Kenya</span>
          <h1>Learn to farm smarter, <em>wherever you are.</em></h1>
          <p>
            Short, credit-bearing courses in climate-smart agriculture, agribusiness, and
            extension work. Built for farmers, cooperatives, and field officers, and delivered
            on any phone.
          </p>
          <div className="hero-cta">
            <Link to="/signup" className="btn btn-gold">Join free</Link>
            <a href="#catalogue" className="btn btn-ghost" style={{ color: 'var(--cream)', borderColor: 'rgba(247,242,228,.3)' }}>
              Browse courses
            </a>
          </div>
          <div className="badges">
            {ACCREDITORS.map((a) => <span key={a} className="badge">{a}</span>)}
          </div>
        </div>
      </section>

      <section className="section" id="catalogue">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Course catalogue</span>
            <h2>Practical skills, mapped to national qualifications.</h2>
            <p>Every course carries a KNQF level, so what you learn counts toward recognised credit.</p>
          </div>

          {loading ? (
            <div className="spinner">Loading courses…</div>
          ) : courses.length === 0 ? (
            <div className="empty">
              <strong>No courses yet</strong>
              Run the seed script on the API to load the starter catalogue.
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
