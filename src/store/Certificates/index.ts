import { atom } from "recoil";

export const certificatesListData = atom({
  key: "certificatesListData",
  default: [],
});

//performance data
export const performanceEvaulationData = atom({
  key: "performanceEvaulationData",
  default: [],
});

// leaves data
export const leavesData = atom({
  key: "leavesData",
  default: [],
});

export const signPadState = atom({
  key: "signPadState",
  default: {},
});

export const certificateDetailsState = atom({
  key: "certificateDetailsState",
  default: {
    templateId: '',
    certificateId: '',
    attachmentId: '',
    internEmail: '',
    internId: '',
    name: undefined,
    type: '',
    signatureType: '',
    imgSignature: '',
    fontFamily: 'Roboto',
    txtSignature: '',
    file: null,
    fileURL: null,
    desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.',
    certificateDesign: ''
  }
});

export const certificatesFilterState = atom({
  key: "certificatesFilterState",
  default: {
    page: 1,
    limit: 10,
    userType: 'intern',
    search: '',
    departmentId: ''
  },
});

export const certificatesPaginationState = atom({
  key: "certificatesPaginationState",
  default: {
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  }
});