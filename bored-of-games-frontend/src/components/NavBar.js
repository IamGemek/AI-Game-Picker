import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#121212" }}>
      <Toolbar>
        {/* Left Side: Logo & App Name */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          {/* Placeholder for future logo */}
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "#90caf9" }}>
            🎮 BoredOfGames
          </Typography>
        </Box>

        {/* Right Side: Sign-In Button */}
        <Button variant="contained" color="secondary">
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
