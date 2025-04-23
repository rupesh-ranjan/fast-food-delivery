/* eslint-disable no-undef */
import { render } from "../../utils/test-utils.js";
import { fireEvent, screen } from "@testing-library/react";
import { act } from "react";
import Body from "../Body.jsx";
import MOCK_RESPONSE from "../mocks/restaurantsListMock.json";
import "@testing-library/jest-dom/";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      //   return Promise.resolve(response);
      return Promise.resolve(MOCK_RESPONSE);
    },
  });
});

describe("Search functionalities is tested", () => {
  it("Should load Body Component with Search coffee", async () => {
    await act(async () => {
      render(<Body />);
    });
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeInTheDocument();
    fireEvent.change(searchBox, { target: { value: "coffee" } });
    const cards = screen.getAllByTestId("restaurantCard");
    expect(cards.length).toBe(3);
  });

  it("Should filter top rated retaurant >= 4.5 rating", async () => {
    await act(async () => {
      render(<Body />);
    });
    const cardsBefore = screen.getAllByTestId("restaurantCard");
    expect(cardsBefore.length).toBe(20);
    const topRatedButton = screen.getByText(/Top Rated/);
    fireEvent.click(topRatedButton);
    const cardsAfterFilter = screen.getAllByTestId("restaurantCard");
    expect(cardsAfterFilter.length).toBe(6);
  });

  it("Should load Body Component with Search test and show clear filter", async () => {
    await act(async () => {
      render(<Body />);
    });
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeInTheDocument();
    fireEvent.change(searchBox, { target: { value: "test" } });
    const clearFiltterButton = screen.getByRole("button", {
      name: "Clear Filters",
    });
    fireEvent.click(clearFiltterButton);
  });
});
