import { atom, selector } from "recoil";

export const getListingState = atom({
  key: 'getListingState',
  default: []
});

export const getPropertAgents = atom({
  key: "getPropertAgents",
  default: []
});

export const getRecentListingState = atom({
  key: "getRecentListing",
  default: []
});

export const getRecentActivities = atom({
  key: "getRecentActivities",
  default: [],
})