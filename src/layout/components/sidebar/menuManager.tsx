import React, { FC, useEffect } from 'react'
import './style.scss'
import { Menu } from 'antd';
import {
  IconDashboard,
  IconCalendar,
  IconCalendarTick,
  IconCalendarRemove,
  IconTimer,
  IconChart,
  IconData,
  IconLikeShapes,
  IconEmojiSad,
  IconEdit,
  IconProfileUsers,
  IconDocument
} from '../../../assets/images'



const MenuManager:FC = () => {
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
          <Menu.Item key="timesheets" icon={<IconTimer />}>
            Timesheets
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
          <Menu.Item key="case-studies" icon={<IconLikeShapes />}>
            Case Studies
          </Menu.Item>
          <Menu.Item key="grievances" icon={<IconEmojiSad />}>
            Grievances
          </Menu.Item>
        </Menu.ItemGroup>

      {/* PERSONAL GROUP */}
      <Menu.ItemGroup key="personal" title="Personal">
        <Menu.Item key="calendar" icon={<IconCalendar />}>
          Calendar
        </Menu.Item>
      </Menu.ItemGroup>
    </>
  )
}

export default MenuManager
