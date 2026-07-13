// One thin wrapper around fetch so every call attaches the token and
// surfaces the server's error message in a predictable shape.

const BASE = import.meta.env.VITE_API_URL || '';

function token() {
  return localStorage.getItem('aoc_token');
}

async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const t = token();
  if (t) headers.Authorization = `Bearer ${t}`;

  const res = await fetch(`${BASE}/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Something went wrong. Try again.');
  }
  return data;
}

export const api = {
  register: (payload) => request('/auth/register', { method: 'POST', body: payload }),
  login: (payload) => request('/auth/login', { method: 'POST', body: payload }),
  me: () => request('/auth/me'),
  courses: () => request('/courses'),
  course: (slug) => request(`/courses/${slug}`),
  enroll: (slug) => request(`/courses/${slug}/enroll`, { method: 'POST' }),
  myCourses: () => request('/courses/mine/list'),
};
