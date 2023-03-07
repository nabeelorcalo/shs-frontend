import React from 'react'
import {
  IconDashboard,
  IconClipboardText,
  IconDiscountShape,
  IconMouseSquare
} from '../../../assets/images'
import { ROUTES_CONSTANTS } from '../../../config/constants'
const { DASHBOARD, LISTINGS, OFFERS, RESERVATIONS } = ROUTES_CONSTANTS;
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

export const itemsPropertyAgent: MenuProps['items'] = [
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
  getItem('Listings', `/${LISTINGS}`, <IconClipboardText />),
  getItem('Offers', `/${OFFERS}`, <IconDiscountShape />),
  getItem('Reservations', `/${RESERVATIONS}`, <IconMouseSquare />),
]
