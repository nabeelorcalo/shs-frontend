import React, { FC, useEffect, useState } from "react";
import "./styles.scss";
import {
  Button,
  MenuProps,
  Typography,
  Layout,
  Input,
  Dropdown,
  Avatar,
  Drawer,
  List
} from "antd";
import { Link } from "react-router-dom";
import {
  Logo,
  IconCollapsebleOff,
  IconCollapsebleOn,
  IconSearchNormal,
  MessageNotif,
  Notification,
} from "../../../../assets/images";
const { Search } = Input;
const { Header } = Layout;
import organizationLogo from "../../../../assets/images/header/organisation.svg";
import avatar from "../../../../assets/images/header/avatar.svg";

type HeaderProps = {
  imageUrl: any;
};

const AppHeader = ({ imageUrl }: HeaderProps) => {
  return (
    <Header
      className="header-style-personalization"
    >
      <div className="logo-header">
        <Logo />
      </div>
      <div className="ikd-header-content">
        <div className="ikd-header-left">
          <div className="ikd-header-collapsebale">
            <div className={`ikd-collapseable-button`}>
              <div className="ikd-collapseable-button-toggle">
                <div className="toggle-off">
                  <IconCollapsebleOff />
                </div>
                <div className="toggle-on">
                  <IconCollapsebleOn />
                </div>
              </div>
            </div>
          </div>
          {/* Collapseable Ends */}
          <div className="ikd-header-organisation">
            <div className="organisation-title-preview">Your Organisation</div>
            <div className="organisation-logo-preview">
              <img alt="image here" src={imageUrl} />
            </div>
          </div>
        </div>
        <div className="ikd-header-right">
          <div className="ikd-header-message-notif">
            <div className="message-notif-handler">
              <MessageNotif />
            </div>
          </div>
          <div className="ikd-header-notification">
            <div className="notification-handler">
              <Notification />
            </div>
          </div>
          <div className="loggedin-user">
            <div className="loggedin-user-avatar">
              <Avatar size={48} src={avatar} />
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
