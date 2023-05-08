import { atom } from "recoil";

// get all internships
export const internshipDataState = atom({
  key: "internshipDataState",
  default: [], 
});

//get internship details 
export const internshipDetailsState = atom({
  key: "internshipDetailsState",
  default: [], 
});


