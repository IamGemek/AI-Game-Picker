import React, { useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, CardActions } from "@mui/material";
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🎯 AI-Powered Game Recommendations
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={fetchRecommendations}
        disabled={loading}
        sx={{ borderRadius: "10px", fontWeight: "bold", mb: 3 }}
      >
        {loading ? "Finding Recommendations..." : "What We Recommend for you!"}
      </Button>

      <Grid container spacing={3} justifyContent="center">
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card sx={{ bgcolor: "background.paper", boxShadow: 3, borderRadius: "12px" }}>
              <CardMedia
                component="img"
                height="200"
                image={game.boxArt || "https://via.placeholder.com/300"}
                alt={game.name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {game.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Released: {game.released}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ⭐ {game.rating}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  color="primary"
                  href={`https://rawg.io/games/${game.id}`}
                  target="_blank"
                  sx={{ ml: 1 }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Recommendations;
