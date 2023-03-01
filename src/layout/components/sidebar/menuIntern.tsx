import React, { FC, useEffect } from 'react'
import './style.scss'
import { Menu } from 'antd';
import {
  IconDashboard,
  IconFolder,
  IconRanking,
  IconCalendar,
  IconHouse,
  IconCalendarTick,
  IconCalendarRemove,
  IconTimer,
  IconChart,
  IconData,
  IconLikeShapes,
  IconEmojiSad,
  IconWalletCheck,
} from '../../../assets/images'



const MenuIntern:FC = () => {
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

      {/* ORGANIZATION GROUP */}
      <Menu.ItemGroup key="organisation" title="Organisation">
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
        <Menu.Item key="structure" icon={<IconData />}>
          Structure
        </Menu.Item>
      </Menu.ItemGroup>

      {/* REPORTS GROUP */}
      <Menu.ItemGroup key="report" title="Report">
        <Menu.Item key="self-assessment" icon={<IconLikeShapes />}>
          Self Assessment
        </Menu.Item>
        <Menu.Item key="grievances" icon={<IconEmojiSad />}>
          Grievances
        </Menu.Item>
      </Menu.ItemGroup>

      {/* PERSONAL GROUP */}
      <Menu.ItemGroup key="personal" title="Personal">
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
      </Menu.ItemGroup>
    </>
  )
}

export default MenuIntern
