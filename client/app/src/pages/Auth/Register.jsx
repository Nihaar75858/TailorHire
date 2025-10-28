import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form), // ✅ fixed
    });

    const data = await response.json();
    console.log(data.message);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          value={form.first_name}
        />
        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          value={form.last_name}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
        />
        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={form.username}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          onChange={handleChange}
          value={form.password}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
