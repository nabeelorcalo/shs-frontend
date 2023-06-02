import { recoilPersist } from "recoil-persist";
import { atom } from "recoil";

const { persistAtom } = recoilPersist();

export const timeTrackingState = atom({
  key: "timeTrackingState", // unique ID (with respect to other atoms/selectors)
  default: "00:00:00", // default value
  effects_UNSTABLE: [persistAtom],
});

// agent dashboard
export const agentDashboardWidgetsState = atom({
  key: "agentDashboardWidgetsState",
  default: {
    totalProperties: 0,
    totalVacantProperties: 0,
    totalReservedProperties: 0,
    totalOccupiedProperties: 0,
  },
});

// announcement store
export const announcementDataState = atom({
  key: "announcementDataState",
  default: [],
});

export const adminDashboardMembersDataState = atom({
  key: "adminDashboardMembersData",
  default: {
    totalUsers: 0,
    totalActiveUsers: 0,
    totalUniversities: 0,
    totalCompanies: 0,
    totalDelegates: 0,
    totalInterns: 0,
    totalPropertyAgents: 0,
    intenrshipVacancies: 0,
  },
});

export const delegateAgentDashbaordState = atom({
  key: "delegateAgentDashbaordState",
  default: {
    activeMembers: 0,
    currentBalance: 0,
    graphData: [],
    inactiveMemberBalance: 0,
    inactiveMembers: 0,
    totalMembers: 0,
    userRes: null,
  },
});
export const delegateAgenetMembersState = atom({
  key: "delegateAgenetMembersState",
  default: [],
});
export const growthAnalyticsDashboardState = atom({
  key: "growthAnalyticsDataState",
  default: [],
});

export const adminDashboardRegionAnalyticsState = atom({
  key: "adminRegionAnalyticsState",
  default: {},
});

// weather api
export const weatherApiState: any = atom({
  key: "weatherApiState",
  default: {},
});
