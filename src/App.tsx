import React, { FC, useEffect, useMemo } from "react";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ConfigProvider, notification } from "antd";
import { ErrorFallback } from "./pages/errors/errorBoundary";
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { currentUserState, ButtonPrimaryColorState } from "./store";
import constants, { ROUTES_CONSTANTS } from "./config/constants";
import { getRoutes } from "./routes";
import themeToken from "./theme/token";
import "./App.scss";

const Context = React.createContext({ name: "Default" });

function App() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "Student Help Squad" }), []);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const accessToken = localStorage.getItem("accessToken");
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const buttonPrimaryColor = useRecoilValue(ButtonPrimaryColorState);

  const location = useLocation()

  /* HOOKS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (accessToken && pathname === `/${ROUTES_CONSTANTS.LOGIN}`) {
      navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`);
    } else if (
      !accessToken &&
      // pathname !=  `/${ROUTES_CONSTANTS.Under_REVIEW_SCREEN}`
      pathname != `/${ROUTES_CONSTANTS.SIGNUP}` &&
      pathname != `/${ROUTES_CONSTANTS.VERIFICATION_STEPS}` &&
      pathname != `/${ROUTES_CONSTANTS.FORGOT_PASSWORD}` &&
      pathname != `/${ROUTES_CONSTANTS.VERIFICATION_LINK_SENT}` &&
      pathname != `/${ROUTES_CONSTANTS.VERIFICATION_LINK_SUCCESS}` &&
      pathname != `/${ROUTES_CONSTANTS.RESET_LINK_SENT}` &&
      pathname != `/${ROUTES_CONSTANTS.CREATE_PASSWORD}` &&
      pathname != `/${ROUTES_CONSTANTS.UNI_VERIFICATION_STEPS}`
    ) {
      navigate(`/${ROUTES_CONSTANTS.LOGIN}${location?.search ? location?.search : ""}`);
    }
  }, [pathname]);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <ConfigProvider theme={themeToken}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {accessToken
              ? useRoutes(
                getRoutes(currentUser.role).concat(
                  getRoutes(constants.PUBLIC)
                )
              )
              : useRoutes(getRoutes(constants.PUBLIC))}
          </ErrorBoundary>
        </ConfigProvider>
      </Context.Provider>
    </>
  );
}
export default App;
