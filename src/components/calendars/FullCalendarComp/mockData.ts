import { UserAvatar } from "../../../assets/images";

export const eventsMockData = [
  {
    id: "2",
    title: "UI UX post oppertunity",
    start: "2023-03-21T02:30:00",
    end: "2023-03-21T04:10:00",
    category: "interview",
    userName: 'david miller',
    siteAddress: '6-9 The Square, Hayes, Uxbridge UB11 1FW, UK',
    attendees: [
      { id: '1', userName: 'mino marina', userProfile: UserAvatar, status: 'approved' },
      { id: '2', userName: 'john doe', userProfile: UserAvatar, status: 'declined' },
      { id: '3', userName: 'john doe', userProfile: UserAvatar, status: 'approved' },
      { id: '4', userName: 'john doe', userProfile: UserAvatar, status: 'approved' },
      { id: '4', userName: 'john doe', userProfile: UserAvatar, status: 'approved' },
      { id: '4', userName: 'john doe', userProfile: UserAvatar, status: 'approved' },
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. '
  },

  {
    id: "3",
    title: "annual fee submission",
    start: "2023-03-24T03:51:00",
    end: "2023-03-24T06:51:00",
    category: "event",
    userName: 'mino marina',
    siteAddress: '6-9 The Square, Hayes, Uxbridge UB11 1FW, UK',
    attendees: [
      { id: '1', userName: 'mino marina', userProfile: UserAvatar, status: 'approved' },
      { id: '2', userName: 'john doe', userProfile: UserAvatar, status: 'declined' }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. '
  },
  {
    id: "4",
    title: "Post UI UX Meeting",
    start: "2023-03-25T01:51:00",
    end: "2023-03-25T02:51:00",
    userName: 'john doe',
    siteAddress: '6-9 The Square, Hayes, Uxbridge UB11 1FW, UK',
    attendees: [
      { id: '1', userName: 'mino marina', userProfile: UserAvatar, status: 'approved' },
      { id: '2', userName: 'john doe', userProfile: UserAvatar, status: 'declined' }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. '
  },
  {
    id: "5",
    title: "UI UX post oppertunity",
    start: "2023-03-22T01:30:00",
    end: "2023-03-22T02:00:00",
    category: "interview",
    userName: 'david miller',
    siteAddress: '6-9 The Square, Hayes, Uxbridge UB11 1FW, UK',
    attendees: [
      { id: '1', userName: 'mino marina', userProfile: UserAvatar, status: 'approved' },
      { id: '2', userName: 'john doe', userProfile: UserAvatar, status: 'declined' }
    ],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse lobortis ante non lec elit sit. '
  },
];