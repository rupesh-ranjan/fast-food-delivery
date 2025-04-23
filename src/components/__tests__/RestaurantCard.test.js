/* eslint-disable no-undef */
import { render } from "../../utils/test-utils.js";
import { screen } from "@testing-library/react";
import { RestaurantCard } from "../RestaurantCard.jsx";
import MOCK_DATA from "../mocks/restaurantCardMock.json";
import "@testing-library/jest-dom/";

describe("RestaurantCard test cases", () => {
  it("Should load Header Component with a login button", () => {
    render(<RestaurantCard restaurantData={MOCK_DATA} />);
    const name = screen.getByAltText("Barista Coffee");
    expect(name).toBeInTheDocument();
  });
});
