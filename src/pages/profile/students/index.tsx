import React from "react";
import {
  CreditCardFilled,
  DribbbleSquareFilled,
  FileFilled,
  InfoCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import AppTabs from "../../../components/Tabs";
import Documents from "./tabs/documents";
import GeneralInformation from "./tabs/generalInformation";
import ImmigrationStatus from "./tabs/immigrationStatus";
import PersonalInformation from "./tabs/personalInformation";
import CardTabs from "./tabs/cards/index";
import '../style.scss';

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
    <div className="studdnt-dash">
      <AppTabs items={items} />
    </div>
  );
};

export default StudentsTabs;
