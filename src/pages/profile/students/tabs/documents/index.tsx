import React, { useState } from "react";
import { Button, Divider, Modal, Typography } from "antd";
import upload from "../../../../../assets/images/profile/student/Upload.svg";
import download from "../../../../../assets/images/profile/student/Upload.svg";
import '../../../style.scss';
import { documentArr } from "./DocumentMock";
import { CloseCircleFilled, EyeFilled } from "@ant-design/icons";
import DragAndDropUpload from "../../../../../components/DragAndDrop";

const Documents = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="document-tabs">
      <div className='flex justify-end md:justify-center"'>
        <Button
          className="upload-button flex items-center justify-between"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={upload} alt="" /> Upload
        </Button>
      </div>

      {documentArr.map((item, index) => {
        return (
          <>
            <div className="animate">
              <div className="flex justify-between">
                <div className="flex justify-start">
                  <img src={item.img} alt="" />
                  <div>
                    <Typography>{item.name}</Typography>
                    <Typography>{item.subName}</Typography>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="grid justify-end">
                    <Typography>{item.date}</Typography>
                    <Typography>{item.fileSize}</Typography>
                  </div>

                  <div className="button-ts">
                    <div
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "8px",
                        height: "48px",
                        width: "48px",
                      }}
                    >
                      <EyeFilled
                        style={{ fontSize: "22px", color: "#A0A3BD" }}
                        className="flex justify-center mt-4"
                      />
                    </div>
                    <div
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "8px",
                        height: "48px",
                        width: "48px",
                      }}
                    >
                      <img
                        src={download}
                        alt=""
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                          paddingTop: "15px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Divider />
          </>
        );
      })}
      <Modal
        open={isOpen}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            key="Cancel"
            style={{
              border: "1px solid #4a9d77",
              color: "#4a9d77",
              padding: "0px 20px",
            }}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            style={{
              backgroundColor: "#4a9d77",
              border: "1px solid #4a9d77",
              color: "#fff",
              padding: "0px 20px",
            }}
          >
            Submit
          </Button>,
        ]}
        title="Upload Document"
      >
        <DragAndDropUpload />
      </Modal>
    </div>
  );
};

export default Documents;
