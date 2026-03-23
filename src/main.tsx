import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import * as Tooltip from "@radix-ui/react-tooltip";
import "@unocss/reset/tailwind.css";
import "uno.css";
import "./styles.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Tooltip.Provider delayDuration={120}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Tooltip.Provider>
  </React.StrictMode>,
);
