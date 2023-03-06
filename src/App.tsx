import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { getRoutes } from "./routes";
import "./App.scss";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/errors/errorBoundary";
import AppLayout from './layout'




function App() {

  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userData: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const publicRoutes = getRoutes('Public');
  const routes = getRoutes(userData.role);
  routes.push(publicRoutes);
 
  
  const pages = useRoutes(routes);

  /* HOOKS
  -------------------------------------------------------------------------------------*/
  // useEffect(() => {
  //   if (
  //     !userData.token &&
  //     !pathname.includes("signup") &&
  //     !pathname.includes("forget-password") &&
  //     !pathname.includes("reset-password")
  //   ) {
  //     navigate("/login");
  //   }
  // }, [pathname]);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {pages}
    </ErrorBoundary>

  )
}

export default App;
