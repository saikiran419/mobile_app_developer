const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const app = express();
const router = jsonServer.router(path.join(__dirname, '..', 'db.json'));
const middlewares = jsonServer.defaults();

app.use(express.json());
app.use(middlewares);

// Simple login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body || {};
  const db = router.db; // lowdb instance
  const user = db.get('users').find({ email, password }).value();
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const token = `fake-jwt-token-${user.id}-${Date.now()}`;
  const safeUser = Object.assign({}, user);
  delete safeUser.password;
  return res.json({ token, user: safeUser });
});

// Signup endpoint
app.post('/auth/signup', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  const db = router.db;
  const existing = db.get('users').find({ email }).value();
  if (existing) return res.status(400).json({ message: 'Email already exists' });
  const id = Date.now();
  const user = { id, email, password, name: '' };
  db.get('users').push(user).write();
  const safeUser = Object.assign({}, user);
  delete safeUser.password;
  return res.status(201).json({ user: safeUser });
});

// mount json-server router for other routes
app.use(router);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Mock API running at http://localhost:${port}`));
