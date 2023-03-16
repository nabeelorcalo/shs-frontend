import { LeaveProfileImg } from "../../../assets/images";


export const  upcomingHolidayDataManager: any = [
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

export const clientBookingCalendarData = [
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
];
export const clientBookingEventsData = [
  {
    id: "1",
    resourceIds: ["a"],
    title: "Morning",
    start: "2023-03-14T06:00:00",
    end: "2023-03-15T12:40:00",
    totalShift: "9",
    totalCarers: "9"
  },
  {
    id: "2",
    resourceIds: ["b"],
    title: "Morning",
    start: "2023-03-15T09:00:00",
    end: "2023-03-16T10:20:00",
    totalShift: "9",
    totalCarers: "9"
  },
  {
    id: "3",
    resourceIds: ["c"],
    title: "Morning",
    start: "2023-03-16T09:00:00",
    end: "2023-03-17T10:20:00",
    totalShift: "9",
    totalCarers: "9"
  },
];