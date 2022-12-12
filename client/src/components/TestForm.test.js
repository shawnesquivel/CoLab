import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestForm from "./TestForm";

test("Renders form properly", () => {
  render(<TestForm />);

  const nameLabel = screen.getByText("Name:");
  const ageLabel = screen.getByText("Age:");

  expect(nameLabel).toBeInTheDocument();
  expect(ageLabel).toBeInTheDocument();

  //   const input = screen.getByLabelText(/Age:/i);
  //   expect(input).toHaveTheAttribute("type", "number");
});

test("Find the frog", () => {
  render(<TestForm headingText="ribbit" />);
  // we use (/REG_EX/i) like this;
  //   const frog = screen.getByText(/ribbit/i);
  const frog = screen.getByRole("heading");

  expect(frog).toBeInTheDocument();
  expect(screen.getByText("ribbit")).toBeDefined();
});

test("Render the title", () => {
  render(<TestForm />);
  const welcomeBanner = screen.getByTestId("welcome-banner");

  expect(welcomeBanner).toBeInTheDocument();
});

// Test Driven Development
// Focus on the user interaction

// Make the mistake first

// Build the element to make the test pass.
