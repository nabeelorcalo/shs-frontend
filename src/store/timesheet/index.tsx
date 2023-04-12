import { atom, selector } from "recoil";

const timeSheetAtom = atom({
    key: 'timeSheet',
    default: ''
})
const timeSheetSelector = selector({
    key: 'timeSheetSelector',
    get: ({ get }) => { }
})



export { timeSheetAtom, timeSheetSelector }