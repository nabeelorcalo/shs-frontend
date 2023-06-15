import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export const companyStepperData = atom({
  key: "companyStepperData",
  default: {
    businessType: "Private Limited",
    businessSector: "Information Technology",
    businessName: "Test Name Company",
    registrationNumber: "BF-2399",
    countryOfIncorporation: "UK",
    dateOfIncorporation: "2020-05-10",
    postCode: "23888",
    address: "6th Avenue",
    street: "Baker Street",
    town: "T2",
    country: "United Kingdom",
    ownerName: "",
    ownerRole: "",
    ownerAddress: "",
    ownerDOB: "",
  },
});
