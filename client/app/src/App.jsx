// App.jsx
import { Routes, Route, useLocation } from "react-router-dom";
import DashBoard from "./pages/DashBoard/DashBoard";
import LoginForm from "./pages/Auth/Login";
import RegisterForm from "./pages/Auth/Register";
import Navbar from "./components/Navbar/Navbar";
import ResumeView from "./pages/ResumeMaker/ResumeMaker";
import FormWizard from "./components/FormWizard/FormWizard";
import UserDashboard from "./pages/UserDashBoard/UserDashBoard";
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAuth } from "./components/hooks/useAuth";

function App() {
  const location = useLocation();
  // const { user } = useAuth(); // assuming useAuth provides user state

  // Hide navbar on login/register pages
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
      </Routes>
    </>
  );
}

export default App;
