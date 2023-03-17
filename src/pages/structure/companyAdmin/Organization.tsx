import React, { useState } from "react";
import _ from "lodash";
import { Avatar, Button } from "antd";
import { UpOutlined } from "@ant-design/icons/lib/icons";
import "./style.scss";
import organization from "./org.json";

import {
  StructureCompanyAdminAvater,
  StructureCompanyAdminDownward,
  StructureCompanyAdminProfile2user,
} from "../../../assets/images";

function Organization ({ org, onCollapse, collapsed }: any) {
  const [iconChagne, setIconChagne] = useState<boolean>(true);

  const [hideFooterButton, setHideFooterButton] = useState<any>(
    `${_.size(org.organizationChildRelationship)}` > "0"
  );
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div className="w-[200px] mx-auto lg:w-[100%]">
      <div className="struture-card center flex justify-center mt-5 h-[100px]">
        <div className="card white-bg-color shadow-sm relative rounded-lg w-[150px] lg:w-[200px]">
          <div
            className="borderLeft absolute w-[80px] lg:w-[115px] "
            style={{ border: `1px solid ${org.color}` }}
          ></div>
          <div className="avater-content absolute left-[30%] lg:left-[35%] ">
            <Avatar
              className=""
              size={48}
              icon={<StructureCompanyAdminAvater />}
            />
          </div>
          <div className="content pt-3 ">
            <div className="pt-5 font-semibold text-base">
              {org.tradingName}
            </div>
            <span className="my-5 text-sm font-normal">
                {org.title}
                </span>
            {hideFooterButton && (
              <div className="lg:w-[100px] lg:h-[30px] flex white-bg-color justify-center absolute card-footer rounded-full">
                <span className="pt-1 ">
                  <StructureCompanyAdminProfile2user />
                </span>
                <span className="font-medium text-sm mx-2 mt-0.5">
                    {`${_.size(
                  org.organizationChildRelationship
                )}`}
                </span>
                <span
                  onClick={() => {
                    setIconChagne(!iconChagne), onCollapse();
                  }}
                  className="cursor-pointer"
                >
                  {iconChagne ? (
                    <StructureCompanyAdminDownward />
                  ) : (
                    <UpOutlined style={{ fontSize: "10px" }} />
                  )}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organization;