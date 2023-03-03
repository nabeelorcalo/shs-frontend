import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import { Layout } from 'antd';
import AppHeader from './components/header';
import AppSidebar from './components/sidebar';
import { Outlet } from 'react-router-dom';
const { Footer, Content } = Layout;


function AppLayout() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [sidebarToggle, setSidebarToggle] = useState(false)



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
  


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Layout>

      <AppHeader />

      <Layout>

        <AppSidebar />

        <Content>
          <Outlet />
        </Content>

      </Layout>

      <Footer>Footer</Footer>

    </Layout>
  )
}

export default AppLayout