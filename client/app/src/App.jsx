// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import DashBoard from "./pages/DashBoard/DashBoard";
import LoginForm from "./pages/Auth/Login";
import RegisterForm from "./pages/Auth/Register";
import Navbar from "./components/Navbar/Navbar";
import ResumeView from "./pages/ResumeMaker/ResumeMaker";
import FormWizard from "./components/FormWizard/FormWizard";
import UserDashboard from "./pages/UserDashBoard/UserDashBoard";
import AIHelper from "./pages/LLM/AIHelper";

function App() {
  const location = useLocation();
  const noNavbarPaths = ["/login", "/register"];
  const showNavbar = !noNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/addresume" element={<ResumeView />} />
        <Route path="/formwizard" element={<FormWizard />} />
        <Route
          path="/userdashboard"
          element={
            <UserDashboard />
          }
        />
        <Route path="/resume" element={<AIHelper />} />

      </Routes>
    </>
  );
}

export default App;
