import { useEffect, useState } from "react";
import { Button, Divider, Modal, Form, Select, Space } from "antd";
import { CloseCircleFilled, EyeFilled } from "@ant-design/icons";
import CardUsers from "../cards/userCards";
import { DownloadIconLeave } from "../../../../../assets/images";
import documentCard from "../../../../../assets/images/profile/student/Document Card.svg";
import errorIcon from "../../../../../assets/images/profile/student/StatusIcon.svg";
import "../../../style.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, getStudentDocumentSate } from "../../../../../store";
import useCustomHook from "../../../actionHandler";
import dayjs from "dayjs";
import constants from "../../../../../config/constants";
import UploadDocument from "../../../../../components/UploadDocument";
import upload from "../../../../../assets/images/profile/student/Upload.svg";
import PdfPreviewModal from "../../../../candidates/PdfPreviewModal";

const Documents = () => {
  const [files, setFiles] = useState<any>([]);
  const action = useCustomHook();
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const documentInformation = useRecoilState<any>(getStudentDocumentSate);
  const [preViewModal, setPreViewModal] = useState<any>({
    extension: "",
    url: "",
  });
  const { id } = useRecoilValue(currentUserState);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    const formData = new FormData();
    const { name, media } = values;
    formData.append("userId", id);
    formData.append("name", name);
    formData.append("media", files["files"][0]);
    console.log(files["files"][0], "files");
    action.addInternDocument(formData);
    setIsOpen(false);
  };

  useEffect(() => {
    action.getInternDocument({ userId: id, docType: "INTERN" });
  }, []);

  return (
    <div className="document-tabs">
      <div className='flex justify-end md:justify-center"'>
        <Button
          className="upload-button flex items-center justify-between teriary-bg-color white-color"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={upload} alt="wallet" /> Upload
        </Button>
      </div>

      {documentInformation[0]?.map((item: any, index: any) => {
        console.log(item, "items");
        return (
          <div key={index}>
            <CardUsers
              img={item?.img ? item?.img : documentCard}
              title={item?.name}
              description={item?.fileName}
              date={dayjs(item?.createdAt).format("DD/MM/YY")}
              fSize={item?.size}
              downloadIcon={
                <div className="border-1 p-3 white-bg-color rounded-xl">
                  <a
                    href={`${constants.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData?.extension}`}
                  >
                    <DownloadIconLeave className="text-2xl gray-color" />
                  </a>
                </div>
              }
              sideIcon={
                <div className="border-1 p-3 white-bg-color rounded-xl">
                  <EyeFilled
                    onClick={() => {
                      setOpen(true);
                      setPreViewModal({
                        extension: item?.file?.metaData?.extension,
                        url: `${constants.MEDIA_URL}/${item?.file?.mediaId}.${item?.file?.metaData?.extension}`,
                      });
                    }}
                    className="text-2xl gray-color"
                  />
                </div>
              }
            />
            <Divider />
          </div>
        );
      })}
      <Modal
        open={isOpen}
        closeIcon={
          <CloseCircleFilled
            className="text-success-placeholder-color text-xl"
            onClick={() => setIsOpen(false)}
          />
        }
        footer={null}
        title="Upload Document"
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Document Name" name="name">
            <Select
              placeholder="Select"
              onChange={handleChange}
              options={[
                { value: "DBS", label: "Dbs" },
                { value: "UNIVERSITY_APPROVAL", label: "University Approval" },
                { value: "CV", label: "Cv" },
                { value: "PASSPORT", label: "Passport" },
                { value: "PROOF_OF_ADDRESS", label: "Proof of Address" },
              ]}
            />
          </Form.Item>
          <Form.Item label="Media" name="media">
            <UploadDocument files={files} setFiles={setFiles} />
          </Form.Item>
          <div className="flex justify-end">
            <Space>
              <Button
                key="Cancel"
                className="border-1 border-[#4A9D77] teriary-color font-semibold"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              ,
              <Button
                htmlType="submit"
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2"
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
      <PdfPreviewModal
        open={open}
        setOpen={setOpen}
        preViewModal={preViewModal}
      />
    </div>
  );
};
export default Documents;
