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
    limit: 1,
    city: "",
    q: "",
  },
});

export const universityPagginationState = atom({
  key: "universityPagginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 1,
      showSizeChanger: false,
    }
  }
});

export const universityInternFilterState = atom({
  key: "universityInternFilterState",
  default: {
    userUniversityId: '',
    page:1,
    limit: 1,
    city: "",
    search: "",
    joiningDate: "",
    assignedManager: "",
    companyId: '',
    internStatus: "",
    department: ""

  },
});
export const universityInternPagginationState = atom({
  key: "universityInternPagginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 1,
      showSizeChanger: false,
    }
  }
});