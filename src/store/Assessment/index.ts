import { atom } from "recoil";

// get all Assessment data
export const assessmentsDataState = atom({
  key: "assessmentsDataState",
  default: [],
});

// get all Assessment data
export const assessmentDataState = atom({
  key: "assessmentDataState",
  default: {},
});

// get remarked by data
export const remarkedByData = atom({
  key: "remarkedByData",
  default: [],
});

export const filterData = atom({
  key: "filterData",
  default: {},
});

export let editOrView = atom({
  key: "editOrView",
  default: '',
});
