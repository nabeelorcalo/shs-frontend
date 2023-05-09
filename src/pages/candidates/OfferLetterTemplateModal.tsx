import { useState } from "react";
import "./style.scss";
import { Row, Col, Button, Modal } from "antd";
import { CloseCircleIcon } from "../../assets/images";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
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
  "<b><i>During the internship period,</i></b> the intern will have following responsibilities:1.Act as a strategic thought partner to the product, design and development teams2. Lead the design of useful, usable, and desirable products and solution3. Own the end-to-end process for user <b>research, wireframing, prototyping,</b> testing, mockups, final design and implementation4. Design complex navigation flows. Turn functional requirements into simple user journeys5. Establish and promote UX/UI design guidelines, best practices and standards based on user behavior";

const OfferLetterTemplateModal = (props: any) => {
  const { open, setOpen, handleOfferLetterTemplate } = props;
  const [textEditorValue, setTextEditorValue] = useState(details);
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
                    <div className="text-input-bg-color rounded-lg text-editor">
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
                          className=" w-[100%] green-graph-tooltip-bg rounded-[8px] white-color sign-send-btn"
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
