import { RecoilState, atom } from "recoil";

export const appNotificationsState: RecoilState<any> = atom({
  key: 'appNotificationsState',
  default: []
});