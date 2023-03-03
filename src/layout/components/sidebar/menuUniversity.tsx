import React from 'react'
import {
  IconDashboard,
  IconBriefcase,
  IconCalendarTick,
  IconChart,
  IconTeacher,
  IconLikeShapes
} from '../../../assets/images'

import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export const itemsUniversity: MenuProps['items'] = [
  getItem('Dashboard', '/dashboard', <IconDashboard />),

  // PEOPLE GROUP
  getItem('People', 'people', null, [
    getItem('Students', '/students', <IconTeacher />),
    getItem('Companies', '/companies', <IconBriefcase />),
  ], 'group'),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Attendance', '/attendance', <IconCalendarTick />),
    getItem('Performance', '/performance', <IconChart />),
    getItem('Report', '/report', <IconLikeShapes />),
  ], 'group'),
]
