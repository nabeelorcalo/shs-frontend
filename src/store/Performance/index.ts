import { atom } from 'recoil';

export const performanceSummaryState = atom({
  key: 'performanceSummaryState',
  default: null
})

export const singlePerformanceState = atom({
  key: 'singlePerformanceState',
  default: null
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
