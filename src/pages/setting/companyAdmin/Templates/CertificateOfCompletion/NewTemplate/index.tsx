import { useEffect, useRef, useState } from "react";
import {
  Divider, Button, Form, Row, Col,
  Space, Input, Typography, Radio
} from "antd";
import type { RadioChangeEvent } from 'antd';
import ReactQuill from "react-quill";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../../config/validationMessages";
import { textEditorData } from "../../../../../../components/Setting/Common/TextEditsdata";
import { Breadcrumb, PopUpModal, BoxWrapper, ButtonThemePrimary } from "../../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CertificateEyeIcon,
  CertificateTickCircle,
  TemplateCertificateLarger,
  TemplateCertificateSmall,
} from "../../../../../../assets/images";
import useTemplatesCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../../../../../store";
import "quill/dist/quill.snow.css";
import "./style.scss";

const { Paragraph } = Typography;

const NewTemplateCertiticationOfCompletion = () => {
  const MAX_LENGTH = 350; // Change this value to set the maximum length
  const quillRef: any = useRef(null);
  const { state: templateData }: any = useLocation();
  const [templateDesign, setTemplateDesign] = useState(templateData?.templateDesign ?? 'COMPLETION_CERTIFICATE_TEMPLATE_ONE');
  const [activeCertificate, setActiveCertificate] = useState<null | number | any>(templateData?.attachment?.filename === 'COMPLETION_CERTIFICATE_TEMPLATE_TWO' ? 2 : 1)
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [description, setDescription] = useState('');

  const { postNewTemplate, editTemplate }: any = useTemplatesCustomHook();
  const currentUser = useRecoilState(currentUserState);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    setDescription(templateData?.description)
  }, [templateData?.description])

  const initialValues = {
    templateName: templateData?.name,
    subject: templateData?.subject,
    description: templateData?.description,
    templateDesign: templateData?.attachment?.filename
  }

  const breadcrumbArray = [
    { name: "New Template" },
    { name: "Settings", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Template", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Certificate of Completion", onClickNavigateTo: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION}` },
  ];

  const templateArray = [
    {
      id: 1,
      value: "COMPLETION_CERTIFICATE_TEMPLATE_ONE",
      template: TemplateCertificateSmall,
      name: 'Template 1'
    },
    {
      id: 2,
      value: "COMPLETION_CERTIFICATE_TEMPLATE_TWO",
      template: TemplateCertificateSmall,
      name: 'Template 2'
    }
  ]

  const onRadioChange = (e: RadioChangeEvent) => {
    setTemplateDesign(e.target.value);
  };

  useEffect(() => {
    const quillInstance = quillRef?.current.getEditor();
    quillInstance.on('text-change', handleEditorChange);
    return () => {
      quillInstance.off('text-change', handleEditorChange);
    };
  }, []);

  const handleEditorChange = (value: any) => {
    const quillInstance = quillRef.current.getEditor();
    const plainText = quillInstance.getText().trim();
    if (plainText.length <= MAX_LENGTH) {
      setDescription(quillInstance.root.innerHTML);
    } else {
      quillInstance.deleteText(MAX_LENGTH, plainText.length);
    }
  };

  const onFinish = (values: any) => {
    const newValues = {
      ...values,
      textEditorValue: description,
      templateType: templateData?.templateType ?? templateData?.type,
    }
    if (templateData?.templateType) {
      postNewTemplate(newValues, ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION);
    } else {
      editTemplate(templateData?.id, newValues, currentUser[0]?.company?.id, ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION);
    }
    form.resetFields();
    setDescription('')
  };

  return (
    <div className="certificate-of-completion-new-template">

      <Breadcrumb
        breadCrumbData={breadcrumbArray}
        hasNavigateState={{ state: templateData?.templateType ?? templateData?.type }}
      />

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
              <p className="mt-0.5 text-primary-title-color font-semibold text-xl">
                Template
              </p>
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
                    ref={quillRef}
                    value={description}
                    onChange={handleEditorChange}
                    modules={textEditorData}
                  />
                </div>
                <div className="editor-details flex justify-between items-center">
                  {description?.length > 0 && <small className="text-gray-400">Characters remaining:
                    {MAX_LENGTH - description?.replace(/<[^>]+>/g, '')?.length} </small>}
                  <small className="text-gray-400 float-right">(Limit:{MAX_LENGTH})</small>
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Divider />
          {/*------------------------ Select Design----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} lg={8} xxl={8}>
              <p className="mt-0.5 text-primary-title-color font-semibold text-xl">
                Select Design
              </p>
              <Paragraph>Select the design of the certificate</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={16} xl={12}>
              <Form.Item name='templateDesign'>
                <Radio.Group onChange={onRadioChange} value={templateDesign}>
                  <Row gutter={[20, 20]}>
                    {templateArray?.map((item: any, index: number) => {
                      return (
                        <Col key={index} className="gutter relative" xs={24} lg={12} xl={12}>
                          <Radio value={item?.value}>
                            <div
                              onClick={() => setActiveCertificate(item.id)}
                              style={{ border: `2px solid ${activeCertificate === item?.id ? "rgb(61, 197, 117)" : "#fff"}` }}
                              className="cursor-pointer certificate-card">
                              {activeCertificate === item?.id && (
                                <CertificateTickCircle className="absolute certificate-tick-circle" />
                              )}
                              <div className="card-image-box ">
                                <span className="flex justify-center p-5 image">
                                  <item.template alt="template" className="background-img" />
                                </span>
                                <div
                                  className="middle"
                                  onClick={() => { setShowEditModal(!showEditModal) }}>
                                  <CertificateEyeIcon className='eye-icon text' height={45} width={45} />
                                </div>
                              </div>
                              <Divider />
                              <p className="text-center  font-medium text-base">
                                {item?.name}
                              </p>
                            </div>
                          </Radio>
                        </Col>)
                    })}
                  </Row>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Space className="flex justify-end pt-5 max-sm:flex-col">
            <Button
              danger
              size="middle"
              type="primary"
              onClick={() => {
                form.resetFields();
                navigate(ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION,
                  { state: templateData?.templateType ?? templateData?.type })
              }}>
              Cancel
            </Button>
            <ButtonThemePrimary htmlType="submit">
              {templateData.description ? 'Update' : 'Save'}
            </ButtonThemePrimary>
          </Space>
        </Form>
      </BoxWrapper>
      <PopUpModal
        open={showEditModal}
        title="Preview"
        close={() => setShowEditModal(false)}
        width={900}
        footer={false} >
        <TemplateCertificateLarger />
      </PopUpModal>
    </div>
  );
};

export default NewTemplateCertiticationOfCompletion;
