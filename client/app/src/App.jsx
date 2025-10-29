// App.jsx
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Auth/Register";
import "./App.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Register />}/>
      </Routes>
    </>
  );
}

export default App;
