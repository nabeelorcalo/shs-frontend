import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { getRoutes } from "./routes";
import "./App.scss";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/errors/errorBoundary";
import constants from './config/constants';
import { RecoilRoot } from 'recoil';

function App() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userData: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  // const user_role = userData.role; // Uncomment it when login implemented
  const user_role = userData.role || constants.USER_ROLE;
  const publicRoutes = getRoutes('Public');
  let routes = getRoutes(user_role);
  routes = routes.concat(publicRoutes);
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
    <RecoilRoot>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        {pages}
      </ErrorBoundary>
    </RecoilRoot>
  );
}
export default App;
