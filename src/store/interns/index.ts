import { atom } from "recoil";

// get all interns
export const internsDataState = atom({
  key: "internsDataState",
  default: [], 
});

export const internsProfileDataState = atom({
  key: "internsProfileDataState",
  default: [], 
});

export const signatureState = atom({
  key: "signatureState",
  default: [], 
});
