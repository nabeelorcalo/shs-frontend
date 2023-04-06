import React, { useState } from "react";
import { Button, Modal, Space, Switch } from "antd";
import { Col, Form, Input, Row } from "antd";
import "../../../style.scss";
import upload from "../../../../../assets/images/profile/student/Upload.svg";
import { cardArr } from "./cardMock";
import { CloseCircleFilled } from "@ant-design/icons";
import { CommonDatePicker } from "../../../../../components";
import { DeleteIcon } from '../../../../../assets/images';
import CardUsers from "./userCards";


const CardTabs = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
            {/* <div className="animate">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <img src={item.img} alt="" />
                  <div className="ml-2">
                    <Typography>{item.name}</Typography>
                    <Typography>Exp. date: {item.expDate}</Typography>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="white-bg-color rounded-lg h-10 w-10">
                    <img
                      src={upload}
                      alt=""
                      className="flex justify-center items-center m-auto pt-3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <Divider /> */}
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
          <CloseCircleFilled style={{ color: "#A3AED0", fontSize: "20px" }} />
        }
        footer={[
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] text-[#4A9D77] font-semibold">
                Cancel
              </Button>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-[#4a9d77] text-white border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
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
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[
                  { required: true, message: "Please input your Cars Number!" },
                ]}
              >
                <Input className="input-style" />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Card Holder"
                name="dob"
                rules={[{ required: true, message: "Enter Name!" }]}
              >
                <Input className="input-style" />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Expiration Date"
                name="companyname"
                rules={[
                  {
                    required: true,
                    message: "Please input your Company Name!",
                  },
                ]}
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
