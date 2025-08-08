// import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import DashBoard from './pages/DashBoard/DashBoard';
import LoginForm from './pages/Auth/Login';
import RegisterForm from './pages/Auth/Register';
import Navbar from './components/Navbar/Navbar';
import ResumeView from './pages/ResumeMaker/ResumeMaker';
import FormWizard from './components/FormWizard/FormWizard';
import UserDashboard from "./pages/UserDashBoard/UserDashBoard";
// import { useAuth } from "./components/hooks/useAuth";

function App() {
  const location = useLocation();
  // const { user } = useAuth();

  const paths = ['/login', '/register'];
  const showNavbar = !paths.includes(location.pathname);


  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path="/addresume" element={<ResumeView />} />
        <Route path="/formwizard" element={<FormWizard />} />
        {/* <Route
          path="/dashboard"
          element={user ? <UserDashboard /> : <Navigate to="/login" />}
        /> */}
      </Routes>
    </>
  )
}

export default App
