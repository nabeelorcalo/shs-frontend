import { useEffect, useState } from "react";
import "./style.scss";
import { Layout } from "antd";
import AppHeader from "./components/header";
import AppSidebar from "./components/sidebar";
import AppFooter from "./components/footer";
import { Outlet, useNavigate } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../config/constants";
import apiEndpoints from "../config/apiEndpoints";
import api from "../api";
import { socket } from "../socket";
import { currentUserState } from "../store";
import { useRecoilValue } from "recoil";

import useDashboardHook from "../pages/dashboard/intern/actionHandler";
import dayjs from "dayjs";

const { Content } = Layout;

function AppLayout() {
  const user = useRecoilValue(currentUserState);
  const { LOGOUT } = apiEndpoints;
  const navigate = useNavigate();
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [collapsed, setCollapsed] = useState(false);
  const [running, setRunning] = useLocalStorage(
    "timer:running",
    false,
    (string) => string === "true"
  );
  const [collapsedWidth, setCollapsedWidth] = useState(94);
  const { handleAttendenceClockout } = useDashboardHook();

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    socket.auth = {
      id: user?.id,
      username: `${user?.firstName} ${user?.lastName}`,
    };
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const collapsedSidebar = () => {
    setCollapsed(!collapsed);
  };

  // presist timer
  function useLocalStorage(
    key: any,
    initialValue: any,
    parseValue = (v: any) => v
  ) {
    const [item, setValue] = useState(() => {
      const value = parseValue(localStorage.getItem(key)) || initialValue;
      localStorage.setItem(key, value);
      return value;
    });
    const setItem = (newValue: any) => {
      setValue(newValue);
      window.localStorage.setItem(key, newValue);
    };
    return [item, setItem];
  }

  const onBreakPoint = (broken: any) => {
    setCollapsedWidth(broken ? 0 : 94);
    setCollapsed(broken);
  };

  // stop timer / clockout
  const handleStop = async () => {
    setRunning(false);
    const attendance = JSON.parse(localStorage.getItem("clockin") ?? "");
    // clockout api call with attendance id
    if (attendance?.attendance?.id) {
      await handleAttendenceClockout(
        dayjs().format("HH:mm:ss"),
        attendance?.attendance?.id
      );
    }
  };

  const handleLogout = async () => {
    if (user?.role === constants.INTERN && localStorage.getItem("clockin"))
      await handleStop();
    const res: any = await api.get(LOGOUT);
    // Just clear the items that you set
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cognitoId");
    localStorage.removeItem("recoil-persist");
    window.location.replace(`${constants.WEBSITE_URL}/Auth?logout=true`);
    // navigate(`/${ROUTES_CONSTANTS.LOGIN}`);
  };

  /* RENDER APP
  -------------------------------------------------------------------------------------*/

  return (
    <Layout>
      <AppHeader
        collapsed={collapsed}
        sidebarToggler={collapsedSidebar}
        handleLogout={handleLogout}
      />

      <Layout>
        <AppSidebar
          collapsed={collapsed}
          onBreakpoint={onBreakPoint}
          collapsedWidth={collapsedWidth}
        />

        <Content style={{ marginLeft: collapsed ? collapsedWidth : "250px" }}>
          <Outlet />
        </Content>
      </Layout>

      <AppFooter collapsed={collapsed} collapsedWidth={collapsedWidth} />
    </Layout>
  );
}

export default AppLayout;
