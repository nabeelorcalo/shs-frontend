import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const countryList = atom({
  key: "countryList",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const newCountryListState = selector({
  key: "newCountryList",
  get: ({ get }) => {
    const countryLists = get(countryList);
    return countryLists.map((val: any, index: number) => ({
      key: index,
      value: val?.name?.common,
      label: val?.name?.common,
    })).sort((a: any, b: any) =>
    a.label.localeCompare(b.label)
  );
  },
});

export const nationalityList = selector({
  key: "nationalityList",
  get: ({ get }) => {
    const countryLists = get(countryList);
    return countryLists.map((val: any, index: number) => ({
      key: index,
      value: val?.demonyms?.eng?.f,
      label: val?.demonyms?.eng?.f,
    }));
  },
});

export const callingCodesState = selector({
  key: "callingCodesState",
  get: ({ get }) => {
    const countryLists = get(countryList);
    const callingCodes: any = {};

    countryLists.map((item: any) => {
      const {cca2, idd: {root, suffixes}} = item;

      let suffix = suffixes?.length > 0 ? suffixes[0] : '';

      callingCodes[`${root}${suffix}`] = cca2.toLowerCase();
    });

    return callingCodes;
  },
});

export const postalCodeState = selector({
  key: "postalCodeState",
  get: ({ get }) => {
    const countryLists = get(countryList);
    const postalCodes: any = {};
    
    countryLists.map((item: any) => {
      const {name: {common}, postalCode } = item;

      postalCodes[`${common}`] = postalCode?.regex;
    });

    return postalCodes;
  },
});