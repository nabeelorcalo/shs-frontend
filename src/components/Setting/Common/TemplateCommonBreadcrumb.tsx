import React from "react";

import { Typography, Divider } from "antd";
import { NavLink } from "react-router-dom";
import { SettingHorizontalLine } from "../../../assets/images";
const { Title, Text } = Typography;

interface ITEMPLATEBREADCRUMB {
  current: string;
}

const TemplateCommonBreadcrumb = ({ current }: ITEMPLATEBREADCRUMB) => {
  return (
    <div>
      <div className="flex mt-3 items-center ">
        <Title level={3} className="mt-3">
          {current}
        </Title>
        <span className="mx-2">
          <SettingHorizontalLine />
        </span>

        <span className=" text-base font-medium text-secondary-color">
          Setting
        </span>

        <span className="mx-2 mt-1">/</span>
        <NavLink to="/settings/template">
          <span className="mt-1 text-base font-medium text-secondary-color">
            Template
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default TemplateCommonBreadcrumb;
