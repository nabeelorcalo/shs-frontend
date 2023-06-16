import { useEffect, useState } from "react";
import {
  Divider, Button, Form, Row, Col,
  Space, Input, Typography
} from "antd";
import ReactQuill from "react-quill";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../../config/validationMessages";
import { textEditorData } from "../../../../../../components/Setting/Common/TextEditsdata";
import { Breadcrumb, BoxWrapper } from "../../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../../config/constants";
import useTemplatesCustomHook from "../../actionHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { currentUserState } from "../../../../../../store";
import { useRecoilState } from "recoil";
import "quill/dist/quill.snow.css";
import "./style.scss";



const NewTemplateContract = () => {
  const [description, setDescription] = useState('');

  const [form] = Form.useForm();
  const { Title, Paragraph } = Typography;
  const navigate = useNavigate();
  const { state: templateData }: any = useLocation();
  const { postNewTemplate, editTemplate }: any = useTemplatesCustomHook();
  const currentUser = useRecoilState(currentUserState);

  useEffect(() => {
    setDescription(templateData?.description)
  }, [templateData?.description])

  const breadcrumbArray = [
    { name: "New Template" },
    { name: "Settings", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Template", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Contract", onClickNavigateTo: `${ROUTES_CONSTANTS.TEMPLATE_CONTRACT}` },
  ];

  const initialValues = {
    templateName: templateData?.name,
    subject: templateData?.subject,
    description: templateData?.description
  }

  const onFinish = (values: any) => {
    const newValues = {
      ...values,
      textEditorValue: description,
      templateType: templateData?.templateType ?? templateData?.type,
    }
    if (templateData?.templateType) {
      postNewTemplate(newValues, ROUTES_CONSTANTS.TEMPLATE_CONTRACT);
    } else {
      editTemplate(templateData?.id, newValues,
        currentUser[0]?.company?.id, ROUTES_CONSTANTS.TEMPLATE_CONTRACT);
    }
    form.resetFields();
    setDescription('')
  };

  return (
    <div className="offer-letter-new-template">
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
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                required={false}
                name="templateName"
                label="Template Name"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter name" className="input-style" />
              </Form.Item>
              <Form.Item
                required={false}
                name="subject"
                label="Subject"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter subject" className="input-style" />
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
          <Space className="flex justify-end pt-5">
            <Button danger size="middle" type="primary"
              onClick={() => {
                form.resetFields();
                navigate(ROUTES_CONSTANTS.TEMPLATE_CONTRACT, { state: templateData?.templateType ?? templateData?.type })
              }}>
              Cancel
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              htmlType="submit"
            >
              Save
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
    </div>
  );
};

export default NewTemplateContract;


