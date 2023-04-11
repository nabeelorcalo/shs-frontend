import React, { FC, useEffect, useState } from "react";
import "./style.scss";
import type { MenuProps } from "antd";
import { Avatar, Typography, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import constants from "../../../config/constants";
import {} from "../../../assets/images";
import { itemsManager } from "./menuManager";
import { itemsStudents } from "./menuStudents";
import { itemsIntern } from "./menuIntern";
import { itemsCompanyAdmin } from "./menuCompanyAdmin";
import { itemsUniversity } from "./menuUniversity";
import { itemsSystemAdmin } from "./menuSystemAdmin";
import { itemsDelegateAgent } from "./menuDelegateAgent";
import { itemsPropertyAgent } from "./menuPropertyAgent";
import { currentUserRoleState, currentUserState } from "../../../store";
import { useRecoilValue } from "recoil";
const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
  collapsedWidth: number;
  onBreakpoint: any;
};

const AppSidebar: FC<SidebarProps> = ({
  collapsed,
  collapsedWidth,
  onBreakpoint,
}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const location = useLocation();
  const { useToken } = theme;
  const { token } = useToken();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const role = useRecoilValue(currentUserRoleState);
  const currentUser = useRecoilValue(currentUserState);

  // const {role } =useCurrentUserRole()

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    
  }, []);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleMenuClick: MenuProps["onClick"] = (item) => {
    if (item.key) {
      setSelectedKey(item.key);
      navigate(item.key);
    }
  };

  const menuSwitcher = (role: string) => {
    if (role === constants.STUDENT) {
      return itemsStudents;
    }
    if (role === constants.INTERN) {
      return itemsIntern;
    }
    if (role === constants.MANAGER) {
      return itemsManager;
    }
    if (role === constants.COMPANY_ADMIN) {
      return itemsCompanyAdmin;
    }
    if (role === constants.UNIVERSITY) {
      return itemsUniversity;
    }
    if (role === constants.SYSTEM_ADMIN) {
      return itemsSystemAdmin;
    }
    if (role === constants.DELEGATE_AGENT) {
      return itemsDelegateAgent;
    }
    if (role === constants.AGENT) {
      return itemsPropertyAgent;
    }
  };

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      collapsedWidth={collapsedWidth}
      style={{ backgroundColor: token.colorPrimary }}
      breakpoint="md"
      onBreakpoint={onBreakpoint}
    >
      <div className="sidebar-user-profile">
        <Avatar size={48} src={currentUser?.avatar}>
          {currentUser?.firstName.charAt(0)}{currentUser?.lastName.charAt(0)}
        </Avatar>
        <div className="sidebar-user-profile-content">
          <Typography.Title level={4}>{currentUser?.firstName} {currentUser?.lastName}</Typography.Title>
          <div className="sidebar-user-profile-role">{role}</div>
        </div>
      </div>

      <Menu
        items={menuSwitcher(role)}
        onClick={handleMenuClick}
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
        style={{ backgroundColor: token.colorPrimary }}
      />
    </Sider>
  );
};

export default AppSidebar;
