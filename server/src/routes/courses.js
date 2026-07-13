import { Router } from 'express';
import db from '../db.js';
import { requireAuth } from '../auth.js';

const router = Router();

// Public catalogue — anyone can browse before signing up.
router.get('/', (req, res) => {
  const courses = db.prepare('SELECT * FROM courses ORDER BY id').all();
  res.json({ courses });
});

router.get('/:slug', (req, res) => {
  const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug);
  if (!course) return res.status(404).json({ error: 'We couldn\'t find that course.' });
  res.json({ course });
});

// Everything below needs a signed-in learner.
router.post('/:slug/enroll', requireAuth, (req, res) => {
  const course = db.prepare('SELECT * FROM courses WHERE slug = ?').get(req.params.slug);
  if (!course) return res.status(404).json({ error: 'We couldn\'t find that course.' });

  db.prepare(
    'INSERT OR IGNORE INTO enrollments (user_id, course_id) VALUES (?, ?)'
  ).run(req.user.sub, course.id);

  res.status(201).json({ enrolled: true, course });
});

router.get('/mine/list', requireAuth, (req, res) => {
  const courses = db
    .prepare(
      `SELECT c.*, e.enrolled_at
         FROM enrollments e
         JOIN courses c ON c.id = e.course_id
        WHERE e.user_id = ?
        ORDER BY e.enrolled_at DESC`
    )
    .all(req.user.sub);
  res.json({ courses });
});

export default router;
