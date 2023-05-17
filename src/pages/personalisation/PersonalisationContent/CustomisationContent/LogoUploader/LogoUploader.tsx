import React, { useState } from "react";
import { Modal, Button, Upload, message } from "antd";
import {
  PlusOutlined,
  DeleteFilled,
  EditFilled,
} from "@ant-design/icons";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import "./LogoUploader.scss";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

function LogoUploader({ imageUrl, setImageUrl }: any) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    } else {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        setIsHovering(false);
      });
    }
  };
  const handleDeleteClick = () => {
    setImageFile(null);
    setImageUrl("");
  };

  const handleEditClick = () => {
    setIsHovering(false);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleUploadClick = () => {
    // ...upload image logic
    setIsEditing(false);
    setModalVisible(false);
    message.success("Image uploaded successfully!");
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  console.log("imageUrl", imageUrl);
  return (
    <div>
      <h4 className="font-medium text-xl mb-4 m-4">Company Logo</h4>

      <div
        style={{ display: "inline-block", width: "100%" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {imageUrl ? (
          <div className="h-36 relative">
            <img
              src={imageUrl}
              alt="avatar"
              className="max-w-max max-h-[-webkit-fill-available] relative"
              style={{ width: "100%" }}
            />
            {isHovering && (
              <div className="onHoverStyling absolute">
                <DeleteFilled
                  className="text-2xl white-color"
                  onClick={handleDeleteClick}
                />
                <EditFilled
                  className="text-2xl white-color"
                  onClick={handleEditClick}
                />
              </div>
            )}
          </div>
        ) : (
          <Upload
            name="logo"
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
            className=".ant-upload.ant-upload-select"
          >
            {uploadButton}
          </Upload>
        )}
        {isEditing && (
          <Modal
            open={modalVisible}
            onCancel={handleModalCancel}
            footer=
            {[
              <Button key="cancel" onClick={handleModalCancel}>
                Cancel
              </Button>,
              <Button key="upload" type="primary" onClick={handleUploadClick}>
                Upload
              </Button>,
            ]}
          >
            <Upload
              name="logo"
              listType="picture-card"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ?
                (
                  <img
                    src={imageUrl}
                    className="max-w-max max-h-[-webkit-fill-available]"
                    alt="uploaded image"
                  />
                )
                :
                (
                  uploadButton
                )
              }
            </Upload>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default LogoUploader;
