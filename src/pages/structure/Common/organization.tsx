import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Avatar } from "antd";
import { UpOutlined } from "@ant-design/icons/lib/icons";
import "../style.scss";
import {
  StructureCompanyAdminAvater,
  StructureCompanyAdminDownward,
  StructureCompanyAdminProfile2user,
} from "../../../assets/images";
import useCustomHook from "../actionHandler";
import constants from "../../../config/constants";
import { useRecoilValue } from "recoil";
import { currentUserRoleState, structureState } from "../../../store";

function Organization({ org, onCollapse, collapsed }: any) {
  console.log(org, "org");

  const [iconChange, setIconChange] = useState<boolean>(true);

  const [hideFooterButton, setHideFooterButton] = useState<any>(
    `${_.size(org.structureData)}` > "0"
  );

  console.log("kfgejjwhgjrhkerfjwgfrfirhij", org.map((item: any) => item));

  const { structureData } = useCustomHook()

  // const renderWthRole: any = {
  //   'COMPANY_ADMIN': structureData,
  //   'COMPANY_MANAGER': "",
  //   'INTERN': "",
  // }

  return (
    <div className="w-[200px] my-4 mx-auto lg:w-[100%]">
      <div className="struture-card center flex justify-center mt-5 h-[100px]">
        <div className="card white-bg-color shadow-sm relative rounded-lg w-[150px] lg:w-[200px]">
          <div
            className="borderLeft absolute w-[80px] lg:w-[115px] "
            style={{ border: `1px solid ${org.color}` }}
          ></div>
          <div className="avater-content absolute left-[35%] lg:left-[39%] ">
            <Avatar
              className=""
              size={48}
              icon={<StructureCompanyAdminAvater />}
            />
          </div>
          <div className="content pt-3 ">
            <div className="pt-5 font-semibold text-base">
              {`${org[0]?.companyAdmin?.firstName} ${org[0]?.companyAdmin?.lastName}`}
            </div>
            <span className="my-5 text-sm font-normal">
              {org[0]?.title}
            </span>
            {hideFooterButton && (
              <div className="w-[100px]  left-[18%] lg:left-[25%] lg:h-[30px] flex white-bg-color justify-center absolute card-footer rounded-full">
                <span>
                  <StructureCompanyAdminProfile2user />
                </span>
                <span className="font-medium text-sm mx-2 mt-0.5">
                  {/* {`${_.size(
                    structureData?.
                  )}`} */}
                </span>
                <span
                  onClick={() => {
                    setIconChange(!iconChange), onCollapse();
                  }}
                  className="cursor-pointer"
                >
                  {iconChange ? (
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