import React, { useEffect, useState } from "react";
import "./style.scss";
import { Layout } from "antd";
import AppHeader from "./components/header";
import AppSidebar from "./components/sidebar";
import AppFooter from "./components/footer";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../config/constants";
import apiEndpoints from "../config/apiEndpoints";
import api from "../api";
import { Notifications } from "../components";
import { log } from "console";

const { Content } = Layout;

function AppLayout() {
  const { LOGOUT } = apiEndpoints;
  const navigate = useNavigate();
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [collapsed, setCollapsed] = useState(false);
  const [collapsedWidth, setCollapsedWidth] = useState(94);

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => { }, []);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const collapsedSidebar = () => {
    setCollapsed(!collapsed);
  };

  const onBreakPoint = (broken: any) => {
    setCollapsedWidth(broken ? 0 : 94);
    setCollapsed(broken);
  };

  const handleLogout = async () => {
    const res: any = await api.get(LOGOUT);
    if (res.statusCode === 200) {
      localStorage.clear();
      Notifications({
        title: "Success",
        description: "Logout Successfully",
        type: "success",
      });
      navigate(`/${ROUTES_CONSTANTS.LOGIN}`);
    }
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
