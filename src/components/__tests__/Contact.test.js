/* eslint-disable no-undef */
import { render } from "../../utils/test-utils.js";
import { screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom/";

describe("Contact Us Page Test Cases", () => {
  it("Should load contact form", () => {
    render(<Contact />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  test("Should load all headings", () => {
    render(<Contact />);
    const headings = screen.getAllByRole("heading");
    expect(headings).toHaveLength(5);
  });

  test("Should load all input fields", () => {
    render(<Contact />);
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(4);
  });

  test("Should load send message button", () => {
    render(<Contact />);
    const button = screen.getByText("Send Message");
    expect(button).toBeInTheDocument();
  });

  it("Should load Follow Us section", () => {
    render(<Contact />);
    const button = screen.getByText("Follow Us");
    expect(button).toBeInTheDocument();
  });
});
