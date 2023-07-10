import { useState } from "react";
import { Button, Divider, Modal } from "antd";
import upload from "../../../../../assets/images/profile/student/Upload.svg";
import { documentArr } from "./DocumentMock";
import { CloseCircleFilled, EyeFilled } from "@ant-design/icons";
import DragAndDropUpload from "../../../../../components/DragAndDrop";
import CardUsers from "../cards/userCards";
import { UploadIcon } from "../../../../../assets/images";
import "../../../style.scss";

const Documents = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="document-tabs">
      <div className='flex justify-end md:justify-center"'>
        <Button
          className="upload-button flex items-center justify-between teriary-bg-color white-color"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={upload} alt="upload-btn" /> Upload
        </Button>
      </div>

      {documentArr.map((item, index) => {
        return (
          <div key={index}>
            <CardUsers
              img={item.img}
              title={item.name}
              description={item.subName}
              date={item.date}
              fSize={item.fileSize}
              downloadIcon={
                <UploadIcon style={{ width: "26px", color: "gray" }} />
              }
              sideIcon={
                <EyeFilled style={{ fontSize: "26px", color: "gray" }} />
              }
            />

            <Divider />
          </div>
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
            className="border-1 border-[#4A9D77] teriary-color font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
          >
            Submit
          </Button>,
        ]}
        title="Upload Document">
        <DragAndDropUpload />
      </Modal>
    </div>
  );
};
export default Documents;
