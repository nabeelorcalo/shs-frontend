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
  IconCourtHouse,
  IconTeacher,
  IconBriefcase,
  IconDelegateAgent,
  IconHeadset,
  IconActivity
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

export const itemsSystemAdmin: MenuProps['items'] = [
  getItem('Dashboard', '/dashboard', <IconDashboard />),

  // USER MANAGEMENT GROUP
  getItem('User Management', 'user-management', null, [
    getItem('Students', '/students', <IconTeacher />),
    getItem('Universities', '/universities', <IconCourtHouse />),
    getItem('Companies', '/companies', <IconBriefcase />),
    getItem('Admin', '/Admin', <IconProfileUsers />),
  ], 'group'),

  // AGENT MANAGEMENT
  getItem('Agent Management', 'agent-management', null, [
    getItem('Delegate Agent  ', '/delegate-agent  ', <IconDelegateAgent />),
    getItem('Property Agent', '/property-agent', <IconPeoples />),
  ], 'group'),

  // SUPPORT GROUP
  getItem('Support', 'support', null, [
    getItem('Help Desk', '/help-desk', <IconHeadset />),
    getItem('Activity Log', '/activity-log', <IconActivity />),
    
  ], 'group'),
]
