import { atom } from "recoil";
export const leaveStateAtom =atom({
  key:"leaveStateAtom",
  default:[],
})
export const createLeaveStateAtom = atom({
  key: "createLeaveStateAtom",
  default: [],   // {} || [] 
});
export const geCalanderLeaveStateAtom = atom({
  key: "geCalanderLeaveStateAtom",
  default: [],   // {} || [] 
});
export const holidayListStateAtom =atom({
  key:"holidayListStateAtom",
  default:[],
})
