import React from 'react'
import {
  IconDashboard,
  IconCalendarTick,
  IconCalendarRemove,
  IconTimer,
  IconChart,
  IconData,
  IconEdit,
  IconProfileUsers,
  IconDocument,
  IconPeoples,
  IconClipboardTick,
  IconTaskSquare,
  IconProfileCircle,
  IconCourtHouse
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

export const itemsCompanyAdmin: MenuProps['items'] = [
  getItem('Dashboard', '/dashboard', <IconDashboard />),

  // RECRUITMENT GROUP
  getItem('Recruitment', 'recruitment', null, [
    getItem('Candidates', '/candidates', <IconPeoples />),
    getItem('Internships', '/internships', <IconEdit />),
    getItem('Offer Letters', '/offer-letters', <IconClipboardTick />),
    getItem('Contracts', '/contracts', <IconTaskSquare />),
  ], 'group'),

  // PEOPLE GROUP
  getItem('People', 'people', null, [
    getItem('Interns', '/interns', <IconProfileUsers />),
    getItem('Managers', '/managers', <IconProfileCircle />),
    getItem('Universities', '/universities', <IconCourtHouse />),
  ], 'group'),

  // ORGANIZATION GROUP
  getItem('Organisation', 'organisation', null, [
    getItem('Structure', '/structure', <IconData />),
    getItem('Attendance', '/attendance', <IconCalendarTick />),
    getItem('Leaves', '/leaves', <IconCalendarRemove />),
    getItem('Timesheets', '/timesheets', <IconTimer />),
    getItem('Performance', '/performance', <IconChart />),
    getItem('Documents', '/documents', <IconDocument />),
    
  ], 'group'),
]
