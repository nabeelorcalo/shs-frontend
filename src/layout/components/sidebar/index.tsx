import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import type { MenuProps } from 'antd';
import { Avatar, Typography, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import MenuItemsStudents from './menuItemsStudents'
import {
  IconDashboard,
  IconBriefcase,
  IconClipboardTick,
  IconDocumentText,
  IconTaskSquare,
  IconUserProfile,
  IconFolder,
  IconRanking,
  IconCalendar,
  IconHouse,
  IconRecipes,
  IconGift,
  IconCalendarTick,
  IconCalendarRemove,
  IconTimer,
  IconChart,
  IconData,
  IconLikeShapes,
  IconEmojiSad,
  IconWalletCheck,
  IconEdit,
  IconProfileUsers,
  IconDocument
} from '../../../assets/images'
import avatar from '../../../assets/images/header/avatar.svg'
import MenuStudents from './menuStudents';
import MenuIntern from './menuIntern';
import MenuManager from './menuManager';
const { Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const AppSidebar:FC = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { useToken } = theme;
  const { token } = useToken();
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleMenuClick : MenuProps['onClick'] = (item) => {
    if(item.key) {
      navigate(item.key)
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
      style={{backgroundColor: token.colorPrimary}}
    >
      <div className='sidebar-user-profile'>
        <Avatar size={48} src={avatar} />
        <div className='sidebar-user-profile-content'>
          <Typography.Title level={4}>Maria Sanoid</Typography.Title>
          <div className='sidebar-user-profile-role'>Student</div>
        </div>
      </div>

      <Menu
        onClick={handleMenuClick}
        defaultSelectedKeys={['dashboard']}
        mode="inline"
        // items={sidebarMenuitems}
        theme="dark"
        style={{backgroundColor: token.colorPrimary}}
      >
        {/* <MenuStudents /> */}

        {/* <MenuIntern /> */}

        <MenuManager />

      </Menu>
    </Sider>
  )
}

export default AppSidebar