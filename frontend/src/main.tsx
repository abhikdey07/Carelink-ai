import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>

    <BrowserRouter>

      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "14px",
            background: "#ffffff",
            color: "#1e293b",
            fontWeight: "600",
            padding: "16px",
          },

          success: {
            style: {
              border: "2px solid #22c55e",
            },
          },

          error: {
            style: {
              border: "2px solid #ef4444",
            },
          },
        }}
      />

      <App />

    </BrowserRouter>

  </React.StrictMode>
);