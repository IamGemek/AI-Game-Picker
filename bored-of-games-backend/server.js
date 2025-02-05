const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Test MySQL connection
db.query('SELECT 1')
  .then(() => console.log('✅ Connected to MySQL'))
  .catch((err) => console.error('❌ MySQL Connection Error:', err));

/* ==========================
   Users API (Basic CRUD)
   ========================== */

// Get all users
app.get('/users', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM users');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new user (No password encryption for now)
app.post('/users', async (req, res) => {
  const { username, email } = req.body;

  try {
    await db.query('INSERT INTO users (username, email) VALUES (?, ?)', [username, email]);
    res.json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================
   Game Preferences API
   ========================== */

// Get all preferences
app.get('/preferences', async (req, res) => {
  try {
    const [preferences] = await db.query('SELECT * FROM game_preferences');
    res.json(preferences);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add game preferences
app.post('/preferences', async (req, res) => {
  const { user_id, favorite_genres, preferred_platforms } = req.body;

  try {
    await db.query(
      'INSERT INTO game_preferences (user_id, favorite_genres, preferred_platforms) VALUES (?, ?, ?)',
      [user_id, favorite_genres, preferred_platforms]
    );
    res.json({ message: 'Game preferences added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================
   Saved Games API
   ========================== */

// Get all saved games
app.get('/saved-games', async (req, res) => {
  try {
    const [savedGames] = await db.query('SELECT * FROM saved_games');
    res.json(savedGames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a new game
app.post('/saved-games', async (req, res) => {
  const { user_id, game_title, game_id, genre, platform } = req.body;

  try {
    await db.query(
      'INSERT INTO saved_games (user_id, game_title, game_id, genre, platform) VALUES (?, ?, ?, ?, ?)',
      [user_id, game_title, game_id, genre, platform]
    );
    res.json({ message: 'Game saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
