import React, { useState } from "react";
import { Col, Form, Input, Modal, Row, Typography } from "antd";
import { CommonDatePicker } from "../../../../../components";
import "../../../style.scss";

const ImmigrationStatusForm = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="immigration-form">
      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Typography className="font-medium text-xl text-primary-title-color pb-3">What is the share code?</Typography>
            <Form.Item
              label="Share Code"
              name="sharecode"
              rules={[
                { required: true, message: "Please input your Share Code!" },
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Typography className="font-medium text-xl text-primary-title-color pb-3">What is the date of birth?</Typography>
            <Form.Item
              label="What is the date of birth?"
              name="DOB"
              rules={[
                { required: true, message: "Please input your Date OF Birth!" },
              ]}
            >
              <CommonDatePicker
                open={open}
                setOpen={setOpen}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <Typography className="font-medium text-xl text-primary-title-color pb-3">What is your Company Name?</Typography>
            <Form.Item
              label="What is the your company name?"
              name="companyname"
              rules={[
                { required: true, message: "Please input your Company Name!" },
              ]}
            >
              <Input className="input-style" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ImmigrationStatusForm;
