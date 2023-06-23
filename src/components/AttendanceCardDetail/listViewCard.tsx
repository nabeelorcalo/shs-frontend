import React from "react";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import { Avatar, Dropdown, Typography } from "antd";
import { BoxWrapper } from "../../components";
import { ThreeDots } from "../../assets/images";
import constants from "../../config/constants";
import { useNavigate } from "react-router-dom";

interface AttendanceProps {
  index?: any;
  item: any;
  menu?: any;
}

export const AttendanceListViewCard: any = (props: AttendanceProps) => {
  const role = useRecoilValue(currentUserRoleState);
  const { index, item, menu } = props;
  const navigate = useNavigate();
  const { avatar, name, profession, status, company, id } = item;

  const getColor = (name: string) => {
    switch (name) {
      case "present":
        return "#3dc575";
      case "absent":
        return "#d83a52";
      case "leave":
        return "#ffc15d";
      default:
        return "transparent";
    }
  };

  return (
    <BoxWrapper
      key={index}
      className="flex gap-4 flex-col sm:flex-row sm:items-center card"
      borderLeft={`4px solid ${getColor(status)}`}
    >
      <div className="flex items-center justify-between sm:w-[100%] w-[30%}">
        <div className="flex items-center gap-4">
          <Avatar size={48} src={avatar} />
          <p className="text-lg text-primary-color">{name}</p>
        </div>
        <div className="flex justify-center w-[10%]  sm:hidden">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            className="attendance-menu"
          >
            <ThreeDots className="cursor-pointer" />
          </Dropdown>
        </div>
      </div>

      <div className="sm:w-[100%] w-[30%}">
        <p className="">{profession}</p>
      </div>
      {role === constants.UNIVERSITY && (
        <div className="sm:w-[100%] w-[30%}">
          <p className="">Company:{company}</p>
        </div>
      )}

      <div className="flex gap-10 sm:w-[100%] w-[30%}">
        <Avatar
          size={40}
          className={`${status === "present"
              ? "text-success-bg-color"
              : "text-input-bg-color text-secondary-color font-semibold text-base"
            } align-middle`}
        >
          <span className='text-base font-semibold'>P</span>
        </Avatar>

        <Avatar
          size={40}
          className={`${status === "absent" ? "text-error-bg-color" : "text-input-bg-color text-secondary-color font-semibold text-base"
            } align-middle`}
        >
         <span className='text-base font-semibold'>A</span>
        </Avatar>

        <Avatar
          size={40}
          className={`${status === "leave" ? "text-warning-bg-color" : "text-input-bg-color text-secondary-color font-semibold text-base"
            } align-middle`}
        >
          <span className='text-base font-semibold'>L</span>
        </Avatar>
      </div>

      <div className="w-[10%] hidden sm:block ">
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomRight"
          className="attendance-menu"
        >
          <ThreeDots className="cursor-pointer" />
        </Dropdown>
      </div>
    </BoxWrapper>
  );
};
