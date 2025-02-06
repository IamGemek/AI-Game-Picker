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
} from "@mui/material";
import axios from "axios";

const GamePreferencesForm = ({ onSubmit }) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [hoursPerWeek, setHoursPerWeek] = useState("");
  const [favoriteGames, setFavoriteGames] = useState(["", "", ""]);
  const [suggestions, setSuggestions] = useState([[], [], []]);

  const genreOptions = ["Action", "RPG", "Shooter", "Strategy", "Horror", "Adventure","Rogue-like","2D Fighter","3D Fighter"];
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
        updated[index] = response.data; // Keep full game objects
        return updated;
      });
    } catch (error) {
      console.error("Error fetching game suggestions:", error);
    }
  };

  // Handle user selecting a game
  const handleFavoriteGameChange = (index, value) => {
    const updatedGames = [...favoriteGames];
    updatedGames[index] = value;
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

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "background.paper",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
        marginTop: "40px",
        color: "white",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Game Preferences Questionnaire 🎮
      </Typography>

      {/* Genre Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Favorite Genres</InputLabel>
        <Select multiple value={genres} onChange={(e) => setGenres(e.target.value)}>
          {genreOptions.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Platform Selection */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Preferred Platforms</InputLabel>
        <Select multiple value={platforms} onChange={(e) => setPlatforms(e.target.value)}>
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
        label="How many hours per week do you play games?"
        type="number"
        value={hoursPerWeek}
        onChange={(e) => setHoursPerWeek(e.target.value)}
        margin="normal"
      />

      {/* Favorite Games Input with Autocomplete */}
      <Typography variant="h5" gutterBottom sx={{ marginTop: "20px" }}>
        What are your top 3 favorite games?
      </Typography>
      {favoriteGames.map((game, index) => (
        <Autocomplete
          key={index}
          freeSolo
          options={suggestions[index]}
          getOptionLabel={(option) => `${option.name} (${option.released})`}
          onInputChange={(event, value) => fetchGameSuggestions(index, value)}
          onChange={(event, newValue) => handleFavoriteGameChange(index, newValue)}
          renderInput={(params) => (
            <TextField {...params} fullWidth label={`Game ${index + 1}`} margin="normal" />
          )}
        />
      ))}

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ marginTop: "20px", padding: "10px 0" }}
        onClick={handleSubmit}
      >
        Submit Preferences
      </Button>
    </Container>
  );
};

export default GamePreferencesForm;
