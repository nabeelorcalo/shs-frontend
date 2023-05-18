import {atom} from "recoil";

export const DigiVaultState=atom({
    key:"DigiVaultState",
    default:[]
})

export const DigiVaultPasswordState=atom({
    key:"DigiVaultPasswordState",
    default:{}
})

export const DigiFileContent=atom({
    key:"DigiFileContent",
    default:[]
})