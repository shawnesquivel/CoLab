import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestForm from "./TestForm";

test("Renders form properly", () => {
  render(<TestForm />);

  const nameLabel = screen.getByText("Name:");
  const ageLabel = screen.getByText("Age:");
  //   const ageLabel = getByLabelText(/Age:/i);

  expect(nameLabel).toBeInTheDocument();
  expect(ageLabel).toBeInTheDocument();

  //   const input = screen.getByLabelText(/Age:/i);
  //   expect(input).toHaveTheAttribute("type", "number");
});
