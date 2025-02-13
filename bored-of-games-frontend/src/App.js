import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import GamePreferencesForm from "./components/GamePreferencesForm";
import NavBar from "./components/NavBar";
import Recommendations from "./components/Recommendations";
import SignIn from "./components/Signin";
import SignUp from "./components/SignUp";
import { Box } from "@mui/material";

function App() {
  const [preferences, setPreferences] = useState(null);

  const handlePreferencesSubmit = (data) => {
    setPreferences(data);
    console.log("User Preferences:", data);
  };

  return (
    <Router>
      <NavBar />
      <Container>
        <Typography variant="h3" align="center" gutterBottom>
          🎮 Bored of Games?
        </Typography>
        <Box sx={{ textAlign: "center", marginTop: "20px" }}>
  <Typography variant="h5" gutterBottom>
    Answer these questions and find out a new game for you to enjoy!
  </Typography>
</Box>

        <Routes>
          <Route
            path="/"
            element={<GamePreferencesForm onSubmit={handlePreferencesSubmit} />}
          />
          <Route
            path="/recommendations"
            element={<Recommendations preferences={preferences} />}
          />
          <Route path="/signin" element={<SignIn />} /> {/* ✅ Sign-In Route */}
          <Route path="/signup" element={<SignUp />} /> {/* ✅ Sign-Up Route */}
        </Routes>
        {preferences && (
          <Typography variant="h6" color="primary" style={{ marginTop: "20px" }}>
            Preferences saved! 🎉 <br />
            <a href="/recommendations">Click here to see recommendations</a>
          </Typography>
        )}
      </Container>
    </Router>
  );
}

export default App;
