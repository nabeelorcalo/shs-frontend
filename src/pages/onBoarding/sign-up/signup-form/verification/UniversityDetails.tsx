import React, { useState } from "react";
import { Button, Col, Form, Input, Row, Typography, Select } from "antd";
import { SHSLogo, BackButton } from "../../../../../assets/images";
import {
  CommonDatePicker,
  DragAndDropUpload,
  DropDown,
  Notifications,
} from "../../../../../components";
import "../../../styles.scss";
import { CaretDownOutlined } from "@ant-design/icons";
import useCustomHook from "../../../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import CustomAutoComplete from "../../../../../components/CustomAutoComplete";
import dayjs from "dayjs";
const { Option } = Select;

const courses: any = [
  {
    value: "3D Interaction Design in Virtual Reality",
    label: "3D Interaction Design in Virtual Reality",
  },
  {
    value: "Accounting and Finance",
    label: "Accounting and Finance",
  },
  {
    value: "Applied Public History",
    label: "Applied Public History",
  },
  {
    value: "Dependent on Work Permit",
    label: "Dependent on Work Permit",
  },
  {
    value: "Art History Curatorship & Renaissance Culture",
    label: "Art History, Curatorship & Renaissance Culture",
  },
  {
    value: "Banking and Finance",
    label: "Banking and Finance",
  },
  {
    value: "Brand Management",
    label: "Brand Management",
  },
];

const UniversityDetails = (props: any) => {
  const { currentStep, setCurrentStep } = props;
  const [dynSkip, setDynSkip] = useState<boolean>(false);
  const [universityApproval, setUniversityApproval] = useState([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value, setValue] = useState<string>();
  const [value2, setValue2] = useState<string>();
  const { getUniversitiesList, verifcationStudent } = useCustomHook();
  const [form] = Form.useForm();

  const handleCourseChange = (value: any) => {
    form.setFieldValue("course", value);
    console.log(`selected ${value}`);
  };
  const onFinish = async (values: any) => {
    const { internshipStartDate: start, internshipEndDate: end } = values;
    if (start > end) {
      Notifications({
        title: "Error",
        description: `Invalid Internship dates`,
        type: "error",
      });
      return;
    }
    values.internshipStartDate = dayjs(start).format("YYYY");
    values.internshipEndDate = dayjs(end).format("YYYY");
    values.uniApproval = universityApproval[0];

    const payloadForm = new FormData();

    Object.keys(values).map((val: any) => {
      payloadForm.append(val, values[val]);
    });
    console.log("uni  : ", values);
    const response = await verifcationStudent(payloadForm, {
      step: 3,
      skip: dynSkip,
    });

    if (response.statusCode != 201) {
      Notifications({
        title: "Error",
        description: `Failed to add unviersity data`,
        type: "error",
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleUniSelect = (item: any) => {
    console.log(item);
    form.setFieldValue("university", item.id);
  };

  return (
    <div className="university-detail">
      <Row className="university-detail-style">
        <Col xxl={8} xl={9} lg={14} md={18} sm={24} xs={22}>
          <div className="logo-wrapper">
            <SHSLogo />
          </div>
          <div className="form-inner-wrapper">
            <div className="main-title-wrapper">
              <Typography className="steps">Step 3 of 7</Typography>
              <div className="flex items-center mt-3 mb-3">
                <div>
                  <BackButton
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                    }}
                  />
                </div>
                <div className="mx-auto">
                  <Typography.Title level={3}>
                    Univerisity Details
                  </Typography.Title>
                </div>
              </div>
              <Typography className="steps-description">
                Tell us about your university
              </Typography>
            </div>
            <div className="sign-up-form-wrapper">
              <Form
                form={form}
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: !dynSkip }}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
                onFinish={onFinish}
              >
                <Form.Item
                  label="University"
                  name="university"
                  rules={[{ required: false }]}
                  style={{ width: "100%", marginBottom: "20px" }}
                >
                  <CustomAutoComplete
                    fetchData={getUniversitiesList}
                    isUni={true}
                    selectItem={handleUniSelect}
                  />
                </Form.Item>
                <Form.Item
                  name="course"
                  label="Course"
                  rules={[{ required: false }]}
                >
                  <Select
                    onChange={handleCourseChange}
                    size="middle"
                    suffixIcon={<CaretDownOutlined />}
                  >
                    {courses?.map((option: any, index: any) => (
                      <Option key={index} value={option.value}>
                        {option.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="University Email"
                  name="universityMail"
                  rules={[{ type: "email" }, { required: false }]}
                >
                  <Input
                    placeholder="University Email"
                    className="input-style"
                  />
                </Form.Item>
                <Form.Item
                  name="graduationYear"
                  label="Graduation Year"
                  rules={[{ type: "string" }, { required: !dynSkip }]}
                >
                  <Input
                    placeholder="Enter Graduation Year"
                    className="input-style"
                  />
                </Form.Item>
                <Row gutter={10}>
                  <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                    <Form.Item
                      name="internshipStartDate"
                      label="Internship Start Date"
                    >
                      <CommonDatePicker
                        open={open}
                        setOpen={setOpen}
                        setValue={setValue}
                      />
                    </Form.Item>
                  </Col>
                  <Col xxl={12} xl={12} lg={12} md={12} xs={24}>
                    <Form.Item
                      name="internshipEndDate"
                      label="Internship End Date"
                    >
                      <CommonDatePicker
                        open={open2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item
                  label="Univeristy Approval"
                  name="uniApproval"
                  rules={[{ required: false }]}
                  className="mb-[20px]"
                >
                  <div className="dragger">
                    <DragAndDropUpload
                      files={universityApproval}
                      setFiles={setUniversityApproval}
                    />
                  </div>
                </Form.Item>
                <Row gutter={[10, 10]}>
                  <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
                    <Button
                      className="btn-cancel btn-cancel-verification"
                      onClick={() => {
                        setDynSkip(true);
                        verifcationStudent({}, { step: 3, skip: true }).then(
                          (data: any) => {
                            setCurrentStep(currentStep + 1);
                          }
                        );
                      }}
                    >
                      Skip
                    </Button>
                  </Col>
                  <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                      >
                        Next
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default UniversityDetails;
