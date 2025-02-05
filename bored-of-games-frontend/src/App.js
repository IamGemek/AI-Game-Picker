import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import GamePreferencesForm from "./components/GamePreferencesForm";

function App() {
  const [preferences, setPreferences] = useState(null);

  const handlePreferencesSubmit = (data) => {
    setPreferences(data);
    console.log("User Preferences:", data);
  };

  return (
    <Router>
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          🎮 BoredOfGames?
        </Typography>
        <Routes>
          <Route
            path="/"
            element={<GamePreferencesForm onSubmit={handlePreferencesSubmit} />}
          />
        </Routes>
        {preferences && (
          <Typography variant="h6" color="primary" style={{ marginTop: "20px" }}>
            Preferences saved! 🎉
          </Typography>
        )}
      </Container>
    </Router>
  );
}

export default App;
