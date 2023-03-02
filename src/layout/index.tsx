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
import SignUp from "../auth-temp/sign-up";
import VerificationLink from "../auth-temp/sign-up/signup-form/VerificationLink";
import IdentityVerification from "../auth-temp/sign-up/signup-form/verification/IdentityVerification";
import DbsVerification from "../auth-temp/sign-up/signup-form/verification/DbsVerification";
import UniversityDetails from "../auth-temp/sign-up/signup-form/verification/UniversityDetails";
import Documents from "../auth-temp/sign-up/signup-form/verification/Documents";
import Address from "../auth-temp/sign-up/signup-form/verification/Address";
import Photograph from "../auth-temp/sign-up/signup-form/verification/Photograph";
import Video from "../auth-temp/sign-up/signup-form/verification/Video";

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
