import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Home from "../components/Home";

describe("Home Page Tests", () => {
  const dark = true;

  test("Home Component Renders Properly", () => {
    render(
      <Router>
        <Home dark={dark} />
      </Router>
    );
  });

  test("Home Component Properly Renders App Name", () => {
    render(
      <Router>
        <Home dark={dark} />
      </Router>
    );

    const appName = screen.getByText(/Cryptox/);
    expect(appName).toBeInTheDocument();
    expect(appName).toBeVisible();
    expect(appName).toBeTruthy();
  });

  test("Home Component Properly Renders Home Page Heading", () => {
    render(
      <Router>
        <Home dark={dark} />
      </Router>
    );

    const heading = screen.getByText(
      /Meet the Next Generation of Cryptocurrency Tracking Software/
    );
    expect(heading).toBeInTheDocument();
    expect(heading).toBeVisible();
    expect(heading).toBeTruthy();
  });

  test("Home Component Properly Renders Get Started Button", () => {
    render(
      <Router>
        <Home dark={dark} />
      </Router>
    );

    const button = screen.getByRole("button", { name: "Get Started" });
    expect(button).toBeInTheDocument();
    expect(button).toBeVisible();
    expect(button).toBeTruthy();
  });
});
