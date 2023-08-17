import React, { useState } from "react";
import { Modal, Button, Upload, message } from "antd";
import "./LogoUploader.scss";
import { DragAndDropUpload } from "../../../../../components";

function LogoUploader({ imageUrl, setImageUrl }: any) {
  const [files, setFiles] = useState('');
  return (
    <div>
      <div>
        <DragAndDropUpload files={files} setFile={setFiles} />
      </div>
    </div>
  );
}

export default LogoUploader;
