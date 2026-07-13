import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if we have a token, ask the server who it belongs to.
  // A stale or bad token just clears itself.
  useEffect(() => {
    const token = localStorage.getItem('aoc_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .me()
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem('aoc_token'))
      .finally(() => setLoading(false));
  }, []);

  function persist({ token, user }) {
    localStorage.setItem('aoc_token', token);
    setUser(user);
  }

  async function login(email, password) {
    persist(await api.login({ email, password }));
  }

  async function register(name, email, password) {
    persist(await api.register({ name, email, password }));
  }

  function logout() {
    localStorage.removeItem('aoc_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
