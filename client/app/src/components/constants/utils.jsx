const NavigationConfig = {
  0: [
    // Viewer / not logged in
    {},
  ],
  1: [
    // User
    { name: "Home", to: "/userdashboard", submenus: null },
    {
      name: "Jobs",
      submenus: [
        { name: "View Jobs", to: "/viewjobs" },
        { name: "Review Applications", to: "/revapplications" },
      ],
    },
    {
      name: "Cover Letter",
      to: "/coverletter",
      submenus: null,
    },
    { name: "Chat", to: "/chat", submenus: null },
  ],
};

export const getNavigationConfig = (userType) => {
  return NavigationConfig[userType] || NavigationConfig[0];
};
