import React, { useState } from "react";
import { Button, Divider } from "antd";
import { NewTemplate } from "../../../../../assets/images";
import { NavLink } from "react-router-dom";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { Alert, Breadcrumb, SearchBar } from "../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";

const TemplatesCertificateOfCompletion = () => {
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
  const breadcrumbArray = [
    { name: "Certification of Appreciation"},
    { name: "Setting"  },
    { name: "Template" , onClickNavigateTo:"/settings/template" },
  ];
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleChange = () => { };
  return (
    <div className="template-contract">
      <div>
      <Breadcrumb breadCrumbData={breadcrumbArray} className="breadcrumb" />
        <Divider  />
        <div className="flex justify-between">
          <SearchBar size="middle" handleChange={handleChange} />
          <NavLink to={ROUTES_CONSTANTS.TCC_NEW_TEMPLATE}>
            <Button
              size="middle"
              onClick={() => { }}
              className="flex gap-2 setting-add-button white-color teriary-bg-color"
            >
              <NewTemplate />
              New Template
            </Button>
          </NavLink>
        </div>
      </div>
      <TemplatesCommonCard
        link={ROUTES_CONSTANTS.TCC_NEW_TEMPLATE}
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
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default TemplatesCertificateOfCompletion;
