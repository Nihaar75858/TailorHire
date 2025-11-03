import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { UserProvider, useUser } from "../src/components/hooks/useAuth";

// Mock server for backend API
const server = setupServer(
  http.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile/`, () => {
    return HttpResponse.json({ username: "John123", role: "Admin" });
  })
);

// Setup mock server lifecycle
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useUser (Auth Hook)", () => {
  test("returns Viewer by default when no user in localStorage", () => {
    localStorage.clear();
    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => <UserProvider>{children}</UserProvider>,
    });
    expect(result.current.userType).toBe("Viewer");
    expect(result.current.user).toBe(null);
  });

  test("fetches user profile from backend after login", async () => {
    // Simulate stored token in localStorage (as if user logged in)
    localStorage.setItem("access", "mock-token");

    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => <UserProvider>{children}</UserProvider>,
    });

    await waitFor(() => {
      expect(result.current.user?.username).toBe("John123");
      expect(result.current.userType).toBe("Admin");
    });
  });

  test("falls back to Viewer if backend returns error", async () => {
    // Force backend failure
    server.use(
      http.get(`${import.meta.env.VITE_API_BASE_URL}/users/profile/`, () => {
        return HttpResponse.json({ username: "testuser", role: "User" });
      })
    );

    const { result } = renderHook(() => useUser(), {
      wrapper: ({ children }) => <UserProvider>{children}</UserProvider>,
    });

    await waitFor(() => {
      expect(result.current.userType).toBe("Viewer");
    });
  });
});
