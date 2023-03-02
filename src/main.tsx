import "./index.scss";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getRoutes } from "./routes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {getRoutes("auth").map((item: any) => (
            <Route path={item.path} element={item.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>
);
