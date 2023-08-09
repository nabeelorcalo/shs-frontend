import React, { FC, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import organizationLogo from "../../../assets/images/header/organisation.svg";
import { DrawerWidth, ExtendedButton } from "../../../components";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { currentUserRoleState, currentUserState } from "../../../store";
import getUserRoleLable from "../../../helpers/roleLabel";
import { useRecoilState, useRecoilValue } from "recoil";
import useSearchOptions from "./searchOptions";
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
  AutoComplete
} from "antd";
import api from "../../../api";
import apiEndpints from "../../../config/apiEndpoints";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import { getUserAvatar } from "../../../helpers";
const { Search } = Input;
const { Header } = Layout;

type HeaderProps = {
  collapsed: boolean;
  sidebarToggler: () => void;
  handleLogout: any;

};
interface Option {
  value: string;
  link: string;
}


const AppHeader: FC<HeaderProps> = ({ collapsed, sidebarToggler, handleLogout }) => {

  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {MEDIA_URL} = constants;
  const isIntialRender: any = useRef(true)
  const [searchWidthToggle, setSearchWidthToggle] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchOptions, setSearchOptions] = useState([])
  const [open, setOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);
  const navigate = useNavigate();
  const role = useRecoilValue(currentUserRoleState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const width = DrawerWidth();
  const menuStyle = {
    boxShadow: "none",
  };
  // notifications
  const { getNotifications, appNotifications, handleSeenNotification } = useCustomHook()
  useEffect(() => {
    if (isIntialRender.current) {
      isIntialRender.current = false
      getNotifications()
    }
  }, [])

  const userDropdownItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Profile",
      icon: <IconProfile />,

      onClick: () => {
        setOpen(false);
        navigate(`/${ROUTES_CONSTANTS.PROFILE}`);
      }
    },
    {
      key: "2",
      label: "Go to Website",
      icon: <IconGlobe />,
      onClick: () => {
        window.location.replace(`${constants.WEBSITE_URL}`);
      }
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
  const {
    optionsManager,
    optionsStudents,
    optionsUniversity,
    optionsPropertyAgent,
    optionsSystemAdmin,
    optionsIntern,
    optionsDelegateAgent,
    optionsCompanyAdmin
  } = useSearchOptions()


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => { }, []);


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const optionsSwitcher = (role: any): Option[] => {
    if (role === constants.STUDENT) {
      return optionsStudents;
    } else if (role === constants.INTERN) {
      return optionsIntern;
    } else if (role === constants.MANAGER) {
      return optionsManager;
    } else if (role === constants.COMPANY_ADMIN) {
      return optionsCompanyAdmin;
    } else if (role === constants.UNIVERSITY) {
      return optionsUniversity;
    } else if (role === constants.SYSTEM_ADMIN) {
      return optionsSystemAdmin;
    } else if (role === constants.DELEGATE_AGENT) {
      return optionsDelegateAgent;
    } else if (role === constants.AGENT) {
      return optionsPropertyAgent;
    } else {
      return []
    }
  };

  const handleSearchChange = (newValue: any) => {
    setSearchValue(newValue)
    const lowerCaseNewValue = newValue.toLowerCase();
    const newOptions: any = optionsSwitcher(role).filter((option: any) => option.value.toLowerCase().indexOf(lowerCaseNewValue) !== -1)
    setSearchOptions(newOptions)
  }

  const handleSelect = (value: any) => {
    const selectedOption = optionsSwitcher(role).find((option) => option.value === value);
    if (selectedOption) {
      setSearchValue('');
      setIsInputFocused(false)
      setSearchOptions([])
      navigate(selectedOption.link);
    }
  };

  const handleMouseEnter = () => setSearchWidthToggle(true)
  const handleMouseLeave = () => {
    if (isInputFocused) {
      return;
    } else {
      setSearchWidthToggle(false);
    }
  }
  const handleFocus = () => setIsInputFocused(true);
  const handleBlur = () => {
    setIsInputFocused(false)
    setSearchWidthToggle(false);
  }

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

  const GoToSwitchRole = async (body: any): Promise<any> => {
    const { STUDENT_INTRNE_SWITCH } = apiEndpints;
    const { data } = await api.get(STUDENT_INTRNE_SWITCH);
    const userData = {
      ...currentUser,
      role: data?.role
    }
    setCurrentUser(userData);
    setOpen(false);
    navigate('/dashboard')
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
              className={`ikd-collapseable-button ${collapsed ? "show" : "hide"}`}
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
          <div className={`ikd-search-box ${searchWidthToggle ? "expand" : "collapsed"}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AutoComplete
              options={searchOptions.map((option: any) => ({ value: option.value }))}
              value={searchValue}
              onChange={handleSearchChange}
              onSelect={handleSelect}
            >
              <Search
                placeholder="Search a page"
                prefix={<IconSearchNormal />}
                bordered={false}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </AutoComplete>
          </div>
          <div className={`mobile-search-box ${mobileSearch ? "show" : "hide"}`}>
            <div
              className="mobile-searchbox-toggler"
              onClick={() => handleMobileSearch()}
            >
              <IconSearchNormal />
            </div>
            <Search
              placeholder="Search anything..."
              bordered={false}
              // onSearch={onSearch}
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
            role === constants.UNIVERSITY ||
            role === constants.SYSTEM_ADMIN
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
              placement="bottomRight"
              arrow
              open={open}
              onOpenChange={(open) => { setOpen(open) }}
              dropdownRender={(menu) => (
                <div className="user-dropdown-container">
                  <div className="user-dropdown-meta">
                    <Avatar size={50} src={`${MEDIA_URL}/${currentUser?.profileImage?.mediaId}.${currentUser?.profileImage?.metaData.extension}`}>
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
                      <ExtendedButton disabled={!currentUser?.intern} customType="secondary" onClick={GoToSwitchRole} block>
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
                <Avatar size={48} src={`${MEDIA_URL}/${currentUser?.profileImage?.mediaId}.${currentUser?.profileImage?.metaData.extension}`}>
                  {currentUser?.firstName.charAt(0)}{currentUser?.lastName.charAt(0)}
                </Avatar>
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
      {
        openNotificationDrawer &&
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
            dataSource={appNotifications}
            renderItem={(item: any, index) => (
              <List.Item className={`${!item?.isSeen && `text-input-bg-color`} my-1 !px-2 cursor-pointer`} onClick={() => { handleSeenNotification(item?.id?.toString()) }}>
                <List.Item.Meta
                  avatar={
                    <Avatar size={32} src={getUserAvatar(item?.profileImage)} alt="">
                      {item?.firstName && item?.firstName[0]}
                      {item?.lastName && item?.lastName[0]}
                    </Avatar>
                  }
                  title={item?.content}
                  description={dayjs(item?.date).fromNow()}
                />
              </List.Item>
            )}
          />
        </Drawer>
      }
    </Header>
  );
};

export default AppHeader;
