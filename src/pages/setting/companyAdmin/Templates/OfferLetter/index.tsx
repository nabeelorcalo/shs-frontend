import React, { useState } from "react";
import { Divider, Button } from "antd";
import {
  NewTemplate,
} from "../../../../../assets/images";

import { Alert, Breadcrumb, SearchBar } from "../../../../../components";
import { NavLink } from "react-router-dom";
import TemplatesCommonCard from "../../../../../components/Setting/Common/TemplatesCommonCard";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";

const TemplatesOfferLater = () => {
  
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
  const breadcrumbArray = [
    { name: "Offer Letter"},
    { name: "Setting"  },
    { name: "Template" , onClickNavigateTo:"/settings/template" },
  ];
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  
const handleChange = () => { };
  return (
    <div>
      <div>
      <Breadcrumb breadCrumbData={breadcrumbArray} />
        <Divider/>
        <div className="flex justify-between">
          <SearchBar size="middle" handleChange={handleChange} />
          <NavLink to={ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE}>
            <Button
              size="middle"
              onClick={() => { }}
              className="flex gap-2 setting-add-button white-color teriary-bg-color"
            >
              <NewTemplate /> New Template
            </Button>
          </NavLink>
        </div>
      </div>
      <TemplatesCommonCard
        link={ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE}
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

export default TemplatesOfferLater;
