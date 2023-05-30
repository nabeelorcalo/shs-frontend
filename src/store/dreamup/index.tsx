import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// get all applications data
export const goalsDataState = atom({
  key: "goalsDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const firstGoalState = selector({
  key: 'firstGoalState',
  get: ({get}) => get(goalsDataState).length > 0 ? get(goalsDataState)?.response[0]?.tasks : [],
});

// get all application Details data
export const tasksDataState = atom({
  key: "tasksDataState",
  default: [],
});
