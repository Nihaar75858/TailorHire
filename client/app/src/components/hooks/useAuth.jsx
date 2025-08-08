// src/hooks/useAuth.js
import { useContext, createContext, useState, useEffect } from "react";

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Simulate fetching user from localStorage or API
  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("user");
      if (!userId || userId == 'undefined' || userId == null) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        return;
      }

      try {
        const response = await fetch(`http://127.0.0.1:8000/api/user/${userId}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        console.log("Fetched user from backend");
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
      } catch {
        console.log("Error fetching user from backend");
        const storedUser = JSON.parse(localStorage.getItem("user"));
      }
    };

    fetchUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  return useContext(AuthContext);
}
