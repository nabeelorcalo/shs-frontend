import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const settingLocationState = atom({
  key: "settingLocationState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const settingDepartmentState = atom({
  key: "settingDepartmentState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const newDepartmentsState = selector({
  key: "deptState",
  get: ({ get }) => {
    const departments = get(settingDepartmentState);
    return departments?.map((item: any, index: number) => ({
      key: index,
      value: item?.id,
      label: item?.name
    })).sort((a: any, b: any) =>
      a.label.localeCompare(b.label)
    );
  },
});

export const newLocationsDataState = selector({
  key: "newLocationsDataState",
  get: ({ get }) => {
    const location = get(settingLocationState);
    return location?.map((item: any, index: number) => ({
      key: index,
      value: item?.id,
      label: item?.name
    })).sort((a: any, b: any) =>
      a.label.localeCompare(b.label)
    );
  },
});

export const settingLeaveState = atom({
  key: "settingLeaveState",
  default: [],
});

export const settingPerformanceState = atom({
  key: "settingPerformanceState",
  default: [],
});

export const settingsTemplateState = atom({
  key: "settingsTemplateState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const newTemplatesDataState = selector({
  key: "templates",
  get: ({ get }) => {
    const template = get(settingsTemplateState);
    return template?.map((item: any, index: number) => ({
      key: index,
      value: item.id,
      label: item.name,
      type: item.type
    })).sort((a: any, b: any) =>
      a.label.localeCompare(b.label)
    );
  },
});

export const settingShiftsState = atom({
  key: "settingShiftsState",
  default: [],
});

export const settingTimesheetState = atom({
  key: "settingTimesheetState",
  default: [],
});

export const settingInternsState = atom({
  key: "settingInternsState",
  default: [],
});
