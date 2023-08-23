import { atom, selector } from "recoil";

export const getListingState = atom({
  key: "getListingState",
  default: [],
});

export const getPropertAgents = atom({
  key: "getPropertAgents",
  default: [],
});

export const getRecentListingState = atom({
  key: "getRecentListing",
  default: [],
});

export const getRecentActivities = atom({
  key: "getRecentActivities",
  default: [],
});

export const getPropertyAgentState = atom({
  key: "getPropertyAgentState",
  default: [],
});

export const getListingGraphState = atom({
  key: "getListingGraphState",
  default: [],
});

export const getAllListingState = atom({
  key: "getAllListingState",
  default: [],
});

export const inspectionReportState = atom({
  key: "inspectionReportState",
  default: [],
});

export const delegateFilterState = atom({
  key: "delegateFilterState",
  default: {
    page: 1,
    limit: 10,
    q: "",
    status: "",
    type: "",
  },
});

export const delegatePaginationState = atom({
  key: "delegatePaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    },
  },
});
