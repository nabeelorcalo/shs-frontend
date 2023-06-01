import { atom, selector } from "recoil";

export const delegateMembersState = atom({
  key: 'delegateMembersState',
  default: []
})

export const delegateDashboardState = atom({
  key: 'delegateDashboardState',
  default: []
})
