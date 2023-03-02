import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import { Logo, IconCollapsebleOff, IconCollapsebleOn, IconSearchNormal, MessageNotif, Notification,
  IconGlobe,
  IconLogout,
  IconProfile
} from '../../../assets/images'
import { Layout } from 'antd';

const { Footer } = Layout;





const AppFooter:FC = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Footer>
      <div className='footer-copyright'>
        Copyrights &copy; 2022 All Rights Reserved by <span>Student Help Squad</span>
      </div>
      <div className='footer-menu'>
        <ul>
          <li><Link to="#">Cookies Policy</Link></li>
          <li><Link to="#">Privacy Policy</Link></li>
          <li><Link to="#">Terms &amp; Conditions</Link></li>
        </ul>
      </div>
    </Footer>
  )
}

export default AppFooter