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
import NewTemplateCommonBreadcrum from "../../../../../components/Setting/Common/NewTemplateCommonBreadcrum";
import { BoxWrapper } from "../../../../../components/BoxWrapper/BoxWrapper";
import './style.scss'
const { Title, Paragraph } = Typography;
const { TextArea } = Input;
const index = () => {
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
        perviousPageName="Offer Letter"
        perviousPageLink="/settings/template/template-offer-letters"
      />
      <Divider className="my-1 mb-3" />
      <BoxWrapper>
        <Form layout="vertical">
          {/*------------------------ Policy Details----------------------------- */}
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
                label="Policy Name"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter name"  className=""/>
              </Form.Item>
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter subject" />
              </Form.Item>
              <div className="mt-3 flex flex-col">
                <label>Description (optional)</label>
                <TextArea
                className="text-input-bg-color "
                  rows={6}
                  placeholder="Write Something..."
                  maxLength={6}
                />
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

export default index;
