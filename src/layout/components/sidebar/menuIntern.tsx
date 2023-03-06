import React from 'react'
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
import { ROUTES_CONSTANTS } from '../../../config/constants'
const { DASHBOARD, ATTENDANCE, LEAVES, TIMESHEET, PERFORMANCE, STRUCTURE, SELF_ASSESSMENT, GRIEVANCES, DIGIVAULT, DREAM_UP, PAYMENTS, CALENDAR, ACCOMMODATION } = ROUTES_CONSTANTS

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

export const itemsIntern: MenuProps['items'] = [
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Attendance', `/${ATTENDANCE}`, <IconCalendarTick />),
    getItem('Leaves', `/${LEAVES}`, <IconCalendarRemove />),
    getItem('Timesheet', `/${TIMESHEET}`, <IconTimer />),
    getItem('Performance', `/${PERFORMANCE}`, <IconChart />),
    getItem('Structure', `/${STRUCTURE}`, <IconData />),
  ], 'group'),

  // REPORTS GROUP
  getItem('Report', 'report', null, [
    getItem('Self Assessment', `/${SELF_ASSESSMENT}`, <IconLikeShapes />),
    getItem('Grievances', `/${GRIEVANCES}`, <IconEmojiSad />),
  ], 'group'),

  // PERSONAL GROUP
  getItem('Personal', 'personal', null, [
    getItem('DigiVault', `/${DIGIVAULT}`, <IconFolder />),
    getItem('Dream Up', `/${DREAM_UP}`, <IconRanking />),
    getItem('Payments', `/${PAYMENTS}`, <IconWalletCheck />),
    getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
  ], 'group'),

  // DISCOVER GROUP
  getItem('Discover', 'discover', null, [
    getItem('Accommodation', `/${ACCOMMODATION}`, <IconHouse />),
  ], 'group'),
]
