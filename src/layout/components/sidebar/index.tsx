import React, {FC, useEffect, useState} from 'react'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './style.scss'
import type { MenuProps } from 'antd';
import { Avatar, Typography, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
} from '../../../assets/images'
import avatar from '../../../assets/images/header/avatar.svg'
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


// Temporary



const AppSidebar:FC = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [collapsed, setCollapsed] = useState(false);
  const items: MenuProps['items'] = [
    getItem('Dashboard', 'dashboard', <SettingOutlined />),
  
    getItem('Jobs', 'jobs', null, [
      getItem('Search Jobs', 'searchJobs'),
      getItem('Applications', 'applications')
    ], 'group'),
  ];



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={250}
    >
      <div className='sidebar-user-profile'>
        <Avatar size={48} src={avatar} />
        <div className='sidebar-user-profile-content'>
          <Typography.Title level={4}>Maria Sanoid</Typography.Title>
          <div className='sidebar-user-profile-role'>Student</div>
        </div>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        theme="dark"
      />
    </Sider>
  )
}

export default AppSidebar