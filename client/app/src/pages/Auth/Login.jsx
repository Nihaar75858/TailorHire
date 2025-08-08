import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // send form to backend
    console.log("Login:", form);
  };

  return (
    <div className="min-h-screen flex bg-orange-400 text-white">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-white">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <button
              onClick={() => navigate('/userdashboard')}
              type="submit"
              className="w-full bg-white text-black py-2 rounded-md hover:bg-black hover:text-white transition duration-200"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Right: Logo */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-orange-50">
        <img
          src="/logo.png" // Update path as per your project
          alt="Logo"
          className="w-2/3 h-auto"
        />
      </div>
    </div>
  );
}
