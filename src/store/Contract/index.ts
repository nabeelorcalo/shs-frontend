import { atom } from "recoil";

export const contractsDashboard = atom({
  key: "contractsDashboard",
  default: [],
});

export const contractsListData = atom({
  key: "contractsListData",
  default: [],
});
export const offerLetterList = atom({
  key: "offerLetterList",
  default: [],
});

export const contractDetailsState = atom({
  key: "contractDetailsState",
  default: [],
});
export const createContractState = atom({
  key: "createContractState",
  default: [],
});

export const contractFilterState = atom({
  key: "contractFilterState",
  default: {
    page: 1,
    limit: 10,
    status: "",
    type: 'CONTRACT',
    currentDate: '',
    filterType: "",
    startDate: "",
    endDate: '',
    search: ''
  },
});

export const offerLetterFilterState = atom({
  key: "offerLetterFilterState",
  default: {
    page: 1,
    limit: 10,
    status: "",
    type: 'OFFER_LETTER',
    currentDate: '',
    filterType: "",
    startDate: "",
    endDate: '',
    search: ''
  },
});

export const contractPaginationState = atom({
  key: "contractPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});