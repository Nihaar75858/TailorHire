import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Register from "../src/pages/Auth/Register";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "Registration successful" }),
    })
  );
});


describe("Register Component", () => {
  it("renders all form fields", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it("submits form data correctly", async () => {
    const mockResponse = { message: "Registration successful!" };
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
      target: { value: "John", name: "first_name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: "Doe", name: "last_name" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: "john@example.com", name: "email" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: "johndoe", name: "username" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "pass123", name: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/api/register/",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
            username: "johndoe",
            password: "pass123",
          }),
        })
      )
    );
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

