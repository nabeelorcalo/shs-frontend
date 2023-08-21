import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

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

// get all application companies data
export const universityCompanies = atom({
  key: "universityCompanies",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const companiesListState = selector({
  key: "companies",
  get: ({ get }) => {
    const companies = get(universityCompanies);
    const allOption = {    key: "all",    value: "All",  label: "All",  };
    const mappedCompanies = companies?.map((item: any, index: number) => ({
      key: index,
      value: item?.id,
      label: item?.businessName,
    }));
    const companiesWithAll = [allOption, ...mappedCompanies];
    return companiesWithAll;
  },
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
    assignedManager: undefined,
    internStatus: undefined,
    departmentId: undefined,
    userUniversityId: undefined,
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