import { atom, selector } from "recoil";

export const companyStepperData = atom({
  key: "companyStepperData",
  default: {
    businessType: "",
    businessSector: "",
    businessName: "",
    registrationNumber: "",
    countryOfIncorporation: "",
    dateOfIncorporation: "",
    postCode: "",
    address: "",
    street: "",
    town: "",
    country: "",
    ownerName: "",
    ownerRole: "",
    ownerAddress: "",
    ownerDOB: "",
  },
});

export const signupUserData = atom({
  key: "signupUserData",
  default: {}
})
