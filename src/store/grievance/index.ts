import { atom } from "recoil";

export const grievanceListState = atom({
  key: "grievanceListState",
  default: [],
});
export const managersListState = atom({
  key: "managersListState",
  default: [],
});

export const grievanceDashboardState = atom({
  key: "grievanceDashboardState",
  default: [
    {
      status: "ALL",
      count: 0,
    },
    {
      status: "NEW",
      count: 0,
    },
    {
      status: "OPEN",
      count: 0,
    },
    {
      status: "RESOLVED",
      count: 0,
    },
  ],
});
export const responseTimeState = atom({
  key: "responseTimeState",
  default: {
    avgResolutionTime: {
      HH: 0,
      MM: 0,
    },
    avgResponseTime: {
      HH: 0,
      MM: 0,
    },
  },
});
export const feedBackChartState = atom({
  key: "feedBackChartState",
  default: [],
});
export const resolutionFeedBackState = atom({
  key: "resolutionFeedBackState",
  default: { satisfiedPercentage: 0, unsatisfiedPercentage: 0 },
});
export const statsGraphState = atom({
  key: "statsGraphState",
  default: [],
});

export const grievanceListLoading = atom({
  key: "grievanceListLoading",
  default: false,
});
export const grievanceDetailLoading = atom({
  key: "grievanceDetailLoading",
  default: false,
});

export const grievanceDetailState = atom({
  key: "grievanceDetailState",
  default: null,
});

export const grievancePaginationState = atom({
  key: "grievancePaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    },
  },
});

export const grievanceTabState = atom({
  key: "grievanceTabState",
  default: "1",
});

export const grievanceFilterState = atom({
  key: "grievanceFilterState",
  default: {
    search: "",
    filterTab: "1",
    status: "",
    startDate: "",
    endDate: "",
    page: 1,
    limit: 10,
    escalatedTo: "",
    escalatedBy: "",
    filterType: "",
    currentDate: "",
    type: "",
  },
});
