import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import ProjectModalPageOneReview from "./ProjectModalPageOneReview";

describe("Project Modal Page One: Review Page", () => {
  it("Should display the same text passed into the description property", () => {
    render(
      <BrowserRouter>
        <ProjectModalPageOneReview description="description text" />
      </BrowserRouter>
    );

    const descriptionEl = screen.getByText(/description text/i);

    expect(descriptionEl).toBeInTheDocument();
  });
});
// describe("Project Modal Page One: Review Page!", () => {
//   it("Should check that the paragraph tag exists", () => {
//     render(
//       <BrowserRouter>
//         <ProjectModalPageOneReview />
//       </BrowserRouter>
//     );

//     const headingEl = screen.getByRole("heading");

//     expect(headingEl).toBeInTheDocument();
//   });
// });
