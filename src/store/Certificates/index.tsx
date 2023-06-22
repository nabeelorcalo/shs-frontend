import { atom } from "recoil";

export const certificatesListData = atom({
  key: "certificatesListData",
  default: [],
});

//performance data
export const performanceEvaulationData = atom({
  key: "performanceEvaulationData",
  default: [],
});

// leaves data
export const leavesData = atom({
  key: "leavesData",
  default: [],
});
