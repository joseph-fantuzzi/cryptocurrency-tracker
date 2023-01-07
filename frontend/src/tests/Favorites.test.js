import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Favorites from "../components/Favorites";

describe("Favorites Page Tests", () => {
  const dark = true;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJmaXJzdF9uYW1lIjoidGVzdCIsImxhc3RfbmFtZSI6InRlc3QiLCJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpYXQiOjE2NzI5NjkzMDIsImV4cCI6MTY3MzA1NTcwMn0.SNUuS4TNm1miASZW13BkGfCGV-ClwQgoxgQ7A8RJWME";
  localStorage.setItem("token", token);

  test("Favorites Component Renders Properly", () => {
    render(
      <Router>
        <Favorites dark={dark} />
      </Router>
    );
  });

  test("Favorites Component Title Displays Properly", () => {
    render(
      <Router>
        <Favorites dark={dark} />
      </Router>
    );

    const title = screen.getByText(/Favorites List/);
    expect(title).toBeInTheDocument();
    expect(title).toBeVisible();
    expect(title).toBeTruthy();
  });

  test("Favorites Component Renders No Title Bar Since There are No Favorites", () => {
    render(
      <Router>
        <Favorites dark={dark} />
      </Router>
    );

    expect(screen.queryByText(/Currency/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Currency/)).not.toBeTruthy();

    expect(screen.queryByText(/Price/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Price/)).not.toBeTruthy();

    expect(screen.queryByText(/Market Cap/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Market Cap/)).not.toBeTruthy();

    expect(screen.queryByText(/Delete/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Delete/)).not.toBeTruthy();
  });

  test("Favorites Component Renders Text About Having No Favorites In Your List", () => {
    render(
      <Router>
        <Favorites dark={dark} />
      </Router>
    );

    const text = screen.getByText(/There are no favorite coins in your list currently./);
    expect(text).toBeInTheDocument();
    expect(text).toBeVisible();
    expect(text).toBeTruthy();
  });
});
