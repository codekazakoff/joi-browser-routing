import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
render(
  <Router>
    <ToastContainer />
    <App />
  </Router>,
  document.getElementById("root")
);
