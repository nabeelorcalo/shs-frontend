import React from 'react'
import {
  IconDashboard,
  IconPeoples,
  IconEmptyWalletAdd,
  IconWithdrawal
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

export const itemsDelegateAgent: MenuProps['items'] = [
  getItem('Dashboard', '/dashboard', <IconDashboard />),
  getItem('Delegate Members', '/delegate-members', <IconPeoples />),
  getItem('Withdrawal Request', '/withdrawal-request', <IconEmptyWalletAdd />),
  getItem('Withdrawals', '/withdrawals', <IconWithdrawal />),
]
