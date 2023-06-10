import { UserAvatar } from "../../../assets/images";

export const calendarMockData = [
  {
    id: "1",
    title: "UI UX post oppertunity meeting",
    start: "2023-06-08T01:30:00",
    end: "2023-06-08T02:00:00",
    category: "meeting",
    userName: "david miller",
    location: { link: "https://zoom.com/call/0234", type: "virtual" },
    isNewMeeting: true,
    status: "pending",
    attendees: [
      { id: "1", userName: "mino marina", userProfile: UserAvatar, status: "approved" },
      { id: "2", userName: "john doe", userProfile: UserAvatar, status: "declined" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. ",
  },
  {
    id: "2",
    title: "interview with alex",
    start: "2023-06-20T02:30:00",
    end: "2023-06-20T03:00:00",
    category: "interview",
    userName: "david miller",
    location: { link: "6-9 The Square, Hayes, Uxbridge UB11 1FW, UK", type: "onSite" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. ",
  },
  {
    id: "3",
    title: "annual fee submission",
    start: "2023-06-23T02:30:00",
    end: "2023-06-23T03:00:00",
    category: "reminder",
    location: { link: "6-9 The Square, Hayes, Uxbridge UB11 1FW, UK", type: "onSite" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. ",
  },
  {
    id: "4",
    title: "interview with alex",
    start: "2023-06-22T03:05:00",
    end: "2023-06-22T03:40:00",
    category: "interview",
    userName: "david miller",
    location: { link: "6-9 The Square, Hayes, Uxbridge UB11 1FW, UK", type: "onSite" },
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. ",
  },
  {
    id: "5",
    title: "UI UX post oppertunity meeting",
    start: "2023-06-24T01:30:00",
    end: "2023-06-24T02:00:00",
    category: "meeting",
    status: "accept",
    userName: "david miller",
    location: { link: "https://zoom.com/call/0234", type: "virtual" },
    isNewMeeting: false,
    attendees: [
      { id: "1", userName: "mino marina", userProfile: UserAvatar, status: "approved" },
      { id: "2", userName: "john doe", userProfile: UserAvatar, status: "declined" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. ",
  },
  {
    id: "6",
    title: "meeting",
    start: "2023-06-24T03:30:00",
    end: "2023-06-24T05:00:00",
    category: "meeting",
    userName: "david miller",
    status: "accepted",
    location: { link: "https://zoom.com/call/0234", type: "virtual" },
    isNewMeeting: false,
    isAccepted: true,
    attendees: [
      { id: "1", userName: "mino marina", userProfile: UserAvatar, status: "approved" },
      { id: "2", userName: "john doe", userProfile: UserAvatar, status: "declined" },
    ],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. ",
  },
];
