import React from 'react'
import {
  IconDashboard,
  IconPeoples,
  IconEmptyWalletAdd,
  IconWithdrawal
} from '../../../assets/images'
import { ROUTES_CONSTANTS } from '../../../config/constants'
const { DASHBOARD, DELEGATE_MEMEBERS, WITHDRAWAL_REQUEST, WITHDRAWALS } = ROUTES_CONSTANTS;
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
  getItem('Dashboard', `/${DASHBOARD}`, <IconDashboard />),
  getItem('Delegate Members', `/${DELEGATE_MEMEBERS}`, <IconPeoples />),
  getItem('Withdrawal Request', `/${WITHDRAWAL_REQUEST}`, <IconEmptyWalletAdd />),
  getItem('Withdrawals', `/${WITHDRAWALS}`, <IconWithdrawal />),
]
