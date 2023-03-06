import React, { FC, useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { getRoutes } from "./routes";
import "./App.scss";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/errors/errorBoundary";
import AppLayout from "./layout";
import Table from "./components/Noman/Table";
function App() {
  /* VARIABLE DECLARATION  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userData: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const user_role = userData.role || "Student";
  const publicRoutes = getRoutes("Public");
  let routes = getRoutes(user_role);
  routes = routes.concat(publicRoutes);
  const pages = useRoutes(routes);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{pages}</ErrorBoundary>
  );
}
export default App;
