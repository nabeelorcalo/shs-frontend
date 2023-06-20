import { atom } from "recoil";

export const leaveStateAtom = atom({
  key: "leaveStateAtom",
  default: [],
})

export const createLeaveStateAtom = atom({
  key: "createLeaveStateAtom",
  default: [],
});

export const geCalanderLeaveStateAtom = atom({
  key: "geCalanderLeaveStateAtom",
  default: [],
});

export const holidayListStateAtom = atom({
  key: "holidayListStateAtom",
  default: [],
});

export const viewHistoryLeaveStateAtom = atom({
  key: "viewHistoryLeaveStateAtom",
  default: [],
});

export const pendingLeaveState = atom({
  key: "pendingLeaveState",
  default: [],
});

export const filterState =atom({
  key: "filterState",
  default: {
    search: '',
    leavePolicyId: '',
    status: '',
    startDate: '',
    endDate: '',
    page: 1,
    limit: 10,
  },
});
