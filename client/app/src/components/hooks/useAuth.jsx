// src/components/Context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("Viewer");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.role) {
      setUser(storedUser);
      setUserType(storedUser.role);
    } else {
      setUserType("Viewer");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, userType }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
