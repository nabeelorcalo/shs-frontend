import React, { useState } from "react";
import { Modal, Button, Upload, message } from "antd";
import "./LogoUploader.scss";
import { DragAndDropUpload } from "../../../../../components";

function LogoUploader({ imageUrl, setImageUrl }: any) {
  return (
    <div>
      <div>
        <DragAndDropUpload />
      </div>
    </div>
  );
}

export default LogoUploader;
