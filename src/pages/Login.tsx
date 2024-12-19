import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography, Form } from "antd";
import { TextField } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { FaFacebookF, FaGoogle, FaInstagram } from "react-icons/fa";
import LoginImage from "../assets/Login.svg";

import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const [focusedField, setFocusedField] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFocus = (field) => setFocusedField(field);
  const handleBlur = () => setFocusedField("");

  const handleSignIn = () => {
    setError("");

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen items-center justify-center bg-white px-4 sm:px-8 md:px-16">
      <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
        <img
          src={LoginImage}
          alt="Login Illustration"
          className="w-full h-auto max-w-[700px] sm:max-w-[600px] object-contain transition-all duration-300"
        />
      </div>
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 md:px-16">
        <div className="w-full max-w-md mx-auto mb-6">
          <Typography.Title
            level={2}
            className="text-left"
            style={{ color: "#F59E0B", fontWeight: "bold", marginBottom: "1.5rem" }}
          >
            Welcome
          </Typography.Title>
        </div>
        <Form className="w-full max-w-md mx-auto">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <Form.Item>
            <div className="flex items-center border-b-2 pb-1">
              <AccountCircleOutlinedIcon
                style={{
                  color: focusedField === "email" ? "#F59E0B" : "black",
                  fontSize: "2rem",
                  marginRight: "0.5rem",
                  transition: "color 0.3s",
                  marginTop: "1rem",
                }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& .MuiInputLabel-root": { color: "gray" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F59E0B" },
                  "& .MuiInput-underline:before": { borderBottom: "2px solid black" },
                  "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid #F59E0B !important",
                  },
                  "& .MuiInput-underline:after": { borderBottom: "2px solid #F59E0B" },
                }}
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="flex items-center border-b-2 pb-1">
              <HttpsOutlinedIcon
                style={{
                  color: focusedField === "password" ? "#F59E0B" : "black",
                  fontSize: "2rem",
                  marginRight: "0.5rem",
                  transition: "color 0.3s",
                  marginTop: "1rem",
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="standard"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus("password")}
                onBlur={handleBlur}
                InputProps={{ disableUnderline: true }}
                sx={{
                  "& .MuiInputLabel-root": { color: "gray" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#F59E0B" },
                  "& .MuiInput-underline:before": { borderBottom: "2px solid black" },
                  "& .MuiInput-underline:hover:before": {
                    borderBottom: "2px solid #F59E0B !important",
                  },
                  "& .MuiInput-underline:after": { borderBottom: "2px solid #F59E0B" },
                }}
              />
            </div>
          </Form.Item>
          <div className="flex justify-end text-sm mb-4">
            <a href="#" className="text-black hover:text-yellow-400">
              Forgot Password?
            </a>
          </div>
          <Button
            type="primary"
            onClick={handleSignIn}
            className="w-full flex items-center justify-center rounded-lg text-lg"
            style={{
              backgroundColor: "#F59E0B",
              border: "none",
              color: "white",
              height: "55px",
              fontSize: "1.1rem",
            }}
          >
            Login
          </Button>
        </Form>
        <div className="mt-8 text-center">
          <Typography.Text>Or login with</Typography.Text>
          <div className="flex justify-center gap-4 mt-4">
            {["facebook", "google", "instagram"].map((social) => {
              const Icon =
                social === "facebook"
                  ? FaFacebookF
                  : social === "google"
                  ? FaGoogle
                  : FaInstagram;
              return (
                <Button
                  key={social}
                  shape="circle"
                  icon={<Icon size={20} />}
                  className="flex items-center justify-center social-icon"
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    width: "45px",
                    height: "45px",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#F59E0B")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "black")
                  }
                />
              );
            })}
          </div>
          <div className="mt-6">
            <Typography.Text>
              Do not have an account?{" "}
              <a
                onClick={() => navigate("/signup")}
                className="text-yellow-500 cursor-pointer hover:text-yellow-700"
              >
                Sign Up
              </a>
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
