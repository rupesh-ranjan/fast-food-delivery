/* eslint-disable no-undef */
import { act } from "react";
import { renderHook } from "@testing-library/react";
import { render } from "../../utils/test-utils.js";
import { fireEvent, screen } from "@testing-library/react";
import RestaurantMenu from "../RestaurantMenu.jsx";
import Cart from "../Cart.jsx";
import { Header } from "../Header.jsx";
import MOCK_RESPONSE from "../mocks/restaurantMenuMock.json";
import "@testing-library/jest-dom/";
import { useTheme } from "../../utils/context/useTheme.js";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      //   return Promise.resolve(response);
      return Promise.resolve(MOCK_RESPONSE);
    },
  });
});

describe("Cart Component test cases", () => {
  it("Should Load Restaurant Menu component", async () => {
    await act(async () =>
      render(
        <>
          <Header />
          <RestaurantMenu />
          <Cart />
        </>
      )
    );
    const accordianHeader = screen.getByText("Veg Pizza (13)");
    fireEvent.click(accordianHeader);
    const menuItems = screen.getAllByTestId("menuItem");
    expect(menuItems.length).toBe(13);
    const addButtons = screen.getAllByRole("button", { name: "ADD" });
    fireEvent.click(addButtons[0]);
    expect(screen.getByText("Cart (1)")).toBeInTheDocument();
    // fireEvent.click(addButtons[1]);
    // expect(screen.getByText("Cart (2)")).toBeInTheDocument();
    expect(screen.getAllByTestId("menuItem").length).toBe(14);
    expect(screen.getAllByText("1").length).toBe(3);
    fireEvent.click(screen.getAllByText("➕")[0]);
    expect(screen.getAllByText("2").length).toBe(3);
    fireEvent.click(screen.getAllByText("➖")[0]);
    expect(screen.getAllByText("1").length).toBe(3);
    fireEvent.click(screen.getAllByText("➖")[0]);
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();

    fireEvent.click(addButtons[0]);
    fireEvent.click(screen.getByText(/Clear Cart/));
    expect(screen.getAllByTestId("menuItem").length).toBe(13);
  });

  it("should throw error when used outside ThemeProvider", () => {
    // Prevent React from logging the error to console
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useTheme());
    }).toThrow("useTheme must be used within a ThemeProvider");

    // Restore console.error
    console.error = originalError;
  });
});
