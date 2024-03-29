import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { CaretDownOutlined, } from "@ant-design/icons";
import { CommonDatePicker, DropDown } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import "../../../style.scss";
import { Option } from "antd/es/mentions";
import { useRecoilState, useRecoilValue } from "recoil";
import { studentProfileState } from "../../../../../store";
import useCustomHook from "../../../actionHandler";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import {
  nationalityList,
  newCountryListState,
  postalCodeState,
} from "../../../../../store/CountryList";
import DataPill from "../../../../../components/DataPills";
import Dependents from "./Dependents";
import { disabledDate } from "../../../../../helpers";
import { CalendarIcon } from "../../../../../assets/images";
import usePhoneNumberHook from "../../../../../helpers/phoneNumber";
import { PhoneInput } from 'react-international-phone';
import dayjs from "dayjs";
import postalCode from "../../../../../helpers/postalCodeRegex";

const visa = [
  {
    value: "Student Visa",
    label: "Student Visa",
  },
  {
    value: "PSW",
    label: "PSW",
  },
  {
    value: "Work Permit",
    label: "Work Permit",
  },
  {
    value: "Dependent on work permit",
    label: "Dependent on work permit",
  },
];

const PersonalInformation = () => {
  const action = useCustomHook();
  const { PhoneValidator, countryFlagCode, extractCountryCode, extractPhoneNumber } = usePhoneNumberHook();;
  const [phone, setPhone] = useState('');
  const [countryList, setCountryList] = useState('');
  const nationalities = useRecoilValue(nationalityList);
  const [studentInformation, setStudentInformation] = useRecoilState<any>(studentProfileState);
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const postalCodes = useRecoilValue<any>(postalCodeState);
  const { makeRegex } = postalCode();
  const [updateData, setUpdateData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const flag = countryFlagCode();

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
    const phoneCode = extractCountryCode(phone);
    const phoneNumber = extractPhoneNumber(phone)
    setLoading(true);
    let payload = {
      generalInfo,
      personalInfo: {
        ...personalInfo,
        ...values,
        phoneCode,
        phoneNumber,
        DOB: dayjs(values.DOB).format("YYYY-MM-DD"),
        dependents: values?.dependents?.length === 0 ? [] : values?.dependents,
        haveDependents: values?.dependents?.length === 0 ? false : true,
      },
    };
    action.updateStudentProfile(payload, () => {
      setUpdateData(true);
      setLoading(false);
    });
  };

  // get api
  useEffect(() => {
    getCountriesList();
    action.getStudentProfile().then((data: any) => {
      const updatedPhone = studentInformation?.personalInfo?.phoneCode + studentInformation?.personalInfo?.phoneNumber;
      form.setFieldsValue({ ...personalInfo, phoneNumber: updatedPhone });
      setPhone(studentInformation?.personalInfo?.phoneCode + studentInformation?.personalInfo?.phoneNumber)
    });
  }, [form, updateData]);

  const onNewPillList = (name: string, list: string[]) => {
    setStudentInformation((oldVal: any) => {
      let personalInfo = JSON.parse(JSON.stringify(oldVal.personalInfo));
      form.setFieldValue(name, list);
      personalInfo[name] = list;
      return {
        ...oldVal,
        personalInfo: {
          ...oldVal.personalInfo,
          [name]: list,
        },
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
        initialValues={{ phoneNumber: studentInformation?.personalInfo?.phoneCode + studentInformation?.personalInfo?.phoneNumber }}
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
              <Select
                showSearch
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
              <DatePicker
                disabledDate={disabledDate}
                format={"DD/MM/YYYY"}
                popupClassName={`common-datepicker-popup-wrapper`}
                suffixIcon={<img src={CalendarIcon} alt="icon" />}
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
          <Col xxl={8} xl={8} lg={12} md={24} xs={24}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              className={phone ? 'phone-input' : 'phone-input-error'}
              rules={[
                {
                  validator: (_, value) => PhoneValidator(phone, value)
                }
              ]}
            >
              <PhoneInput
                value={phone}
                className="w-auto"
                defaultCountry={`${flag[studentInformation?.personalInfo?.phoneCode]}`}
                // placeholder="+92 312-9966188"
                disableDialCodePrefill
                onChange={(phone: string, country: any) => { setPhone(phone) }}
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
              name="referenceNo"
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
              rules={[
                {
                  validator: (_, value) => {
                    let regex: any = makeRegex(countryList);
                    regex = new RegExp(regex)

                    if (value === '') {
                      return Promise.reject('Required Field');
                    }
                    if (regex.test(value)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Invalid postal code');
                    }
                  }
                }
              ]}
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
              <Select
                showSearch
                options={countries}
                placeholder={"Select Country"}
                onChange={(val: any) => setCountryList(val)}
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
