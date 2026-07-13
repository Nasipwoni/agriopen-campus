import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function CourseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    api.course(slug)
      .then(({ course }) => setCourse(course))
      .catch(() => setCourse(null))
      .finally(() => setLoading(false));
  }, [slug]);

  async function handleEnroll() {
    if (!user) {
      navigate('/login');
      return;
    }
    setBusy(true);
    try {
      await api.enroll(slug);
      setStatus("You're enrolled. Find it under My courses.");
    } catch (err) {
      setStatus(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <div className="spinner">Loading…</div>;

  if (!course) {
    return (
      <div className="empty container" style={{ margin: '60px auto', maxWidth: 520 }}>
        <strong>Course not found</strong>
        <Link to="/" className="card-link">Back to catalogue</Link>
      </div>
    );
  }

  return (
    <main>
      <section className="detail-hero">
        <div className="container">
          <Link to="/" className="back-link" style={{ color: 'rgba(247,242,228,.7)' }}>← All courses</Link>
          <div className="card-meta" style={{ marginTop: 16 }}>
            <span className="pill pill-level">{course.level}</span>
            <span className="pill pill-time">{course.duration}</span>
          </div>
          <h1>{course.title}</h1>
        </div>
      </section>

      <section className="container detail-body">
        <p>{course.description}</p>

        {status && (
          <div className="form-error" style={{ marginTop: 24, background: 'rgba(143,192,79,.15)', borderColor: 'rgba(143,192,79,.4)', color: 'var(--green)' }}>
            {status}
          </div>
        )}

        <div style={{ marginTop: 28 }}>
          <button className="btn btn-primary" onClick={handleEnroll} disabled={busy}>
            {busy ? 'Enrolling…' : user ? 'Enrol in this course' : 'Sign in to enrol'}
          </button>
        </div>
      </section>
    </main>
  );
}
