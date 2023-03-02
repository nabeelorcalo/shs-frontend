import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import { Menu } from 'antd';
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
  IconLikeShapes,
  IconEmojiSad,
} from '../../../assets/images'




const MenuStudents:FC = () => {
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
    <>
      <Menu.Item key="dashboard" icon={<IconDashboard />}>
        Dashboard
      </Menu.Item>

      {/* JOBS GROUP */}
      <Menu.ItemGroup key="Jobs" title="Jobs">
        <Menu.Item key="search-jobs" icon={<IconBriefcase />}>
          Search Jobs
        </Menu.Item>
        <Menu.Item key="applications" icon={<IconDocumentText />}>
          Applications
        </Menu.Item>
        <Menu.Item key="offer-letters" icon={<IconClipboardTick />}>
        Offer Letters
        </Menu.Item>
        <Menu.Item key="contracts" icon={<IconTaskSquare />}>
          Contracts
        </Menu.Item>
      </Menu.ItemGroup>

      {/* REPORTS GROUP */}
      <Menu.ItemGroup key="report" title="Report">
        <Menu.Item key="self-assessment" icon={<IconLikeShapes />}>
          Self Assessment
        </Menu.Item>
        <Menu.Item key="case-studies" icon={<IconLikeShapes />}>
          Case Studies
        </Menu.Item>
        <Menu.Item key="leaves" icon={<IconEmojiSad />}>
          Grievances
        </Menu.Item>
      </Menu.ItemGroup>

      {/* PERSONAL GROUP */}
      <Menu.ItemGroup key="personal" title="Personal">
        <Menu.Item key="profile" icon={<IconUserProfile />}>
          Profile
        </Menu.Item>
        <Menu.Item key="digivault" icon={<IconFolder />}>
          DigiVault
        </Menu.Item>
        <Menu.Item key="dream-up" icon={<IconRanking />}>
          Dream Up
        </Menu.Item>
        <Menu.Item key="calendar" icon={<IconCalendar />}>
          Calendar
        </Menu.Item>
      </Menu.ItemGroup>

      {/* DISCOVER GROUP */}
      <Menu.ItemGroup key="discover" title="Discover">
        <Menu.Item key="accommodation" icon={<IconHouse />}>
          Accommodation
        </Menu.Item>
        <Menu.Item key="recipes" icon={<IconRecipes />}>
          Recipes
        </Menu.Item>
        <Menu.Item key="earn-with-us" icon={<IconGift />}>
          Earn With Us
        </Menu.Item>
      </Menu.ItemGroup>
    </>
  )
}

export default MenuStudents
