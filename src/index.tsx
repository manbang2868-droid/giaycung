import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/global.css"; // hoặc "./index.css" nếu bạn dùng file đó
import { App } from "./app/App";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element #root not found");

ReactDOM.createRoot(rootEl).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
