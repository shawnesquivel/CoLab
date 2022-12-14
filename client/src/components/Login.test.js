import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

// jest.mock("axios", () => ({
//   __esModule: true,
//   default: {
//     get: () => ({
//       data: { id: 1, name: "John" },
//     }),
//   },
// }));

// Render
test("Username input should be rendered", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const userInputEl = screen.getByPlaceholderText(/example@email.com/i);

  expect(userInputEl).toBeInTheDocument();
});

test("Password input should be rendered", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const passwordInputEl = screen.getByPlaceholderText(/password/i);

  expect(passwordInputEl).toBeInTheDocument();
});

test("Submit button should be rendered", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const submitBtn = screen.getByRole("button");

  expect(submitBtn).toBeInTheDocument();
});

// Value
test("Username input should be initially empty", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const userInputEl = screen.getByPlaceholderText(/example@email.com/i);

  expect(userInputEl.value).toBe("");
});
test("Password input should be initially empty", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const pwdInputEl = screen.getByPlaceholderText(/password/i);

  expect(pwdInputEl.value).toBe("");
});

// // Button is disabled
test("Button should be initially disabled", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const buttonEl = screen.getByRole("button");

  expect(buttonEl).toBeDisabled();
});

// // Check Error Message is not initially not visible
// test("Error message is not visible", () => {
//    render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   );

//   const errMsgEl = screen.getByText("Something went wrong");

//   expect(errMsgEl).not.toBeVisible();
// });

// // Input values can change

test("Username input should change", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const userInputEl = screen.getByPlaceholderText("example@email.com");
  const testValue = "raywilliamjohnson";
  userInputEl.value = testValue;

  //   Change the user input

  fireEvent.change(userInputEl, { target: { value: testValue } });

  expect(userInputEl.value).toBe(testValue);
});
test("Password input should change", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const pwdInputEl = screen.getByPlaceholderText("password");
  const testValue = "Password$12345";
  pwdInputEl.value = testValue;

  //   Change the user input

  fireEvent.change(pwdInputEl, { target: { value: testValue } });

  expect(pwdInputEl.value).toBe(testValue);
});

test("Button should not be  disabled when username/pwd is filled", () => {
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const buttonEl = screen.getByRole("button");
  const userInputEl = screen.getByPlaceholderText("example@email.com");
  const pwdInputEl = screen.getByPlaceholderText(/password/i);
  const testValue = "raywilliamjohnson";

  fireEvent.change(userInputEl, { target: { value: testValue } });
  fireEvent.change(pwdInputEl, { target: { value: testValue } });

  expect(buttonEl).not.toBeDisabled();
});

// Move this to dashboard.test.js
// test("User should be rendered after fetching", async () => {
//    render(
//     <BrowserRouter>
//       <Login />
//     </BrowserRouter>
//   );

//   const buttonEl = screen.getByRole("button");
//   const userInputEl = screen.getByPlaceholderText("example@email.com");
//   const pwdInputEl = screen.getByPlaceholderText(/password/i);
//   const testValue = "raywilliamjohnson";

//   fireEvent.change(userInputEl, { target: { value: testValue } });
//   fireEvent.change(pwdInputEl, { target: { value: testValue } });
//   fireEvent.click(buttonEl);
//   // NOTE: we cannot use getByText since it is sync, use findByText
//   const userItem = await screen.findByText("John");

//   expect(userItem).toBeInTheDocument();
// });
