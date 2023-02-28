import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import { Layout } from 'antd';
import AppHeader from './components/header';
const { Footer, Sider, Content } = Layout;


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

        <Sider>Sider</Sider>

        <Content>Content</Content>

      </Layout>

      <Footer>Footer</Footer>

    </Layout>
  )
}

export default AppLayout