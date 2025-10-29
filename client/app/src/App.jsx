// App.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import UserDashboard from "./pages/User/Userdashboard";
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/userdashboard" element={<UserDashboard />}/>
      </Routes>
    </>
  );
}

export default App;
