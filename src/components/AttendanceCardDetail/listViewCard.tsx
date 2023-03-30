import React from "react";
import { Avatar, Dropdown, Typography } from "antd";
import { BoxWrapper } from "../BoxWrapper/BoxWrapper";
import { ThreeDots } from "../../assets/images";
import constants from "../../config/constants";

interface AttendanceProps {
  index?: any;
  item: any;
  menu?: any;
}

export const AttendanceListViewCard: any = (props: AttendanceProps) => {
  const role = constants.USER_ROLE;
  const { index, item, menu } = props;
  const { avatar, name, profession, status, company } = item;

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
      className="flex flex-row items-center card"
      borderLeft={`4px solid ${getColor(status)}`}
    >
      <div className="flex items-center gap-4 w-[30%]">
        <Avatar size={48} src={avatar} />
        <Typography.Title level={4}>{name}</Typography.Title>
      </div>

      <div className="w-[30%]">
        <p className="">{profession}</p>
      </div>
      {role === "University" && (
        <div className="w-[30%]">
          <p className="">Company:{company}</p>
        </div>
      )}

      <div className="flex gap-10 w-[30%]">
        <Avatar
          size={40}
          className={`${
            status === "present"
              ? "text-success-bg-color"
              : "text-input-bg-color"
          } align-middle`}
        >
          P
        </Avatar>

        <Avatar
          size={40}
          className={`${
            status === "absent" ? "text-error-bg-color" : "text-input-bg-color"
          } align-middle`}
        >
          A
        </Avatar>

        <Avatar
          size={40}
          className={`${
            status === "leave" ? "text-warning-bg-color" : "text-input-bg-color"
          } align-middle`}
        >
          L
        </Avatar>
      </div>

      <div className="flex justify-center w-[10%]">
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
