import { useEffect, useState } from "react";
import { AutoComplete, Button, Col, Divider, Form, Input, Row, Select, Space, Typography } from "antd";
import { Option } from "antd/es/mentions";
import { CommonDatePicker, DropDown } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import "../../../style.scss";
import useCustomHook from "../../../actionHandler";
import useCustomeHook from '../../../../universities/actionHandler'
import { useRecoilState } from "recoil";
import { studentProfileState, universitySystemAdminState } from "../../../../../store";
import { CaretDownOutlined } from "@ant-design/icons";

const courses = [
  {
    values: "3DInteractionDesigninVirtualReality",
    label: "3D Interaction Design in Virtual Reality"
  },
  {
    values: "AccountingandFinance",
    label: "Accounting and Finance"
  },
  {
    values: "AppliedPublicHistory",
    label: "Applied Public History"
  },
  {
    values: "DependentonWorkPermit",
    label: "Dependent on Work Permit"
  },
  {
    values: "ArtHistoryCuratorship&RenaissanceCulture",
    label: "Art History, Curatorship & Renaissance Culture"
  },
  {
    values: "BankingandFinance&RenaissanceCulture",
    label: "Banking and Finance"
  },
  {
    values: "BrandManagement",
    label: "Brand Management"
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
];

const internshipDuration = [
  {
    value: "1month",
    label: "1month"
  },
  {
    value: "2month",
    label: "2month"
  },
  {
    value: "3month",
    label: "3month"
  },
  {
    value: "4month",
    label: "4month"
  },
  {
    value: "5month",
    label: "5month"
  },
  {
    value: "6month",
    label: "6month"
  },
  {
    value: "7month",
    label: "7month"
  },
  {
    value: "8month",
    label: "8month"
  },
  {
    value: "9month",
    label: "9month"
  },
  {
    value: "10month",
    label: "10month"
  },
  {
    value: "11month",
    label: "11month"
  },
  {
    value: "12month",
    label: "12month"
  },
];

const relationShip = [
  {
    value: "child",
    label: "Child"
  },
  {
    value: "spouse",
    label: "Spouse"
  },
  {
    value: "parent",
    label: "Parent"
  },
  {
    value: "other",
    label: "Other"
  },
]

const GeneralInformation = () => {
  const { getSubAdminUniversity } = useCustomeHook()
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const action = useCustomHook();
  const generalInformation = useRecoilState<any>(studentProfileState);
  const universitySubAdmin = useRecoilState<any>(universitySystemAdminState);
  const [form] = Form.useForm();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    action.updateStudentProfile({
      generalInfo: {
        univeristyId: values.universityId,
        course: values.course,
        universityEmail: values.universityEMail,
        graduateYear: values.graduateYear,
        internshipStartDate: '',
        internshipEndDate: "",
        internshipDuration: values.internshipDuration,
        haveWorkedInOrg: values.haveWorkedInOrg,
        companyName: values.companyName,
        emergencyContactName: values.emergencyContactName,
        emergencyContactPhoneCode: values.emergencyContactPhoneCode,
        emergencyContactPhoneNumber: values.emergencyContactPhoneNumber,
        emergencyContactRelationship: values.emergencyContactRelationship,
        emergencyContactPostCode: values.emergencyContactPostCode,
        emergencyContactAddress: values.emergencyContactAddress,
        emergencyContactCity: values.emergencyContactCity,
        emergencyContactCountry: values.emergencyContactCountry
      }
    })
  };

  useEffect(() => {
    getSubAdminUniversity();
      action.getStudentProfile()
        .then((data: any) => {
          form.setFieldsValue({
            name: data?.general?.userUniversity?.university?.name,
            course: data?.general?.course,
            universityEMail: data?.general?.universityEMail,
            postCode: data?.user?.postCode,
            address: data?.general?.userUniversity?.university?.address,
            city: data?.general?.userUniversity?.university?.city,
            country: data?.general?.userUniversity?.university?.country,
            uniContact: data?.general?.userUniversity?.contact?.phoneNumber,
            graduateYear: data?.general?.graduateYear,
            internshipDuration: data?.general?.internshipDuration,
            haveWorkedInOrg: data?.general?.haveWorkedInOrg,
            companyName: data?.general?.companyName,
            emergencyContactName: data?.general?.emergencyContactName,
            emergencyContactRelationship: data?.general?.emergencyContactRelationship,
            emergencyContactPostCode: data?.general?.emergencyContactPostCode,
            emergencyContactAddress: data?.general?.emergencyContactAddress,
            emergencyContactCity: data?.general?.emergencyContactCity,
            emergencyContactCountry: data?.general?.emergencyContactCountry,
          });
        })
  }, [form])

  return (
    <div className="general-information">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: false }}
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
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder='Select' onChange={handleChange}>
                {universitySubAdmin[0]?.map((item: any) => (
                  <Option value={item?.university?.name}>{item?.university?.name}</Option>
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
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="University Email"
              name="universityEMail"
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
              <DropDown
                name="Select"
                value={value}
                options={["search", "item 1"]}
                setValue={setValue}
                requireSearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input placeholder="Enter Address" className="input-style" />
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
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: false }, { type: "string" }]}
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
              label="University Contact Name"
              name="uniContact"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Input
                placeholder="Enter Contact Number"
                className="input-style"
              />
            </Form.Item>
          </Col>
          {/* <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: false}, { type: "string" }]}
            >
              <Input.Group compact>
                <Select defaultValue="+92"  style={{ width: "25%" }} >
                  <Option value="+44">+44</Option>
                  <Option value="+92">+92</Option>
                </Select>
                <AutoComplete  style={{ width: "75%" }}
                  placeholder="xxxxxxx-xxx"
                  options={[{ value: "text 1" }, { value: "text 2" }]}
                />
              </Input.Group>
            </Form.Item>
          </Col> */}
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
              name="startDate"
              rules={[{ required: false }, { type: "date" }]}
            >
              <CommonDatePicker />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Internship End Date"
              name="endDate"
              rules={[{ required: false }, { type: "date" }]}
            >
              <CommonDatePicker />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Form.Item
              label="Internship Duration"
              name="internshipDuration"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder='Select' suffixIcon={<CaretDownOutlined />}>
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
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder='Select' suffixIcon={<CaretDownOutlined />}>
                <Option value='yes'>Yes</Option>
                <Option value='no'>No</Option>
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
          {/* <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: false}, { type: "string" }]}

            >
              <Input.Group compact>
                <Select defaultValue="+92" style={{ width: "25%" }} >
                  <Option value="+44">+44</Option>
                  <Option value="+92">+92</Option>
                </Select>
                <AutoComplete style={{ width: "75%" }}
                  placeholder="xxxxxxx-xxx"
                  options={[{ value: "text 1" }, { value: "text 2" }]}
                />
              </Input.Group>
            </Form.Item>
          </Col> */}
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Relationship"
              name="emergencyContactRelationship"
              rules={[{ required: false }, { type: "string" }]}
            >
              <Select placeholder='Select' suffixIcon={<CaretDownOutlined />}>
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
              <DropDown
                name="Select"
                value={value}
                options={["search", "item 1", "item 2"]}
                setValue={setValue}
                requireSearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
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
              <Input placeholder="Enter Country" className="input-style" />
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
                Submit
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default GeneralInformation;
