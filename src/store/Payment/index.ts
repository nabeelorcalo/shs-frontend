import { atom } from "recoil";

export const internPaymentData = atom({
  key: "internPaymentData",
  default: [],
});

export const paymentFilterState = atom({
  key: "paymentFilterState",
  default: {
    page: 1,
    limit: 10,
    search: '',
    month: ''
  },
});

export const paymentPaginationState = atom({
  key: "paymentPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});