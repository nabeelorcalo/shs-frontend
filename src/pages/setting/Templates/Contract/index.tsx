import React, { useState } from "react";
import { Typography, Divider } from "antd";
import { SearchBar } from "../../../SearchBar/SearchBar";

import {
  DepartmentAddIcon,
  SettingHorizontalLine,
} from "../../../../assets/images";
import { Button } from "../../../Button";
import TemplatesCommonCard from "../Common/TemplatesCommonCard";
import { Alert } from "../../../Alert";
import TemplateCommonBreadcrumb from "../Common/TemplateCommonBreadcrumb";
const { Title, Text } = Typography;

let overview = [
  {
    name: "Contract 01",
    content: "Exciting News: Your job Offer and Contract Inside",
  },
  {
    name: "Contract 02",
    content: "Take the First Step Today!",
  },
  {
    name: "Contract 03",
    content: "Congratulations! You are selected.",
  },
];

const TemplatesContract = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleChange = () => {};
  return (
    <div className="template-contract">
      <div>
        <TemplateCommonBreadcrumb current="Contact" />
        <Divider className="my-1 mb-1" />
        <div className="flex justify-between">
          <SearchBar size="large" handleChange={handleChange} />

          <Button
            color="#4a9d77"
            icon={<DepartmentAddIcon className="mx-2" />}
            label="New Template"
            type="primary"
            size="middle"
          />

          {/* <Button type="primary" icon={<span><DepartmentAddIcon className="mx-2" /></span>} size="small">
        <span className="">  Add department</span> </Button> */}
        </div>
      </div>
      <TemplatesCommonCard
        overview={overview}
        setShowDeleteModal={setShowDeleteModal}
        showDeleteModal={showDeleteModal}
      />
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={showDeleteModal}
        setState={setShowDeleteModal}
        type="error"
        width={500}
      >
        <p>Are you sure you want to delete this item?</p>
      </Alert>
    </div>
  );
};

export default TemplatesContract;
