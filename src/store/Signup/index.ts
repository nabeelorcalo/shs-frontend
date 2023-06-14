import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

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
