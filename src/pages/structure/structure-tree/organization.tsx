import { useState } from "react";
import _ from "lodash";
import { Avatar } from "antd";
import "./style.scss";

import {
  StructureCompanyAdminAvater,
  StructureCompanyAdminDownward,
  StructureCompanyAdminProfile2user,
} from "../../../assets/images";

function Organization({ org, onCollapse, collapsed }: any) {
  const [iconChagne, setIconChagne] = useState<boolean>(true);
  const [hideFooterButton, setHideFooterButton] = useState<any>(
    `${_.size(org.organizationChildRelationship)}` > "0"
  );

  const getAvatarName = (name: string) => {
    const words = name?.split(" ");

    if (words.length === 2) {
      return words[0][0] + words[1][0];
    } else {
      return words[0][0];
    }
  }

  const renderAvatar = (data: any) => {
    const { tradingName, userImg } = data;

    if (userImg?.includes('undefined')) {
      return (
        <Avatar
          size={48}
          className="-translate-y-[25px] custom_avatar"
        >
          {getAvatarName(tradingName)}
        </Avatar>
      )
    } else {
      return (
        <Avatar
          size={48}
          src={userImg}
          className="-translate-y-[25px] custom_avatar"
        />
      )
    }
  }

  return (
    <div className="w-[200px] mx-auto lg:w-[100%]">
      <div className="struture-card center flex  justify-center mt-5 h-[120px]">
        <div className="card white-bg-color shadow-md relative rounded-lg w-[150px] lg:w-[200px]">
          <div
            className="borderLeft absolute w-[50%] "
            style={{ border: `1px solid ${org.color}` }}
          ></div>
          {renderAvatar(org)}
          <div className="content">
            <div className="font-semibold text-base mt-[-12px] capitalize">
              {org.tradingName}
            </div>
            <span className=" text-sm font-normal capitalize">
              {org.title}
            </span>
            {hideFooterButton && (
              <div onClick={() => {
                setIconChagne(!iconChagne), onCollapse();
              }} className="flex white-bg-color left-[33.33%] translate-x-[0%] bottom-[-10px] items-center justify-center absolute card-footer rounded-full shadow-md px-3 py-1">
                <StructureCompanyAdminProfile2user />
                <span className="font-medium text-sm mx-2 mt-0.5">
                  {`${_.size(
                    org.organizationChildRelationship
                  )}`}
                </span>
                <StructureCompanyAdminDownward
                  className="cursor-pointer"
                  style={{
                    transform: `rotate(${iconChagne && collapsed ? '0deg' : '180deg'})`
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default Organization;