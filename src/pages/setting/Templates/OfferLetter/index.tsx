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

let overview = [
  {
    name: "Offer Letter 01",
    content: "Join Our Team ",
  },
  {
    name: "Offer Letter 02",
    content: "Be a Part of Our Team",
  },
  {
    name: "Offer Letter 03",
    content: "Join Our World",
  },
];

const handleChange = () => {};

const TemplatesOfferLater = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  return (
    <div>
      <div>
        <TemplateCommonBreadcrumb current="Offer Letter" />

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
        <p>Are you sure you want to delete this item?"</p>
      </Alert>
    </div>
  );
};

export default TemplatesOfferLater;
