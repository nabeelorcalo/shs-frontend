import { useState } from "react";
import { Button, Col, Form, Input, Row, Typography } from "antd";
import { ArrowDownDark, BackButton, DocumentUpload } from "../../../../assets/images";
import { DropDown } from "../../../../components";


const Address = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={12} xl={12} lg={14} md={14} sm={24} xs={24}>
          
          <div className="form-wrapper">
            <div className="main-title-wrapper">
           
              <div className="flex">
                <div>
                  <BackButton />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={1}>Address</Typography.Title>
                </div>
              </div>

              <Typography className="steps-description">
                Provide your address details
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form.Item
                label="Post Code"
                name="postcode"
                rules={[
                  {
                    required: true,
                    message: "Please Select Valid Code!",
                  },
                ]}
              >
                <DropDown
                  name="Search"
                  value={value}
                  options={["search", "item 1"]}
                  setValue={setValue}
                  requireSearchBar
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                />
              </Form.Item>
              <Row gutter={20}>
                <Col xxl={12} xl={12}  xs={24}>
                  <Form.Item
                    label="Address"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Address!",
                      },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input
                      placeholder="Enter Address line"
                      className="input-style"
                    />
                  </Form.Item>
                </Col>
                <Col xxl={12} xl={12}  xs={24}>
                  <Form.Item
                    label="Street"
                    name="street"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Street!",
                      },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input
                      placeholder="Enter Street or location"
                      className="input-style"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col xxl={12} xl={12}  xs={24}>
                  <Form.Item
                    label="Town"
                    name="town"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Town!",
                      },
                    ]}
                    style={{ width: "100%" }}
                  >
                    <Input
                      placeholder="Enter Town line"
                      className="input-style"
                    />
                  </Form.Item>
                </Col>
                <Col xxl={12} xl={12}  xs={24}>
                  <Form.Item
                    name="country"
                    label="Country"
                    rules={[
                      { required: true, message: "Please select Country!" },
                    ]}
                  >
                    <DropDown
                      name="Select"
                      value={value}
                      options={["item 1", "item 2", "item 3"]}
                      setValue={setValue}
                      startIcon={ArrowDownDark}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Proof of Address"
                name="proofofaddress"
                rules={[
                  {
                    required: true,
                    message: "Please Upload Valid Document!",
                  },
                ]}
                style={{ width: "100%", marginBottom: "20px" }} >
                <div className="dragger">
                  <Row className="p-3">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                      <Typography className="dragger-title">
                        Drag & drop files or
                        <span style={{ color: "#E95060" }}>Browse</span>
                      </Typography>
                      <Typography className="dragger-description">
                        Support jpeg,pdf and doc files
                      </Typography>
                    </Col>
                    <Col xxl={12} xl={12} lg={12}  md={12} sm={12}  xs={12}  className="flex justify-end" >
                    <DocumentUpload/>
                    </Col>
                  </Row>
                </div>
              </Form.Item>
              <Row gutter={[10,10]}>
                <Col xs={24} md={24} lg={12} xl={8}>
                  <Button className="btn-cancel btn-cancel-verification" >
                    Skip
                  </Button>
                </Col>
                <Col xs={24} md={24} lg={12} xl={16}>
                  <Form.Item>
                    <Button
                      type="primary" 
                      className="login-form-button"
                      onClick={() => {
                        setCurrentStep(6);
                      }}
                    >
                      Next
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Address;
