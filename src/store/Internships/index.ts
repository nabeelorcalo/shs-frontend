import { atom } from "recoil";

// get all internships
export const internshipDataState = atom({
  key: "internshipDataState",
  default: [], 
});

export const internshipFilterState = atom({
  key: "internshipFilterState",
  default: {
    limit: 10,
    page: 1,
    departmentId: undefined,
    locationId:undefined,
    status:undefined,
    search: "",
  },
});

export const internshipPaginationState = atom({
  key: "internshipPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});

//get internship details 
export const internshipDetailsState = atom({
  key: "internshipDetailsState",
  default: [], 
});




