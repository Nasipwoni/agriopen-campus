import { Link } from 'react-router-dom';

export default function CourseCard({ course }) {
  return (
    <article className="card">
      <div className="card-meta">
        <span className="pill pill-level">{course.level}</span>
        <span className="pill pill-time">{course.duration}</span>
      </div>
      <h3>{course.title}</h3>
      <p>{course.summary}</p>
      <Link to={`/courses/${course.slug}`} className="card-link">View course →</Link>
    </article>
  );
}
