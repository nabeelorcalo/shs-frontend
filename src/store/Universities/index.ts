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
});

export const systemUniFilterState = atom({
  key: "systemUniFilterState",
  default: {
    limit: 10,
    page: 1,
    city: "",
    status: "",
    search: "",
  },
});

export const systemUniPaginationState = atom({
  key: "systemUniPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});

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

export const universityInternFilterState = atom({
  key: "universityInternFilterState",
  default: {
    userUniversityId: '',
    page: 1,
    limit: 10,
    city: "",
    search: "",
    joiningDate: undefined,
    assignedManager: undefined,
    companyId: undefined,
    internStatus: "",
    department: ""

  },
});
export const universityInternPagginationState = atom({
  key: "universityInternPagginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});