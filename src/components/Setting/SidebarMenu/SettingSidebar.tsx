import React from "react";
import { Divider,  } from "antd";
import { NavLink,  } from "react-router-dom";
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


const menuLinks = [
  {
    title: "Locations",
    link: "/settings/location",
    icon: <SettingMap />,
    description: "Add different geographical locations for your organisation",
  },
  {
    title: "Departments",
    link: "/settings/department",
    icon: <SettingPeople />,
    description:
      "Add departments within your organisation for people management",
  },
  {
    title: "Leaves",
    link: "/settings/leaves",
    icon: <SettingCalendarRemove />,
    description: "Create leave policies to allow your people to take time off",
  },
  {
    title: "Performance",
    link: "/settings/performance",
    icon: <SettingChart />,
    description: "Manage performance of your team by creating evaluation form",
  },
  {
    title: "Templates",
    link: "/settings/template",
    icon: <SettingDocument />,
    description: "Create templates for managing letters and certificates",
  },
  {
    title: "Shifts",
    link: "/settings/shifts",
    icon: <SettingShifts />,
    description: "Add shifts for your people to manage different shifts",
  },
  {
    title: "Timesheet",
    link: "/settings/timesheet",
    icon: <SettingMap />,
    description: "Manage timesheet categories and track tasks for team members",
  },
  {
    title: "Payroll",
    link: "/settings/payroll",
    icon: <SettingPayroll/>,
    description:
      "Add departments within your organisation for people management",
  },
];

const SettingSidebar: React.FC = () => {
  return (
    <div className="setting-sidebar">

      <div className="">
        {menuLinks.map((item, idx) => {
          return (
            <div >
              <NavLink
                key={idx}
                to={item.link}
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center  text-[#14142A] bg-[#E6F4F9] rounded-lg shadow-[0px_4px_4px_rgba(0,0,0,0.1)] hover:shadow-[0px_4px_4px_rgba(0,0,0,0.1)] hover:text-[#14142A]"
                    : "flex items-center  text-[#6E7191] bg-white rounded-lg hover:bg-[#E6F4F9] hover:shadow-[0px_4px_4px_rgba(0,0,0,0.1)] hover:text-[#14142A]"
                }
              >
                <div className="px-2 m-0">
                  <div className="flex flex-col my-2">
                    <div className="flex">
                      <span>{item.icon}</span>

                      <span className="font-medium mx-3 text-base text-primary-color  ">
                        {item.title}
                      </span>
                    </div>
                    <div>
                      <p className="font-normal text-sm pt-1 ">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Divider className="mb-0 " />
                </div>
              </NavLink>
              {/* <Divider /> */}

            </div>
          );
        })}
      </div>
    </div>
    // </div>
  );
};

export default SettingSidebar;
