import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const user = useAuth();
  // If user is not logged in, redirect to login
  if (user == null) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, show the protected page
  return children;
}
