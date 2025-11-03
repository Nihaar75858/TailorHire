import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("Viewer");

  useEffect(() => {
    const fetchUser = async () => {
      const access = localStorage.getItem("access");

      if (!access) {
        setUser(null);
        setUserType("Viewer");
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/users/profile/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data);
        setUserType(data.role || "User");
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setUser(null);
        setUserType("Viewer");
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, userType, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
