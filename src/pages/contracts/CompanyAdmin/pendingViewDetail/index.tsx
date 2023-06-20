import "./style.scss";
import { BoxWrapper, Breadcrumb } from "../../../../components";
import { Row, Col } from "antd";
import {
  Encryption,
  Signeddigital,
  Recevied,
  Signed,
} from "../../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useLocation } from "react-router-dom";
import SenderRecieverDetails from "../senderRecieverDetails";

const details = [
  {
    name: "The intern has been assigned to the position of  [Designation]  in [Department Name] department.",
    title: "Role and Responsibilities",
    disc: "During the internship period, the intern will have following responsibilities:1.Act as a strategic thought partner to the product, design and development teams2. Lead the design of useful, usable, and desirable products and solution3. Own the end-to-end process for user research, wireframing, prototyping, testing, mockups, final design and implementation4. Design complex navigation flows. Turn functional requirements into simple user journeys5. Establish and promote UX/UI design guidelines, best practices and standards based on user behavior",
  },
  {
    title: "Pay and Compensation",
    disc: "The Parties hereby approve that this internship is unpaid/paid which means that the Intern will not be compensated or paid for any services provided to the Company.The Intern agrees that he/she will be compensated in knowledge, education, and experience with respect to the responsibilities that he/she will assume under this Agreement.The Intern agrees that he/she will be working from   08:00 AM   to  03:00 PM   (Monday to Friday), with  01:00 pm to 01:30 PM  lunch break.In particular, the Intern agrees that he/she will work on average  6.5  hours per week.",
  },
  {
    title: "Terms and Conditions",
    disc: "This Agreement shall be effective on the date of signing this Agreement (the “Effective Date”) and will end on  25th July, 2023. During the internship, the intern's health conditions or injuries are not the responsibility of the company.The intern should follow a time routine defined by management. The intern will show honesty, reliability, good manners, respectful behavior, acceptable grooming and hygiene practices, appropriate dress, and a willingness to learn. The intern will follow the company's policies, rules, and procedures as well as the rules regulating the company website.Intern will provide his/her manager with all necessary information relating to the internship, including related assignments and reports. The intern may not leave the internship under any circumstances without first talking with the manager.The Intern is responsible for arranging their own transportation to and from the internship site. The Intern is treated as an employee or agent of the Company when it's on the Organization's assets for any purposes, including but not restricted to workers' compensation.",
  },
  {
    title:
      "This Agreement may be terminated in the event that any of the following occurs:",
    disc: "If the Intern breaks this Agreement, it must be addressed immediately. The Intern is required to return all materials, equipment, or other content after termination of this Agreement. This Agreement contains the entire agreement and understanding among the Parties to it with respect to its subject matter, and replaces all previous agreements, understandings, encouragements, and conditions, express or implied, oral or written, of any nature whatever with respect to its subject matter. The Intern is responsible for maintaining the privacy of all terms and conditions of this Agreement. It is specifically banned to share or use these details without the permission of the company for any reasons that are not within the Agreement or the restrictions listed above.",
  },
  {
    title: "Intellectual Property",
    disc: "The Intern will agree that any intellectual property provided by the Company to him/her will continue to be its limited property. This contains, but is not restricted to, copyrights, patents, trade secret rights, and other intellectual property rights connected to any ideas, concepts, techniques, inventions, processes, works of authorship, confidential information, or trade secrets.",
  },
  {
    title: "Signature and Dates",
    disc: "The Parties hereby agree to the terms and conditions set forth in this Agreement and such is demonstrated by their signatures below:",
  },
];

const tempArray = [
  { name: "Power Source" },
  { name: " contracts ", onClickNavigateTo: `/${ROUTES_CONSTANTS.CONTRACTS}` },
];

const PendingViewDetail = () => {

  const { state } = useLocation();

  const senderInfo = [
    {
      label: "Full Name",
      title: `${state?.sender?.firstName} ${state?.sender?.lastName}`,
    },
    {
      label: "Address",
      title: `${state?.sender?.city}, ${state?.sender?.country}`,
    },
    {
      label: "Hereinafter referred to as",
      title: "Sender",
    },
    {
      label: "Email",
      title: state?.sender?.email,
    },
  ];

  const receiverInfo = [
    {
      label: "Full Name",
      title: `${state?.reciever?.firstName} ${state?.reciever?.lastName}`,
    },
    {
      label: "Address",
      title: `${state?.reciever?.city}, ${state?.reciever?.country}`,
    },
    {
      label: "Hereinafter referred to as",
      title: "Receiver",
    },
    {
      label: "Email",
      title: state?.reciever?.email,
    },
  ];

  return (
    <div className="rejected">
      <div>
        <Breadcrumb breadCrumbData={tempArray} bordered={true} />
      </div>

      <BoxWrapper className="pb-8">
        <Row gutter={[0, 30]}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="font-semibold text-xl text-secondary-color pb-6 pt-6">
              Contract
            </div>
          </Col>

          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <div className="scroll-contract-company-admin">
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
                  {details.map((item, index) => {
                    return (
                      <div key={index}>
                        <p className=" pb-4 text-secondary-color text-lg ">
                          {item.name}
                        </p>
                        <div>
                          <p className="font-semibold text-secondary-color text-lg">
                            {item.title}
                          </p>
                          <p className="text-lg font-normal text-secondary-color">
                            {item.disc}
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
                          <SenderRecieverDetails detailsData={senderInfo} hasEmail={true} />
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

                  <div className="document p-4">
                    <Row>
                      <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <div className="flex flex-wrap flex-col md:flex-row gap-4">
                          <img src={Signed} alt="sigend" />
                          <div className="text-center md:text-start">
                            <p className="text-lg font-normal">
                              changes Request
                            </p>
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

export default PendingViewDetail;
