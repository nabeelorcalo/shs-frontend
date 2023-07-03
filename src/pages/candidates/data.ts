import { UserAvatar } from "../../assets/images";
import DocAvatar from "../../assets/images/doc-avatar.png";

export const detailsData = [
  { title: "Source", value: "Career Website" },
  { title: "Owner", value: "David Miler", image: DocAvatar },
  { title: "Internship Type", value: "Paid" },
  { title: "Applied Date", value: "04/12/1996" },
  {
    title: "Assignee",
    userData: [
      {
        userImg: UserAvatar,
        userName: "john doe",
      },
      {
        userImg: UserAvatar,
        userName: "mina marino",
      },
      {
        userImg: UserAvatar,
        userName: "clark",
      },
      {
        userImg: UserAvatar,
        userName: "sarah joe",
      },
    ],
  },
];

export const hiringList = [
  {
    title: "applied",
    value: "0",
    color: "#363565",
  },
  {
    title: "interviewed",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "recommended",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "offerLetter",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "contract",
    value: "0",
    color: "#D2D6DC",
  },
  {
    title: "hired",
    value: "0",
    color: "#D2D6DC",
  },
];

export const ratingCount = [
  { title: "exceptional", count: 5.0 },
  { title: "very good", count: 4.0 },
  { title: "good", count: 3.0 },
  { title: "average", count: 2.0 },
  { title: "poor", count: 1.0 },
];

export const interShipDropDown = [
  "UI UX Designer",
  "Business Analyst",
  "Data Scientists",
  "Product Manager",
  "Human Resources",
];