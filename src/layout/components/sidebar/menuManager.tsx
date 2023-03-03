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
  IconDocument
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

export const itemsManager: MenuProps['items'] = [
  getItem('Dashboard', '/dashboard', <IconDashboard />),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Internships', '/internships', <IconEdit />),
    getItem('Interns', '/interns', <IconProfileUsers />),
    getItem('Attendance', '/attendance', <IconCalendarTick />),
    getItem('Leaves', '/leaves', <IconCalendarRemove />),
    getItem('Timesheets', '/timesheets', <IconTimer />),
    getItem('Performance', '/performance', <IconChart />),
    getItem('Documents', '/documents', <IconDocument />),
    getItem('Structure', '/structure', <IconData />),
  ], 'group'),

  // REPORTS GROUP
  getItem('Report', 'report', null, [
    getItem('Case Studies', '/case-studies', <IconLikeShapes />),
    getItem('Grievances', '/grievances', <IconEmojiSad />),
  ], 'group'),

  // PERSONAL GROUP
  getItem('Personal', 'personal', null, [
    getItem('Calendar', '/calendar', <IconCalendar />),
  ], 'group'),
]
