import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import type { MenuProps } from 'antd';
import { Avatar, Typography, Layout, Menu, theme } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { } from '../../../assets/images'
import avatar from '../../../assets/images/header/avatar.svg'
import { itemsManager } from './menuManager'
import { itemsStudents } from './menuStudents'
import { itemsIntern } from './menuIntern'
import { itemsCompanyAdmin } from './menuCompanyAdmin'
import { itemsUniversity } from './menuUniversity'
const { Sider } = Layout;



const AppSidebar:FC = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const location = useLocation()
  const { useToken } = theme
  const { token } = useToken()
  const [collapsed, setCollapsed] = useState(false)
  const [ selectedKey, setSelectedKey ] = useState(location.pathname)

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleMenuClick : MenuProps['onClick'] = (item) => {
    if(item.key) {
      setSelectedKey(item.key)
      navigate(item.key)
    }
  };

  const menuSwitcher = (role:string) => {
    if(role === "student") {
      return itemsStudents
    }
    if(role === "intern") {
      return itemsIntern
    }
    if(role === "manager") {
      return itemsManager
    }
    if(role === 'companyAdmin') {
      return itemsCompanyAdmin
    }
    if(role === 'university') {
      return itemsUniversity
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
        items={menuSwitcher('student')}
        onClick={handleMenuClick}
        defaultSelectedKeys={[selectedKey]}
        mode="inline"
        theme="dark"
        style={{backgroundColor: token.colorPrimary}}
      />
    </Sider>
  )
}

export default AppSidebar