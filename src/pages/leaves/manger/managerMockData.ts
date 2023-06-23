import { LeaveProfileImg } from "../../../assets/images";


export const upcomingHolidayDataManager: any = [
  { id: "1", day: "Monday", date: "1 january", holidayType: "New Year's Day" },
  { id: "2", day: "Monday", date: "2 january", holidayType: "New Year's Day" },
  { id: "3", day: "Monday", date: "3 january", holidayType: "New Year's Day" },
  { id: "4", day: "Monday", date: "4 january", holidayType: "New Year's Day" },
  { id: "5", day: "Monday", date: "5 january", holidayType: "New Year's Day" },
  { id: "6", day: "Monday", date: "6 january", holidayType: "New Year's Day" },
  { id: "7", day: "Monday", date: "7 january", holidayType: "New Year's Day" },
  { id: "8", day: "Monday", date: "8 january", holidayType: "New Year's Day" },
  { id: "9", day: "Monday", date: "9 january", holidayType: "New Year's Day" },
  { id: "10", day: "Monday", date: "10 january", holidayType: "New Year's Day" },
]


export const leaveCardDataManager: any = [
  {
    leavType: "Sick",
    leaveLength: 27,
    pending: 10,
    approved: 5,
    declined: 10,
  },
  {
    leavType: "Casual ",
    leaveLength: 17,
    pending: 6,
    approved: 5,
    declined: 9,
  },
  {
    leavType: "Work From Home",
    leaveLength: 17,
    pending: 11,
    approved: 10,
    declined: 8,
  },
  {
    leavType: "Medical",
    leaveLength: 19,
    pending: 12,
    approved: 11,
    declined: 5,
  },
]
export const LeaveTypeData = ['Sick', 'Casual', 'Work From Home', 'Medical']

export const leaveCalendarResorceData = [
  {
    id: "a",
    title: "Maria .S",
    img: LeaveProfileImg,
    designation: "Ui Ux designer"
  },
  {
    id: "b",
    title: "Maria .S",
    img: LeaveProfileImg,
    designation: "Ui Ux designer"
  },
  {
    id: "c",
    title: "Maria .S",
    img: LeaveProfileImg,
    designation: "Ui Ux designer"
  },
  {
    id: "d",
    title: "Maria .S",
    img: LeaveProfileImg,
    designation: "Ui Ux designer"
  },
  {
    id: "e",
    title: "Maria .S",
    img: LeaveProfileImg,
    designation: "front end developer"
  },
];

export const leaveCalendarEventsData = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "Sick",
    eventType: "sick",
    start: "2023-06-18T05:21:00",
    end: "2023-06-19T09:22:00",
    leaveTypeDay: "half day",
    dur: "01 day",
    hours: "04:00",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Pending",
    description: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation."
  },
  {
    id: "2",
    resourceIds: ["b"],
    title: "Casual",
    eventType: "casual",
    start: "2023-06-20T01:21:00",
    end: "2023-06-21T05:22:00",
    leaveTypeDay: "full day",
    dur: "01 day",
    hours: "",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Pending",
    description: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation."
},
{
    id: "3",
    resourceIds: ["c"],
    title: "Work from home",
    eventType: "work from home",
    start: "2023-06-22T06:21:00",
    end: "2023-06-23T07:22:00",
    leaveTypeDay: "half day",
    dur: "01 day",
    hours: "04:00",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Pending",
    description: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation."
},
{
    id: "4",
    resourceIds: ["d"],
    title: "Medical",
    eventType: "medical",
    start: "2023-06-23T09:21:00",
    end: "2023-06-24T11:22:00",
    leaveTypeDay: "full day",
    dur: "01 day",
    hours: "",
    img: LeaveProfileImg,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    email: "maria@Student Help Squad.com",
    aprover: "Amelia Clark",
    ApprovedBy: "Amelia Clark",
    status: "Pending",
    description: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation.",
},
{
  id: "5",
  resourceIds: ["e"],
  title: "Medical",
  eventType: "medical",
  start: "2023-06-25T09:21:00",
  end: "2023-03-17T11:22:00",
  leaveTypeDay: "full day",
  dur: "01 day",
  hours: "",
  img: LeaveProfileImg,
  name: "Maria Sanoid",
  designation: "UI UX Designer",
  email: "maria@Student Help Squad.com",
  aprover: "Amelia Clark",
  ApprovedBy: "Amelia Clark",
  status: "Pending",
  description: "As you know I don't have a car, and as it was announced there will be a strike the entire day within the public Transportation.",
}
];
