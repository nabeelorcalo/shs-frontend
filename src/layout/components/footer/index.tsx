import React, { FC, useEffect, useState } from 'react'
import './style.scss'
import { Link } from 'react-router-dom';
import {
  IconFacebook,
  IconYoutube,
  IconLinkedin,
  IconInstagram,
  IconTwitter
} from '../../../assets/images';
import { Layout } from 'antd';
const { Footer } = Layout;

type FooterProps = {
  collapsed: boolean;
  collapsedWidth: number;
};


const AppFooter: FC<FooterProps> = ({ collapsed, collapsedWidth }) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function currentYear() {
    return new Date().getFullYear();
  }

  const socialIcons = [
    { icon: <IconFacebook />, navigateTo: 'https://www.facebook.com/' },
    { icon: <IconTwitter />, navigateTo: 'https://twitter.com/' },
    { icon: <IconInstagram />, navigateTo: 'https://www.instagram.com/' },
    { icon: <IconLinkedin />, navigateTo: 'https://www.linkedin.com/' },
    { icon: <IconYoutube />, navigateTo: 'https://www.youtube.com/' },
  ]
  const footerMenu = [
    {title:'Cookies Policy',navigateTo:'/'},
    {title:'Privacy Policy',navigateTo:'/'},
    {title:'Terms & Conditions',navigateTo:'/'},
  ]
  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <Footer>
      <ul className='social-links'>
        {socialIcons.map((item: any, index: number) => (
          <Link to={item.navigateTo} key={index} target={"_blank"}>
            <li>{item.icon}</li>
          </Link>
        ))}
      </ul>
      <div className='footer-menu'>
        <ul>
          {footerMenu.map((item:any,index:number)=>(
            <Link to={item.navigateTo} key={index} className=''>
              <li>{item.title}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className='footer-copyright'>
        Copyrights &copy; {currentYear()} All Rights Reserved by <span>Student Help Squad</span>
      </div>
    </Footer>
  )
}

export default AppFooter