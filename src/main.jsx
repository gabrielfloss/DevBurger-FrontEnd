import React from "react";
import ReactDOM from "react-dom/client";
import GlobalStyle from "./styles/globalstyles";
import { ToastContainer } from "react-toastify";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import AppProvider from "./hooks";
import { Elements } from "@stripe/react-stripe-js"
import stripePromise from "./config/stripeConfig";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <Elements stripe={stripePromise} >
        <RouterProvider router={router} />
      </Elements>
      <GlobalStyle />
      <ToastContainer autoClose={2000} />
    </AppProvider>
  </React.StrictMode>,
);
