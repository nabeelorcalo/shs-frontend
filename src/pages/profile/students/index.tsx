import {
  CreditCardFilled,
  DribbbleSquareFilled,
  FileFilled,
  InfoCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import AppTabs from "../../../components/Tabs";
import Documents from "./tabs/documents";
import GeneralInformation from "./tabs/generalInformation";
import ImmigrationStatus from "./tabs/immigrationStatus";
import PersonalInformation from "./tabs/personalInformation";
import CardTabs from "./tabs/cards/index";

const items = [
  {
    key: "1",

    label: (
      <span>
        <UserOutlined /> Personal Information
      </span>
    ),
    children: <PersonalInformation />,
  },
  {
    key: "2",
    label: (
      <span>
        <InfoCircleFilled /> General Information
      </span>
    ),
    children: <GeneralInformation />,
  },
  {
    key: "3",
    label: (
      <span>
        <FileFilled /> Documents
      </span>
    ),
    children: <Documents />,
  },
  {
    key: "4",
    label: (
      <span>
        <DribbbleSquareFilled /> Immigration Status
      </span>
    ),
    children: <ImmigrationStatus />,
  },
  {
    key: "5",
    label: (
      <span>
        <CreditCardFilled /> Cards
      </span>
    ),
    children: <CardTabs />,
  },
];

const StudentsTabs = () => {
  return (
    <div
      style={{
        background: "#FFFFFF",
        boxShadow: "0px 0px 8px 1px rgba(9, 161, 218, 0.1)",
        borderRadius: "16px",
        padding: "1rem",
        height: "80vh",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
    >
      <AppTabs items={items} />
    </div>
  );
};

export default StudentsTabs;
