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
