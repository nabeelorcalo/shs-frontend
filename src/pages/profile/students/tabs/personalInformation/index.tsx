import React from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Typography,
} from "antd";
import "../Tabs.scss";

import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";

const PersonalInformation = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const [isDependents, setIsDependents] = React.useState(2);
  const [dependents, setDependents] = React.useState<any>([]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="personal-information">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div>
          <Typography className="title">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">About Me</Typography>
        </div>
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Address</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Others</Typography>
        </div>
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Hobbies"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Button
                style={{
                  background: "#e6f4f9",
                  border: "none",
                  borderRadius: "14.5PX",
                }}
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Allergies"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Button
                style={{
                  background: "#e6f4f9",
                  border: "none",
                  borderRadius: "14.5PX",
                }}
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="radio"
              // name="username"
              //   rules={[
              //     { required: true, message: "Please input your username!" },
              //   ]}
            >
              <Radio.Group
                name="radiogroup"
                defaultValue={2}
                onChange={(e) => {
                  setIsDependents(e.target.value);
                }}
              >
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>No</Radio>
              </Radio.Group>
            </Form.Item>

            {isDependents === 1 && (
              <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <div className="flex gap-4">
                    <Input />{" "}
                    <div
                      onClick={() => {
                        const copyDependents = [...dependents];
                        copyDependents.push({ label: "", name: "" });
                        setDependents(copyDependents);
                      }}
                    >
                      add
                    </div>{" "}
                  </div>

                  {dependents.map((item: any, index: any) => (
                    <div className="flex gap-4">
                      <Input />
                      <div
                        onClick={() => {
                          const copyDependents = [...dependents];
                          copyDependents.splice(index+1, 1);
                          setDependents(copyDependents);
                        }}
                      >
                        {" "}
                        remove
                      </div>
                    </div>
                  ))}
                </Form.Item>
              </Col>
            )}
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInformation;
