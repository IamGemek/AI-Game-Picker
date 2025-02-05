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
} from "@mui/material";

const GamePreferencesForm = ({ onSubmit }) => {
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [hoursPerWeek, setHoursPerWeek] = useState("");

  const genreOptions = ["Action", "RPG", "Shooter", "Strategy", "Horror", "Adventure"];
  const platformOptions = ["PC", "PlayStation", "Xbox", "Nintendo Switch", "Mobile"];

  const handleGenreChange = (event) => setGenres(event.target.value);
  const handlePlatformChange = (event) => setPlatforms(event.target.value);

  const handleSubmit = () => {
    const preferences = { genres, platforms, hoursPerWeek };
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

      <FormControl fullWidth margin="normal">
        <InputLabel>Favorite Genres</InputLabel>
        <Select multiple value={genres} onChange={handleGenreChange}>
          {genreOptions.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Preferred Platforms</InputLabel>
        <Select multiple value={platforms} onChange={handlePlatformChange}>
          {platformOptions.map((platform) => (
            <MenuItem key={platform} value={platform}>
              {platform}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="How many hours per week do you play games?"
        type="number"
        value={hoursPerWeek}
        onChange={(e) => setHoursPerWeek(e.target.value)}
        margin="normal"
      />

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
