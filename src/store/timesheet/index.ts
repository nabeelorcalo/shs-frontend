import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

const timeSheetAtom = atom({
  key: "timeSheet",
  default: { data: "", message: "" },
});

const managerUserListState = atom({
  key: "managerUserListState",
  default: [],
});
const taskDateRangeState = atom({
  key: "taskDateRangeState",
  default: [],
});
const taskInDateState = atom({
  key: "taskInDateState",
  default: [],
});
const companyManagerState = atom({
  key: "companyManagerState",
  default: [],
});

const managerSearchState = atom({
  key: "managerSearchState",
  default: "",
});
const userSearchState = atom({
  key: "userSearchState",
  default: "",
});
const dateRangeState = atom({
  key: "dateRangeState",
  default: "this week",
});
const selectedUserState = atom({
  key: "selectedUserState",
  default: null,
});
const internTimesheetTasksState = atom({
  key: "internTimesheetTasksState",
  default: {
    totalTime: "00:00",
    totalTimeByCatgory: {},
    tasks: [],
  },
});

const categoriesGraphDataState = atom({
  key: "categoriesGraphDataState",
  default: [],
});

const categoriesListState = atom({
  key: "categoriesListState",
  default: [],
});
const internTimelineState = atom({
  key: "internTimelineState",
  default: [],
});
const addedTaskIdState = atom({
  key: "addedTaskIdState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export {
  timeSheetAtom,
  managerUserListState,
  taskDateRangeState,
  taskInDateState,
  companyManagerState,
  managerSearchState,
  dateRangeState,
  selectedUserState,
  userSearchState,
  internTimesheetTasksState,
  categoriesGraphDataState,
  categoriesListState,
  internTimelineState,
  addedTaskIdState,
};
