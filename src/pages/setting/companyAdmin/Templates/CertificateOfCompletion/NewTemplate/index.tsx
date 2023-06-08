import { useEffect, useState } from "react";
import {
  Divider, Button, Form, Row, Col,
  Space, Input, Typography,
} from "antd";
import ReactQuill from "react-quill";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../../config/validationMessages";
import { textEditorData } from "../../../../../../components/Setting/Common/TextEditsdata";
import { Breadcrumb, PopUpModal, BoxWrapper } from "../../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CertificateEyeIcon,
  CertificateTickCircle,
  TemplateCertificateLarger,
  TemplateCertificateSmall,
} from "../../../../../../assets/images";
import "quill/dist/quill.snow.css";
import "./style.scss";
import useTemplatesCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../../../../../store";

const { Title, Paragraph } = Typography;

const NewTemplateCertiticationOfCompletion = () => {
  const [description, setDescription] = useState('');
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const { postNewTemplate, editTemplate }: any = useTemplatesCustomHook();
  const currentUser = useRecoilState(currentUserState);
  const { state: templateData }: any = useLocation();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setDescription(templateData?.description)
  }, [templateData?.description])

  const initialValues = {
    templateName: templateData?.name,
    subject: templateData?.subject,
    description: templateData?.description
  }

  const [borderColorfirst, setBorderColorfirst] = useState<any>({
    color: "white",
    toggle: false,
  });

  const [borderColorSecond, setBorderColorSecond] = useState<any>({
    color: "white",
    toggle: false,
  });

  const breadcrumbArray = [
    { name: "New Template" },
    { name: "Setting" },
    { name: "Template", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Certificate of Completion", onClickNavigateTo: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION}` },
  ];

  const FirstBorderHandler = () => {
    setBorderColorfirst({ color: "#3DC575", toggle: !borderColorfirst.toggle });
  };
  const SecondBorderHandler = () => {
    setBorderColorSecond({
      color: "#3DC575",
      toggle: !borderColorSecond.toggle,
    });
  };
  const NoBorderHandler = () => {
    setBorderColorfirst({ color: "#FFFFFF" });
  };
  const NoBorderHandler1 = () => {
    setBorderColorSecond({ color: "#FFFFFF" });
  };

  const onFinish = (values: any) => {
    const newValues = {
      ...values,
      textEditorValue: description,
      templateType: templateData?.templateType ?? templateData?.type,
    }
    if (templateData?.templateType) {
      postNewTemplate(newValues);
    } else {
      editTemplate(templateData?.id, newValues, currentUser[0]?.company?.id);
    }
    form.resetFields();
    setDescription('')
  };


  return (
    <div className="certificate-of-appreciation-new-template">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper>
        <Form layout="vertical"
          form={form}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
          initialValues={initialValues}
        >
          {/*------------------------ Template----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={8} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Template
              </Title>
              <Paragraph>Enter template details</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={14} xxl={8}>
              <Form.Item
                required={false}
                name="templateName"
                label="Template Name"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                required={false}
                name="subject"
                label="Subject"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter subject" />
              </Form.Item>
              <Form.Item name="description" label="Description (optional)">
                <div className="text-input-bg-color rounded-lg  my-2 text-editor">
                  <ReactQuill
                    theme="snow"
                    defaultValue={description}
                    value={description}
                    onChange={setDescription}
                    modules={textEditorData}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          {/*------------------------ Select Design----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} lg={8} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Select Design
              </Title>
              <Paragraph>Select the design of the certificate</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={16} xl={12}>
              <Row gutter={[16, 16]}>
                <Col className="gutter relative" xs={24} lg={12} xl={12}>
                  <BoxWrapper>
                    <div
                      style={{ border: `2px solid ${borderColorfirst.color}` }}
                      className="cursor-pointer certificate-card "
                    >
                      {borderColorfirst.toggle && (
                        <CertificateTickCircle className="absolute certificate-tick-circle" />
                      )}

                      <div className="card-image-box ">
                        <span className="flex justify-center p-5 image">
                          <TemplateCertificateSmall className=" background-img" />
                        </span>
                        <div
                          className="middle"
                          onClick={() => {
                            setShowEditModal(!showEditModal);
                          }}
                        >
                          <CertificateEyeIcon className='eye-icon text'
                            height={70}
                            width={70}
                          />
                        </div>
                      </div>
                      <Divider />
                      <p
                        className="text-center"
                        onClick={
                          borderColorfirst.toggle
                            ? NoBorderHandler
                            : FirstBorderHandler
                        }
                      >
                        Template 1
                      </p>
                    </div>
                  </BoxWrapper>
                </Col>
                <Col className="gutter relative" xs={24} lg={12} xl={12}>
                  <BoxWrapper>
                    <div
                      style={{ border: `2px solid ${borderColorSecond.color}` }}
                      className="cursor-pointer certificate-card "
                    >
                      {borderColorSecond.toggle && (
                        <CertificateTickCircle className="absolute certificate-tick-circle" />
                      )}
                      <div className="card-image-box ">
                        <span className="flex justify-center p-5 image">
                          <TemplateCertificateSmall className=" background-img" />
                        </span>
                        <div
                          className="middle"
                          onClick={() => {
                            setShowEditModal(!showEditModal);
                          }}
                        >
                          <CertificateEyeIcon className='eye-icon text'
                            height={70}
                            width={70}
                          />
                        </div>
                      </div>
                      <Divider />
                      <p
                        className="text-center"
                        onClick={
                          borderColorSecond.toggle
                            ? NoBorderHandler1
                            : SecondBorderHandler
                        }
                      >
                        Template 2
                      </p>
                    </div>
                  </BoxWrapper>
                </Col>
              </Row>
            </Col>
          </Row>
          <Space className="flex justify-end pt-5">
            <Button danger size="middle" type="primary"
              onClick={() => {
                form.resetFields();
                navigate(ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION,
                  { state: templateData?.templateType ?? templateData?.type })
              }}>
              Cancel
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              htmlType="submit"
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <PopUpModal
        open={showEditModal}
        title="Preview"
        width={900}
        close={() => setShowEditModal(false)}
      >
        <TemplateCertificateLarger />
      </PopUpModal>
    </div>
  );
};

export default NewTemplateCertiticationOfCompletion;
