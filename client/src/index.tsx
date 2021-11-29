import "./index.css";
import { VechaiProvider } from "@vechaiui/react";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <VechaiProvider>
      <App />
    </VechaiProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
