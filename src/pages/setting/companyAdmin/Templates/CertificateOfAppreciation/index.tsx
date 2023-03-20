import React, { useState } from "react";
import { Typography, Divider, Button } from "antd";
import { NewTemplate } from "../../../../../assets/images";
import { Alert, SearchBar } from "../../../../../components";
import { NavLink } from "react-router-dom";
import TemplateCommonBreadcrumb from "../../../../../components/Setting/Common/TemplateCommonBreadcrumb";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
const { Title, Text } = Typography;

let overview = [
  {
    name: "Template 01",
    content: "Exciting News: Your job Offer and Template Inside",
  },
  {
    name: "Template 02",
    content: "Take the First Step Today!",
  },
  {
    name: "Template 03",
    content: "Congratulations! You are selected.",
  },
];

const TemplatesCertificateOfAppreciation = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleChange = () => {};
  return (
    <div className="template-contract">
      <div>
        <TemplateCommonBreadcrumb current="Certificate of Appreciation" />
        <Divider className="my-1 mb-3" />
        <div className="flex justify-between">
          <SearchBar size="middle" handleChange={handleChange} />
          <NavLink to="/settings/template/certificate-of-appreciation/new-template">
            <Button
              size="middle"
              onClick={() => {}}
              className="flex gap-2 setting-add-button white-color teriary-bg-color"
            >
              <NewTemplate /> New Template
            </Button>
          </NavLink>
        </div>
      </div>
      <TemplatesCommonCard
       link="/settings/template/certificate-of-appreciation/new-template"
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
        title=""
      >
        <p>Are you sure you want to delete this item?</p>
      </Alert>
    </div>
  );
};

export default TemplatesCertificateOfAppreciation;