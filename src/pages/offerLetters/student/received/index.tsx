import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import {
  BoxWrapper,
  Breadcrumb,
  PageHeader,
  PopUpModal,
  TextArea,
} from "../../../../components";
import { Row, Col, Button, Steps } from "antd";
import { Encryption, Signeddigital } from "../../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { CheckCircleFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const senderInfo = [
  {
    label: "Full Name",
    title: "David Miller",
  },
  {
    label: "Address",
    title: "London, United Kingdom",
  },
  {
    label: "Hereinafter referred to as",
    title: "Sender",
  },
];
const receiverInfo = [
  {
    label: "Full Name",
    title: "Maria Sanoid",
  },
  {
    label: "Address",
    title: "London, United Kingdom",
  },
  {
    label: "Hereinafter referred to as",
    title: "Receiver",
  },
];

const details = [
  {
    date: "MM/DD/YYYY",
    name: "Candidate First and Last Name",
    address: "Candidate AddressCity, State, Zip",
  },
  {
    candidateName: "Dear [Candidate Name],",
  },
  {
    disc: "We are pleased to offer you the [full-time, part-time, etc.] position of [job title] at [company name] with a start date of [start date]. You will be reporting directly to [manager/supervisor name] at [workplace location]. We believe your skills and experience are an excellent match for our company.",
  },
  {
    disc: "In this role, you will be required to [briefly mention relevant job duties and responsibilities].",
  },
  {
    disc: "The annual starting salary for this position is [dollar amount] to be paid on a [monthly, semi-monthly, weekly, etc.] basis by [direct deposit, check, etc.], starting on [first pay period]. In addition to this starting salary, we’re offering you [discuss stock options, bonuses, commission structures, etc. — if applicable].",
  },
  {
    disc: "Your employment with [Company Name] will be on an at-will basis, which means you and the company are free to terminate the employment relationship at any time for any reason. This letter is not a contract or guarantee of employment for a definitive period of time.",
  },
  {
    disc: "As an employee of [Company Name], you are also eligible for our benefits program, which includes [medical insurance, 401(k), vacation time, etc.], and other benefits which will be described in more detail in the [employee handbook, orientation package, etc.].",
  },
  {
    disc: "Please confirm your acceptance of this offer by signing and returning this letter by [offer expiration date].",
  },
  {
    disc: "We are excited to have you join our team! If you have any questions, please feel free to reach out at any time.",
  },
  {
    signature: "Sincerely,[Your Signature]",
    printedName: "[Your Printed Name]",
    jobTitle: "[Your Job Title]",
  },
];

const ReceivedOfferLetter = () => {
  const navigate = useNavigate()
  const [openSign, setOpenSign] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [dismissModal, setDismissModal] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<any>(null);

  const handleLongPress = () => {
    setIsPressed(true);
    timeoutRef.current = setTimeout(() => {
      console.log("Long pressed");
      alert("button pressed")
      navigate(`/${ROUTES_CONSTANTS.OFFER_LETTER}`)
    }, 2000);

  };

  const handleButtonRelease = () => {
    clearTimeout(timeoutRef.current);
    setIsPressed(false);
  };

  const tempArray = [
    { name: "Power Source" },
    {
      name: " Offer Letter ",
      onClickNavigateTo: `/${ROUTES_CONSTANTS.OFFER_LETTER}`,
    },
  ];

  const steps = [
    { title: 'Read', id: 'step1', icon: <EyeFilled /> },
    { title: 'Edit', id: 'step2', icon: <EditFilled /> },
    { title: 'Signed and stored', id: 'step3', icon: <CheckCircleFilled /> },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const contentRef: any = useRef(null);

  useEffect(() => {
    const handleWheel = (event: any) => {
      const scrollPosition = contentRef.current.scrollTop;
      const stepSections: any = steps.map((step) => document.getElementById(step.id));

      if (event.deltaY > 0) {
        for (let i = 0; i > stepSections.length; i++) {
          if (scrollPosition > stepSections[i].offsetTop - 50) {
            setActiveStep(i);
            break;
          }
        }
      } else {
        // Scrolling up
        for (let i = stepSections.length - 1; i >= 0; i--) {
          if (scrollPosition > stepSections[i].offsetTop - 50) {
            setActiveStep(i);
            break;
          }
        }
      }
    };

    contentRef.current.addEventListener('wheel', handleWheel);
    return () => {
      contentRef?.current?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleStepChange = (current: any) => {
    setActiveStep(current);
    const targetId = steps[current].id;
    const targetElement: any = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="received">
      <PopUpModal
        footer={false}
        width={570}
        title="Alert"
        closable={true}
        open={dismissModal}
        close={() => setDismissModal(false)}
      >
        <p className="pb-4">Why are you rejecting the contract?</p>
        <div className="pb-4">
          <label>Reason</label>
          <TextArea placeholder="Write your reason" rows={5}></TextArea>
        </div>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setDismissModal(false)}
              className="change-mind-red-btn border-1 border-solid border-[#D83A52] w-[100%] text-error-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setDismissModal(false)}
              className="dismiss-agrement-btn w-[100%] text-error-bg-color rounded-[8px] white-color">
              Dismiss Agrrement
            </Button>
          </Col>
        </Row>
      </PopUpModal>

      <PopUpModal
        footer={false}
        width={570}
        title="Warning"
        closable={true}
        open={warningModal}
        close={() => setWarningModal(false)}
      >
        <p className="pb-4">Request contract change</p>
        <div className="pb-4">
          <label>Reason</label>
          <TextArea placeholder="What needs to be changed?" rows={5}></TextArea>
        </div>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setWarningModal(false)}
              className="change-mind-warning-btn border-1 border-solid border-[#4A9D77] w-[100%] teriary-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setWarningModal(false)}
              className="edit-request-btn w-[100%] teriary-bg-color rounded-[8px] white-color">
              Send Edit Request
            </Button>
          </Col>
        </Row>
      </PopUpModal>

      <PopUpModal
        footer={false}
        width={570}
        title="Confirm signing the document"
        closable={true}
        open={openSign}
        close={() => setOpenSign(false)}
      >
        <p className="pb-4">
          Confirm signing the document By signing this document, you agree to
          its terms and understand that it will be legally binding. I have
          changed my mind Long press to sign
        </p>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setOpenSign(false)}
              className="change-mind-warning-btn border-1 border-solid border-[#4A9D77] w-[100%] teriary-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onTouchStart={handleLongPress}
              onTouchEnd={handleButtonRelease}
              onMouseDown={handleLongPress}
              onMouseUp={handleButtonRelease}
              onMouseLeave={handleButtonRelease}
              className="long-press-btn w-[100%] teriary-bg-color rounded-[8px] white-color">
              Long press to sign
            </Button>
          </Col>
        </Row>
      </PopUpModal>
      <div>
        <Breadcrumb breadCrumbData={tempArray} bordered={true} />
      </div>
      <BoxWrapper>
        <Row gutter={[0, 30]}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Steps current={activeStep} onChange={handleStepChange}>
              {steps.map((step) => (
                <Steps.Step key={step.title} title={step.title} icon={step.icon} />
              ))}
            </Steps>
            <div className="pt-4 font-semibold text-xl text-secondary-color">
              Offer Letter
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div ref={contentRef} className="scroll">
              <Row gutter={[0, 30]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div id="step1">
                    <Row gutter={[30, 24]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] p-4">
                          {senderInfo.map((item, index) => {
                            return (
                              <div key={index}>
                                <div className="pb-4">
                                  <p className="text-success-placeholder-color text-base font-normal">
                                    {item.label}
                                  </p>
                                  <p className="text-lg font-normal text-secondary-color">
                                    {item.title}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] p-4">
                          {receiverInfo.map((item, index) => {
                            return (
                              <div key={index}>
                                <div className="pb-4">
                                  <p className="text-success-placeholder-color text-base font-normal">
                                    {item.label}
                                  </p>
                                  <p className="text-lg font-normal">{item.title}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  {details.map((item, index) => {
                    return (
                      <div key={index}>
                        <p className="text-secondary-color text-lg ">{item.date}</p>
                        <p className="text-secondary-color text-lg ">{item.name}</p>
                        <p className=" pb-4 text-secondary-color text-lg ">
                          {item.address}
                        </p>

                        <div>
                          <p className="text-secondary-color text-lg ">
                            {item.candidateName}
                          </p>
                        </div>
                        <div>
                          <p className="text-lg font-normal text-secondary-color">
                            {item.disc}
                          </p>
                        </div>
                        <div>
                          <p className="  pt-4 text-secondary-color text-lg ">
                            {item.signature}
                          </p>
                          <p className="  text-secondary-color text-lg ">
                            {item.printedName}
                          </p>
                          <p className="  text-secondary-color text-lg ">
                            {item.jobTitle}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div id="step2">
                    <Row gutter={[30, 24]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] ">
                          <div className="p-4">
                            {senderInfo.map((item, index) => {
                              return (
                                <div key={index}>
                                  <div className="pb-4">
                                    <p className="text-success-placeholder-color text-base font-normal">
                                      {item.label}
                                    </p>
                                    <p className="text-lg font-normal text-secondary-color">
                                      {item.title}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                            <p className="text-success-placeholder-color text-base font-normal">
                              Email
                            </p>
                            <p className="text-sm md:text-lg font-normal">
                              davidmiller@powersource.co.uk
                            </p>
                          </div>
                          <div className="flex bg-[#9ec5b4] rounded-b-[14px] p-4 items-center">
                            <Signeddigital />
                            <div className="pl-6">
                              <p className="text-lg font-medium teriary-color pb-2">
                                Signed digitally
                              </p>
                              <p className="text-lg font-medium teriary-color">
                                26 January 2023 at 12:56 PM
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-center pt-10 font-medium text-lg primary-color ">
                          Message from the contract sender
                        </div>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] ">
                          <div className="p-4">
                            {receiverInfo.map((item, index) => {
                              return (
                                <div key={index}>
                                  <div className="pb-4">
                                    <p className="text-success-placeholder-color text-base font-normal">
                                      {item.label}
                                    </p>
                                    <p className="text-lg font-normal">{item.title}</p>
                                  </div>
                                </div>
                              );
                            })}
                            <p className="text-success-placeholder-color text-base font-normal">
                              Email
                            </p>
                            <p className="text-sm md:text-lg  font-normal">
                              davidmiller@powersource.co.uk
                            </p>
                          </div>
                          <div className="flex  p-4 items-center pb-9">
                            <Encryption />
                            <div className="pl-6">
                              <p className="text-lg font-medium primary-color pb-2">
                                Signature will appear here
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-center pt-10 font-medium text-lg primary-color">
                          updated
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div id="step3">
                    <Row gutter={[24, 30]}>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Button
                          onClick={() => setOpenSign(true)}
                          className="w-[100%] teriary-bg-color rounded-[8px] white-color"
                        >
                          Sign
                        </Button>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <Button
                          onClick={() => setWarningModal(true)}
                          className="suggest-changes-btn border-1 border-solid border-[#4A9D77] w-[100%] teriary-color rounded-[8px]"
                        >
                          Suggest Changes
                        </Button>
                      </Col>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <Button
                          onClick={() => setDismissModal(true)}
                          className="w-[100%] text-error-bg-color rounded-[8px] white-color"
                        >
                          DismissAgreement
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </BoxWrapper>
    </div>
  );
};

export default ReceivedOfferLetter;
