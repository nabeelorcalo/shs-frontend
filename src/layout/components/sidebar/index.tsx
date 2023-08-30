import { FC, useEffect, useState } from "react";
import "./style.scss";
import type { MenuProps } from "antd";
import { Avatar, Typography, Layout, Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import constants from "../../../config/constants";
import { } from "../../../assets/images";
import useMenuHook from "./menu";
import { currentUserRoleState, currentUserState, sbColorState } from "../../../store";
import { useRecoilValue } from "recoil";
import getUserRoleLable from "../../../helpers/roleLabel";

type SidebarProps = {
  collapsed: boolean;
  collapsedWidth: number;
  onBreakpoint: any;
};

const AppSidebar: FC<SidebarProps> = ({ collapsed, collapsedWidth, onBreakpoint }) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
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
  const { firstName, lastName, profileImage } = useRecoilValue(currentUserState);
  const currentUser = useRecoilValue(currentUserState);
  console.log('currentUser:: ', currentUser);

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
    } else if (role === constants.INTERN) {
      return itemsIntern;
    } else if (role === constants.MANAGER) {
      return itemsManager;
    } else if (role === constants.COMPANY_ADMIN) {
      return itemsCompanyAdmin;
    } else if (role === constants.UNIVERSITY) {
      return itemsUniversity;
    } else if (role === constants.SYSTEM_ADMIN) {
      return itemsSystemAdmin;
    } else if (role === constants.DELEGATE_AGENT) {
      return itemsDelegateAgent;
    } else if (role === constants.AGENT) {
      return itemsPropertyAgent;
    } else {
      return []
    }
  };

  // const themeSideMenuColor = useRecoilValue(sbColorState);
  function darkenColor(color:any, percent:any) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
  
    const adjustedR = Math.max(0, r - (r * percent / 100));
    const adjustedG = Math.max(0, g - (g * percent / 100));
    const adjustedB = Math.max(0, b - (b * percent / 100));
  
    return `#${Math.round(adjustedR).toString(16).padStart(2, '0')}${Math.round(adjustedG).toString(16).padStart(2, '0')}${Math.round(adjustedB).toString(16).padStart(2, '0')}`;
  }

  if(role === constants.INTERN || role === constants.MANAGER || role === constants.COMPANY_ADMIN) {
    if(currentUser?.company?.sideMenuColor) {
      document.documentElement.style.setProperty('--theme-side-menu', currentUser?.company?.sideMenuColor);
      const darkenedColor = darkenColor(currentUser?.company?.sideMenuColor , 20);
      document.documentElement.style.setProperty('--theme-selected-menu', darkenedColor);
    }
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
      collapsedWidth={collapsedWidth}
      breakpoint="md"
      onBreakpoint={onBreakpoint}
    >
      <div className="sidebar-user-profile">
        <Avatar size={48} src={`${MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData.extension}`}>
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
      />
    </Sider>
  );
};

export default AppSidebar;
