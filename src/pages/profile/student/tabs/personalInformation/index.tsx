import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined, PlusCircleFilled, DeleteFilled, CaretDownOutlined } from '@ant-design/icons';
import { CommonDatePicker, DropDown } from "../../../../../components";
import { CalendarIcon } from "../../../../../assets/images";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import '../../../style.scss';
import { Option } from "antd/es/mentions";
import constants from "../../../../../config/constants";
import { useRecoilState } from "recoil";
import { studentProfileState } from "../../../../../store";
import useCustomHook from "../../../actionHandler";

const gender = [
  {
    key: "1",
    value: "male",
    label: "Male"
  },
  {
    key: "2",
    value: "female",
    label: "Female"
  },
  {
    key: "3",
    value: "others",
    label: "Other"
  }
];

const nationality = [
  {
    value: "afghani",
    label: "Afghanistani"
  },
  {
    value: "british",
    label: "British"
  },
  {
    value: "American",
    label: "American"
  },
  {
    value: "Canadian",
    label: "Canadian"
  },
  {
    value: "German",
    label: "German"
  }
];

const visa = [
  {
    value: 'studentVisa',
    label: 'Student Visa'
  },
  {
    value: 'postStudyWorkVisaPSW',
    label: 'Post Study Work Visa PSW'
  },
  {
    value: 'AppliedPublicHistory',
    label: 'Applied Public History'
  },
  {
    value: 'WorkPermit',
    label: 'Work Permit'
  },
  {
    value: 'DependentonWorkPermit',
    label: 'Dependent on Work Permit'
  },

];

const countryOptions = [
  {
    key: "1",
    value: "PK",
    label: "Pakistan"
  },
  {
    key: "2",
    value: "UK",
    label: "United Kingdom"
  },
  {
    key: "3",
    value: "Bj",
    label: "Beljium"
  },
]

const PersonalInformation = () => {
  const action = useCustomHook();
  const [value, setValue] = useState('');
  const [isdate1, setIsDate1] = useState(false);
  const [isDependents, setIsDependents] = React.useState(2);
  const [dependents, setDependents] = React.useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const personalInformation = useRecoilState<any>(studentProfileState);
  const [form] = Form.useForm();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log('updated', values);
    action.updateStudentProfile({
      personalInfo: {
        gender: values.gender,
        DOB: '18-08-1997',
        birthPlace: values.birthPlace,
        nationality: values.nationality,
        personalEmail: values.email,
        phoneCode: '+92',
        phoneNumber: values.phoneNumber,
        insuranceNumber: values.insuranceNumber,
        visaStatus: values.visaStatus,
        delegateRef: values.delegateRef,
        aboutMe: values.aboutMe,
        postCode: values.postCode,
        houseNo: values.houseNo,
        street: values.street,
        city: values.city,
        country: values.country,
        hobbies: [values.hobbies ?? ''],
        allergies: [values.allergies ?? ''],
        medicalCondition: values.medicalCondition,
        skills: [values.skills ?? ''],
        haveDependents: values.haveDependents,
      }
    }
    )
  };
  // get api
  useEffect(() => {
    action.getStudentProfile()
      .then((data: any) => {
        form.setFieldsValue({
          firstName: data?.user?.firstName,
          lastName: data?.user?.lastName,
          gender: data?.user?.gender,
          birthPlace: data?.personal?.birthPlace,
          nationality: data?.personal?.nationality,
          email: data?.user?.email,
          DOB: data?.user?.dob,
          insuranceNumber: data?.personal?.insuranceNumber,
          visaStatus: data?.personal?.visaStatus,
          delegateRef: data?.personal?.delegateRef,
          aboutMe: data?.personal?.aboutMe,
          houseNo: data?.personal?.houseNo,
          street: data?.user?.street,
          country: data?.user?.country,
          city: data?.user?.city,
          medicalCondition: data?.personal?.medicalCondition,
          haveDependents: data?.personal?.haveDependents,
        });
      })
  }, [form])

  return (
    <div className="personal-information">
      <Form
        name="basic"
        layout="vertical"
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <div>
          <Typography className="title">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input className="input-style" disabled />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input className="input-style" disabled />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder='Select' onChange={handleChange} >
                {gender?.map((item: any) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Place Of Birth"
              name="birthPlace"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter your Birth Place" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder='Select'>
                {nationality?.map((item: any) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: false }, { type: "date" }]}
            >
              <CommonDatePicker
                requireAsButton
                btnIcon={CalendarIcon}
                btnClassName={'h-[48px]'}
                placement="bottomLeft"
                open={isdate1}
                setOpen={setIsDate1}
                setValue={setValue} />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Personal Email"
              name="email"
              rules={[{ required: false }, { type: "email" }]}
            >
              <Input placeholder="Enter your Email" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: false },
                {
                  pattern: /^[+\d\s()-]+$/,
                  message: "Please enter valid phone number  ",
                },
                {
                  min: 6,
                  message: "Please enter a valid phone number with a minimum of 6 digits",
                },
              ]}
            >
              <Input placeholder="Enter Phone Number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="National Ensurance Number"
              name="insuranceNumber"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Ensurance Number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Visa Status"
              name="visaStatus"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select
                onChange={handleChange}
                size="middle"
                suffixIcon={<CaretDownOutlined />}
              >
                {visa?.map((option: any) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Delegate Refrence Number"
              name="delegateRef"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Refrence Number" className="input-style" disabled/>
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
              label="Description"
              name="aboutMe"
              rules={[{ required: false }, { type: "string" }]}
            >
              <TextArea rows={4} placeholder="Write about yourself" maxLength={6}
                className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Address</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="postCode"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter PostCode" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="House No"
              name="houseNo"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter House Number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Street Number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ type: "string" }, { required: false }]}
            >
              <Select
                placeholder='Select Country type'
                size="middle"
                suffixIcon={<CaretDownOutlined />}
              >
                {countryOptions.map((option: any) => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter City" className="input-style" />
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
              rules={[{ required: false }, { type: "string" }]}
            >
              <Button className="text-input-bg-color border-0 rounded-[14.5px]"
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Allergies"
              name="username"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Button
                className="text-input-bg-color border-0 rounded-[14.5px]"
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Medical Condition"
              name="medicalCondition"
              rules={[{ required: false }, { type: "string" }]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              name='haveDependents'
              label="Do you have Dependies"
            >
              <Radio.Group
                name="radiogroup"
                defaultValue={2}
                onChange={(e) => {
                  setIsDependents(e.target.value);
                }}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
            {isDependents === 1 && (
              <Col xxl={8} xl={8} lg={8} md={8} sm={24} xs={24}>
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[{ required: false }, { type: "string" }]}
                >
                  <div className="flex gap-4">
                    <Input placeholder="Enter name" className="input-style" />
                    <div
                      onClick={() => {
                        const copyDependents = [...dependents];
                        copyDependents.push({ label: "", name: "" });
                        setDependents(copyDependents);
                      }}
                    >
                      <div className="teriary-bg-color pr-3 pl-3 pt-1 pb-1 rounded-lg">
                        <PlusCircleFilled className="text-3xl white-color" />
                      </div>
                    </div>
                  </div>
                  {dependents.map((item: any, index: any) => (
                    <div className="flex gap-4">
                      <Input />
                      <div
                        onClick={() => {
                          const copyDependents = [...dependents];
                          copyDependents.splice(index + 1, 1);
                          setDependents(copyDependents);
                        }}
                      >
                        <div className="red-graph-tooltip-bg pr-3 pl-3 pt-1 pb-1 rounded-lg">
                          <DeleteFilled className="text-3xl white-color" />
                        </div>
                      </div>
                    </div>
                  ))}
                </Form.Item>
              </Col>
            )}
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] 
                ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInformation;
