import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Autocomplete,
  Chip,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import axios from "axios";

const GamePreferencesForm = ({ onSubmit }) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [favoriteGames, setFavoriteGames] = useState(["", "", ""]);
  const [suggestions, setSuggestions] = useState([[], [], []]);

  const genreOptions = ["Action", "RPG", "Shooter", "Strategy", "Horror", "Adventure", "Rogue-like", "2D Fighter", "3D Fighter"];
  const platformOptions = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"];

  // Fetch game suggestions from RAWG API
  const fetchGameSuggestions = async (index, query) => {
    if (!query) {
      setSuggestions((prev) => {
        const updated = [...prev];
        updated[index] = [];
        return updated;
      });
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/search-game?query=${query}`);
      setSuggestions((prev) => {
        const updated = [...prev];
        updated[index] = response.data || []; // Ensure fallback to empty array
        return updated;
      });
    } catch (error) {
      console.error("Error fetching game suggestions:", error);
    }
  };

  // Handle user selecting a game
  const handleFavoriteGameChange = (index, value) => {
    const updatedGames = [...favoriteGames];
    updatedGames[index] = value || "";
    setFavoriteGames(updatedGames);
  };

  const handleSubmit = () => {
    const preferences = {
      genres,
      platforms,
      hoursPerWeek,
      favoriteGames,
    };
    onSubmit(preferences);
  }; 
  const recentGames = [
    {
      id: 1,
      name: "Resident Evil 4",
      released: "2023",
      rating: "4.8",
      boxArt: "https://rawg.io/media/games/7d1/7d16cc5f5a3f2c90d19f85c92b11c18a.jpg",
    },
    {
      id: 2,
      name: "Elden Ring",
      released: "2022",
      rating: "4.9",
      boxArt: "https://rawg.io/media/games/3ba/3babe6bdc8a82a357f40a82a1ec8c720.jpg",
    },
    {
      id: 3,
      name: "Baldur's Gate 3",
      released: "2023",
      rating: "4.9",
      boxArt: "https://rawg.io/media/games/90a/90a1e17654fd96f619cd1115d4b38b07.jpg",
    },
    {
      id: 4,
      name: "Cyberpunk 2077",
      released: "2020",
      rating: "4.5",
      boxArt: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    },
  ];

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "background.paper",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        marginTop: "40px",
        color: "white",
      }}
    >
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        🎮 Game Preferences
      </Typography>

      {/* Genre Selection with Chips */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Favorite Genres</InputLabel>
        <Select
          multiple
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} color="primary" />
              ))}
            </Box>
          )}
        >
          {genreOptions.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Platform Selection with Chips */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Preferred Platforms</InputLabel>
        <Select
          multiple
          value={platforms}
          onChange={(e) => setPlatforms(e.target.value)}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} color="secondary" />
              ))}
            </Box>
          )}
        >
          {platformOptions.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Hours Per Week */}
      <TextField
        fullWidth
        label="How many hours per week do you play?"
        type="number"
        value={hoursPerWeek}
        onChange={(e) => setHoursPerWeek(e.target.value)}
        margin="normal"
        sx={{ input: { textAlign: "center" } }}
      />

      {/* Favorite Games Input with Autocomplete */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        Top 3 Favorite Games
      </Typography>
      {favoriteGames.map((game, index) => (
        <Autocomplete
          key={index}
          freeSolo
          options={suggestions[index] || []}
          getOptionLabel={(option) => option.name ? `${option.name} (${option.released || "Unknown"})` : ""}
          onInputChange={(event, value) => fetchGameSuggestions(index, value)}
          onChange={(event, newValue) => handleFavoriteGameChange(index, newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              label={`Game ${index + 1}`}
              margin="normal"
              sx={{ input: { textAlign: "center" } }}
            />
          )}
        />
      ))}

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: "20px", padding: "12px 0", fontWeight: "bold", borderRadius: "10px" }}
        onClick={handleSubmit}
      >
        Get Recommendations
      </Button>
    {/* 🔥 Recent Suggestions Section (Inside the Same Page) */}
    <Box sx={{ mt: 5, pt: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          🔥 Recently Recommended Games
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {recentGames.map((game) => (
            <Grid item xs={12} sm={6} md={3} key={game.id}>
              <Card sx={{ bgcolor: "background.paper", boxShadow: 3, borderRadius: "12px" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={game.boxArt}
                  alt={game.name}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {game.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Released: {game.released}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ⭐ {game.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default GamePreferencesForm;
