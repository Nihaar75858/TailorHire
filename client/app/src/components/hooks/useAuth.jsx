// src/components/Context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("Viewer");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access");
      if (!token) {
        setUserType("Viewer");
        return;
      }

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api"}/users/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setUserType(data.role || "User");
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          // Unauthorized or expired token
          localStorage.removeItem("access");
          setUserType("Viewer");
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUserType("Viewer");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserContext.Provider value={{ user, userType, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
