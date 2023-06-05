import { atom } from "recoil";

// get all Assessment data
export const assessmentDataState = atom({
  key: "assessmentDataState",
  default: [],
});

// get all Assessment data
export const remarkedByData = atom({
  key: "remarkedByData",
  default: [],
});

export const filterData = atom({
  key: "filterData",
  default: {},
});