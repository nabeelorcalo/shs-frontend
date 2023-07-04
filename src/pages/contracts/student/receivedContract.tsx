import { useEffect, useRef, useState } from "react";
import {
  BoxWrapper,
  Breadcrumb,
  PopUpModal,
  TextArea,
} from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Steps, } from "antd";
import { Encryption, Signeddigital } from "../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { CheckCircleFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import SenderRecieverDetails from "../CompanyAdmin/senderRecieverDetails";
import useCustomHook from "../actionHandler";
import useOfferLetterCustomHook from "../../offerLetters/actionHandler";
import "./style.scss"

const Received = () => {
  const navigate = useNavigate()
  const [openSign, setOpenSign] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [dismissModal, setDismissModal] = useState(false);
  const [state, setState] = useState({
    changeReason: null,
    rejectReason: null
  })
  // const timeoutRef = useRef<any>(null);
  const { state: contractDetail } = useLocation()
  const [activeStep, setActiveStep] = useState(0);
  const contentRef: any = useRef(null);
  const { editContractDetails } = contractDetail.type === 'CONTRACT' ?
    useCustomHook()
    :
    useOfferLetterCustomHook();

  const tempArray = [
    { name: contractDetail?.receiver?.company?.businessName },
    {
      name: contractDetail.type === 'CONTRACT' ? 'Contract' : 'Offer Letter',
      onClickNavigateTo: contractDetail?.type === 'CONTRACT' ? `/${ROUTES_CONSTANTS.CONTRACTS}`
        : `/${ROUTES_CONSTANTS.OFFER_LETTER}`
    },
  ];

  const senderInfo = [
    {
      label: "Full Name",
      title: `${contractDetail?.sender?.firstName} ${contractDetail?.sender?.lastName}`,
    },
    {
      label: "Address",
      title: contractDetail?.detail?.sender?.city ?
        `${contractDetail?.sender?.city}, ${contractDetail?.sender?.country}`
        :
        'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Sender",
    },
    {
      label: "Email",
      title: contractDetail?.sender?.email ?? 'N/A',
    },
  ];

  const receiverInfo = [
    {
      label: "Full Name",
      title: `${contractDetail?.receiver?.userDetail?.firstName}
           ${contractDetail?.receiver?.userDetail?.lastName}`,
    },
    {
      label: "Address",
      title: contractDetail?.receiver?.userDetail?.city ? `${contractDetail?.receiver?.userDetail?.city}, 
          ${contractDetail?.receiver?.userDetail?.country}` : 'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Receiver",
    },
    {
      label: "Email",
      title: contractDetail?.receiver?.userDetail?.email ?? 'N/A',
    },
  ];

  const steps = [
    { title: 'Read', id: 'step1', icon: <EyeFilled className="w-[28px] h-[28px]" /> },
    { title: 'Confirm', id: 'step2', icon: <EditFilled className="w-[28px] h-[28px]" /> },
    { title: 'Signed and stored', id: 'step3', icon: <CheckCircleFilled className="w-[28px] h-[28px]" /> },
  ];

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

  // const handleButtonRelease = () => {
  //   clearTimeout(timeoutRef.current);
  //   setIsPressed(false);
  // };

  // const handleLongPress = () => {
  //   setIsPressed(true);
  //   timeoutRef.current = setTimeout(() => {
  //     console.log("Long pressed");
  //     alert("button pressed")
  //     navigate(`/${ROUTES_CONSTANTS.CONTRACTS}`)
  //   }, 2000);
  // };

  const handleSignContract = () => {
    const values = {
      status: 'SIGNED',
      content: contractDetail?.content
    }
    editContractDetails(contractDetail?.id, values)
    setOpenSign(false)
    navigate(contractDetail.type === 'CONTRACT' ?
      `/${ROUTES_CONSTANTS.CONTRACTS}` :
      `/${ROUTES_CONSTANTS.OFFER_LETTER}`)
  }

  const handleSuggestChanges = () => {
    const values = {
      status: 'CHANGEREQUEST',
      content: contractDetail?.content,
      reason: state.changeReason
    }
    editContractDetails(contractDetail?.id, values)
    setWarningModal(false)
    navigate(contractDetail.type === 'CONTRACT' ?
      `/${ROUTES_CONSTANTS.CONTRACTS}` :
      `/${ROUTES_CONSTANTS.OFFER_LETTER}`)
  }

  const handleRejectAgreement = () => {
    const values = {
      status: 'REJECTED',
      content: contractDetail?.content,
      reason: state.rejectReason
    }
    editContractDetails(contractDetail?.id, values)
    setDismissModal(false)
    navigate(contractDetail.type === 'CONTRACT' ?
      `/${ROUTES_CONSTANTS.CONTRACTS}` :
      `/${ROUTES_CONSTANTS.OFFER_LETTER}`)
  }

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
              className="change-mind-red-btn border-1 border-solid border-[#d83a52] w-[100%] text-error-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={handleRejectAgreement}
              className="dismiss-agrement-btn w-[100%] text-error-bg-color rounded-[8px] white-color">
              Dismiss Agreement
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
          <TextArea placeholder="What needs to be changed?" rows={5}
            onChange={(e: any) => {
              setState({ ...state, changeReason: e.target.value })
            }} />
        </div>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setWarningModal(false)}
              className="change-mind-warning-btn border-1 border-solid border-[#4A9D77] w-[100%] text-green-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button onClick={handleSuggestChanges} className="edit-request-btn w-[100%] green-graph-tooltip-bg rounded-[8px] white-color">
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
          changed my mind click to sign
        </p>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setOpenSign(false)}
              className="change-mind-warning-btn border-1 border-solid border-[#4A9D77] w-[100%] text-green-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              // onTouchStart={handleLongPress}
              // onTouchEnd={handleButtonRelease}
              // onMouseDown={handleLongPress}
              // onMouseUp={handleButtonRelease}
              // onMouseLeave={handleButtonRelease}
              onClick={handleSignContract}
              className="long-press-btn w-[100%] green-graph-tooltip-bg rounded-[8px] white-color"
            >
              Click to sign
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
              {steps?.map((step) => (
                <Steps.Step key={step.title} title={<span className=''>{step.title}</span>} icon={step.icon} />
              ))}
            </Steps>
            <div className=" pt-4 font-semibold text-xl text-secondary-color">
              Contract
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div ref={contentRef} className="scroll">
              <Row gutter={[0, 30]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div id="step1">
                    <Row gutter={[30, 24]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px]">
                          <SenderRecieverDetails detailsData={senderInfo} />
                        </div>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px]">
                          <SenderRecieverDetails detailsData={receiverInfo} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <p dangerouslySetInnerHTML={{ __html: contractDetail?.content }}
                    className=" pb-4 text-secondary-color text-base " />
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div>
                    <Row gutter={[30, 24]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px]">
                          <SenderRecieverDetails
                            detailsData={senderInfo}
                            hasEmail
                            hasSigned
                          />
                        </div>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px]">
                          <SenderRecieverDetails
                            detailsData={receiverInfo}
                            hasEmail
                            hasRejected
                          />
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
                          className="w-[100%] green-graph-tooltip-bg rounded-[8px] white-color"
                        >
                          Sign
                        </Button>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <Button
                          onClick={() => setWarningModal(true)}
                          className="suggest-changes-btn border-1 border-solid border-[#4A9D77] w-[100%] text-green-color rounded-[8px]"
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
export default Received;