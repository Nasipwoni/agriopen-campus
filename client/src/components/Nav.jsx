import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Sprout() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 26c0-6 3-10 10-11-1 7-5 11-10 11zm0 0c0-6-3-10-10-11 1 7 5 11 10 11z" fill="#8fc04f" />
      <rect x="15" y="14" width="2" height="12" rx="1" fill="#a4d65e" />
    </svg>
  );
}

export default function Nav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand">
          <span className="brand-mark"><Sprout /></span>
          <span className="brand-name">
            AgriOpen College
            <span>Digital Campus</span>
          </span>
        </Link>

        <nav className="nav-actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn-ghost">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-primary">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">Sign in</Link>
              <Link to="/signup" className="btn btn-gold">Join free</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
