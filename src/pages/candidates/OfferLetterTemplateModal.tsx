import "./style.scss";
import { Row, Col, Button, Modal } from "antd";
import { CloseCircleIcon } from "../../assets/images";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { textEditorData } from "../../components/Setting/Common/TextEditsdata";
import { useRecoilValue } from "recoil";
import { currentUserState } from "../../store";

const OfferLetterTemplateModal = (props: any) => {
  const { open, setOpen, handleOfferLetterTemplate, templateValues, selectedCandidate, setTemplateValues } = props;
  const loggedinUser = useRecoilValue(currentUserState);
  const senderInfo = [
    {
      label: "Full Name",
      title: `${loggedinUser?.firstName} ${loggedinUser?.lastName}`,
    },
    {
      label: "Address",
      title:
        loggedinUser?.city || loggedinUser?.country
          ? `${loggedinUser?.city ?? ""} ${loggedinUser?.country ?? ""}`
          : "N/A",
    },
    {
      label: "Hereinafter referred to as",
      title: "Sender",
    },
  ];
  const receiverInfo = [
    {
      label: "Full Name",
      title: `${selectedCandidate?.userDetail?.firstName} ${selectedCandidate?.userDetail?.lastName}`,
    },
    {
      label: "Address",
      title:
        selectedCandidate?.userDetail?.city || selectedCandidate?.userDetail?.country
          ? `${selectedCandidate?.userDetail?.city ?? ""} ${selectedCandidate?.userDetail?.country ?? ""}`
          : "N/A",
    },
    {
      label: "Hereinafter referred to as",
      title: "Receiver",
    },
  ];
  const onChangeHandler = (e: any) => {
    setTemplateValues({ ...templateValues, description: e });
  };

  const onCancel = () => {
    setOpen(false);
    setTemplateValues({ subject: "", description: "" });
  };

  return (
    <div className="Modal">
      <Modal
        closeIcon={<img src={CloseCircleIcon} />}
        title="Offer Letter"
        open={open}
        onCancel={onCancel}
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
                        value={templateValues?.description}
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
                          onClick={onCancel}
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
