import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
import { personalizeColorTheme } from '../../config/constants';

export const currentUserState = atom({
  key: "currentUserState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const newPasswordUser = atom({
  key: "newPasswordUser",
  default: {},
});

export const currentUserRoleState = selector({
  key: 'currentUserRoleState',
  get: ({ get }) => get(currentUserState).role,
});

export const rememberMeState = atom({
  key: "rememberMeState",
  default: true,
  effects_UNSTABLE: [persistAtom],
});

export const authVerificationState = atom({
  key: "authVerificationState",
  default: []
})

// preview
export const logoSelector = selector({
  key: 'logoSelector',
  get: ({ get }) => get(currentUserState)?.company?.logo,
});

export const primaryBtnColorState = selector({
  key: 'primaryBtnColorState',
  get: ({ get }) => get(currentUserState)?.company?.buttonPrimaryColor,
});

export const secondaryBtnColorState = selector({
  key: 'secondaryBtnColorState',
  get: ({ get }) => get(currentUserState)?.company?.buttonSecondaryColor,
});

export const sidebarColorState = selector({
  key: 'sidebarColorState',
  get: ({ get }) => get(currentUserState)?.company?.sideMenuColor,
});
export const companyLogo = selector({
  key: 'companyLogo',
  get: ({ get }) => get(currentUserState)?.company?.logo,
});

export const IconPColorState = atom({
  key: "IconPColorState",
  default: personalizeColorTheme.defaultPrimIconColor,
  effects_UNSTABLE: [persistAtom],
});
export const IconSColorState = atom({
  key: "IconSColorState",
  default: personalizeColorTheme.defaultSecIconColor,
  effects_UNSTABLE: [persistAtom],
});