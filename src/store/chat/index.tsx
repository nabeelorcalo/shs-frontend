import { atom } from "recoil";

export const PersonalChatListState = atom({
    key:"PersonalChatListState",
    default:[]
})

export const PersonalChatMsgxState = atom({
    key:"PersonalChatMsgxState",
    default: []
})

export const PersonalChatMediaListState = atom({
  key:"PersonalChatMediaListState",
  default: []
})

export const ExternalChatUser = atom({
  key:"ExternalChatUser",
  default: {}
})