import React, { useState } from "react";
import {  Divider, Button } from "antd";
import { NewTemplate } from "../../../../assets/images";

import { Alert, SearchBar } from "../../../../components";
import { NavLink } from "react-router-dom";
import TemplateCommonBreadcrumb from "../../../../components/Setting/Common/TemplateCommonBreadcrumb";
import TemplatesCommonCard from "../../../../components/Setting/Common/TemplatesCommonCard";

let overview = [
  {
    name: "Rejection Letter 01",
    content: "Join Our Team ",
  },
  {
    name: "Rejection Letter 02",
    content: "Be a Part of Our Team",
  },
  {
    name: "Rejection Letter 03",
    content: "Join Our World",
  },
];

const handleChange = () => {};
const TemplatesRejectionLetter = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  return (
    <div className="template-contract">
      <div>
        <TemplateCommonBreadcrumb current="Rejection Letter" />
        <Divider className="my-1 mb-3" />
        <div className="flex justify-between">
          <SearchBar size="middle" handleChange={handleChange} />
          <NavLink to="/settings/template/rejection-letter/new-template">
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
       link="/settings/template/rejection-letter/new-template"
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
        <p>Are you sure you want to delete this location?</p>
      </Alert>
    </div>
  );
};

export default TemplatesRejectionLetter;
