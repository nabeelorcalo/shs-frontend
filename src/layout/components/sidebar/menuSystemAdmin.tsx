import React from 'react'
import {
  IconDashboard,
  IconProfileUsers,
  IconPeoples,
  IconCourtHouse,
  IconTeacher,
  IconBriefcase,
  IconDelegateAgent,
  IconHeadset,
  IconActivity,
  IconGift
} from '../../../assets/images'
import { ROUTES_CONSTANTS } from '../../../config/constants'
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
const { DASHBOARD, STUDENT, UNIVERSITIES, COMPANIES, ADMIN, DELEGATE_AGENT, PROPERTY_AGENT, HELP_DESK, ACTIVITY_LOG, EARN_WITH_US } = ROUTES_CONSTANTS;

export const itemsSystemAdmin: MenuProps['items'] = [
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),

  // USER MANAGEMENT GROUP
  getItem('User Management', 'user-management', null, [
    getItem('Students', `/${STUDENT}`, <IconTeacher />),
    getItem('Universities', `/${UNIVERSITIES}`, <IconCourtHouse />),
    getItem('Companies', `/${COMPANIES}`, <IconBriefcase />),
    getItem('Admin', `/${ADMIN}`, <IconProfileUsers />),
  ], 'group'),

  // AGENT MANAGEMENT
  getItem('Agent Management', 'agent-management', null, [
    getItem('Delegate Agent  ', `/${DELEGATE_AGENT}`, <IconDelegateAgent />),
    getItem('Property Agent', `/${PROPERTY_AGENT}`, <IconPeoples />),
  ], 'group'),

  // SUPPORT GROUP
  getItem('Support', 'support', null, [
    getItem('Help Desk', `/${HELP_DESK}`, <IconHeadset />),
    getItem('Activity Log', `/${ACTIVITY_LOG}`, <IconActivity />),
  ], 'group'),

  // DISCOVER GROUP
  getItem('Discover', 'discover', null, [
    getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />),
  ], 'group'),
]
