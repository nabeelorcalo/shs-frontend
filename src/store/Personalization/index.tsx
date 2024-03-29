import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
import { personalizeColorTheme } from '../../config/constants';

// Sidebar Color State
export const sbColorState = atom({
  key: "sbColorState",
  default: personalizeColorTheme.defaultSIdeBarColor,
  effects_UNSTABLE: [persistAtom],
});

export const sbPreviewColorState = atom({
  key: "sbPreviewColorState",
  default: personalizeColorTheme.defaultSIdeBarColor,
  effects_UNSTABLE: [persistAtom],
});

// Menu Icons Color State
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

// Buttons Color State
export const ButtonPrimaryColorState = atom({
  key: "ButtonPrimaryColorState",
  default: personalizeColorTheme.defaultBtnPrimColor,
  effects_UNSTABLE: [persistAtom],
});

export const ButtonSecondaryColorState = atom({
  key: "ButtonSecondaryColorState",
  default: personalizeColorTheme.defaultBtnSecColor,
  effects_UNSTABLE: [persistAtom],
});

// Organization Logo State
export const OrgLogoState = atom({
  key: "OrgLogoState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const PreviewLogoState = atom({
  key: "PreviewLogoState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const dataLogoState = atom({
  key: "dataLogoState",
  default: '',
});
