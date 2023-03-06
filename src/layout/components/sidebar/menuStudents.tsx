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
} from '../../../assets/images'
import { ROUTES_CONSTANTS } from '../../../config/constants'
const { DASHBOARD, SEARCH_JOBS, APPLICATION, OFFER_LETTER, CONTRACTS, PROFILE, DIGIVAULT, DREAM_UP, CALENDAR, ACCOMMODATION, RECIPES, EARN_WITH_US } = ROUTES_CONSTANTS;
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
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),

  // JOB GROUP
  getItem('Jobs', 'jobs', null, [
    getItem('Search Jobs', `/${SEARCH_JOBS}`, <IconBriefcase />),
    getItem('Applications', `/${APPLICATION}`, <IconDocumentText />),
    getItem('Offer Letters', `/${OFFER_LETTER}`, <IconClipboardTick />),
    getItem('Contracts', `/${CONTRACTS}`, <IconTaskSquare />),
  ], 'group'),

  // PERSONAL GROUP
  getItem('Personal', 'personal', null, [
    getItem('Profile', `/${PROFILE}`, <IconUserProfile />),
    getItem('DigiVault', `/${DIGIVAULT}`, <IconFolder />),
    getItem('Dream Up', `/${DREAM_UP}`, <IconRanking />),
    getItem('Calendar', `/${CALENDAR}`, <IconCalendar />),
  ], 'group'),

  // DISCOVER GROUP
  getItem('Discover', 'discover', null, [
    getItem('Accommodation', `/${ACCOMMODATION}`, <IconHouse />),
    getItem('Recipes', `/${RECIPES}`, <IconRecipes />),
    getItem('Earn With Us', `/${EARN_WITH_US}`, <IconGift />),
  ], 'group'),
]
