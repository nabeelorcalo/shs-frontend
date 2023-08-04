import { atom } from "recoil";

export const getDelegateAdminState = atom({
    key: "getDelegateAdminState",
    default: []
});

export const getDelegateAgentsState = atom({
    key: "getDelegateAgentsState",
    default:[],
})

export const addDelegateRewardState = atom({
    key: "addDelegateRewardState",
    default: [],
});

export const getRewardState = atom({
    key: "getRewardState",
    default:[]
})

export const recieptState = atom({
    key: "recieptState",
    default:[]
})