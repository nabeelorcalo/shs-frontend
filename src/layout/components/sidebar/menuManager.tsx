import React from 'react'
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
  IconDocument,
  IconGift
} from '../../../assets/images'
import { ROUTES_CONSTANTS } from '../../../config/constants'
const { DASHBOARD, INTERNSHIPS, INTERNS, ATTENDANCE, LEAVES, TIMESHEET, PERFORMANCE, DOCUMENTS, STRUCTURE, CASE_STUDIES, GRIEVANCES, CALENDAR, EARN_WITH_US } = ROUTES_CONSTANTS
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

export const itemsManager: MenuProps['items'] = [
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Internships', `/${INTERNSHIPS}`, <IconEdit />),
    getItem('Interns', `/${INTERNS}`, <IconProfileUsers />),
    getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
    getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove />),
    getItem('Timesheets', `/${TIMESHEET}`, <IconTimer />),
    getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
    getItem('Documents', `/${DOCUMENTS}`, <IconDocument />),
    getItem('Structure', `/${STRUCTURE}`, <IconData />),
  ], 'group'),

  // REPORTS GROUP
  getItem('Report', 'report', null, [
    getItem('Case Studies', `/${CASE_STUDIES}`, <IconLikeShapes />),
    getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad />),
  ], 'group'),

  // PERSONAL GROUP
  getItem('Personal', 'personal', null, [
    getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
  ], 'group'),

  // DISCOVER GROUP
  getItem('Discover', 'discover', null, [
    getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />),
  ], 'group'),
]
