import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import type { MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { Logo, IconCollapsebleOff, IconCollapsebleOn, IconSearchNormal, MessageNotif, Notification } from '../../../assets/images'
import { Layout, Input, Dropdown, Avatar } from 'antd';
const { Search } = Input;
const { Header } = Layout;
import organizationLogo from '../../../assets/images/header/organisation.svg'
import avatar from '../../../assets/images/header/avatar.svg'

// Temporary
const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item
      </a>
    ),
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item
      </a>
    ),
  },
];


const AppHeader:FC = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [sidebarToggle, setSidebarToggle] = useState(false)
  const [searchWidthToggle, setSearchWidthToggle] = useState(false)



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
            <div className='message-notif-handler'>
              <MessageNotif />
            </div>
          </div>
          <div className='ikd-header-notification'>
            <div className='notification-handler'>
              <Notification />
            </div>
          </div>
          <div className='loggedin-user'>
            <Dropdown menu={{items}}  placement="bottomLeft" arrow>
              <Avatar size={48} src={avatar} />
            </Dropdown>
          </div>
        </div>
      </div>
    </Header>
  )
}

export default AppHeader