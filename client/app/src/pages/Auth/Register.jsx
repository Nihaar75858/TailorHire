import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      setresumes((prev) => [...prev, data]);
    } catch (error) {
      console.error('Error adding resume:', error);
    }
    console.log("Register:", form);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-orange-400">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-white">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
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
              onClick={() => navigate('/')}
              type="submit"
              className="w-full bg-white text-black py-2 rounded-md hover:bg-black hover:text-white transition duration-200"
            >
              Register
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
