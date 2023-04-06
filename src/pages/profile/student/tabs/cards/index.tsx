import React, { useState } from "react";
import { Button, Modal, Space, Switch } from "antd";
import { Col, Form, Input, Row } from "antd";
import upload from "../../../../../assets/images/profile/student/Upload.svg";
import { cardArr } from "./cardMock";
import { CloseCircleFilled } from "@ant-design/icons";
import { CommonDatePicker } from "../../../../../components";
import { DeleteIcon } from '../../../../../assets/images';
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import CardUsers from "./userCards";
import "../../../style.scss";


const CardTabs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  return (
    <div className="card-tabs">
      <div className='flex justify-end md:justify-center"'>
        <Button
          className="upload-button flex items-center justify-between"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={upload} alt="" /> Add Card
        </Button>
      </div>
      {cardArr.map((item, index) => {
        return (
          <>
            <CardUsers
              img={item.img}
              title={item.name}
              description={item.expDate}
              sideIcon={<DeleteIcon/>}
            />

          </>
        );
      })}
      <Modal
        open={isOpen}
        closeIcon={
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} onClick={() => setIsOpen(false)} />
        }
        footer={[
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}
                className="teriary-bg-color  white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </div>,
        ]}
        title="Add Card"
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input className="input-style" />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Card Holder"
                name="dob"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input className="input-style" />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Expiration Date"
                name="companyname"
                rules={[{ required: true }, { type: "string" }]}
              >
                <CommonDatePicker />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Switch />
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CardTabs;
