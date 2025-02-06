import React, { useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent } from "@mui/material";
import axios from "axios";

const Recommendations = ({ preferences }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/recommend-games", preferences);
      setGames(response.data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        🎯 Top 5 Picks For You
      </Typography>
      <Button variant="contained" color="primary" fullWidth onClick={fetchRecommendations} disabled={loading}>
        {loading ? "Fetching AI Recommendations..." : "Get AI Recommendations"}
      </Button>

      <Grid container spacing={3} sx={{ marginTop: "20px" }}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card sx={{ maxWidth: 300 }}>
              <CardMedia
                component="img"
                height="180"
                image={game.boxArt || "https://via.placeholder.com/300"}
                alt={game.name}
              />
              <CardContent>
                <Typography variant="h6">{game.name}</Typography>
                <Typography variant="body2">Released: {game.released}</Typography>
                <Typography variant="body2">⭐ {game.rating}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Recommendations;
