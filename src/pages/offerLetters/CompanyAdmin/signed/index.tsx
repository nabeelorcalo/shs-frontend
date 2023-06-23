import React, { useEffect } from "react";
import "./style.scss";
import { BoxWrapper, Breadcrumb } from "../../../../components";
import { Row, Col, Button } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";
import {
  Encryption,
  Signeddigital,
  Rejected,
  Recevied,
  Signed,
} from "../../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import SenderRecieverDetails from "../../../contracts/CompanyAdmin/senderRecieverDetails";
import useCustomHook from "../../actionHandler";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";

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

const tempArray = [
  { name: "Power Source" },
  {
    name: "Offer Letter",
    onClickNavigateTo: `/${ROUTES_CONSTANTS.OFFER_LETTER}`,
  },
];

const SignedOfferLetterCompanyAdmin = () => {

  const { state } = useLocation()
  const { getContractDetails, contractDetails }: any = useCustomHook();

  useEffect(() => {
    getContractDetails(state)
  }, [])

  const senderInfo = [
    {
      label: "Full Name",
      title: `${contractDetails?.detail?.sender?.firstName} ${contractDetails?.detail?.sender?.lastName}`,
    },
    {
      label: "Address",
      title: contractDetails?.detail?.sender?.city ?
        `${contractDetails?.detail?.sender?.city}, ${contractDetails?.detail?.sender?.country}`
        :
        'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Sender",
    },
    {
      label: "Email",
      title: contractDetails?.detail?.sender?.email ?? 'N/A',
    },
  ];

  const receiverInfo = [
    {
      label: "Full Name",
      title: `${contractDetails?.detail?.receiver?.userDetail?.firstName}
       ${contractDetails?.detail?.receiver?.userDetail?.lastName}`,
    },
    {
      label: "Address",
      title: contractDetails?.detail?.receiver?.userDetail?.city ? `${contractDetails?.detail?.receiver?.userDetail?.city}, 
      ${contractDetails?.detail?.receiver?.userDetail?.country}` : 'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Receiver",
    },
    {
      label: "Email",
      title: contractDetails?.detail?.receiver?.userDetail?.email ?? 'N/A',
    },
  ];

  return (
    <div className="signed">
      <div>
        <Breadcrumb breadCrumbData={tempArray} bordered={true} />
      </div>

      <BoxWrapper className="pb-8">
        <Row gutter={[0, 30]}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="pb-6 pt-6 font-semibold text-xl text-secondary-color">
              Offer Letter
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="scroll-offer-letter-company-admin">
              <Row gutter={[0, 30]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Row gutter={[30, 24]}>
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
                  <p className=" pb-4 text-secondary-color text-lg ">
                    {contractDetails?.detail?.content}
                  </p>
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
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
                        </div>
                        <div className="flex bg-[#9ec5b4] rounded-b-[14px] p-4 items-center">
                          <Signeddigital />
                          <div className="pl-6">
                            <p className="text-lg font-medium text-green-color pb-2">
                              Signed digitally
                            </p>
                            <p className="text-lg font-medium text-green-color">
                              26 January 2023 at 12:56 PM
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                      <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] ">
                        <div className="p-4">
                          <SenderRecieverDetails detailsData={receiverInfo} hasEmail={true} />
                        </div>
                        <div className="flex bg-[#e7e8ef] rounded-b-[14px]  p-4 items-center pb-9">
                          <Encryption />
                          <div className="pl-6">
                            <p className="text-lg font-medium text-success-placeholder-color pb-2">
                              Signed digitally
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <div className="pb-4 pt-4 font-semibold text-xl text-secondary-color">
                    Document History
                  </div>
                  {contractDetails?.history?.length > 0 ? <div className="document p-4">
                    {contractDetails?.history?.map((item: any) => {
                      const time = dayjs(item?.createdAt).format('hh:mm A')
                      const date = dayjs(item?.createdAt).format('DD/MM/YYYY')
                      return <Row className="mb-12">
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                          <div className="flex flex-wrap flex-col md:flex-row gap-4">
                            <img src={Signed} alt="sigend" />
                            <div className="text-center md:text-start">
                              <p className="text-lg font-normal">
                                {item?.status}
                              </p>
                              <p className="text-success-placeholder-color text-base font-normal">
                                {item?.email ?? 'N/A'}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col
                          xxl={12}
                          xl={12}
                          lg={12}
                          md={12}
                          sm={24}
                          xs={24}
                          className="flex justify-center md:justify-end"
                        >
                          <div>
                            <p className="text-lg font-normal">{time}</p>
                            <p className="text-success-placeholder-color text-base font-normal">
                              {date}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    })}
                  </div> : 'No history Found'}
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </BoxWrapper>
    </div>
  );
};

export default SignedOfferLetterCompanyAdmin;
