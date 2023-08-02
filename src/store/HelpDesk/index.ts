import { atom } from "recoil";

export const helpDeskListState = atom({
  key: "helpDeskListState",
  default: [],
});

export const helpDeskListDetail = atom({
  key: "helpDeskListDetail",
  default: [],
});

export const getRoleBaseUsers = atom({
  key: "getRoleBaseUsers",
  default: [],
});

export const helpDeskFilters = atom({
  key: "helpDeskFilters",
  default: {
    page: 1,
    limit: 10,
    date: null,
    assignedUsers: [],
    roles: [],
    assigned: "",
    priority: null,
    type:null,
    status:'',
    search:null,
    sort:'ASC',
    isFlaged:false
  },
});

export const helpDeskPaginationState =atom({
  key: "helpDeskPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  },
});