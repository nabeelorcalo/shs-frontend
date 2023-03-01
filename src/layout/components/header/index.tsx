import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import { Button, MenuProps, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Logo, IconCollapsebleOff, IconCollapsebleOn, IconSearchNormal, MessageNotif, Notification,
  IconGlobe,
  IconLogout,
  IconProfile
} from '../../../assets/images'
import { Layout, Input, Dropdown, Avatar, Drawer, List, Card } from 'antd';
const { Search } = Input;
const { Header } = Layout;
const { Meta } = Card
import organizationLogo from '../../../assets/images/header/organisation.svg'
import avatar from '../../../assets/images/header/avatar.svg'

// Temporary
const items: MenuProps['items'] = [
  {
    key: '1',
    label: "Profile",
    icon: <IconProfile />,
  },
  {
    key: '2',
    label: "Go to Website",
    icon: <IconGlobe />,
  },
  {
    key: '3',
    label: "Logout",
    icon: <IconLogout />,
  },
];

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];


const AppHeader:FC = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const [searchWidthToggle, setSearchWidthToggle] = useState(false)
  const [openNotificationDrawer, setOpenNotificationDrawer] = useState(false);

  const menuStyle = {
    boxShadow: 'none',
  };



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function collapseSidebar() {
    setSidebarToggle(!sidebarToggle)
    console.log(sidebarToggle)
  }

  const onSearch = (value: string) => console.log(value);

  const handleSearchExpand = () => setSearchWidthToggle(!searchWidthToggle);

  const showNotificationDrawer = () => {
    setOpenNotificationDrawer(true)
  }

  const closeNotificationDrawer = () => {
    setOpenNotificationDrawer(false)
  }

  const navigaeToInbox = () => {
    console.log('Inbox')
  }
  


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Header>

      <div className='ikd-logo'>
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <div className='ikd-header-content'>

        <div className='ikd-header-left'>

          {/* Collapseable */}
          <div className='ikd-header-collapsebale'>
            <div className={`ikd-collapseable-button ${sidebarToggle? 'show': 'hide'}`} onClick={() => collapseSidebar()}>
              <div className='ikd-collapseable-button-toggle'>
                <div className='toggle-off'>
                  <IconCollapsebleOff />
                </div>
                <div className='toggle-on'>
                  <IconCollapsebleOn />
                </div>
              </div>
            </div>
          </div>
          {/* Collapseable Ends */}

          <div className='ikd-header-organisation'>
            <div className='organisation-title'>Your Organisation</div>
            <div className='organisation-logo'>
              <img src={organizationLogo} />
            </div>
          </div>

          {/* Global Search */}
          <div className={`ikd-search-box ${searchWidthToggle? 'expand': 'collapsed'}`}>
            <Search 
              placeholder='Search anything...'
              prefix={<IconSearchNormal onClick={() => handleSearchExpand()} />}
              bordered={false}
              onSearch={onSearch}
            />
            
          </div>
          {/* Global Search Ends */}

        </div>

        <div className='ikd-header-right'>
          <div className='ikd-header-message-notif'>
            <div className='message-notif-handler' onClick={() => navigaeToInbox()}>
              <MessageNotif />
            </div>
          </div>
          <div className='ikd-header-notification'>
            <div className='notification-handler' onClick={() => showNotificationDrawer()}>
              <Notification />
            </div>
          </div>
          <div className='loggedin-user'>
            <Dropdown
              overlayClassName="user-dropdown"
              menu={{items}} 
              trigger={['click']} 
              placement="bottomLeft"
              arrow
              dropdownRender={(menu) => (
                <div className='user-dropdown-container'>
                  <div className='user-dropdown-meta'>
                    <Avatar size={50} src={avatar} />
                    <div className='user-dropdown-meta-content'>
                      <Typography.Title level={4}>Maria Sanoid</Typography.Title>
                      <div className='user-meta-role'>Student</div>
                    </div>
                  </div>
                  {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
                  <div className='user-dropdown-footer'>
                    <Button type='primary' block>Switch to Intern</Button>
                  </div>
                </div>
              )}
            >
              <div className='loggedin-user-avatar'>
                <Avatar size={48} src={avatar} />
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
        width={380}
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
  )
}

export default AppHeader