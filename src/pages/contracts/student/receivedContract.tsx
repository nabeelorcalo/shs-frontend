import { useEffect, useRef, useState } from "react";
import {
  BoxWrapper,
  Breadcrumb,
  Notifications,
  PageHeader,
  PopUpModal,
  TextArea,
} from "../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button, Steps, } from "antd";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { CheckCircleFilled, EditFilled, EyeFilled } from "@ant-design/icons";
import SenderRecieverDetails from "../CompanyAdmin/senderRecieverDetails";
import useCustomHook from "../actionHandler";
import useOfferLetterCustomHook from "../../offerLetters/actionHandler";
import "./style.scss"
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../../store";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { textEditorData } from "../../../components/Setting/Common/TextEditsdata";

const Received = () => {
  const navigate = useNavigate()
  const [openSign, setOpenSign] = useState(false);
  const [warningModal, setWarningModal] = useState(false);
  const [dismissModal, setDismissModal] = useState(false);
  const { state: contractDetail } = useLocation();
  const [state, setState] = useState({
    changeReason: null,
    rejectReason: null,
    content: contractDetail?.property?.contractTerms
  })
  const [activeStep, setActiveStep] = useState(0);
  const contentRef: any = useRef(null);
  const { editContractDetails } = contractDetail?.type === 'CONTRACT' ?
    useCustomHook()
    :
    useOfferLetterCustomHook();
  const role = useRecoilValue(currentUserRoleState);
  const { createContract } = useCustomHook();
  const { getContractDetails, contractDetails }: any = useCustomHook();

  useEffect(() => {
    getContractDetails(contractDetail?.id)
  }, [])

  const tempArray = [
    {
      name: contractDetail?.receiver ? contractDetail?.receiver?.company?.businessName
        : `${contractDetail?.user?.firstName} ${contractDetail?.user?.lastName}`,
    },
    {
      name: contractDetail?.type === 'CONTRACT' ? 'Contract' : 'Offer Letter',
      onClickNavigateTo: contractDetail?.type === 'CONTRACT' ? `/${ROUTES_CONSTANTS.CONTRACTS}`
        : `/${ROUTES_CONSTANTS.OFFER_LETTER}`
    },
  ];

  const senderInfo = [
    {
      label: "Full Name",
      title: role === constants.STUDENT ? `${contractDetail?.sender?.firstName} ${contractDetail?.sender?.lastName}`
        :
        `${contractDetail?.agent?.firstName} ${contractDetail?.agent?.lastName}`
    },
    {
      label: "Address",
      title: role !== constants.STUDENT ? contractDetail?.agent?.country ?
        `${contractDetail?.agent?.city ?? 'N/A'}, ${contractDetail?.agent?.country}`
        :
        'N/A' : contractDetails?.detail?.sender?.country ?
        `${contractDetails?.detail?.sender?.city ?? 'N/A'}, ${contractDetails?.detail?.sender?.country}`
        :
        'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Sender",
    },
    {
      label: "Email", 
      title: !contractDetail?.agent ? contractDetails?.detail?.sender?.email ?? 'N/A' : contractDetail?.agent?.email ?? 'N/A',
    },
  ];

  const receiverInfo = [
    {
      label: "Full Name",
      title: contractDetail?.agent ? `${contractDetail?.tenant?.firstName} ${contractDetail?.tenant?.lastName}`
        : contractDetail?.propertyReservationId ? `${contractDetail?.user?.firstName} ${contractDetail?.user?.lastName}` :
          `${contractDetail?.receiver?.userDetail?.firstName} ${contractDetail?.receiver?.userDetail?.lastName}`,
    },
    {
      label: "Address",
      title: contractDetail?.agent ? 
        contractDetail?.tenant?.country ? `${contractDetail?.tenant?.city ?? 'N/A'},
    ${contractDetail?.tenant?.country}` : 'N/A' :
        contractDetail?.propertyReservationId ? contractDetail?.user?.country ? `${contractDetail?.user?.city ?? 'N/A'},
    ${contractDetail?.user?.country}` : 'N/A' :
          `${contractDetails?.detail?.receiver?.userDetail?.city ?? 'N/A'},
    ${contractDetails?.detail?.receiver?.userDetail?.country ?? 'N/A'}`,
    },
    {
      label: "Hereinafter referred to as",
      title: "Receiver",
    },
    {
      label: "Email",
      title: contractDetail?.agent ? contractDetail?.tenant?.email ?? 'N/A' :
        contractDetail?.propertyReservationId ? contractDetail?.user?.email ?? 'N/ A' :
          contractDetails?.detail?.receiver?.userDetail?.email ?? 'N/A'
    },
  ];

  const steps = [
    {
      title: <div className="pl-4">
        <EyeFilled className="w-[28px] h-[28px]" />
        Read
      </div>,
      id: 'step1',
      icon: <></>
    },
    {
      title: <div className="pl-4">
        <EditFilled className="w-[28px] h-[28px]" /> Confirm
      </div>
      , id: 'step2', icon: <></>
    },
    {
      title: <div className="pl-4">
        <CheckCircleFilled className="w-[28px] h-[28px]" />
        Signed and stored
      </div>, id: 'step3', icon: <></>
    },
  ];

  useEffect(() => {
    const handleWheel = (event: any) => {
      const scrollPosition = contentRef.current.scrollTop;
      const stepSections: any = steps.map((step) => document.getElementById(step.id));

      if (event.deltaY > 0) {
        for (let i = 0; i < stepSections.length; i++) {
          if (scrollPosition > stepSections[i].offsetTop - 50) {
            setActiveStep(1);
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

  const handleSignContract = () => {
    const values = {
      status: 'SIGNED',
      content: contractDetail?.content,
      reservationId: contractDetail?.propertyReservationId ? contractDetail?.propertyReservationId : null,
      reservationStatus: "reserved"
    }
    const payload = {
      type: 'CONTRACT',
      templateId: 1,
      userId: contractDetail?.tenantId,
      propertyReservationId: contractDetail?.id,
      content: state.content
    }
    setOpenSign(false)
    if (contractDetail?.agent) {
      createContract(payload)
      navigate(`/${ROUTES_CONSTANTS.RESERVATIONS}`)
    }
    else {
      editContractDetails(contractDetail?.id, values);
      navigate(contractDetail?.type === 'CONTRACT' ?
        `/${ROUTES_CONSTANTS.CONTRACTS}` :
        `/${ROUTES_CONSTANTS.OFFER_LETTER}`)
    }
  }

  const handleSuggestChanges = () => {
    const values = {
      status: 'CHANGEREQUEST',
      content: contractDetail?.content,
      reason: state.changeReason,
    }
    editContractDetails(contractDetail?.id, values)
    setWarningModal(false)
    navigate(contractDetail?.type === 'CONTRACT' ?
      (`/${ROUTES_CONSTANTS.CONTRACTS}`) :
      `/${ROUTES_CONSTANTS.OFFER_LETTER}`)
  }

  const handleRejectAgreement = () => {
    const values = {
      status: 'REJECTED',
      content: contractDetail?.content,
      reason: state.rejectReason,
      reservationId: contractDetail?.propertyReservationId ? contractDetail?.propertyReservationId : null,
      reservationStatus: 'rejected'
    }
    editContractDetails(contractDetail?.id, values)
    setDismissModal(false)
    navigate(contractDetail?.type === 'CONTRACT' ?
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
        title={<span className="text-3xl">Alert</span>}
        closable={true}
        open={dismissModal}
        close={() => setDismissModal(false)}
      >
        <p className="pb-4 font-medium">Why are you rejecting the contract?</p>
        <div className="pb-4">
          <label className="text-teriary-color mb-2">Reason</label>
          <TextArea className='mt-2' placeholder="Write your reason" rows={5}></TextArea>
        </div>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setDismissModal(false)}
              className="change-mind-red-btn font-semibold border-1 border-solid change-btn-clr w-[100%] text-error-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={handleRejectAgreement}
              className="dismiss-agrement-btn w-[100%] font-semibold text-error-bg-color rounded-[8px] white-color">
              Dismiss Agreement
            </Button>
          </Col>
        </Row>
      </PopUpModal>

      <PopUpModal
        footer={false}
        width={570}
        title={<span className="text-3xl">Warning</span>}
        closable={true}
        open={warningModal}
        close={() => setWarningModal(false)}
      >
        <p className="pb-4 font-medium">Request contract change</p>
        <div className="pb-4">
          <label className="text-teriary-color">Reason</label>
          <TextArea className='mt-2' placeholder="What needs to be changed?" rows={5}
            onChange={(e: any) => {
              setState({ ...state, changeReason: e.target.value })
            }} />
        </div>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setWarningModal(false)}
              className="change-mind-warning-btn font-semibold border-1 border-solid btn-color w-[100%] text-green-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button onClick={handleSuggestChanges} className="edit-request-btn font-semibold w-[100%] green-graph-tooltip-bg rounded-[8px] white-color">
              Send Edit Request
            </Button>
          </Col>
        </Row>
      </PopUpModal>

      <PopUpModal
        footer={false}
        width={570}
        title={<span className="text-3xl">Confirm signing the document</span>}
        closable={true}
        open={openSign}
        close={() => setOpenSign(false)}
      >
        <p className="pb-4 font-medium">
          By signing this document, you agree to its terms and understand that it will be legally binding.
        </p>
        <Row gutter={16}>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={() => setOpenSign(false)}
              className="change-mind-warning-btn border-1 font-semibold border-solid btn-color w-[100%] text-green-color rounded-[8px]"
            >
              I have changed my mind
            </Button>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
            <Button
              onClick={handleSignContract}
              className="long-press-btn w-[100%] font-semibold green-graph-tooltip-bg rounded-[8px] white-color"
            >
              Click to sign
            </Button>
          </Col>
        </Row>
      </PopUpModal>

      <div>
        {role === constants.STUDENT ? <Breadcrumb breadCrumbData={tempArray} bordered={true} />
          :
          <PageHeader title='Reservation' />
        }

      </div>
      <BoxWrapper className="h-[70vh]">
        <Row gutter={[0, 30]}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Steps className="contract-steps" current={activeStep} onChange={handleStepChange}>
              {steps?.map((step) => (
                <Steps.Step key={step.id} title={<span>{step.title}</span>} icon={step.icon} />
              ))}
            </Steps>
            <div className=" pt-4 font-semibold text-xl text-secondary-color">
              {role === constants.STUDENT && 'Contract'}
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div ref={contentRef} className="scroll overflow-auto overflow-x-hidden h-[52vh]">
              <Row gutter={[0, 30]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div id="step1">
                    <Row gutter={[30, 24]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid cards rounded-[16px]">
                          <SenderRecieverDetails detailsData={senderInfo} />
                        </div>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid cards rounded-[16px]">
                          <SenderRecieverDetails detailsData={receiverInfo} />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  {role === constants.STUDENT ?
                    <p dangerouslySetInnerHTML={{ __html: contractDetail?.content }}
                      className=" pb-4 text-secondary-color text-base " />
                    :
                    <ReactQuill
                      theme="snow"
                      value={state.content}
                      onChange={(text: any) => setState({ ...state, content: text })}
                      modules={textEditorData}
                      className="text-input-bg-color primary-color text-base"
                    />
                  }
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div>
                    <Row gutter={[30, 24]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid cards rounded-[16px]">
                          <SenderRecieverDetails
                            detailsData={senderInfo}
                            hasEmail
                            hasSigned={role === constants.STUDENT && true}
                            hasPending={role !== constants.STUDENT && true}
                            cardHeading='Signature will appear here'
                            SignedDateTime={contractDetail?.createdAt}
                          />
                        </div>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid cards rounded-[16px]">
                          <SenderRecieverDetails
                            detailsData={receiverInfo}
                            hasEmail
                            hasPending
                            cardHeading='Signature will appear here'
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col xs={24}>
                  <BoxWrapper>
                    <Row gutter={[20, 20]}>
                      <Col xs={12} className="text-center .border-r-2">
                        <p className="font-medium text-lg">Message from the contract sender</p>
                      </Col>
                      {contractDetails?.detail?.isChangeRequest && <Col xs={12} className="text-center">
                        <p className="font-medium text-lg">Updated</p>
                      </Col>}
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <div id="step3">
                          <Row gutter={[24, 30]}>
                            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                              <Button
                                onClick={() => setOpenSign(true)}
                                className="w-[100%] green-graph-tooltip-bg rounded-[8px] white-color"
                              >
                                {role === constants.STUDENT ? 'Sign' : 'Sign & Send'}
                              </Button>
                            </Col>
                            {role === constants.STUDENT &&
                              <Col xs={24}>
                                <Row gutter={[20, 20]}>
                                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Button
                                      onClick={() => setWarningModal(true)}
                                      className="suggest-changes-btn border-1 border-solid btn-border w-[100%] font-semibold text-green-color rounded-[8px]"
                                    >
                                      Suggest Changes
                                    </Button>
                                  </Col>
                                  <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <Button
                                      onClick={() => setDismissModal(true)}
                                      className="w-[100%] text-error-bg-color rounded-[8px] white-color"
                                    >
                                      Dismiss Agreement
                                    </Button>
                                  </Col>
                                </Row>
                              </Col>}
                          </Row>
                        </div>
                      </Col>
                    </Row>
                  </BoxWrapper>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </BoxWrapper>
    </div >
  );
};
export default Received;