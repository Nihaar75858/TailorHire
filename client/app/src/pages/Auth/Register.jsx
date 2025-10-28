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
    console.log("Submitted:", form);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" onChange={handleChange} value={form.first_name} />
        <input name="last_name" placeholder="Last Name" onChange={handleChange} value={form.last_name} />
        <input name="email" placeholder="Email" onChange={handleChange} value={form.email} />
        <input name="username" placeholder="Username" onChange={handleChange} value={form.username} />
        <input name="password" placeholder="Password" onChange={handleChange} type="password" value={form.password} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
