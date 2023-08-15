import { atom } from "recoil";

export const reservationData = atom({
  key: "reservationData",
  default: [],
});

export const reservationFilterState = atom({
  key: "reservaionFilterState",
  default: {
    page: 1,
    limit: 10,
    search: '',
    status: ""
  },
});

export const reservationPaginationState = atom({
  key: "reservationPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});