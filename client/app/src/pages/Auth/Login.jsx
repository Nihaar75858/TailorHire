import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${API_BASE_URL}/users/login_user/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    console.log("Response from server:", data.user);

    if (!response.ok) {
      console.error("Error from server:", data);
      alert(data.detail || "Login failed!");
      return;
    }

    alert("Login successful!");
    console.log("Login successful:", data);

    storeAuthData(data);

    // Redirect to dashboard
    navigate("/userdashboard");
  };

  const storeAuthData = (data) => {
    if (data.user.id) localStorage.setItem("userId", data.user.id);
    if (data.user) localStorage.setItem("user", JSON.stringify(data.user));
    if (data.access) localStorage.setItem("accessToken", data.access);
    if (data.refresh) localStorage.setItem("refreshToken", data.refresh);
    if (data.user?.role) localStorage.setItem("userType", data.user.role);
    console.log(data.user.id, data.user, data.access, data.refresh);
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
              onClick={() => navigate("/userdashboard")}
              type="submit"
              name="Login"
              className="w-full bg-white text-black py-2 rounded-md hover:bg-black hover:text-white transition duration-200"
            >
              Login
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
