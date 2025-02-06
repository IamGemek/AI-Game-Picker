import React, { useState } from "react";
import { TextField, Button, List, ListItem, ListItemText, Typography, Container } from "@mui/material";
import axios from "axios";

const GameSearch = () => {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const response = await axios.get(`http://localhost:5000/search-game?query=${query}`);
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        🔍 Search for a Game
      </Typography>
      <TextField
        fullWidth
        label="Enter a game title..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ marginBottom: "10px" }}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
        Search
      </Button>

      <List sx={{ marginTop: "20px" }}>
        {games.map((game) => (
          <ListItem key={game.id}>
            <ListItemText primary={game.name} secondary={`Released: ${game.released || "N/A"}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GameSearch;
