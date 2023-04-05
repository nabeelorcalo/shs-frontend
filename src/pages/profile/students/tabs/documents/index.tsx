import React, { useState } from "react";
import { Button, Divider, Modal, Typography } from "antd";
import upload from "../../../../../assets/images/profile/student/upload.svg";
import '../../../style.scss';
import { documentArr } from "./DocumentMock";
import { CloseCircleFilled, EyeFilled } from "@ant-design/icons";
import DragAndDropUpload from "../../../../../components/DragAndDrop";
import CardUsers from "../cards/userCards";
import { UploadIcon } from "../../../../../assets/images";


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
            
            <CardUsers
              img={item.img}
              title={item.name}
              description={item.subName}
              date={item.date}
              fSize={item.fileSize}
              downloadIcon={<UploadIcon style={{ width: "26px", color: "gray" }} />}
              sideIcon={<EyeFilled style={{ fontSize: "26px", color: "gray" }} />}
            />
         
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
