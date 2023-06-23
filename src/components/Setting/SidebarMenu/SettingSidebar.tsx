import React from "react";
import { Divider, } from "antd";
import { NavLink, } from "react-router-dom";
import {
  SettingCalendarRemove,
  SettingChart,
  SettingDocument,
  SettingMap,
  SettingPayroll,
  SettingPeople,
  SettingShifts,
} from "../../../assets/images";

import './SettingSidebar.scss'
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { BoxWrapper } from "../../../components";

const menuLinks = [
  {
    title: "Locations",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LOCATION}`,
    icon: <SettingMap />,
    description: "Add different geographical locations for your organisation",
  },
  {
    title: "Departments",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_DEPARTMENT}`,
    icon: <SettingPeople />,
    description:
      "Add departments within your organisation for people management",
  },
  {
    title: "Leaves",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}`,
    icon: <SettingCalendarRemove />,
    description: "Create leave policies to allow your people to take time off",
  },
  {
    title: "Performance",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_PERFORMANCE}`,
    icon: <SettingChart />,
    description: "Manage performance of your team by creating evaluation form",
  },
  {
    title: "Templates",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_TEMPLATE}`,
    icon: <SettingDocument />,
    description: "Create templates for managing letters and certificates",
  },
  {
    title: "Shifts",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_SHIFTS}`,
    icon: <SettingShifts />,
    description: "Add shifts for your people to manage different shifts",
  },
  {
    title: "Timesheet",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_TIMESHEET} `,
    icon: <SettingMap />,
    description: "Manage timesheet categories and track tasks for team members",
  },
  {
    title: "Payroll",
    link: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_PAYROLL} `,
    icon: <SettingPayroll />,
    description:
      "Add departments within your organisation for people management",
  },
];

const SettingSidebar: React.FC = () => {
  return (
    <>
    <BoxWrapper className="setting-sidebar p-1">
      {menuLinks?.map((item, index) => {
        return (
          <div key={index} className="p-0  sidebar">
            <NavLink
              to={item?.link}
              className={({ isActive  } ) =>
                isActive
                  ? "flex items-center  text-[#14142A] bg-[#E6F4F9] active-sidebar  shadow-[0px_4px_4px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_4px_rgba(0,0,0,0.1)] hover:text-[#14142A]"
                  : "flex items-center  text-[#6E7191] bg-white  hover:bg-[#E6F4F9] hover:shadow-[0px_4px_4px_rgba(0,0,0,0.1)] hover:text-[#14142A]"
              }
            >
              <div className="px-1 lg:px-5 py-2 lg:py-3 w-full ">
                <div className="flex flex-col my-2">
                  <div className="flex">
                    <span>{item?.icon}</span>

                    <span className="font-medium mx-3 text-base text-primary-color ">
                      {item?.title}
                    </span>
                  </div>
                  {/* hidden sm:block */}
                  <div className="">
                    <p className="font-normal text-sm pt-1 text-success-placeholder-color">
                      {item?.description}
                    </p>
                  </div>
                </div>
              </div>
            </NavLink>
          
            <Divider className="m-0 w-full" />
          </div>
        );
      })}
    </BoxWrapper>
    </>
  );
};

export default SettingSidebar;
