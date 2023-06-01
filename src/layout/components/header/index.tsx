import React, { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import organizationLogo from "../../../assets/images/header/organisation.svg";
import avatar from "../../../assets/images/header/avatar.svg";
import { DrawerWidth, ExtendedButton } from "../../../components";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { currentUserRoleState, currentUserState } from "../../../store";
import getUserRoleLable from "../../../helpers/roleLabel";
import { useRecoilState, useRecoilValue } from "recoil";
import "./style.scss";
import {
  Logo,
  IconCollapsebleOff,
  IconCollapsebleOn,
  IconSearchNormal,
  MessageNotif,
  Notification,
  IconGlobe,
  IconLogout,
  IconProfile,
  IconCross,
} from "../../../assets/images";
import {
  Layout,
  Input,
  Dropdown,
  Avatar,
  Drawer,
  List,
  MenuProps,
  Typography,
} from "antd";
import api from "../../../api";
import apiEndpints from "../../../config/apiEndpoints";
const { Search } = Input;
const { Header } = Layout;

type HeaderProps = {
  collapsed: boolean;
  sidebarToggler: () => void;
  handleLogout: any;

};

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

const AppHeader: FC<HeaderProps> = ({ collapsed, sidebarToggler, handleLogout }) => {

  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [searchWidthToggle, setSearchWidthToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const navigate = useNavigate();
  const role = useRecoilValue(currentUserRoleState);
  // const currentUser = useRecoilValue(currentUserState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const width = DrawerWidth();

  const menuStyle = {
    boxShadow: "none",
  };

  const userDropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <IconProfile />,
      onClick: () => {
        navigate(`/${ROUTES_CONSTANTS.PROFILE}`);
      }
    },
    {
      key: "2",
      label: "Go to Website",
      icon: <IconGlobe />,
    },
    {
      key: "3",
      label: "Logout",
      icon: <IconLogout />,
      onClick: (props) => {
        handleLogout()
      },
    },
  ];

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => { }, []);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const onSearch = (value: string) => console.log(value);

  const handleSearchExpand = () => setSearchWidthToggle(!searchWidthToggle);

  const handleMobileSearch = () => setMobileSearch(!mobileSearch);

  const showNotificationDrawer = () => {
    setOpenNotificationDrawer(true);
  };

  const closeNotificationDrawer = () => {
    setOpenNotificationDrawer(false);
  };

  const navigateToInbox = () => {
    navigate("/chat");
  };
  // const storedData:any = localStorage.getItem("recoil-persist");
  // const userData = JSON.parse(storedData)
  // console.log(userData.id, "storedData");


  const GoToSwitchRole = async (body: any): Promise<any> => {
    const { STUDENT_INTRNE_SAWITCH } = apiEndpints;
    const { data } = await api.get(STUDENT_INTRNE_SAWITCH);
    console.log(data, "responseresponseresponseresponse");
    // const userData = {
    //   ...data,
    //   role: data?.role
    // }
    // setCurrentUser(userData);
    // setOpen(false);
  }

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Header>
      <div className="ikd-logo">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className="ikd-header-content">
        <div className="ikd-header-left">
          {/* Collapseable */}
          <div className="ikd-header-collapsebale">
            <div
              className={`ikd-collapseable-button ${collapsed ? "show" : "hide"
                }`}
              onClick={() => sidebarToggler()}
            >
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
          {role === constants.INTERN && (
            <div className="ikd-header-organisation">
              <div className="organisation-title">Your Organisation</div>
              <div className="organisation-logo">
                <img src={organizationLogo} />
              </div>
            </div>
          )}
          {/* Global Search */}
          <div
            className={`ikd-search-box ${searchWidthToggle ? "expand" : "collapsed"
              }`}
          >
            <Search
              placeholder="Search anything..."
              prefix={<IconSearchNormal onClick={() => handleSearchExpand()} />}
              bordered={false}
              onSearch={onSearch}
            />
          </div>
          <div
            className={`mobile-search-box ${mobileSearch ? "show" : "hide"}`}
          >
            <div
              className="mobile-searchbox-toggler"
              onClick={() => handleMobileSearch()}
            >
              <IconSearchNormal />
            </div>
            <Search
              placeholder="Search anything..."
              bordered={false}
              onSearch={onSearch}
              prefix={<IconCross onClick={() => setMobileSearch(false)} />}
            />
          </div>
          {/* Global Search Ends */}
        </div>
        <div className="ikd-header-right">
          {(role === constants.INTERN ||
            role === constants.STUDENT ||
            role === constants.MANAGER ||
            role === constants.COMPANY_ADMIN ||
            role === constants.UNIVERSITY
          ) &&
            (<div className="ikd-header-message-notif">
              <div
                className="message-notif-handler"
                onClick={() => navigateToInbox()}
              >
                <MessageNotif />
              </div>
            </div>
            )}
          <div className="ikd-header-notification">
            <div
              className="notification-handler"
              onClick={() => showNotificationDrawer()}
            >
              <Notification />
            </div>
          </div>

          <div className="loggedin-user">
            <Dropdown
              overlayClassName="user-dropdown"
              menu={{ items: userDropdownItems }}
              trigger={["click"]}
              placement="bottomLeft"
              arrow
              open={open}
              onOpenChange={(open) => { setOpen(open) }}
              dropdownRender={(menu) => (
                <div className="user-dropdown-container">
                  <div className="user-dropdown-meta">
                    <Avatar size={50} src={currentUser?.avatar}>
                      {currentUser?.firstName.charAt(0)}{currentUser?.lastName.charAt(0)}
                    </Avatar>
                    <div className="user-dropdown-meta-content">
                      <Typography.Title level={4}>
                        {currentUser?.firstName} {currentUser?.lastName}
                      </Typography.Title>
                      <div className="user-meta-role">{getUserRoleLable(role)}</div>
                    </div>
                  </div>
                  {React.cloneElement(menu as React.ReactElement, {
                    style: menuStyle,
                  })}
                  {role === constants.STUDENT &&
                    <div className="user-dropdown-footer">
                      <ExtendedButton customType="secondary" onClick={GoToSwitchRole} block>
                        Switch to Intern
                      </ExtendedButton>
                    </div>
                  }
                  {role === constants.INTERN &&
                    <div className="user-dropdown-footer">
                      <ExtendedButton customType="tertiary" onClick={GoToSwitchRole} block>
                        Switch to Student
                      </ExtendedButton>
                    </div>
                  }
                </div>
              )}
            >
              <div className="loggedin-user-avatar">
                <Avatar size={48} src={currentUser?.avatar}>
                  {currentUser?.firstName.charAt(0)}{currentUser?.lastName.charAt(0)}
                </Avatar>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      <Drawer
        title="Notifications"
        placement="right"
        onClose={closeNotificationDrawer}
        open={openNotificationDrawer}
        closable={false}
        width={width > 768 ? 380 : 280}
        className="notifications-drawer"
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size={32} src={avatar} />}
                title="You have posted an announcement and shared with all interns."
                description="9 days ago"
              />
            </List.Item>
          )}
        />
      </Drawer>
    </Header>
  );
};

export default AppHeader;
