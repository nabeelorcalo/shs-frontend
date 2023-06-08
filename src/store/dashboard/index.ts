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
  default: {},
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


// Internships Summary graph
export const attendanceState: any = atom({
  key: "attendanceState",
  default: [],
});

// weather api
export const weatherApiState: any = atom({
  key: "weatherApiState",
  default: {},
});
// top performars list
export const topPerformersListState = atom({
  key: "topPerformersListState",
  default: []
})

// users birthdays list
export const usersBirthdaysListState = atom({ key: "usersBirthdaysListState", default: [] });

// performance graph analytics
export const performanceGraphAnalyticsState = atom({ key: "performanceGraphAnalyticsState", default: [] });
// dashboard leaves count
export const dashboardLeavesCountState = atom({ key: "dashboardLeavesCountState", default: [] });
// dashboard FEELING TODAY MOOD
export const feelingTodayMoodState = atom({ key: "feelingTodayMoodState", default: {} });
// dashboard clock-in 
export const attendenceClockinState = atom({ key: "attendenceClockinState", default: {} });
// dashboard attendance average 
export const attendenceAverageState = atom({ key: "attendenceAverageState", default: {} });
// agent Dashboard Listing Graph State 
export const agentDashboardListingGraphState = atom({ key: "agentDashboardListingGraphState", default: [] });
// agent reservation table data State 
export const agentReservationState = atom({ key: "agentReservationState", default: [] });
// university dashboard counting card
export const universityWidgetsState = atom({ key: "universityWidgetsState", default: {} });
