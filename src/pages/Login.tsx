import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignIn = (): void => {
    // Clear previous error messages
    setError("");

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find((u: { email: string; password: string }) => u.email === email);

    if (!user) {
      setError("No account found with this email.");
      return;
    }

    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-yellow-500 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Welcome Back
        </h2>
        {error && <p className="text-red-700 text-sm mb-4 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-black text-yellow-500 border border-yellow-500 rounded placeholder:text-yellow-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-black text-yellow-500 border border-yellow-500 rounded placeholder:text-yellow-500"
        />
        <button
          onClick={handleSignIn}
          className="w-full bg-black text-yellow-500 font-bold py-3 rounded hover:bg-yellow-600 hover:text-black transition"
        >
          Sign In
        </button>
        <p className="mt-6 text-sm text-center text-black">
          Don't have an account?{" "}
          <a href="/signup" className="text-black font-bold hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
