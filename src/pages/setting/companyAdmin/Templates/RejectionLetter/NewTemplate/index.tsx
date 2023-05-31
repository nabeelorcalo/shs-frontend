import { useEffect, useState } from "react";
import {
  Divider, Button, Form, Row, Col,
  Space, Input, Typography,
} from "antd";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { textEditorData } from "../../../../../../components/Setting/Common/TextEditsdata";
import { NavLink, useLocation } from "react-router-dom";
import { Breadcrumb, BoxWrapper } from "../../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../../config/constants";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../../config/validationMessages";
import "./style.scss";
import useTemplatesCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../../../../../store";

const { Title, Paragraph } = Typography;

const NewTemplateRejectionLetter = () => {
  const breadcrumbArray = [
    { name: "New Template" },
    { name: "Setting" },
    { name: "Template", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Rejection Letter", onClickNavigateTo: `${ROUTES_CONSTANTS.TEMPLATE_REJECTION_LETTER}` },
  ];
  const [form] = Form.useForm();
  const { state: templateData }: any = useLocation();
  const [description, setDescription] = useState('');
  const { postNewTemplate, editTemplate }: any = useTemplatesCustomHook();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);


  console.log(templateData);

  const onFinish = (values: any) => {
    const newValues = {
      ...values,
      textEditorValue: description,
      templateType: templateData?.templateType ?? templateData?.type,
    }
    if (templateData?.templateType) {
      postNewTemplate(newValues);
    } else {
      console.log('edit');

      editTemplate(templateData?.id, newValues, currentUser?.company?.id);
    }
    form.resetFields();
    setDescription('')

  };
  const initialValues = {
    templateName: templateData?.name,
    subject: templateData?.subject,
    description: templateData?.description
  }
  useEffect(() => {
    setDescription(templateData?.description)
  }, [templateData?.description])
  // const [form] = Form.useForm();
  // const [textEditorValue, setTextEditorValue] = useState();
  // const onChangeHandler = (e: any) => {
  //   setTextEditorValue(e)
  // }

  // const onFinish = (values: any) => { }

  return (
    <div className="rejection-letter-new-template">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider className="my-1 mb-3" />
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
              {/* <Form.Item
                name="description"
                label="Description (optional)"
              >
                <div className="text-input-bg-color rounded-lg text-editor my-2">
                  <ReactQuill theme="snow" value={textEditorValue} onChange={onChangeHandler} modules={textEditorData} />
                </div>
              </Form.Item> */}
            </Col>
          </Row>
          <Space className="flex justify-end pt-5">
            <Button danger size="middle" type="primary">
              <NavLink to={ROUTES_CONSTANTS.TEMPLATE_REJECTION_LETTER} className="border-0">
                Cancel
              </NavLink>
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

export default NewTemplateRejectionLetter;



