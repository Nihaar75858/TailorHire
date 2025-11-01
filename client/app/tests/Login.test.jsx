// tests/Login.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Login from "../src/pages/Auth/Login";

// Mock navigate function from react-router
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.stubEnv("VITE_API_BASE_URL", "http://127.0.0.1:8000/api");

beforeEach(() => {
  global.alert = vi.fn();
  global.fetch = vi.fn();
});

describe("Login Component", () => {
  it("renders all login form fields", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("submits login credentials correctly", async () => {
    const mockResponse = { message: "Login successful" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "johndoe", name: "username" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "pass123", name: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/api/users/login_user/",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: "johndoe", password: "pass123" }),
        })
      )
    );

    it("saves user and tokens to localStorage on successful login", async () => {
      const mockResponse = {
        user: { id: 1, username: "johndoe", role: "Admin" },
        access: "mockAccess123",
        refresh: "mockRefresh456",
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      render(
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      );

      fireEvent.change(screen.getByPlaceholderText(/Username/i), {
        target: { value: "johndoe" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Password/i), {
        target: { value: "pass123" },
      });

      fireEvent.click(screen.getByRole("button", { name: /login/i }));

      await waitFor(() =>
        expect(fetch).toHaveBeenCalledWith(
          "http://127.0.0.1:8000/api/users/login_user/",
          expect.objectContaining({
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: "johndoe", password: "pass123" }),
          })
        )
      );

      // ✅ Verify localStorage persistence
      expect(localStorage.getItem("user")).toEqual(
        JSON.stringify(mockResponse.user)
      );
      expect(localStorage.getItem("accessToken")).toBe("mockAccess123");
      expect(localStorage.getItem("refreshToken")).toBe("mockRefresh456");

      // ✅ Verify redirect
      await waitFor(() =>
        expect(mockNavigate).toHaveBeenCalledWith("/userdashboard")
      );
    });

    // optional: verify navigation
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/userdashboard")
    );
  });
});

afterEach(() => {
  vi.clearAllMocks();
});
