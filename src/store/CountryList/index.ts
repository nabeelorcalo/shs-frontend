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
