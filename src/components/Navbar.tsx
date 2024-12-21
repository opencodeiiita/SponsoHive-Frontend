import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/logo.png";

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", backgroundColor: "black", height: "100%" }}
    >
      <Typography
        variant="h5"
        sx={{ color: "#FACC15", fontWeight: "bold", py: 2 }}
      >
        SponsoHive
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/">
            <ListItemText primary="Home" sx={{ color: "#FACC15" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/login">
            <ListItemText primary="Login" sx={{ color: "#FACC15" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/signup">
            <ListItemText primary="Sign Up" sx={{ color: "#FACC15" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="sticky"

      style={{
        backgroundColor: "black",
        color: "#FACC15",
        width: "100%", // Ensures full width
        margin: 0,
        boxSizing: "border-box",
      }}

      className="shadow-lg"
    >
      <Toolbar className="flex justify-between items-center px-4 md:px-16">
        {/* Left Section */}
        <Box className="flex items-center space-x-4">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            className="md:hidden"
          >
            <MenuOutlined className="text-yellow-500 text-2xl" />
          </IconButton>
          <img
            src={Logo}
            alt="Logo"
            style={{ height: "60px" }}
            className="hidden md:block"
          />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400">
            SponsoHive
          </h1>
        </Box>

        {/* Right Section */}
        <Box className="hidden md:flex space-x-4 items-center">
          <Link to="/">
            <h1
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300"

            >
              Home
            </h1>
          </Link>
          <IconButton
            color="inherit"
            aria-label="user-profile"
            className="bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 hover:text-yellow-300"
            onClick={handleMenuClick}
          >
            <UserOutlined className="text-2xl" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }} 
            transformOrigin={{ vertical: "top", horizontal: "right" }} 
          >
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              Login
            </MenuItem>
            <MenuItem component={Link} to="/signup" onClick={handleMenuClose}>
              Sign Up
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
