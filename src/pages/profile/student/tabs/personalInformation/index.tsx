import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  PlusOutlined,
  PlusCircleFilled,
  DeleteFilled,
  CaretDownOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { CommonDatePicker, DropDown } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import "../../../style.scss";
import { Option } from "antd/es/mentions";
import { useRecoilState, useRecoilValue } from "recoil";
import { studentProfileState } from "../../../../../store";
import useCustomHook from "../../../actionHandler";
import UserSelector from "../../../../../components/UserSelector";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import {
  nationalityList,
  newCountryListState,
} from "../../../../../store/CountryList";
import CountryCodeSelect from "../../../../../components/CountryCodeSelect";
import dayjs from "dayjs";
import DataPill from "../../../../../components/DataPills";
import Dependents from "./Dependents";

const visa = [
  {
    value: "Student Visa",
    label: "Student Visa",
  },
  {
    value: "Post Study Work Visa PSW",
    label: "Post Study Work Visa PSW",
  },
  {
    value: "Applied Public History",
    label: "Applied Public History",
  },
  {
    value: "Work Permit",
    label: "Work Permit",
  },
  {
    value: "Dependent on Work Permit",
    label: "Dependent on Work Permit",
  },
];

const PersonalInformation = () => {
  const action = useCustomHook();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const nationalities = useRecoilValue(nationalityList);
  const [studentInformation, setStudentInformation] =
    useRecoilState<any>(studentProfileState);

  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const [updateData, setUpdateData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { personalInfo = {}, general: generalInfo = {} } =
    studentInformation || {};
  const {
    hobbies = [],
    allergies = [],
    dependents = [],
    haveDependents = false,
  } = personalInfo;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    setLoading(true);
    let payload = {
      generalInfo,
      personalInfo: {
        ...personalInfo,
        ...values,
        dependents: values?.dependents?.length === 0 ? [] : values?.dependents,
        haveDependents: values?.dependents?.length === 0 ? false : true,
      },
    };
    console.log("updated", values, payload);
    action.updateStudentProfile(payload, () => {
      setUpdateData(true);
      setLoading(false);
    });
  };

  // get api
  useEffect(() => {
    getCountriesList();
    action.getStudentProfile().then((data: any) => {
      form.setFieldsValue(personalInfo);
    });
  }, [form, updateData]);

  const onNewPillList = (name: string, list: string[]) => {
    setStudentInformation((oldVal: any) => {
      let personalInfo = JSON.parse(JSON.stringify(oldVal.personalInfo));
      form.setFieldValue(name, list);
      personalInfo[name] = list;
      return {
        ...oldVal,
        personalInfo,
      };
    });
  };

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
        <Row gutter={20} className="mt-8 -mb-5">
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
              <Select placeholder="Select" onChange={handleChange}>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Place Of Birth"
              name="birthPlace"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter your Birth Place"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: false }, { type: "string" }]}
            >
              {/* <Select placeholder='Select'>
                {nationality?.map((item: any) => (
                  <Option value={item.value}>{item.label}</Option>
                ))}
              </Select> */}
              <UserSelector
                showInnerSearch={true}
                options={nationalities}
                placeholder="Select Nationality"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Date of Birth"
              name="DOB"
              rules={[{ required: false }]}
            >
              <CommonDatePicker
                open={open}
                setOpen={setOpen}
                // disabledDates={disabledDate}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Personal Email"
              name="personalEmail"
              rules={[{ required: false }, { type: "email" }]}
            >
              <Input
                placeholder="Enter your Email"
                className="input-style"
                disabled
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} className="p-0">
            <Form.Item name="phoneCode" label="Phone Code">
              <CountryCodeSelect />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} className="p-0">
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
                  message:
                    "Please enter a valid phone number with a minimum of 6 digits",
                },
              ]}
            >
              <Input
                placeholder="Enter Phone Number"
                className="input-style w-[100%]"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="National Ensurance Number"
              name="insuranceNumber"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Ensurance Number"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Visa Status"
              name="visaStatus"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select size="middle" suffixIcon={<CaretDownOutlined />}>
                {visa?.map((option: any) => (
                  <Option value={option.value}>{option.label}</Option>
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
              <Input
                placeholder="Enter Refrence Number"
                className="input-style"
                disabled
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider className="mb-10" />
        <div>
          <Typography className="title">About Me</Typography>
        </div>
        <Row className="mt-5 -mb-5">
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Description"
              name="aboutMe"
              rules={[{ required: false }, { type: "string" }]}
            >
              <TextArea
                rows={4}
                placeholder="Write about yourself"
                maxLength={200}
                className="input-style"
              />
            </Form.Item>
          </Col>
        </Row>
        <Divider className="mb-10" />
        <div>
          <Typography className="title">Address</Typography>
        </div>
        <Row gutter={20} className="mt-5 -mb-5">
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
              <Input
                placeholder="Enter Street Number"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: false }, { type: "string" }]}
            >
              <UserSelector
                hasSearch
                options={countries}
                placeholder="Select Country"
              />
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
        <Divider className="mb-10" />
        <div>
          <Typography className="title">Others</Typography>
        </div>
        <Row className="mt-5 -mb-5">
          <Col
            xxl={24}
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="flex items-center gap-4"
          >
            <Form.Item label="Hobbies" name="hobbies">
              <DataPill
                name="hobbies"
                initialValue={hobbies}
                addInput
                onNewAddition={onNewPillList}
              />
            </Form.Item>
          </Col>
          <Col
            xxl={24}
            xl={24}
            lg={24}
            md={24}
            sm={24}
            xs={24}
            className="flex items-center gap-4"
          >
            <Form.Item label="Allergies" name="allergies">
              <DataPill
                name="allergies"
                initialValue={allergies}
                addInput
                onNewAddition={onNewPillList}
              />
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Medical Condition"
              name="medicalCondition"
              rules={[{ required: false }, { type: "string" }]}
            >
              <TextArea
                rows={4}
                placeholder="Write here..."
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Dependents radioVal={haveDependents} initialList={dependents} />
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center md:justify-end mt-10">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77]
                ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
                loading={loading}
              >
                Save
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PersonalInformation;
