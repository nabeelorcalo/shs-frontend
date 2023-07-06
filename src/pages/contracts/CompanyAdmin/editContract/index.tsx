import { useEffect, useState } from "react";
import "./style.scss";
import "quill/dist/quill.snow.css";
import { BoxWrapper, Breadcrumb } from "../../../../components";
import { useLocation, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { textEditorData } from "../../../../components/Setting/Common/TextEditsdata";
import ReactQuill from "react-quill";
import useCustomHook from "../../actionHandler";
import SenderRecieverDetails from "../senderRecieverDetails";
import dayjs from "dayjs";
import {YellowInfo } from "../../../../assets/images";

const EditContract = () => {
  const navigate = useNavigate()
  const { state: contractData } = useLocation();
  const { getContractDetails, contractDetails, editContractDetails }: any = useCustomHook();

  useEffect(() => {
    getContractDetails(contractData.id)
  }, [])

  const [state, setState] = useState<any>({
    content: contractData.content,
    status: contractData.status,
    reason: 'due to some problem'
  })

  const senderInfo = [
    {
      label: "Full Name",
      title: `${contractData?.sender?.firstName} ${contractData?.sender?.lastName}`,
    },
    {
      label: "Address",
      title: contractData?.sender?.city ?
        `${contractData?.sender?.city}, ${contractData?.sender?.country}`
        :
        'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Sender",
    },
    {
      label: "Email",
      title: contractData?.sender?.email ?? 'N/A',
    },
  ];

  const receiverInfo = [
    {
      label: "Full Name",
      title: `${contractData?.receiver?.userDetail?.firstName}
       ${contractData?.receiver?.userDetail?.lastName}`,
    },
    {
      label: "Address",
      title: contractData?.receiver?.userDetail?.city ? `${contractData?.receiver?.userDetail?.city}, 
      ${contractData?.receiver?.userDetail?.country}` : 'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Receiver",
    },
    {
      label: "Email",
      title: contractData?.receiver?.userDetail?.email ?? 'N/A',
    },
  ];

  const tempArray = [
    { name: contractData?.receiver?.company?.businessName },
    {
      name: contractData.type === 'CONTRACT' ? 'Contract' : 'Offer Letter',
      onClickNavigateTo: contractData?.type === 'CONTRACT' ? `/${ROUTES_CONSTANTS.CONTRACTS}`
        : `/${ROUTES_CONSTANTS.OFFER_LETTER}`
    },
  ];

  const handleSign = () => {
    editContractDetails(contractData.id, state)
    navigate(`/${ROUTES_CONSTANTS.CONTRACTS}`);
  }

  return (
    <div className="system-admin-edit-contract">
      <div>
        <Breadcrumb breadCrumbData={tempArray} bordered={true} />
      </div>
      {contractData?.status === 'CHANGEREQUEST' && <div>
        <div className="flex gap-4 bg-[#fffcf7] p-6 rounded-[8px] items-center">
          <YellowInfo />
          <div>
            <div className="text-base font-normal text-secondary-color">
              <span>
                {`Change Requested by: ${contractData?.receiver?.userDetail?.email} on: `}
              </span>
              <span className="font-semibold">
                {`${dayjs(contractData?.createdAt).format('DD MMMM YYYY [at] HH:mm:ss [GMT + 5]')}
                  `}
              </span>
            </div>
            <p>Please add an increment policy</p>
          </div>
        </div>
      </div>}

      <BoxWrapper className="pb-10">
        <Row gutter={[0, 30]}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className="font-semibold text-base primary-color pb-6 pt-6">
                {contractData.type === 'CONTRACT' ? 'Contract' : 'Offer Letter'}
              </div>
            </Col>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="scroll-contract-company-admin">
              <Row gutter={[20, 30]}>
                <div className="edit-contract w-full">
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Row gutter={[30, 30]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] p-4">
                          <SenderRecieverDetails detailsData={senderInfo} />
                        </div>
                      </Col>

                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] p-4">
                          <SenderRecieverDetails detailsData={receiverInfo} />
                        </div>
                      </Col>
                    </Row>
                  </Col>

                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <div className="text-teriary-colo text-base pb-4 pt-8">
                      Description
                    </div>
                    <ReactQuill
                      theme="snow"
                      value={state?.content}
                      onChange={(text: any) => setState({ ...state, content: text })}
                      modules={textEditorData}
                      className="text-input-bg-color primary-color text-base"
                    />
                  </Col>

                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Row gutter={[15, 20]}>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="pt-4">
                        <Button
                          onClick={handleSign}
                          className="system-admin-contract-edit-btn w-[100%] 
                          green-graph-tooltip-bg rounded-[8px] white-color font-semibold">
                          Sign & Send
                        </Button>
                      </Col>

                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Button
                          onClick={() => navigate(`/${ROUTES_CONSTANTS.CONTRACTS}`)}
                          className="system-admin-contract-cancel-btn border-1 font-semibold
                          border-solid border-[#4A9D77] w-[100%] text-green-color rounded-[8px]">
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </BoxWrapper>
    </div>
  );
};

export default EditContract;
