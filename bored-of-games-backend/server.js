require("dotenv").config();
const express = require('express');
const cors = require('cors');
const axios = require("axios");
const bodyParser = require('body-parser');
const db = require('./db');
const { OpenAI } = require("openai");


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// AI-Based Game Recommendations
app.post("/recommend-games", async (req, res) => {
  const preferences = req.body;

  // Debugging: Log received preferences
  console.log("Received Preferences:", preferences);

  if (!preferences) {
    return res.status(400).json({ error: "No preferences provided" });
  }

  // Ensure default values if undefined
  const genres = preferences.genres || [];
  const favoriteGames = preferences.favoriteGames || [];
  const platforms = preferences.platforms || [];

  try {
    // Use GPT-4 to generate game recommendations
    const prompt = `Based on these gaming preferences, suggest 5 video games:
    - Favorite genres: ${genres.length > 0 ? genres.join(", ") : "None specified"}
    - Favorite games: ${favoriteGames.length > 0 ? favoriteGames.map((g) => g.name).join(", ") : "None specified"}
    - Preferred platforms: ${platforms.length > 0 ? platforms.join(", ") : "None specified"}
    
    Provide only the game names in a comma-separated list, no extra text.`;

    console.log("Generated Prompt for OpenAI:", prompt); // Debugging

    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    // Debugging: Log AI response
    console.log("AI Response:", aiResponse.choices[0].message.content);

    // Extract game names from OpenAI response
    const suggestedGames = aiResponse.choices[0].message.content.trim().split(", ");

    // Fetch detailed game info from RAWG API
    let recommendedGames = [];
    for (let gameName of suggestedGames) {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${gameName}`
      );
      if (response.data.results.length > 0) {
        recommendedGames.push({
          id: response.data.results[0].id,
          name: response.data.results[0].name,
          released: response.data.results[0].released || "Unknown",
          rating: response.data.results[0].rating || "No rating",
          boxArt: response.data.results[0].background_image || "",
        });
      }
    }

    res.json(recommendedGames.slice(0, 5)); // Return top 5 recommendations
  } catch (error) {
    console.error("Error generating AI recommendations:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch AI recommendations" });
  }
});
// Search for games from RAWG API
app.get("/search-game", async (req, res) => {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: "Missing search query" });
  }

  try {
    console.log(`Fetching RAWG data for: ${query}`);
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${query}`
    );

    // Extract only necessary details
    const games = response.data.results.map((game) => ({
      id: game.id,
      name: game.name,
      released: game.released ? game.released.split("-")[0] : "Unknown", // Extract year only
    }));

    res.json(games);
  } catch (error) {
    console.error("RAWG API Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Failed to fetch games from RAWG" });
  }
});




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
