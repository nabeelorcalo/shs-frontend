import React from 'react'
import {
  IconDashboard,
  IconBriefcase,
  IconClipboardTick,
  IconDocumentText,
  IconTaskSquare,
  IconUserProfile,
  IconFolder,
  IconRanking,
  IconCalendar,
  IconHouse,
  IconRecipes,
  IconGift,
} from '../../../assets/images';
import {ROUTES_CONSTANTS} from '../../../config/constants';

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

export const itemsStudents: MenuProps['items'] = [
  getItem('Dashboard', '/dashboard', <IconDashboard />),

  // JOB GROUP
  getItem('Jobs', 'jobs', null, [
    getItem('Search Jobs', `/${ROUTES_CONSTANTS.SEARCH_JOBS}`, <IconBriefcase />),
    getItem('Applications', '/applications', <IconDocumentText />),
    getItem('Offer Letters', '/offer-letters', <IconClipboardTick />),
    getItem('Contracts', '/contracts', <IconTaskSquare />),
  ], 'group'),

  // PERSONAL GROUP
  getItem('Personal', 'personal', null, [
    getItem('Profile', '/profile', <IconUserProfile />),
    getItem('DigiVault', '/digivault', <IconFolder />),
    getItem('Dream Up', '/dream-up', <IconRanking />),
    getItem('Calendar', '/calendar', <IconCalendar />),
  ], 'group'),

  // DISCOVER GROUP
  getItem('Discover', 'discover', null, [
    getItem('Accommodation', '/accommodation', <IconHouse />),
    getItem('Recipes', '/recipes', <IconRecipes />),
    getItem('Earn With Us', '/earn-with-us', <IconGift />),
  ], 'group'),
]
