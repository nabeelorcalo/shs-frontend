import React from "react";
import { Button, Col, Form, Input, Row, Space, Typography } from "antd";
import { rewardForm } from "./rewardMock";
import "../../style.scss";


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
                <Col xxl={3} xl={4} lg={4} md={24} sm={24} xs={24}>
                  <Typography className="text-xl font-medium text-secondary-color">
                    {item.mainLable}
                  </Typography>
                </Col>
                <Col xxl={6} xl={8} lg={10} md={24} sm={24} xs={24}>
                  <Typography className="text-base font-semibold text-teriary-color ">
                    {item.lableOne}
                  </Typography>
                  <Input
                    placeholder={item.placeHolderOne}
                    size="large"
                    className="text-input-bg-color rounded-[8px]"
                  />
                </Col>
                <Col xxl={6} xl={8} lg={10} md={24} sm={24} xs={24}>
                  <Typography className="text-base font-semibold text-teriary-color ">
                    {item.lableTwo}
                  </Typography>
                  <Input
                    placeholder={item.placeHolderTwo}
                    size="large"
                    className="text-input-bg-color rounded-[8px]"
                  />
                </Col>
              </Row>
            </>
          );
        })}

        <Typography className="flex justify-center sm:justify-end">
          <Space>
            <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
              Cancel
            </Button>
            <Button
              className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
              htmlType="submit"
            >
              Submit
            </Button>
          </Space>
        </Typography>
      </Form>
    </div>
  );
};

export default Rewards;
