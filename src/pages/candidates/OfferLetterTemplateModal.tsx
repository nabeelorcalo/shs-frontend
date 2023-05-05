import { useState } from "react";
import "./style.scss";
import { Row, Col, Button, Dropdown, Menu, Modal } from "antd";
import { CloseCircleIcon } from "../../assets/images";
import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  BoldOutlined,
  CaretDownOutlined,
  ItalicOutlined,
  LinkOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import { textEditorData } from "../../components/Setting/Common/TextEditsdata";
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

const details =
  "During the internship period, the intern will have following responsibilities:1.Act as a strategic thought partner to the product, design and development teams2. Lead the design of useful, usable, and desirable products and solution3. Own the end-to-end process for user research, wireframing, prototyping, testing, mockups, final design and implementation4. Design complex navigation flows. Turn functional requirements into simple user journeys5. Establish and promote UX/UI design guidelines, best practices and standards based on user behavior";

// [
//   {
//     name: "The intern has been assigned to the position of  [Designation]  in [Department Name] department.",
//     title: "Role and Responsibilities",
//     disc: "During the internship period, the intern will have following responsibilities:1.Act as a strategic thought partner to the product, design and development teams2. Lead the design of useful, usable, and desirable products and solution3. Own the end-to-end process for user research, wireframing, prototyping, testing, mockups, final design and implementation4. Design complex navigation flows. Turn functional requirements into simple user journeys5. Establish and promote UX/UI design guidelines, best practices and standards based on user behavior",
//   },
//   {
//     title: "Pay and Compensation",
//     disc: "The Parties hereby approve that this internship is unpaid/paid which means that the Intern will not be compensated or paid for any services provided to the Company.The Intern agrees that he/she will be compensated in knowledge, education, and experience with respect to the responsibilities that he/she will assume under this Agreement.The Intern agrees that he/she will be working from   08:00 AM   to  03:00 PM   (Monday to Friday), with  01:00 pm to 01:30 PM  lunch break.In particular, the Intern agrees that he/she will work on average  6.5  hours per week.",
//   },
//   {
//     title: "Terms and Conditions",
//     disc: "This Agreement shall be effective on the date of signing this Agreement (the “Effective Date”) and will end on  25th July, 2023. During the internship, the intern's health conditions or injuries are not the responsibility of the company.The intern should follow a time routine defined by management. The intern will show honesty, reliability, good manners, respectful behavior, acceptable grooming and hygiene practices, appropriate dress, and a willingness to learn. The intern will follow the company's policies, rules, and procedures as well as the rules regulating the company website.Intern will provide his/her manager with all necessary information relating to the internship, including related assignments and reports. The intern may not leave the internship under any circumstances without first talking with the manager.The Intern is responsible for arranging their own transportation to and from the internship site. The Intern is treated as an employee or agent of the Company when it's on the Organization's assets for any purposes, including but not restricted to workers' compensation.",
//   },
//   {
//     title: "This Agreement may be terminated in the event that any of the following occurs:",
//     disc: "If the Intern breaks this Agreement, it must be addressed immediately. The Intern is required to return all materials, equipment, or other content after termination of this Agreement. This Agreement contains the entire agreement and understanding among the Parties to it with respect to its subject matter, and replaces all previous agreements, understandings, encouragements, and conditions, express or implied, oral or written, of any nature whatever with respect to its subject matter. The Intern is responsible for maintaining the privacy of all terms and conditions of this Agreement. It is specifically banned to share or use these details without the permission of the company for any reasons that are not within the Agreement or the restrictions listed above.",
//   },
//   {
//     title: "Intellectual Property",
//     disc: "The Intern will agree that any intellectual property provided by the Company to him/her will continue to be its limited property. This contains, but is not restricted to, copyrights, patents, trade secret rights, and other intellectual property rights connected to any ideas, concepts, techniques, inventions, processes, works of authorship, confidential information, or trade secrets.",
//   },
//   {
//     title: "Signature and Dates",
//     disc: "The Parties hereby agree to the terms and conditions set forth in this Agreement and such is demonstrated by their signatures below:",
//   },
// ];

const OfferLetterTemplateModal = (props: any) => {
  const { open, setOpen, handleOfferLetterTemplate } = props;
  const [textEditorValue, setTextEditorValue] = useState(details);

  const fontFamily = (
    <Menu>
      <Menu.Item>Roboto</Menu.Item>
    </Menu>
  );

  const textDecoration = (
    <Menu>
      <Menu.Item>pharagrah</Menu.Item>
    </Menu>
  );

  const [visible, setVisible] = useState(false);
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };

  const [visible1, setVisible1] = useState(false);
  const handleVisibleChange1 = (visible: any) => {
    setVisible1(visible);
  };

  const onChangeHandler = (e: any) => {
    setTextEditorValue(e);
  };

  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Offer Letter"
        open={open}
        onCancel={() => setOpen(false)}
        footer={""}
        width={902}
      >
        <div>
          <Row gutter={[0, 30]}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <div>
                <Row gutter={[0, 30]}>
                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Row gutter={[30, 24]}>
                      <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                        <div className="white-bg-color border-2 border-solid border-[#D6D5DF] rounded-[16px] p-4">
                          {senderInfo.map((item, index) => {
                            return (
                              <div key={index}>
                                <div className="pb-4">
                                  <p className="text-success-placeholder-color text-base font-normal">{item.label}</p>
                                  <p className="text-lg font-normal text-secondary-color">{item.title}</p>
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
                                  <p className="text-success-placeholder-color text-base font-normal">{item.label}</p>
                                  <p className="text-lg font-normal">{item.title}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </Col>

                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="description-wrapper">
                    <div className="text-teriary-color text-base pb-2">Description</div>
                    <div className="text-input-bg-color rounded-lg  my-2 text-editor">
                      <ReactQuill
                        theme="snow"
                        value={textEditorValue}
                        onChange={onChangeHandler}
                        modules={textEditorData}
                      />
                    </div>
                  </Col>

                  <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                    <Row gutter={[24, 30]}>
                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Button
                          className=" w-[100%] green-graph-tooltip-bg rounded-[8px] white-color"
                          onClick={handleOfferLetterTemplate}
                        >
                          Sign & Send
                        </Button>
                      </Col>

                      <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                        <Button
                          className=" border-1 border-solid border-[#4A9D77] w-[100%] text-green-color rounded-[8px]"
                          onClick={() => setOpen(false)}
                        >
                          Cancel
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default OfferLetterTemplateModal;
