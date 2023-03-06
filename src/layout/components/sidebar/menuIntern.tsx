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
  getItem('Dashboard', '/dashboard', <IconDashboard />),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Attendance', '/attendance', <IconCalendarTick />),
    getItem('Leaves', '/leaves', <IconCalendarRemove />),
    // getItem('Timesheet', '/timesheet', <IconTimer />),
    getItem('Performance', '/performance', <IconChart />),
    getItem('Structure', '/structure', <IconData />),
  ], 'group'),

  // REPORTS GROUP
  getItem('Report', 'report', null, [
    getItem('Self Assessment', '/self-assessment', <IconLikeShapes />),
    getItem('Grievances', '/grievances', <IconEmojiSad />),
  ], 'group'),

  // PERSONAL GROUP
  getItem('Personal', 'personal', null, [
    getItem('DigiVault', '/digivault', <IconFolder />),
    getItem('Dream Up', '/dream-up', <IconRanking />),
    getItem('Payments', '/payments', <IconWalletCheck />),
    getItem('Calendar', '/calendar', <IconCalendar />),
  ], 'group'),

  // DISCOVER GROUP
  getItem('Discover', 'discover', null, [
    getItem('Accommodation', '/accommodation', <IconHouse />),
  ], 'group'),
]
