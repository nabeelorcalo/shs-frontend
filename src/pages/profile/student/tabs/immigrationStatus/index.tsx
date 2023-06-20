import React, { useEffect, useState } from "react";
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
  Form,
} from "antd";
// import tick from "../../../../../assets/images/profile/student/Tick.svg";
// import cross from "../../../../../assets/images/profile/student/close-circle.svg";
import "../../../style.scss";
import { CloseCircleFilled } from "@ant-design/icons";
import "../../../style.scss";
import { profileInfo } from "./studentRightToWorkMock";
import ImmigrationStatusForm from "./ImmigrationStatusForm";
import { Cross, Printer, Tick } from "../../../../../assets/images";
import { CommonDatePicker } from "../../../../../components";
import useCustomHook from "../../../actionHandler";
import { useRecoilState } from "recoil";
import { getImmigrationState } from "../../../../../store";

const ImmigrationStatus = () => {
  const action = useCustomHook();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [show, setShow] = useState(false);
  const [hide, setHide] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [btnText, setBtnText] = useState("View Share Code");
  const [value, setValue] = useState<any>(false);
  const [ukVisa, setUkVisa] = useState<any>(false);
  const [euSettlement, setEuSettlement] = useState<any>('');
  const [bioResidence, setBioResidence] = useState<any>("");
  const [openModal, setOpenModal] = useState(true);
  const [open, setOpen] = useState(false);
  const immigrationStatus = useRecoilState<any>(getImmigrationState);
 
  const showModal = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    action.getImmigrationStatus();
  },[])

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e);
    setValue(e.target.value);
  };

  const onFinish = (values: any) => {
    console.log(values,'<<<<<<')
    const {
      shareCode,
      ukPassport,
      ukPassportNumber,
      ukNIC,
      ukBiometricResidenceCard,
      euPassport,
      euPassportNumber,
      euNIC,
      euBiometricResidenceCard,
      biometricResidenceCard
    } = values;
    action.immigrationStatus({
      shareCode: false,
      ukPassport: ukVisa&&ukVisa==='ukPassport'?true:false,
      ukPassportNumber: ukPassportNumber,
      ukNIC: ukNIC,
      ukBiometricResidenceCard: ukBiometricResidenceCard,
      euPassport: euSettlement&&euSettlement==='eu-passport'?true:false,
      euPassportNumber: euPassportNumber,
      euNIC: euNIC,
      euBiometricResidenceCard: euBiometricResidenceCard,
      biometricResidenceCard: biometricResidenceCard
    });
    setOpenModal(false);
  };

  return (
    <div className="immigration-status">
      {show === true ? (
        <>
          {hide === true ? (
            <>
              <Typography className=" job-title">
                Details to give your employer
              </Typography>
              <div>
                <Typography className="pb-2 font-semibold text-[18px] text-secondary-color">
                  Share Code
                </Typography>
                <div className="code-box">
                  <Typography className="text-center font-medium text-[38px] pt-3">
                    WBC 86A 2DW
                  </Typography>
                </div>
                <Typography className="font-normal text-xs secondary-color pt-3 pl-2">
                  This code is valid until 18 April 2023.
                </Typography>
              </div>
              <div className="what-next pl-3">
                <Typography className="font-semibold text-base text-secondary-color  pt-2">
                  What to do next
                </Typography>
                <div className="pl-5">
                  <ol className="font-medium text-sm text-teriary-color">
                    <li className="pt-3 pb-3">
                      Give the share code and your date of birth to the person
                      you want to prove your right
                      <br />
                      to work to
                    </li>
                    <li className="pt-3 pb-3">
                      To see your right to work, they must enter the share code
                      and your date of birth at
                      <br />
                      www.gov.uk/view-right-to-work
                    </li>
                    <li className="pt-3 pb-3">
                      Contact them to make sure they have all the information
                      they need
                    </li>
                  </ol>
                </div>
              </div>
            </>
          ) : (
            <>
              <Typography className=" job-title">Right To Work</Typography>
              <div className="flex gap-x-4 pb-4">
                <img src={profileInfo.profile} alt="" />
                <div className="pt-7">
                  <Typography className="text-secondary-color text-lg font-semibold">
                    Maria Sanoid
                  </Typography>
                  <Typography className=" text-sm text-teriary-color ">
                    They have permission to work in the UK from 18 January 2022.
                    They can work in the UK until 18 January 2024.
                  </Typography>
                </div>
              </div>
              <Typography className="title text-secondary-color  text-lg font-semibold pb-3">
                Details
              </Typography>
              <Typography className=" text-sm text-teriary-color pb-3">
                They have permission to work in the UK from 18 January 2022.
                They can work in the UK until 18 January 2024.
              </Typography>
              <Typography className="title text-secondary-color text-lg font-semibold pb-3">
                Conditions
              </Typography>
              <Typography className=" text-sm text-teriary-color pb-3">
                They cannot work as a professional sportsperson or coach. This
                condition
                <br />
                is a standard requirement for their visa.
              </Typography>
              <div className="flex gap-8">
                <div>
                  <Typography className="title text-secondary-color  text-lg font-semibold pb-3">
                    Company Name
                  </Typography>
                  <Typography className="text-sm text-teriary-color ">
                    Orcalo Holdings.
                  </Typography>
                </div>
                <div>
                  <Typography className="title text-secondary-color  text-lg font-semibold pb-3">
                    Date of Check
                  </Typography>
                  <Typography className=" text-sm text-teriary-color ">
                    19 Jan 2023.
                  </Typography>
                </div>
                <div>
                  <Typography className="title text-secondary-color  text-lg font-semibold pb-3">
                    Reference Number
                  </Typography>
                  <Typography className=" text-sm text-teriary-color ">
                    WETRWERWERW
                  </Typography>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-end  gap-5 pt-[15rem]">
            <Button className="border-none teriary-color flex gap-x-2">
              <Printer /> Print
            </Button>
            {hide && (
              <Button
                onClick={() => {
                  setHide(false);
                  setBtnText("View Share Code");
                }}
                className="teriary-color border-1 border-solid border-[#4a9d77]"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => {
                setBtnText("Send code by email");
                setHide(true);
                btnText === "Send code by email" && setIsOpen2(true);
              }}
              className="teriary-bg-color white-color pt-0 pb-0 pr-[20px] pl-[20px]"
            >
              {btnText}
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="pt-4 pb-10">
            <Typography className=" job-title">
              Check a Job applicant’s right to work
            </Typography>
          </div>
          <Row gutter={20}>
            <Col xxl={6} xl={6} lg={6} md={8} sm={12} xs={24}>
              <div className="status-card">
                <center onClick={showModal}>
                  <div>
                    <Tick />
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
                  <Cross />
                  <Typography>Don't have share code!</Typography>
                </center>
              </div>
            </Col>
          </Row>
        </>
      )}
      <Modal
        open={btnText === "Send code by email" && isOpen2}
        centered
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            key="Cancel"
            className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-[20px] pl-[20px]"
            onClick={() => setIsOpen2(false)}
          >
            Cancel
          </Button>,
          <Button
            onClick={() => {
              setIsOpen2(false);
              setShow(true);
            }}
            key="submit"
            className="teriary-bg-color white-color pt-0 pb-0 pr-[20px] pl-[20px]"
          >
            Continue
          </Button>,
        ]}
        title="Enter employer's email address"
        width={720}
      >
        <div>
          <Typography className="text-semibold font-normal text-teriary-color pb-2">
            Employer's email address
          </Typography>
        </div>
        <Input
          placeholder="Enter employer's email address"
          className="text-input-bg-color"
        />
      </Modal>
      <Modal
        open={isOpen}
        centered
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <Button
            key="Cancel"
            className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-[20px] pl-[20px]"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>,
          <Button
            onClick={() => {
              setIsOpen(false);
              setShow(true);
            }}
            key="submit"
            className="teriary-bg-color white-color pt-0 pb-0 pr-[20px] pl-[20px]"
          >
            Continue
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
          <CloseCircleFilled
            style={{ color: "#A3AED0", fontSize: "20px" }}
            onClick={() => setIsOpen1(false)}
          />
        }
        footer={null}
        title="Tell us about Immigration Status"
        width={720}
      >
        <Form layout="vertical" onFinish={onFinish}>
            <div>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={"uk-visa-true"}>
                    I have a Uk Visa and immigration account
                  </Radio>
                  {value === "uk-visa-true" && (
                    <Radio.Group
                      onChange={(e) => setUkVisa(e.target.value)}
                      value={ukVisa}
                    >
                    <div className="pl-[60px] grid justify-content-between">
                        <Radio name="ukPassport" value={"ukPassport"}>
                          Passport
                        </Radio>
                        {ukVisa === 'ukPassport' && (
                          <Form.Item
                            label="What is your passport number?"
                            name="ukPassportNumber"
                          >
                            <Input />
                          </Form.Item>
                        )}
                        <Radio
                          name="ukNationardCard"
                          value={"uk-national-card"}
                        >
                          National identity card
                        </Radio>
                        {ukVisa === 'uk-national-card' && (
                          <Form.Item
                            label="What is your national identity card number?"
                            name="ukNIC"
                          >
                            <Input />
                          </Form.Item>
                        )}
                        <Radio name="passportBiometric" value={"residence"}>
                          Biometric residence card or permit
                        </Radio>

                        {ukVisa === "residence" && (
                          <Form.Item
                            label="Biometric residence card or permit number"
                            name="ukBiometricResidenceCard"
                          >
                            <Input />
                          </Form.Item>
                        )}
                      </div>
                    </Radio.Group>
                  )}
                  <Radio name="euSettelment" value={"eu-true"}>
                    I have a status uner Eu settelment schem
                  </Radio>
                  {value === "eu-true" && (
                    <Radio.Group
                      onChange={(e) => setEuSettlement(e.target.value)}
                      value={euSettlement}
                    >
                      <div className="pl-[60px] grid justify-content-between">
                        <Radio value={'eu-passport'}>Passport</Radio>
                        {euSettlement === 'eu-passport' && (
                          <Form.Item
                            label="What is your passport number?"
                            name="euPassportNumber"
                          >
                            <Input />
                          </Form.Item>
                        )}
                        <Radio value={'eu-national-id'}>National identity card</Radio>
                        {euSettlement === 'eu-national-id' && (
                          <Form.Item
                            label="What is your national identity card number?"
                            name="euNIC"
                          >
                            <Input />
                          </Form.Item>
                        )}
                        <Radio value={'eu-residence'}>
                          Biometric residence card or permit
                        </Radio>

                        {euSettlement === 'eu-residence' && (
                          <Form.Item
                            label="Biometric residence card or permit number"
                            name="euBiometricResidenceCard"
                          >
                            <Input />
                          </Form.Item>
                        )}
                      </div>
                    </Radio.Group>
                  )}
                  <Radio value={"permit-true"}>
                    I have biometric residence card or permit
                  </Radio>
                  {value == "permit-true" && (
                    <Form.Item
                      label="Biometric residence card or permit number"
                      name="biometricResidenceCard"
                    >
                      <Input />
                    </Form.Item>
                  )}
                </Space>
              </Radio.Group>
            </div>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button
                onClick={() => {
                  setIsOpen1(false);
                }}
                className="border-1 border-[#4A9D77] teriary-color font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setIsOpen1(false);
                  setShow(true);
                }}
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Contniue
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ImmigrationStatus;
