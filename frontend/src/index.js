import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.css";
import "./styles/other.css";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
