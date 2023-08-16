import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist()

export const performanceSummaryState = atom({
  key: 'performanceSummaryState',
  default: []
})

export const singlePerformanceState = atom({
  key: 'singlePerformanceState',
  default: {}
})

export const allPerformanceState = atom({
  key: 'allPerformanceState',
  default: [],
});

export const internEvaluationHistoryState = atom({
  key: 'internEvaluationHistoryState',
  default: [],
});

export const topPerformersState = atom({
  key: 'topPerformersState',
  default: [],
});

export const allPerformancesfilterParamsState = atom({
  key: 'allPerformancesfilterParamsState',
  default: {},
});

export const performanceDetailState = atom({
  key: 'performanceDetailState',
  default: {},
});

export const evaluatedUserDataState = atom({
  key: 'evaluatedUserDataState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const evaluationValuesState = atom({
  key: 'evaluationValuesState',
  default: {},
});

export const evaluatedByState = atom({
  key: 'evaluatedByState',
  default: [],
});

export const allDepartmentsState = atom({
  key: 'allDepartmentsState',
  default: [],
});

export const managersEvalListState = atom({
  key: 'managersEvalListState',
  default: [],
});
