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
    internEmail:'',
    internId: '',
    name: undefined,
    type: '',
    signatureType: '',
    imgSignature: '',
    fontFamily: 'roboto',
    txtSignature: '',
    file: null,
    fileURL: null,
    desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.',
    certificateDesign: ''
  }
});