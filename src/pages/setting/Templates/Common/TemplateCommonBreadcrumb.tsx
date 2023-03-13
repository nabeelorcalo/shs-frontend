import React from "react";
import { SettingHorizontalLine } from "../../../../assets/images";
import { Typography, Divider } from "antd";
const { Title, Text } = Typography;

interface ITEMPLATEBREADCRUMB {
  current: string;
}

const TemplateCommonBreadcrumb = ({ current }: ITEMPLATEBREADCRUMB) => {
  return (
    <div>
      <div className="flex mt-3">
        <Title level={3}>{current}</Title>
        <span className="mx-2">
          <SettingHorizontalLine />
        </span>
        <Title className="mt-0.5" level={4}>
          Setting /Template
        </Title>
      </div>
    </div>
  );
};

export default TemplateCommonBreadcrumb;
