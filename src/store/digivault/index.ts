import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const DigiVaultState = atom({
    key: "DigiVaultState",
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const DigiVaultPasswordState = atom({
    key: "DigiVaultPasswordState",
    default: {}
})

export const DigiFileContent = atom({
    key: "DigiFileContent",
    default: []
})

export const newDigiList = selector({
    key: "newDigiList",
    get: ({ get }) => {
        const list = get(DigiVaultState);
        return list?.lockResponse
    },
});