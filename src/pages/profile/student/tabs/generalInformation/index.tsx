import { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { Option } from "antd/es/mentions";
import { CommonDatePicker, DropDown } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import "../../../style.scss";
import useCustomHook from "../../../actionHandler";
import useCustomeHook from "../../../../universities/actionHandler";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  studentProfileState,
  systemCompanyPaginationState,
  universitySystemAdminState,
} from "../../../../../store";
import { CaretDownOutlined } from "@ant-design/icons";
import PersonalInformation from "../personalInformation/index";
import UserSelector from "../../../../../components/UserSelector";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import { newCountryListState } from "../../../../../store/CountryList";
import CountryCodeSelect from "../../../../../components/CountryCodeSelect";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import { Disable } from "../../../../../stories/Checkbox.stories";
import { disabledDate } from "../../../../../helpers/helperFunctions";
import { PhoneInput } from 'react-international-phone';
import usePhoneNumberHook from "../../../../../helpers/phoneNumber";

const courses = [
  {
    value: "3DInteractionDesigninVirtualReality",
    label: "3D Interaction Design in Virtual Reality",
  },
  {
    value: "AccountingandFinance",
    label: "Accounting and Finance",
  },
  {
    value: "AppliedPublicHistory",
    label: "Applied Public History",
  },
  {
    value: "DependentonWorkPermit",
    label: "Dependent on Work Permit",
  },
  {
    value: "ArtHistoryCuratorship&RenaissanceCulture",
    label: "Art History, Curatorship & Renaissance Culture",
  },
  {
    value: "BankingandFinance",
    label: "Banking and Finance",
  },
  {
    value: "BrandManagement",
    label: "Brand Management",
  },
];

const internshipDuration = [
  {
    value: "1month",
    label: "1month",
  },
  {
    value: "2month",
    label: "2month",
  },
  {
    value: "3month",
    label: "3month",
  },
  {
    value: "4month",
    label: "4month",
  },
  {
    value: "5month",
    label: "5month",
  },
  {
    value: "6month",
    label: "6month",
  },
  {
    value: "7month",
    label: "7month",
  },
  {
    value: "8month",
    label: "8month",
  },
  {
    value: "9month",
    label: "9month",
  },
  {
    value: "10month",
    label: "10month",
  },
  {
    value: "11month",
    label: "11month",
  },
  {
    value: "12month",
    label: "12month",
  },
];

const relationShip = [
  {
    value: "child",
    label: "Child",
  },
  {
    value: "spouse",
    label: "Spouse",
  },
  {
    value: "parent",
    label: "Parent",
  },
  {
    value: "other",
    label: "Other",
  },
];

const GeneralInformation = () => {
  const { getSubAdminUniversity } = useCustomeHook();
  const [tableParams, setTableParams]: any = useRecoilState(systemCompanyPaginationState);
  const [openStartDate, setOpenStartDate] = useState(false);
  const [openEndDate, setOpenEndDate] = useState(false);
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const action = useCustomHook();
  const { PhoneValidator, countryFlagCode } = usePhoneNumberHook();
  const generalInformation = useRecoilState<any>(studentProfileState);
  const universitySubAdmin = useRecoilState<any>(universitySystemAdminState);
  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const [internshipStartValue, setInternshipStartValue] = useState();
  const [internshipEndValue, setInternshipEndValue] = useState();
  const [updateData, setUpdateData] = useState(false);
  const [generalFlagCode, setGeneralFlagCode] = useState();
  const [emergencyFlagCode, setEmergencyFlagCode] = useState();
  const [phone, setPhone] = useState('');
  const [form] = Form.useForm();
  const flag = countryFlagCode();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  // update
  const onFinish = (values: any) => {
    console.log("Succdddess:", values);
    action.updateStudentProfile(
      {
        personalInfo: generalInformation[0]?.personalInfo,
        generalInfo: {
          universityId: values.name,
          course: values.course,
          universityEmail: values.universityEmail,
          graduateYear: values.graduateYear,
          internshipStartDate: values.internshipStartDate,
          internshipEndDate: values.internshipEndDate,
          internshipDuration: values.internshipDuration,
          haveWorkedInOrg: values.haveWorkedInOrg === "true" ? true : false,
          companyName: values.companyName,
          emergencyContactName: values.emergencyContactName,
          emergencyContactPhoneCode: values.emergencyContactPhoneCode,
          emergencyContactPhoneNumber: values.emergencyContactPhoneNumber,
          emergencyContactRelationship: values.emergencyContactRelationship,
          emergencyContactPostCode: values.emergencyContactPostCode,
          emergencyContactAddress: values.emergencyContactAddress,
          emergencyContactCity: values.emergencyContactCity,
          emergencyContactCountry: values.emergencyContactCountry,
        },
      },
      () => setUpdateData(true)
    );
  };

  useEffect(() => {
    getSubAdminUniversity('', tableParams, setTableParams);
    action.getStudentProfile().then((data: any) => {
      const {
        course,
        universityEmail,
        internshipStartDate,
        internshipEndDate,
        universityId,
        haveWorkedInOrg,
        companyName,
        internshipDuration,
        loanDetails,
        workHistory,
        emergencyContactName,
        emergencyContactPhoneNumber,
        emergencyContactPhoneCode,
        emergencyContactRelationship,
        emergencyContactPostCode,
        emergencyContactAddress,
        emergencyContactCity,
        emergencyContactCountry,
        graduateYear,
        userUniversity: {
          university: {
            postCode,
            address,
            city,
            phoneCode,
            phoneNumber,
            country,
          },
          contact: { firstName, lastName },
        },
      } = data?.general;
      form.setFieldsValue({
        name: universityId,
        course,
        universityEmail,
        postCode,
        address,
        city,
        phoneCode,
        phoneNumber: phoneCode + phoneNumber,
        internshipStartDate: internshipStartDate
          ? dayjs(internshipStartDate)
          : null,
        internshipEndDate: internshipEndDate ? dayjs(internshipEndDate) : null,
        country,
        graduateYear,
        uniContactName: firstName + " " + lastName,
        internshipDuration,
        haveWorkedInOrg: haveWorkedInOrg ? "true" : "false",
        companyName,
        emergencyContactName,
        emergencyContactRelationship,
        emergencyContactPhoneCode,
        emergencyContactPhoneNumber : emergencyContactPhoneCode+ emergencyContactPhoneNumber,
        emergencyContactPostCode,
        emergencyContactAddress,
        emergencyContactCity,
        emergencyContactCountry,
      });
      // set(phoneCode);
      // setEmergencyFlagCode(emergencyContactPhoneCode);
    });
  }, [form, updateData]);
  const nameValue = Form.useWatch("name", form);

  useEffect(() => {
    if (nameValue) {
      let uni = universitySubAdmin[0].find((i: any) => i.id === nameValue);
      console.log(uni);

      if (uni) {
        const {
          id,
          university: {
            postCode,
            address,
            city,
            phoneCode,
            phoneNumber,
            country,
          },
          contact: { firstName, lastName },
        } = uni;

        form.setFieldsValue({
          name: id,
          postCode,
          address,
          city,
          phoneCode,
          phoneNumber,
          country,
        });
        // setGeneralFlagCode(phoneCode);
      }
    }
  }, [nameValue]);

  return (
    <div className="general-information">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          phoneNumber: generalInformation[0]?.general?.userUniversity?.university?.phoneCode +
            generalInformation[0]?.general?.userUniversity?.university?.phoneNumber,
            emergencyContactPhoneNumber:generalInformation[0]?.general?.emergencyContactPhoneCode +
            generalInformation[0]?.general?.emergencyContactPhoneNumber,
        }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
        form={form}
      >
        <div>
          <Typography className="title">Academic Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="University"
              name="name"
              rules={[{ required: false }]}
            >
              <Select placeholder="Select" onChange={handleChange}>
                {universitySubAdmin[0]?.map((item: any) => (
                  <Option value={item?.id}>{item?.university?.name}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Course"
              name="course"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select
                onChange={handleChange}
                size="middle"
                suffixIcon={<CaretDownOutlined />}
              >
                {courses?.map((option: any) => (
                  <Option value={option.value}>{option.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="University Email"
              name="universityEmail"
              rules={[{ required: false }, { type: "email" }]}
            >
              <Input placeholder="Enter Email" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="postCode"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Post code"
                className="input-style"
                disabled
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Address"
                className="input-style"
                disabled
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter City"
                className="input-style"
                disabled
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
                disabled
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="University Contact Name"
              name="uniContactName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Contact name"
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
                defaultCountry={`${flag[generalInformation[0]?.general?.userUniversity?.university?.phoneCode]}`}
                // placeholder="+92 312-9966188"
                disableDialCodePrefill
                onChange={(phone: string, country: any) => { setPhone(phone) }}
                disabled
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Graduate Year"
              name="graduateYear"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Graduation Year"
                className="input-style"
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Internship Start Date"
              name="internshipStartDate"
              rules={[{ required: false }]}
            >
              <CommonDatePicker
                open={openStartDate}
                // disabledDates={disabledDate}
                setOpen={setOpenStartDate}
                setValue={setInternshipStartValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Internship End Date"
              name="internshipEndDate"
              rules={[{ required: false }]}
            >
              <CommonDatePicker
                open={openEndDate}
                // disabledDates={disabledDate}
                setOpen={setOpenEndDate}
                setValue={setInternshipEndValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label="Internship Duration"
              name="internshipDuration"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select
                disabled
                placeholder="Select"
                suffixIcon={<CaretDownOutlined />}
              >
                {internshipDuration.map((item: any) => (
                  <Option value={item.value}>{item.value}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label="Have you ever worked in any orgnization?"
              name="haveWorkedInOrg"
              rules={[{ required: false }]}
            >
              <Select placeholder="Select" suffixIcon={<CaretDownOutlined />}>
                <Option value="true">Yes</Option>
                <Option value="false">No</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Company Name" className="input-style" />
            </Form.Item>
          </Col>
        </Row>
        <Divider />
        <div>
          <Typography className="title">Emergency Contact</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Name"
              name="emergencyContactName"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={12} md={24} xs={24}>
            <Form.Item
              name="emergencyContactPhoneNumber"
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
                defaultCountry={`${flag[generalInformation[0]?.general?.emergencyContactPhoneCode]}`}
                disableDialCodePrefill
                onChange={(phone: string, country: any) => { setPhone(phone) }}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Relationship"
              name="emergencyContactRelationship"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder="Select" suffixIcon={<CaretDownOutlined />}>
                {relationShip.map((item: any) => (
                  <Option value={item.value}>{item.value}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Post Code"
              name="emergencyContactPostCode"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Post code" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Address"
              name="emergencyContactAddress"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Address" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="City"
              name="emergencyContactCity"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter City" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="emergencyContactCountry"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select
                showSearch
                options={countries}
                placeholder={"Select Country"}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
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

export default GeneralInformation;
