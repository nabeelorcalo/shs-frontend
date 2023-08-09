import { useEffect } from "react";
import "./style.scss";
import { BoxWrapper, Breadcrumb } from "../../../../components";
import { Row, Col } from "antd";
import {
  ContractsRejected, Recevied, Signed
} from "../../../../assets/images";
import { WarningFilled } from "@ant-design/icons";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useLocation } from "react-router-dom";
import useCustomHook from "../../actionHandler";
import SenderRecieverDetails from "../senderRecieverDetails";
import dayjs from "dayjs";

const Rejected = () => {
  const { state } = useLocation();
  const { getContractDetails, contractDetails }: any = useCustomHook();

  useEffect(() => {
    getContractDetails(state.id)
  }, [])

  const tempArray = [
    {
      name: state?.receiver ? state?.receiver?.company?.businessName
        : `${state?.user.firstName} ${state?.user.lastName}`
    },
    {
      name: state.type === 'CONTRACT' ? 'Contract' : 'Offer Letter',
      onClickNavigateTo: state?.type === 'CONTRACT' ? `/${ROUTES_CONSTANTS.CONTRACTS}`
        : `/${ROUTES_CONSTANTS.OFFER_LETTER}`
    },
  ];

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
      title: state?.propertyReservationId ? `${state?.user?.firstName} ${state?.user?.lastName}` :
        `${contractDetails?.detail?.receiver?.userDetail?.firstName} ${contractDetails?.detail?.receiver?.userDetail?.lastName}`,
    },
    {
      label: "Address",
      title: state?.propertyReservationId ? state?.user?.userDetail?.city ? `${state?.user?.userDetail?.city},
    ${state?.user?.userDetail?.country}` : 'N/A' :
        contractDetails?.detail?.receiver?.userDetail?.city || contractDetails?.detail?.receiver?.userDetail?.country ? `${contractDetails?.detail?.receiver?.userDetail?.city ?? 'N/A'},
    ${contractDetails?.detail?.receiver?.userDetail?.country}` : 'N/A',
    },
    {
      label: "Hereinafter referred to as",
      title: "Receiver",
    },
    {
      label: "Email",
      title: state?.propertyReservationId ? state?.tenant?.userDetail?.email ?? 'N/A' : contractDetails?.detail?.receiver?.userDetail?.email ?? 'N/A',
    },
  ];

  const statusImageHandler: any = (status: any) => {
    switch (status) {
      case 'NEW': return Recevied
      case 'PENDING': return Recevied
      case 'REJECTED': return ContractsRejected
      case 'CHANGEREQUEST': return ContractsRejected
      case 'SIGNED': return Signed
    }
  }

  return (
    <div className="rejected">
      <div>
        <Breadcrumb breadCrumbData={tempArray} bordered={true} />
      </div>

      <BoxWrapper>
        <Row gutter={[0, 30]}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="flex gap-4 bg-[#fdf5f6] p-6 rounded-[8px] items-center">
              <WarningFilled style={{ fontSize: "30px", color: "#D83A52" }} />
              <div>
                <div className="text-base font-normal text-secondary-color">
                  <span>
                    {`Contract rejected by: ${contractDetails?.detail?.receiver?.userDetail?.email} on: `}
                  </span>
                  <span className="font-semibold">
                    {`${dayjs(contractDetails?.detail?.updatedAt).format('DD MMMM YYYY [at] hh:mm:ss [GMT + 5]')}
                  `}
                  </span>
                </div>
                {/* <p>Rejection description {contractDetails?.history && contractDetails?.history[0]?.reason}</p> */}
              </div>
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="font-semibold text-base primary-color pb-6 pt-6">
              {state.type === 'CONTRACT' ? 'Contract' : 'Offer Letter'}
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="scroll-contract-company-admin">
              <Row gutter={[0, 30]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
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
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <p dangerouslySetInnerHTML={{ __html: contractDetails?.detail?.content }}
                    className=" pb-4 text-secondary-color text-base break-word" />
                </Col>

                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                  <Row gutter={[30, 24]}>
                    <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                      <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px]">
                        <SenderRecieverDetails
                          detailsData={senderInfo}
                          hasEmail
                          hasSigned
                          SignedDateTime={contractDetails?.detail?.singedOn}
                        />
                      </div>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                      <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px]">
                        <SenderRecieverDetails
                          detailsData={receiverInfo}
                          bgColor='#fdf5f6'
                          hasEmail
                          hasRejected
                          cardHeading='Rejected'
                          rejectedDateTime={contractDetails?.detail?.updatedAt}
                        />
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
                      const time = dayjs(item?.updatedAt).format('hh:mm A')
                      const date = dayjs(item?.updatedAt).format('DD/MM/YYYY')
                      return <Row className="mb-12" key={item?.id}>
                        <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                          <div className="flex flex-wrap flex-col md:flex-row gap-4">
                            <img src={statusImageHandler(item?.status)} alt='img' />
                            <div className="text-center md:text-start">
                              <p className="text-lg font-normal capitalize">
                                {item?.status.toLowerCase()}
                              </p>
                              <p className="text-success-placeholder-color text-base font-normal">
                                by {item?.user?.email ?? 'N/A'}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col md={12} xs={24}
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

export default Rejected;
