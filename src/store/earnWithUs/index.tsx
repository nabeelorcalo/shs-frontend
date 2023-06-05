import { atom, selector } from "recoil";

export const earnWithUsTabsState = atom({
  key: 'earnWithUsTabsState',
  default: 'earnWithUsDashboard'
})

export const delegateMembersState = atom({
  key: 'delegateMembersState',
  default: []
})

export const delegateDashboardState = atom({
  key: 'delegateDashboardState',
  default: []
})

export const currentBalanceState = atom({
  key: 'currentBalanceState',
  default: []
})

export const banksListState = atom({
  key: 'banksListState',
  default: []
})

export const withdrawalRequestsState = atom({
  key: 'withdrawalRequestsState',
  default: []
})