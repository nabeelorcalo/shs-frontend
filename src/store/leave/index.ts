import { atom } from "recoil";

export const createLeaveStateAtom = atom({
  key: "createLeaveStateAtom",
  default: [],   // {} || [] 
});
export const getLeaveStateAtom = atom({
  key: "createLeaveState",
  default: [],   // {} || [] 
});