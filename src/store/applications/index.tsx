import { atom } from "recoil";

// get all applications data
export const applicationDataState = atom({
  key: "applicationDataState",
  default: [],
});

// get all application Details data
export const applicationDetailState = atom({
  key: "applicationDetailState",
  default: [],
});
