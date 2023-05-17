import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import { IconFacebook, IconYoutube, IconLinkedin, IconInstagram, IconTwitter } from '../../../../assets/images'
import { Layout } from 'antd';
const { Footer } = Layout;


const AppFooter: FC = () => {
  
  function currentYear() {
    return new Date().getFullYear();
  }

  return (
    <Footer className='ant-layout-footer-preview'>
      <ul className='social-links'>
        <li><Link to=""><IconFacebook /></Link></li>
        <li><Link to=""><IconTwitter /></Link></li>
        <li><Link to=""><IconInstagram /></Link></li>
        <li><Link to=""><IconLinkedin /></Link></li>
        <li><Link to=""><IconYoutube /></Link></li>
      </ul>
      <div className='footer-menu'>
        <ul>
          <li><Link to="#">Cookies Policy</Link></li>
          <li><Link to="#">Privacy Policy</Link></li>
          <li><Link to="#">Terms &amp; Conditions</Link></li>
        </ul>
      </div>
      <div className='footer-copyright'>
        Copyrights &copy; {currentYear()} All Rights Reserved by <span>Student Help Squad</span>
      </div>
    </Footer>
  )
}

export default AppFooter