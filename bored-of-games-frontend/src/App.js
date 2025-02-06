import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import GamePreferencesForm from "./components/GamePreferencesForm";
import NavBar from "./components/NavBar"; // ✅ Import NavBar

function App() {
  const [preferences, setPreferences] = useState(null);

  const handlePreferencesSubmit = (data) => {
    setPreferences(data);
    console.log("User Preferences:", data);
  };

  return (
    <Router>
      <NavBar /> {/* ✅ Add the navigation bar at the top */}
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          🎮 Bored of Games?
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
