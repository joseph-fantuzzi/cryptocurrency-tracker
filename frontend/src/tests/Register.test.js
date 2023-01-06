import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "../components/Register";

describe("Register Page Tests", () => {
  const registerFormValues = {
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    confirm: "",
  };
  const setRegisterFormValues = jest.fn();
  const register = jest.fn();
  const dark = true;
  const registerError = "";
  const setRegisterError = jest.fn();
  const registerMessage = "";

  test("Register Component Renders Properly", () => {
    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );
  });

  test("Register Component Properly Displays Register Title", () => {
    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );

    const title = screen.getByText(/Register./);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(title).toBeTruthy();
  });

  test("Register Component Correctly Displays All Input Titles", () => {
    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );

    const fname = screen.getByText(/First Name/);
    expect(fname).toBeInTheDocument();
    expect(fname).toBeVisible();
    expect(fname).toBeTruthy();

    const lname = screen.getByText(/Last Name/);
    expect(lname).toBeInTheDocument();
    expect(lname).toBeVisible();
    expect(lname).toBeTruthy();

    const email = screen.getByText(/Email/);
    expect(email).toBeInTheDocument();
    expect(email).toBeVisible();
    expect(email).toBeTruthy();

    const username = screen.getByText(/Username/);
    expect(username).toBeInTheDocument();
    expect(username).toBeVisible();
    expect(username).toBeTruthy();

    const password = screen.getByText("Password");
    expect(password).toBeInTheDocument();
    expect(password).toBeVisible();
    expect(password).toBeTruthy();

    const confirm = screen.getByText(/Confirm Password/);
    expect(confirm).toBeInTheDocument();
    expect(confirm).toBeVisible();
    expect(confirm).toBeTruthy();
  });

  test("Register Component's Inputs Properly Display Values", () => {
    const registerFormValues = {
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      username: "test",
      password: "test123",
      confirm: "test123",
    };

    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );

    const fnameInput = screen.getByTestId("fname-input");
    expect(fnameInput).toBeInTheDocument();
    expect(fnameInput).toBeVisible();
    expect(fnameInput).toBeTruthy();
    expect(fnameInput.value).toBe("test");

    const lnameInput = screen.getByTestId("lname-input");
    expect(lnameInput).toBeInTheDocument();
    expect(lnameInput).toBeVisible();
    expect(lnameInput).toBeTruthy();
    expect(lnameInput.value).toBe("test");

    const emailInput = screen.getByTestId("email-input");
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeVisible();
    expect(emailInput).toBeTruthy();
    expect(emailInput.value).toBe("test@test.com");

    const usernameInput = screen.getByTestId("username-input");
    expect(usernameInput).toBeInTheDocument();
    expect(usernameInput).toBeVisible();
    expect(usernameInput).toBeTruthy();
    expect(usernameInput.value).toBe("test");

    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toBeVisible();
    expect(passwordInput).toBeTruthy();
    expect(passwordInput.value).toBe("test123");

    const confirmInput = screen.getByTestId("confirm-input");
    expect(confirmInput).toBeInTheDocument();
    expect(confirmInput).toBeVisible();
    expect(confirmInput).toBeTruthy();
    expect(confirmInput.value).toBe("test123");
  });

  test("Register Component's Register Button is Properly Disabled Without Inputs", () => {
    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );

    const registerBtn = screen.getByRole("button", { name: "Create Account" });
    fireEvent.click(registerBtn);
    expect(registerBtn).toHaveAttribute("disabled");
  });

  test("Register Component's Register Button is Properly Enabled With Inputs", () => {
    const registerFormValues = {
      first_name: "test",
      last_name: "test",
      email: "test@test.com",
      username: "test",
      password: "test123",
      confirm: "test123",
    };

    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );

    const registerBtn = screen.getByRole("button", { name: "Create Account" });
    fireEvent.click(registerBtn);
    expect(registerBtn).not.toHaveAttribute("disabled");
  });

  test("Register Component's Error Message Displays Properly", () => {
    const registerError = "There was an error in processing your request. Please try again.";

    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );

    const errorMsg = screen.getByTestId("errorMsg");
    expect(errorMsg).toBeInTheDocument();
    expect(errorMsg).toBeVisible();
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.innerHTML).toBe(
      "There was an error in processing your request. Please try again."
    );
  });

  test("Register Component's Bottom Text Content Displays Properly", () => {
    render(
      <Router>
        <Register
          registerFormValues={registerFormValues}
          setRegisterFormValues={setRegisterFormValues}
          register={register}
          dark={dark}
          registerError={registerError}
          setRegisterError={setRegisterError}
          registerMessage={registerMessage}
        />
      </Router>
    );

    const accountText = screen.getByText(/Have An Account With Us?/);
    expect(accountText).toBeInTheDocument();
    expect(accountText).toBeVisible();
    expect(accountText).toBeTruthy();

    const loginNowLink = screen.getByText(/Login Now./);
    expect(loginNowLink).toBeInTheDocument();
    expect(loginNowLink).toBeVisible();
    expect(loginNowLink).toBeTruthy();
  });
});
