import { FC, useContext, useEffect, useState } from "react";
import "./style.scss";
import type { MenuProps } from "antd";
import { Avatar, Typography, Layout, Menu, theme } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import constants from "../../../config/constants";
import { } from "../../../assets/images";
import useMenuHook from "./menu";
import { currentUserRoleState, currentUserState, themeState } from "../../../store";
import { useRecoilState, useRecoilValue } from "recoil";
import getUserRoleLable from "../../../helpers/roleLabel";
import { CustomTheme } from "../../../personalizeTheme";

type SidebarProps = {
  collapsed: boolean;
  collapsedWidth: number;
  onBreakpoint: any;
};

const AppSidebar: FC<SidebarProps> = ({ collapsed, collapsedWidth, onBreakpoint }) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {
    itemsSystemAdmin,
    itemsCompanyAdmin,
    itemsManager,
    itemsStudents,
    itemsUniversity,
    itemsPropertyAgent,
    itemsIntern,
    itemsDelegateAgent,
  } = useMenuHook();
  const { Sider } = Layout;
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const role = useRecoilValue(currentUserRoleState);
  const { firstName, lastName, avatar } = useRecoilValue(currentUserState);
  const { themeContext, theme } = CustomTheme();

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
      navigate(item.key, { state: { from: location.pathname } });
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


  function addAlpha(color: string, opacity: any) {
    var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
    var alphaHex = _opacity.toString(16).toUpperCase().padStart(2, '0');
    var colorWithoutAlpha = color.slice(0, -2);
    var result = colorWithoutAlpha + alphaHex;
    console.log(result);
    return result;
  }

  const styles = { backgroundColor: theme.sidebar }

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      collapsedWidth={collapsedWidth}
      style={{ backgroundColor: theme.sidebar }}
      breakpoint="md"
      onBreakpoint={onBreakpoint}
    >
      <div className="sidebar-user-profile">
        <Avatar size={48} src={avatar}>
          {firstName.charAt(0)}{lastName.charAt(0)}
        </Avatar>
        <div className="sidebar-user-profile-content">
          <Typography.Title level={4}>{`${firstName} ${lastName}`}</Typography.Title>
          <div className="sidebar-user-profile-role">{getUserRoleLable(role)}</div>
        </div>
      </div>
      <Menu
        items={menuSwitcher(role)}
        onClick={handleMenuClick}
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
        style={styles}
      />
    </Sider>
  );
};

export default AppSidebar;


