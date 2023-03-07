import React, {useEffect, useState} from 'react'
import './style.scss'
import { Layout } from 'antd';
import AppHeader from './components/header';
import AppSidebar from './components/sidebar';
import AppFooter from './components/footer';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;


function AppLayout() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [collapsed, setCollapsed] = useState(false)


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const collapsedSidebar = () => {
    setCollapsed(!collapsed)
  }

  


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Layout>

      <AppHeader
        collapsed={collapsed}
        sidebarToggler={collapsedSidebar}
      />

      <Layout>

        <AppSidebar
          collapsed={collapsed}
          sidebarToggler={collapsedSidebar}
          setCollapsed={setCollapsed}
        />

        <Content>
          <Outlet />
        </Content>

      </Layout>

      <AppFooter />

    </Layout>
  )
}

export default AppLayout