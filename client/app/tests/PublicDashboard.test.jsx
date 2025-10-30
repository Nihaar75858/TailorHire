import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import PublicDashBoard from "../src/pages/Public/PublicDashBoard"; // adjust path if different

// Mock navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Public Dashboard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders welcome message and key buttons", () => {
    render(
      <BrowserRouter>
        <PublicDashBoard />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome to TailorHire/i)).toBeInTheDocument();
    expect(screen.getByText(/Try TailorHire/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByText(/Add your Resume/i)).toBeInTheDocument();
  });

  it("navigates to Register and FormWizard on button clicks", () => {
    render(
      <BrowserRouter>
        <PublicDashBoard />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Sign Up/i));
    expect(mockNavigate).toHaveBeenCalledWith("/register");

    fireEvent.click(screen.getByText(/Add your Resume/i));
    expect(mockNavigate).toHaveBeenCalledWith("/formwizard");
  });
});
