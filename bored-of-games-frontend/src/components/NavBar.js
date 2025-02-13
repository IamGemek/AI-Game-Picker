import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#121212", padding: "5px 0" }}>
      <Toolbar>
        {/* Left Side: Clickable Logo */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#90caf9", cursor: "pointer" }}>
              🎮 Bored of Games?
            </Typography>
          </Link>
        </Box>

        {/* Right Side: Sign-In Button */}
        <Button component={Link} to="/signin" variant="contained" color="secondary">
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
