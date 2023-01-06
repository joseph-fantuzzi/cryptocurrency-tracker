import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/Login";

describe("Login Page Tests", () => {
  const loginFormValues = { username: "", password: "" };
  const setLoginFormValues = jest.fn();
  const login = jest.fn();
  const dark = true;
  const loginError = "";
  const setLoginError = jest.fn();
  const loginMessage = "";

  test("Login Component Renders Properly", () => {
    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
        />
      </Router>
    );
  });

  test("Login Component Properly Displays Login Title", () => {
    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
        />
      </Router>
    );

    const title = screen.getByText(/Login./);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(title).toBeTruthy();
  });

  test("Login Component Correctly Displays Username and Password Titles and Input Fields", () => {
    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
        />
      </Router>
    );

    const usernameTitle = screen.getByText(/Username/);
    expect(usernameTitle).toBeInTheDocument();
    expect(usernameTitle).toBeVisible();
    expect(usernameTitle).toBeTruthy();

    const passwordTitle = screen.getByText(/Password/);
    expect(passwordTitle).toBeInTheDocument();
    expect(passwordTitle).toBeVisible();
    expect(passwordTitle).toBeTruthy();
  });

  test("Login Component's Inputs Properly Displays Values", () => {
    const loginFormValues = { username: "test", password: "test123" };

    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
        />
      </Router>
    );

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
  });

  test("Login Component's Login Button is Properly Disabled Without Inputs", () => {
    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
        />
      </Router>
    );

    const loginBtn = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginBtn);
    expect(loginBtn).toHaveAttribute("disabled");
  });

  test("Login Component's Login Button is Properly Enabled With Inputs", () => {
    const loginFormValues = { username: "test", password: "test123" };

    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
        />
      </Router>
    );

    const loginBtn = screen.getByRole("button", { name: "Login" });
    fireEvent.click(loginBtn);
    expect(loginBtn).not.toHaveAttribute("disabled");
  });

  test("Login Component's Error Message Displays Properly", () => {
    const loginError = "There was an error in processing your request. Please try again.";

    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
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

  test("Login Component's Bottom Text Content Displays Properly", () => {
    render(
      <Router>
        <Login
          loginFormValues={loginFormValues}
          setLoginFormValues={setLoginFormValues}
          login={login}
          dark={dark}
          loginError={loginError}
          setLoginError={setLoginError}
          loginMessage={loginMessage}
        />
      </Router>
    );

    const noAccountText = screen.getByText(/Don't Have An Account With Us?/);
    expect(noAccountText).toBeInTheDocument();
    expect(noAccountText).toBeVisible();
    expect(noAccountText).toBeTruthy();

    const registerNowLink = screen.getByText(/Register Now./);
    expect(registerNowLink).toBeInTheDocument();
    expect(registerNowLink).toBeVisible();
    expect(registerNowLink).toBeTruthy();
  });
});
