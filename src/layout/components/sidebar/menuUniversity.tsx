import React from 'react'
import {
  IconDashboard,
  IconBriefcase,
  IconCalendarTick,
  IconChart,
  IconTeacher,
  IconLikeShapes
} from '../../../assets/images'
import { ROUTES_CONSTANTS } from '../../../config/constants'
const { DASHBOARD, STUDENT, COMPANIES, ATTENDANCE, PERFORMANCE, REPORT } = ROUTES_CONSTANTS
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
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),

  // PEOPLE GROUP
  getItem('People', 'people', null, [
    getItem('Students', `/${STUDENT}`, <IconTeacher />),
    getItem('Companies', `/${COMPANIES}`, <IconBriefcase />),
  ], 'group'),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
    getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
    getItem('Report', `/${REPORT}`, <IconLikeShapes />),
  ], 'group'),
]
