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

const NewTemplateOfferLetter = () => {
  const [value, setValue] = useState();
  const [formValues, setFormValues] = useState<any>({
    templateName: "",
    subject: "",
    description: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="offer-letter-new-template">
      <NewTemplateCommonBreadcrum
       currentPageName ="Offer Letter"
       perviousPageLink="/settings/template/template-offer-letters"
    
      />
      <Divider className="my-1 mb-3" />
      <BoxWrapper>
        <Form layout="vertical">
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
                name="templateName"
                label="Template Name"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter name" className="" />
              </Form.Item>
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter subject" />
              </Form.Item>

              <label className="text-teriary-color">Description (optional)</label>
              <div className="text-input-bg-color rounded-lg  my-2">
                <ReactQuill theme="snow" value={value} modules={textEditorData} />
              </div>
            </Col>
          </Row>
          <Space className="flex justify-end pt-5">
            <Button danger size="middle" type="primary">
              Cencal
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
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
