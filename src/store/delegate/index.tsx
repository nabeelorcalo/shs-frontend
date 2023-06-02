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
