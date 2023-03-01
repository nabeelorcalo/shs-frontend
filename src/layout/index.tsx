import React, { FC, useEffect, useState } from "react";
import "./style.scss";
import { Layout } from "antd";
import AppHeader from "./components/header";
import AppSidebar from "./components/sidebar";
const { Footer, Content } = Layout;
import SignIn from "../auth-temp/sign-in";
import ResetLink from "../auth-temp/sign-in/reset-password/ResetLink";
import ResetPassword from "../auth-temp/sign-in/reset-password";
import CreatePassword from "../auth-temp/sign-in/reset-password/create-password";
import PasswordSuccess from "../auth-temp/sign-in/reset-password/create-password/PasswordSuccess";

function AppLayout() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [sidebarToggle, setSidebarToggle] = useState(false);

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, []);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function collapseSidebar() {
    setSidebarToggle(!sidebarToggle);
    console.log(sidebarToggle);
  }

  /* RENDER APP
  -------------------------------------------------------------------------------------*/

  return [
    <SignIn />,
    <ResetPassword />,
    <ResetLink />,
    <CreatePassword />,
    <PasswordSuccess />,
  ];

  return (
    <Layout>
      <AppHeader />

      <Layout>
        <AppSidebar />

        <Content></Content>
      </Layout>

      <Footer>Footer</Footer>
    </Layout>
  );
}

export default AppLayout;
