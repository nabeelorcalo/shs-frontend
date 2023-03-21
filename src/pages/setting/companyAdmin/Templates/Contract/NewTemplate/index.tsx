import React, { useState } from "react";
import {
  Divider,
  Button,
  Form,
  Row,
  Col,
  Space,
  Input,
  Typography,
} from "antd";
import ReactQuill, { Quill } from "react-quill";
import "quill/dist/quill.snow.css";
import NewTemplateCommonBreadcrum from "../../../../../../components/Setting/Common/NewTemplateCommonBreadcrum";
import { BoxWrapper } from "../../../../../../components/BoxWrapper/BoxWrapper";
import "./style.scss";
import { textEditorData } from "../../../../../../components/Setting/Common/TextEditsdata";
const { Title, Paragraph } = Typography;

const NewTemplateContract = () => {
  const [form] = Form.useForm();
  const [textEditorValue, setTextEditorValue] = useState();
  const onChangeHandler = (e: any) => {
    setTextEditorValue(e)
  }

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    const formData = { 
      subject : values.subject,
      templateName :values.templateName,
      description:textEditorValue
    }
  };

  return (
    <div className="offer-letter-new-template">
      <NewTemplateCommonBreadcrum
        currentPageName="Contract"
        perviousPageLink="/settings/template/contract"
      />
      <Divider className="my-1 mb-3" />
      <BoxWrapper>
        <Form layout="vertical" form={form}>
          {/*------------------------ Template----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
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
                rules={[{ required: true, message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter name" className="" />
              </Form.Item>
              <Form.Item
               required={false}
                name="subject"
                label="Subject"
                rules={[{ required: true, message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter subject" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description (optional)"
              >
                <div className="text-input-bg-color rounded-lg text-editor  my-2">
                  <ReactQuill theme="snow" value={textEditorValue} onChange={onChangeHandler} modules={textEditorData} />
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Space className="flex justify-end pt-5">
            <Button danger size="middle" type="primary">
              Cencal
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
    </div>
  );
};

export default NewTemplateContract;


