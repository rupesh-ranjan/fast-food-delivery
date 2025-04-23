/* eslint-disable no-undef */
import { render } from "../../utils/test-utils.js";
import { fireEvent, screen } from "@testing-library/react";
import { Header } from "../Header.jsx";
import "@testing-library/jest-dom/";

describe("Header component test cases", () => {
  it("Should load Header Component with a login button", () => {
    render(<Header />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    // const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  it("Should load Header Componet with a cart items 0", () => {
    render(<Header />);
    // const cartItems = screen.getByText("Cart (0)");
    const cartItems = screen.getByText(/Cart/);
    expect(cartItems).toBeInTheDocument();
  });

  it("Should change login button to logout on click", () => {
    render(<Header />);
    const loginButton = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginButton);
    const logoutButton = screen.getByRole("button", { name: "Logout" });
    expect(logoutButton).toBeInTheDocument();
  });

  it("Should change theme toggle button from light to dark click", () => {
    render(<Header />);
    const themeToggle = screen.getByRole("button", {
      name: /switch to dark mode/i,
    });
    fireEvent.click(themeToggle);
    expect(
      screen.getByRole("button", {
        name: /switch to light mode/i,
      })
    ).toBeInTheDocument();
  });
});

// aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
