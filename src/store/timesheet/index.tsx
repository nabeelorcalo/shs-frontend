import { atom } from "recoil";

const timeSheetAtom = atom({
    key: 'timeSheet',
    default: { data: '', message: '' }
})

export { timeSheetAtom }