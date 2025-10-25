import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

export default function Root() {
  return (
    <BrowserRouter basename="/pibble-smp-website">
      <App />
    </BrowserRouter>
  );
}
