import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

describe("Individual Coin Page Tests", () => {
  //   const dark = true;

  //   test("IndividualCoin Component Renders Properly", () => {
  //     render(
  //       <Router>
  //         <IndividualCoin dark={dark} />
  //       </Router>
  //     );
  //   });

  test("Sanity Test", () => {
    expect(true).not.toBe(false);
  });
});
