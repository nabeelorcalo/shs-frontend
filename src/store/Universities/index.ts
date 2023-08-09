import { atom } from "recoil";

// get all applications data
export const universityDataState = atom({
  key: "universityDataState",
  default: [],
});

export const universityIntersDataState = atom({
  key: "universityIntersDataState",
  default: [],
});

// system admin
export const universitySystemAdminState = atom({
  key: "universitySystemAdminState",
  default: [],
})

// UNIVERISTY mAIN

export const universityState = atom({
  key: "universityState",
  default: []
})

export const universityFilterState = atom({
  key: "universityFilterState",
  default: {
    page: 1,
    limit: 10,
    city: "",
    q: "",
    // status: "",
    // type: 'OFFER_LETTER',
    // currentDate: '',
    // filterType: "",
    // startDate: "",
    // endDate: '',
    // search: ''
  },
});

export const universityPagginationState = atom({
  key: "universityPagginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});