import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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

export const leaveDetailState = atom({
  key: "leaveDetailState",
  default: {id: null},
});

export const leaveDetailIdState = selector({
  key: 'leaveDetailIdState',
  get: ({get}) => get(leaveDetailState).id,
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

export const paginationState =atom({
  key: "paginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  },
});

export const leaveTypesState = atom({
  key: "leaveTypesState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// It has All option in it
export const allLeavesTypesState = selector({
  key: 'allLeavesTypesState',
  get: ({ get }) => {
    let leaveList = [];
    const allLeaves = get(leaveTypesState);

    leaveList = allLeaves?.map((val: any, index: number) => ({
      key: index,
      value: val?.id,
      label: val?.name,
    }));

    leaveList.unshift({ key: -1, label: "All", value: "" });

    return leaveList;
  },
});

// It doesn't has All option in it
export const leavesTypesState = selector({
  key: 'leavesTypesState',
  get: ({ get }) => {
    let leaveList = [];
    const allLeaves = get(leaveTypesState);

    leaveList = allLeaves?.map((val: any, index: number) => ({
      key: index,
      value: val?.id,
      label: val?.name,
    }));

    return leaveList;
  },
});