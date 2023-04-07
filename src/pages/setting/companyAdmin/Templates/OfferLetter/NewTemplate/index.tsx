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
import { textEditorData } from "../../../../../../components/Setting/Common/TextEditsdata";
import { Breadcrumb ,BoxWrapper } from "../../../../../../components";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../../../config/constants";
const { Title, Paragraph } = Typography;

const NewTemplateOfferLetter = () => {
  const navigate = useNavigate();
  const breadcrumbArray = [
    { name: "New Template"},
    { name: "Setting"  },
    { name: "Template" , onClickNavigateTo:`/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}`  },
    { name: "Offer Letter" , onClickNavigateTo:`${ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER}` },
  ];
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
       <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider/>
      <BoxWrapper>
        <Form layout="vertical" form={form}>
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
                <div className="text-input-bg-color rounded-lg  my-2 text-editor">
                  <ReactQuill theme="snow" value={textEditorValue} onChange={onChangeHandler} modules={textEditorData} />
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Space className="flex justify-end pt-5">
            <Button danger size="middle" type="primary" 
            onClick={()=>navigate("/settings/template/template-offer-letters")} >
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

export default NewTemplateOfferLetter;
