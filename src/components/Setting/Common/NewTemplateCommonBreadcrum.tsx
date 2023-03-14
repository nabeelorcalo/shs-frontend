import React from "react";
import { Typography, Divider } from "antd";
import { NavLink } from "react-router-dom";
import { SettingHorizontalLine } from "../../../assets/images";
const { Title } = Typography;

interface INEwTEMPLATEBREADCRUMB {
  perviousPageName: string;
  perviousPageLink: string;
}

const NewTemplateCommonBreadcrum = (props: INEwTEMPLATEBREADCRUMB) => {
    const {perviousPageName,perviousPageLink} = props
  return (
    <div>
      <div className="flex mt-3 items-center ">
        <Title level={3} className="mt-2">New Template</Title>
        <span className="mx-2">
          <SettingHorizontalLine />
        </span>

       
          <span className=" text-base font-medium text-secondary-color"  >
            Setting
          </span>
        
        <span className="mx-2 mt-1">/</span>
        <NavLink to="/settings/template">
          <span className="mt-1 text-base font-medium text-secondary-color" >
            Template
          </span>
        </NavLink>
        <span className="mx-2 mt-1">/</span>
        <NavLink to={perviousPageLink}>
          <span className="top-3 text-base font-medium text-secondary-color" >
            {perviousPageName}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default NewTemplateCommonBreadcrum;
