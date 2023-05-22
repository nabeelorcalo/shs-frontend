import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const currentUserState = atom({
  key: "currentUserState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const currentUserRoleState = selector({
  key: 'currentUserRoleState',
  get: ({get}) => get(currentUserState).role,
});

export const rememberMeState = atom({
  key: "rememberMeState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});