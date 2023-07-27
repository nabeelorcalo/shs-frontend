import { useEffect, useState } from "react";
import { Button, Divider, Modal, Form, Select, Space } from "antd";
import { CloseCircleFilled, EyeFilled } from "@ant-design/icons";
import CardUsers from "../cards/userCards";
import { DownloadIconLeave } from "../../../../../assets/images";
import documentCard from '../../../../../assets/images/profile/student/Document Card.svg';
import errorIcon from '../../../../../assets/images/profile/student/StatusIcon.svg';
import "../../../style.scss";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, getStudentDocumentSate } from "../../../../../store";
import useCustomHook from "../../../actionHandler";
import dayjs from "dayjs";
import constants from "../../../../../config/constants";
import UploadDocument from "../../../../../components/UploadDocument";
import upload from "../../../../../assets/images/profile/student/Upload.svg";

const Documents = () => {
  const [files, setFiles] = useState<any>([])
  const action = useCustomHook();
  const [isOpen, setIsOpen] = useState(false);
  const documentInformation = useRecoilState<any>(getStudentDocumentSate);
  const { id } = useRecoilValue(currentUserState);

  const openPDF = (url: any) => {
    window.open(`${constants.MEDIA_URL}+ ${url}`, '_blank');
  };

  const downloadDocument = (url: any) => {
    const link = document.createElement('a');
    link.href = `${constants.MEDIA_URL}+ ${url}`;
    link.download = 'document.pdf';
    link.click();
  };

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {

    const formData = new FormData();
    const { name, media } = values;
    formData.append('name', name)
    formData.append('media', files['files'][0])
    console.log(files['files'][0],'files')
    action.addInternDocument(formData)
    setIsOpen(false)
  }

  useEffect(() => {
    action.getInternDocument({ studentId: id, docType: 'INTERN' })
  }, [])

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
                  <DownloadIconLeave
                    onClick={() => { downloadDocument(item?.url) }}
                    className="text-2xl gray-color"
                  />
                </div>
              }
              sideIcon={
                <div className="border-1 p-3 white-bg-color rounded-xl">
                  <EyeFilled
                    onClick={() => { openPDF(item?.url) }}
                    className="text-2xl gray-color" />
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
        <Form
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item
            label='Document Name'
            name='name'
          >
            <Select
              placeholder='Select'
              onChange={handleChange}
              options={[
                { value: 'DBS', label: 'Dbs' },
                { value: 'UNIVERSITY_APPROVAL', label: 'University Approval' },
                { value: 'CV', label: 'Cv' },
                { value: 'PASSPORT', label: 'Passport' },
                { value: 'PROOF_OF_ADDRESS', label: 'Proof of Address' },
              ]}
            />
          </Form.Item>
          <Form.Item
            label='Media'
            name='media'
          >
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
              </Button>,
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
    </div>
  );
};
export default Documents;
