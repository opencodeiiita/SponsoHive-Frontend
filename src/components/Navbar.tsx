import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <AppBar
      position="sticky"
      style={{ backgroundColor: "black", color: "#FACC15" }} // MaterialUI styling
      className="shadow-lg" // Tailwind utility for shadow
    >
      <Toolbar className="flex justify-between items-center px-6 md:px-16">
        {/* Left Section */}
        <Box className="flex items-center space-x-4">
          <MenuOutlined className="text-yellow-500 text-2xl cursor-pointer" />
          <Typography
            variant="h5"
            component="div"
            className="text-yellow-500 font-bold text-xl md:text-2xl"
          >
            Sponsorship Platform
          </Typography>
        </Box>

        {/* Right Section: Navigation Buttons */}
        <Box className="flex space-x-4 items-center">
          <Link to="/">
            <Button
              className="text-yellow-300 hover:text-yellow-500"
              variant="text"
            >
              Home
            </Button>
          </Link>
          <Link to="/dashboard/analytics">
            <Button
              className="text-yellow-300 hover:text-yellow-500"
              variant="text"
            >
              Analytics
            </Button>
          </Link>
          <Link to="/dashboard/campaign">
            <Button
              className="text-yellow-300 hover:text-yellow-500"
              variant="text"
            >
              Campaigns
            </Button>
          </Link>
          <Link to="/login">
            <Button
              variant="outlined"
              className="text-yellow-500 border-yellow-500 hover:bg-yellow-500 hover:text-black"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#FACC15",
                color: "black",
                fontWeight: "bold",
              }}
              className="hover:bg-yellow-400"
            >
              Sign Up
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
