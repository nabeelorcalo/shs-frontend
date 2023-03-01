import React, {FC, useEffect, useState} from 'react'
import './style.scss'
import type { MenuProps } from 'antd';
import { Avatar, Typography, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
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




const MenuItemsStudents:FC = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { useToken } = theme;




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

      {/* ORGANIZATION GROUP */}
      <Menu.ItemGroup key="organisation" title="Organisation">
        <Menu.Item key="internships" icon={<IconEdit />}>
          Internships
        </Menu.Item>
        <Menu.Item key="interns" icon={<IconProfileUsers />}>
          Interns
        </Menu.Item>
        <Menu.Item key="attendance" icon={<IconCalendarTick />}>
          Attendance
        </Menu.Item>
        <Menu.Item key="leaves" icon={<IconCalendarRemove />}>
          Leaves
        </Menu.Item>
        <Menu.Item key="timesheet" icon={<IconTimer />}>
          Timesheet
        </Menu.Item>
        <Menu.Item key="performance" icon={<IconChart />}>
          Performance
        </Menu.Item>
        <Menu.Item key="documents" icon={<IconDocument />}>
          Documents
        </Menu.Item>
        <Menu.Item key="structure" icon={<IconData />}>
          Structure
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
        <Menu.Item key="payments" icon={<IconWalletCheck />}>
          Payments
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

export default MenuItemsStudents