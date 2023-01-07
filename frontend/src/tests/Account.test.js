import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Account from "../components/Account";

describe("Account Page Tests", () => {
  const dark = true;
  const logout = jest.fn();
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InRlc3QiLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NzI5NjkzMDIsImV4cCI6MTY3MzA1NTcwMn0.SNUuS4TNm1miASZW13BkGfCGV-ClwQgoxgQ7A8RJWME";
  localStorage.setItem("token", token);

  test("Account Component Renders Properly", () => {
    render(
      <Router>
        <Account dark={dark} logout={logout} />
      </Router>
    );
  });

  test("Account Component Displays User's Name", () => {
    render(
      <Router>
        <Account dark={dark} logout={logout} />
      </Router>
    );

    const name = screen.getByText(/test test/);
    expect(name).toBeInTheDocument();
    expect(name).toBeVisible();
    expect(name).toBeTruthy();
  });

  test("Account Component Displays Personal Information Section Properly", () => {
    render(
      <Router>
        <Account dark={dark} logout={logout} />
      </Router>
    );

    const title = screen.getByText(/Personal Information/);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(title).toBeTruthy();

    const username = screen.getByText(/Username: test/);
    expect(username).toBeInTheDocument();
    expect(username).toBeVisible();
    expect(username).toBeTruthy();

    const email = screen.getByText(/Email: test@test.com/);
    expect(email).toBeInTheDocument();
    expect(email).toBeVisible();
    expect(email).toBeTruthy();
  });

  test("Account Component's Change Password Button Works Properly", () => {
    render(
      <Router>
        <Account dark={dark} logout={logout} />
      </Router>
    );

    const button = screen.getByRole("button", { name: "Change Password" });
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
    expect(button).toBeTruthy();

    expect(screen.queryByTestId("current-password")).not.toBeInTheDocument();
    fireEvent.click(button);
    expect(screen.getByTestId("current-password")).toBeInTheDocument();
    expect(button.innerHTML).toBe("Cancel Changes");
  });

  test("Account Component's Logout Button Renders Properly", () => {
    render(
      <Router>
        <Account dark={dark} logout={logout} />
      </Router>
    );

    const button = screen.getByRole("button", { name: "Logout" });
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
    expect(button).toBeTruthy();
  });
});
