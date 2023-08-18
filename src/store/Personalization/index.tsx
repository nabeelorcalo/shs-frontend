import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();
import { personalizeColorTheme } from '../../config/constants';

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

export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});

export const imageState = atom({
  key: "imageState",
  default: '',
  effects_UNSTABLE: [persistAtom],
});
// Primary Btn color
export const pColorState = atom({
  key: "pColorState",
  default: '#363565',
  effects_UNSTABLE: [persistAtom],
});

// Secondary Btn color
export const sColorState = atom({
  key: "sColorState",
  default: '#4a9d77',
  effects_UNSTABLE: [persistAtom],
});

// Sidebar color
export const sbColorState = atom({
  key: "sbColorState",
  default: '#363565',
  effects_UNSTABLE: [persistAtom],
});

// export const previewIconPrimaryState = atom({
//   key: "previewIconPrimaryState",
//   default: {

//   },
// })

// export const previewIconSecondaryState = atom({
//   key: "previewIconSecondaryState",
//   default: selector({
//     key: 'previewIconSecondaryState/default',
//     get: ({ get }) => {
//       const sourceValue = get(IconSColorState);
//       return sourceValue;
//     },
//   }),
// })
