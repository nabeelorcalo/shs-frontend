import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

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
