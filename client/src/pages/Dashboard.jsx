import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import CourseCard from '../components/CourseCard.jsx';

export default function Dashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('mine');
  const [mine, setMine] = useState([]);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.myCourses(), api.courses()])
      .then(([m, a]) => {
        setMine(m.courses);
        setAll(a.courses);
      })
      .finally(() => setLoading(false));
  }, []);

  const firstName = user?.name?.split(' ')[0] || 'there';

  return (
    <main>
      <div className="container dash-head">
        <h1>Habari, {firstName}.</h1>
        <p>Your learning, all in one place.</p>

        <div className="tabbar">
          <button className={`tab ${tab === 'mine' ? 'active' : ''}`} onClick={() => setTab('mine')}>
            My courses
          </button>
          <button className={`tab ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>
            Browse all
          </button>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          {loading ? (
            <div className="spinner">Loading…</div>
          ) : tab === 'mine' ? (
            mine.length === 0 ? (
              <div className="empty">
                <strong>You haven't enrolled yet</strong>
                Browse the catalogue and enrol in your first course.
                <div style={{ marginTop: 18 }}>
                  <button className="btn btn-gold" onClick={() => setTab('all')}>Browse all courses</button>
                </div>
              </div>
            ) : (
              <div className="grid">
                {mine.map((c) => <CourseCard key={c.id} course={c} />)}
              </div>
            )
          ) : (
            <div className="grid">
              {all.map((c) => <CourseCard key={c.id} course={c} />)}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
