import React from 'react'
import {
  IconDashboard,
  IconClipboardText,
  IconDiscountShape,
  IconMouseSquare
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

export const itemsPropertyAgent: MenuProps['items'] = [
  getItem('Dashboard', '/dashboard', <IconDashboard />),
  getItem('Listings', '/listings', <IconClipboardText />),
  getItem('Offers', '/offers', <IconDiscountShape />),
  getItem('Reservations', '/reservations', <IconMouseSquare />),
]
