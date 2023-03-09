import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import React from "react";
import "../../style.scss";
import { rewardForm } from "./rewardMock";

const Rewards = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="rewards">
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {rewardForm.map((item, index) => {
          return (
            <>
              <Row gutter={30} className="mb-7 mt-5">
                <Col xxl={3} xl={3} lg={4} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-medium font-outfit text-[#4e4b66]">
                    {item.mainLable}
                  </Typography>
                </Col>
                <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
                  <Typography className="text-base font-semibold font-outfit text-[#6e7191]">
                    {item.lableOne}
                  </Typography>
                  <Input
                    placeholder={item.placeHolderOne}
                    size="large"
                    className="bg-[#E6F4F9] rounded-[8px]"
                  />
                </Col>
                <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
                  <Typography className="text-base font-semibold font-outfit text-[#6e7191]">
                    {item.lableTwo}
                  </Typography>
                  <Input
                    placeholder={item.placeHolderTwo}
                    size="large"
                    className="bg-[#E6F4F9] rounded-[8px]"
                  />
                </Col>
              </Row>
            </>
          );
        })}

        <Typography className="flex justify-center sm:justify-end">
          <Space>
            <Button className="border-1 border-[#4A9D77] text-[#4A9D77] font-semibold">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Space>
        </Typography>
      </Form>
    </div>
  );
};

export default Rewards;
