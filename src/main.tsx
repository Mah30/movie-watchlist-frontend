import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import SessionContextProvider from './SessionContext/SessionContext';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <SessionContextProvider>
      <App />
    </SessionContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);