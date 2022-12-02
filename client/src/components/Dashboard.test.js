import Dashboard from "./Dashboard";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
// 1. Describe the different things that can happen

describe("Dashboard", () => {
  // Prop Test:
  it("Dashboard is loaded properly", () => {
    // Get the function that allows you to grab DOM Elements
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Grab the DOM element by testId
    const dashboard = screen.getByText("Dashboard");
    // Final Tests: toBe, toHaveLength, toEqual
    expect(dashboard).toBeInTheDocument();
  });
});
