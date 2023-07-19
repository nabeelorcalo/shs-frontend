import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

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
export const IconPColorState = atom({
  key: "IconPColorState",
  default: '#fcfafa',
  effects_UNSTABLE: [persistAtom],
});
export const IconSColorState = atom({
  key: "IconSColorState",
  default: '#8686A3',
  effects_UNSTABLE: [persistAtom],
});
// export const primaryBtnColorState = atom({
//   key: "primaryBtnColorState",
//   default: '#8686A3',
//   effects_UNSTABLE: [persistAtom],
// });

// export const secondaryBtnColorState = atom({
//   key: "secondaryBtnColorState",
//   default: '#8686A3',
//   effects_UNSTABLE: [persistAtom],
// });

// export const sidebarColorState = atom({
//   key: "sidebarColorState",
//   default: '#8686A3',
//   effects_UNSTABLE: [persistAtom],
// });