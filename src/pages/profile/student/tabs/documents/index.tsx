import { useEffect, useState } from "react";
import { Button, Divider, Modal } from "antd";
import upload from "../../../../../assets/images/profile/student/Upload.svg";
import { documentArr } from "./DocumentMock";
import { CloseCircleFilled, EyeFilled } from "@ant-design/icons";
import DragAndDropUpload from "../../../../../components/DragAndDrop";
import CardUsers from "../cards/userCards";
import { UploadIcon } from "../../../../../assets/images";
import "../../../style.scss";
import { useRecoilState } from "recoil";
import { studentProfileState } from "../../../../../store";
import useCustomHook from "../../../actionHandler";

const Documents = () => {
  const action = useCustomHook();
  const [isOpen, setIsOpen] = useState(false);
  const documentInformation = useRecoilState<any>(studentProfileState);

  console.log(documentInformation,'?><><><><')

  useEffect(() => {
    action.getStudentProfile()
  },[])

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

      {documentInformation?.map((item:any, index:any) => {
        return (
          <div key={index}>
            <CardUsers
              img={item?.documents?.img}
              title={item?.documents?.name}
              description={item?.documents?.subName}
              date={item?.documents?.date}
              fSize={item?.documents?.fileSize}
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
            className="teriary-bg-color  white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
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
