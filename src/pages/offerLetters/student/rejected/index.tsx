import React from "react";
import "./style.scss";
import { BoxWrapper, Breadcrumb } from "../../../../components";
import { Row, Col, Button } from "antd";
import {
  Encryption,
  Signeddigital,
  //   Rejected,
  Recevied,
  Signed,
} from "../../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../../config/constants";

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

const tempArray = [
  { name: "Power Source" },
  { name: "Offer Letter ", onClickNavigateTo: `/${ROUTES_CONSTANTS.OFFER_LETTER}` },
];

const RejectedOfferLetter = () => {
  return (
    <div className="rejected">
      <div>
        <Breadcrumb breadCrumbData={tempArray}/>
      </div>

      <BoxWrapper>
        <Row gutter={[0, 30]}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="flex gap-4 bg-[#fdf5f6] p-6 rounded-[8px] items-center">
              <div className="page-header-secondary-bg-color rounded-[50%] flex justify-center items-center w-[20px] h-[20px] white-color">
                X
              </div>
              <div>
                <p className="text-base font-normal text-secondary-color">
                  Offer Letter rejected by: Amira@orcalo.co.uk on: 20 October
                  2022 at 09:58:21 GMT+5 .
                </p>
                <p className="text-base font-normal text-secondary-color">
                  Not agree
                </p>
              </div>
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="pb-4 pt-4 font-semibold text-xl text-secondary-color">
              Offer Letter
            </div>
          </Col>


          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="scroll">
              <Row gutter={[0, 30]}>
                <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
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
                          <p className="text-sm md:text-lg font-normal">
                            davidmiller@powersource.co.uk
                          </p>
                        </div>
                        <div className="flex bg-[#ffb4bc] rounded-b-[14px]  p-4 items-center pb-9">
                          <Encryption />
                          <div className="pl-6">
                            <p className="text-lg font-medium page-header-secondary-color pb-2">
                              Rejected
                            </p>
                            <p className="text-lg font-medium page-header-secondary-color pb-2">
                              26 January 2023 at 12:56 PM
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

                  <div className="document p-4">
                    <Row>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <div className="flex flex-wrap flex-col md:flex-row gap-4">
                          <img src={Signed} alt="sigend" />
                          <div className="text-center md:text-start">
                            <p className="text-lg font-normal">changes Request</p>
                            <p className="text-success-placeholder-color text-base font-normal">
                              by mariasanoid@gmail.com
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
                          <p className="text-lg font-normal">12:18 PM</p>
                          <p className="text-success-placeholder-color text-base font-normal">
                            06/10/2022
                          </p>
                        </div>
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

export default RejectedOfferLetter;
