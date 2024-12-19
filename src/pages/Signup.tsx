import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSignUp = (): void => {
    // Clear previous error messages
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      setError("Email is already registered. Please use a different email.");
      return;
    }

    const newUser: User = { name, email, password };
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-yellow-500 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Create an Account
        </h2>
        {error && <p className="text-red-700 text-sm mb-4 text-center">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 bg-black text-yellow-500 border border-yellow-500 rounded placeholder:text-yellow-500"
        />
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
          className="w-full p-3 mb-4 bg-black text-yellow-500 border border-yellow-500 rounded placeholder:text-yellow-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-black text-yellow-500 border border-yellow-500 rounded placeholder:text-yellow-500"
        />
        <button
          onClick={handleSignUp}
          className="w-full bg-black text-yellow-500 font-bold py-3 rounded hover:bg-yellow-600 hover:text-black transition"
        >
          Sign Up
        </button>
        <p className="mt-6 text-sm text-center text-black">
          Already have an account?{" "}
          <a href="/login" className="text-black font-bold hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
