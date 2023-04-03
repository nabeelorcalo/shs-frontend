import React, { useState } from "react";
import { Divider, Button } from "antd";
import { NewTemplate } from "../../../../../assets/images";
import { Alert, Breadcrumb, SearchBar } from "../../../../../components";
import { NavLink } from "react-router-dom";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";

const TemplatesContract = () => {
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
  
  const breadcrumbArray = [
    { name: "Contract"},
    { name: "Setting"  },
    { name: "Template" , onClickNavigateTo:"/settings/template" },
  ];
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleChange = () => { };
  return (
    <div className="template-contract">
      <div>
      <Breadcrumb breadCrumbData={breadcrumbArray} className="breadcrumb" />

        <Divider className="my-1 mb-3" />
        <div className="flex justify-between">
          <SearchBar size="middle" handleChange={handleChange} />
          <NavLink to={ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}>
            <Button
              size="middle"
              onClick={() => { }}
              className="flex gap-2 setting-add-button white-color teriary-bg-color"
            >
              <NewTemplate /> New Template
            </Button>
          </NavLink>
        </div>
        <TemplatesCommonCard
          link={ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}
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
    </div>
  );
};

export default TemplatesContract;
