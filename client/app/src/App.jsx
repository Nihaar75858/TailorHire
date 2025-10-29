// App.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </>
  );
}

export default App;
