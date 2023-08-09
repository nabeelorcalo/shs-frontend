import { atom } from "recoil";

// get all interns
export const internsDataState = atom({
  key: "internsDataState",
  default: [],
});

export const internsProfileDataState = atom({
  key: "internsProfileDataState",
  default: [],
});

export const signatureState = atom({
  key: "signatureState",
  default: [],
});

export const internsFilterState = atom({
  key: "internsFilterState",
  default: {
    page: 1,
    limit: 10,
    userType: "intern",
    search: "",
    internshipId: "",
    filterType: "",
    currentDate: "",
    startDate: "",
    endDate: "",
    assignedManager: "",
    internStatus: "",
    departmentId: "",
    userUniversityId: "",
    joiningDate: "",
    stage: ""
  },
});

export const internPaginationState = atom({
  key: "internPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});