import React, { useState } from "react";
import {
  Button,
  Col,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Typography,
} from "antd";
import tick from "../../../../../assets/images/profile/student/Tick.svg";
import cross from "../../../../../assets/images/profile/student/close-circle.svg";
import "../../../style.scss";
import { CloseCircleFilled } from "@ant-design/icons";
import "../../../style.scss";
import { profileInfo } from "./studentRightToWorkMock";
import ImmigrationStatusForm from "./ImmigrationStatusForm";

const ImmigrationStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <>
      <Typography className="title">Right To Work</Typography>
      <div className="flex gap-x-4">
        <img src={profileInfo.profile} alt="" />
        <div className="">
          <Typography className="title text-secondary-color  text-lg font-semibold">
            Maria Sanoid{" "}
          </Typography>
          <Typography className=" text-sm text-teriary-color ">
            They have permission to work in the UK from 18 January 2022. They
            can work in the UK until 18 January 2024.
          </Typography>
        </div>
      </div>
      <Typography className="title text-secondary-color  text-lg font-semibold">
        Details
      </Typography>
      <Typography className=" text-sm text-teriary-color ">
        They have permission to work in the UK from 18 January 2022. They can
        work in the UK until 18 January 2024.
      </Typography>

      <Typography className="title text-secondary-color  text-lg font-semibold">
        Conditions
      </Typography>
      <Typography className=" text-sm text-teriary-color ">
        They cannot work as a professional sportsperson or coach. This condition{" "}
        <br />
        is a standard requirement for their visa.
      </Typography>
      <div className="flex gap-8">
        <div>
          <Typography className="title text-secondary-color  text-lg font-semibold">
            Company Name
          </Typography>
          <Typography className=" text-sm text-teriary-color ">
            Orcalo Holdings.
          </Typography>
        </div>

        <div>
          <Typography className="title text-secondary-color  text-lg font-semibold">
            Date of Check
          </Typography>
          <Typography className=" text-sm text-teriary-color ">
            19 Jan 2023.
          </Typography>
        </div>

        <div>
          <Typography className="title text-secondary-color  text-lg font-semibold">
            Reference Number
          </Typography>
          <Typography className=" text-sm text-teriary-color ">
            WETRWERWERW
          </Typography>
        </div>
      </div>
    </>
  );

  return (
    <div className="immigration-status">
      <div>
        <Typography className="title">
          Check a Job applicant’s right to work
        </Typography>
      </div>

      <Row gutter={20}>
        <Col xxl={6} xl={6} lg={6} md={8} sm={12} xs={24}>
          <div className="status-card">
            <center onClick={showModal}>
              <div>
                <img src={tick} alt="" />
              </div>
              <Typography>Have share code!</Typography>
            </center>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={8} sm={12} xs={24}>
          <div className="status-card">
            <center
              onClick={() => {
                setIsOpen1(true);
              }}
            >
              <img src={cross} alt="" />
              <Typography>Have share code!</Typography>
            </center>
          </div>
        </Col>
      </Row>

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
        title="What is the share code?"
        width={720}
      >
        <ImmigrationStatusForm />
      </Modal>

      <Modal
        open={isOpen1}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] text-[#4A9D77] font-semibold">
                Cancel
              </Button>
              <Button
                className="bg-[#4a9d77] text-white border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </div>,
        ]}
        title="Tell us about Immigration Status"
        width={720}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>I have a Uk Visa and immigration account</Radio>
            <Radio value={2}>I have a status uner Eu settelment schem</Radio>
            <Radio value={3}>I have biometric residence card or permit</Radio>
            <Radio value={4}>
              More...
              {value === 4 ? (
                <Input style={{ width: 100, marginLeft: 10 }} />
              ) : null}
            </Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default ImmigrationStatus;
