import React, { FC, useEffect } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/errors/errorBoundary";
import { getRoutes } from "./routes";
import "./App.scss";
import constants from "./config/constants";
import { ConfigProvider } from "antd";
import { themeState } from "./store";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { currentUserState } from "./store/Signin";

function App() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
  const accessToken = localStorage.getItem("accessToken");
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  /* HOOKS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    // if (
    //   !userData.token &&
    //   !pathname.includes("signup") &&
    //   !pathname.includes("forget-password") &&
    //   !pathname.includes("reset-password")
    // ) {
    //   navigate("/login");
    //
    // }
  }, [pathname]);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <ConfigProvider theme={currentTheme}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          {accessToken
            ? useRoutes(
                getRoutes(currentUser.role).concat(getRoutes(constants.PUBLIC))
              )
            : useRoutes(getRoutes(constants.PUBLIC))}
        </ErrorBoundary>
      </ConfigProvider>
    </>
  );
}
export default App;
