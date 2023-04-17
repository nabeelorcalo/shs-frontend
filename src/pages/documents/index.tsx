import { useState } from "react";
import "./style.scss";
import { Divider } from "antd";
import InternDocumentHeader from "./internDocument/internDocumentHeader";

const Documents = () => {
  return (
    <>
      <p className="font-medium text-3xl primary-color ">Documents</p>
      <Divider />
      <InternDocumentHeader />
    </>
  );
};

export default Documents;
