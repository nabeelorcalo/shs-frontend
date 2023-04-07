import React from "react";
import { Row, Typography } from "antd";
import { BoxWrapper } from "../BoxWrapper/BoxWrapper";
import { PinkRectangle, PurpleRectangle, YellowRectangle, BlueRectangle } from "../../assets/images";
import "./style.scss";
import AvatarGroup from "../UniversityCard/AvatarGroup";

interface LeaveDetailProps {
  title?: string;
  date?: string;
  sickLeaves?: string | string[];
  casualLeaves?: string | string[];
  medicalLeaves?: string | string[];
  workFromHome?: string | string[];
  user?:string
}

export const LeaveDetails: any = (props: LeaveDetailProps) => {
  const { sickLeaves, casualLeaves, medicalLeaves, workFromHome, title, date,user } = props;

  return (
    <div className={`leaves-detail bg-white rounded-2xl p-5 wrapper-shadow ${user==="Intern"?"min-h-[336px]":""} `}>
      <Row align="middle" justify="space-between">
        <Typography.Title level={4}>{title ? title : "Leaves"}</Typography.Title>
        {date && <span className="text-sm light-grey-color">{date}</span>}
      </Row>

      <div className={`flex flex-col  ${user==="companyAdmin"?"gap-[3px]": `${user==="Intern"?"gap-[30px]": "gap-[17px]"}`} `}>
        <div className="flex flex-row items-center pt-4">
          <BlueRectangle className="mr-5" />
          <p>Sick Leaves</p>
          {typeof sickLeaves === "object" ? (
            <div className="flex justify-end flex-1">
              <AvatarGroup maxCount={2} list={sickLeaves} />
            </div>
          ) : (
            <p className="ml-auto">{sickLeaves}</p>
          )}
        </div>

        <div className="flex flex-row items-center pt-4">
          <YellowRectangle className="mr-5" />
          <p>Casual Leaves</p>
          {typeof casualLeaves === "object" ? (
            <div className="flex justify-end flex-1">
              <AvatarGroup maxCount={2} list={casualLeaves} />
            </div>
          ) : (
            <p className="ml-auto">{sickLeaves}</p>
          )}
        </div>

        <div className="flex flex-row items-center justify-be pt-4">
          <PinkRectangle className="mr-5" />
          <p>Medical Leaves</p>
          {typeof medicalLeaves === "object" ? (
            <div className="flex justify-end flex-1">
              <AvatarGroup maxCount={2} list={medicalLeaves} />
            </div>
          ) : (
            <p className="ml-auto">{sickLeaves}</p>
          )}
        </div>

        <div className="flex flex-row items-center pt-4">
          <PurpleRectangle className="mr-5" />
          <p>Work From Home</p>
          {typeof workFromHome === "object" ? (
            <div className="flex justify-end flex-1">
              <AvatarGroup maxCount={2} list={workFromHome} />
            </div>
          ) : (
            <p className="ml-auto">{sickLeaves}</p>
          )}
        </div>
      </div>
    </div>
  );
};
