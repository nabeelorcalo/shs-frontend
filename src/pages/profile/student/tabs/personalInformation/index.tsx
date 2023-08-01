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
import { PlusOutlined, PlusCircleFilled, DeleteFilled, CaretDownOutlined, CloseOutlined } from '@ant-design/icons';
import { CommonDatePicker, DropDown } from "../../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import '../../../style.scss';
import { Option } from "antd/es/mentions";
import { useRecoilState, useRecoilValue } from "recoil";
import { studentProfileState } from "../../../../../store";
import useCustomHook from "../../../actionHandler";
import UserSelector from "../../../../../components/UserSelector";
import useCountriesCustomHook from "../../../../../helpers/countriesList";
import { newCountryListState } from "../../../../../store/CountryList";
import CountryCodeSelect from "../../../../../components/CountryCodeSelect";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import OthersItem from "../OthersItem";


const nationality = [
  {
    value: "Pakistani",
    label: "Pakistani"
  },
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
    value: 'Student Visa',
    label: 'Student Visa'
  },
  {
    value: 'Post Study Work Visa PSW',
    label: 'Post Study Work Visa PSW'
  },
  {
    value: 'Applied Public History',
    label: 'Applied Public History'
  },
  {
    value: 'Work Permit',
    label: 'Work Permit'
  },
  {
    value: 'Dependent on Work Permit',
    label: 'Dependent on Work Permit'
  },
];

const PersonalInformation = () => {
  const action = useCustomHook();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [isdate1, setIsDate1] = useState(false);
  const [isdate2, setIsDate2] = useState(false);
  const [isDependents, setIsDependents] = React.useState(false);
  const [skillsArray, setSkillsArray] = useState<any>([]);
  const [otherHobbiesValue, setOtherHobbiesValue] = useState([]);
  const [otherHobbiesUpdate, setOtherHobbiesUpdate] = useState('');
  const [otherAllergiesValue, setOtherAllergiesValue] = useState('');
  const [dependents, setDependents] = React.useState<any>([{
    label: "",
    name: ""
  }]);
  const [searchValue, setSearchValue] = useState('');
  const personalInformation = useRecoilState<any>(studentProfileState);

  const { getCountriesList, allCountriesList } = useCountriesCustomHook();
  const countries = useRecoilValue(newCountryListState);
  const [openHobbiesModal, setOpenHobbiesModal] = useState(false);
  const [openAllergiesModal, setOpenAllergiesModal] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [flagCode, setFlagCode] = useState()
  const [form] = Form.useForm();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };

  const handleName = (value: any, key: any, index: any) => {
    const newArr = JSON.parse(JSON.stringify(dependents))
    newArr[index][key] = value
    setDependents(newArr)
  }

  const onFinish = (values: any) => {
    console.log('updated', values, skillsArray);
    action.updateStudentProfile(
      {
        generalInfo: personalInformation[0]?.general,
        personalInfo: {
          gender: values.gender,
          DOB: values.DOB,
          birthPlace: values.birthPlace,
          nationality: values.nationality,
          personalEmail: values.personalEmail,
          phoneCode: flagCode,
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
          hobbies: otherHobbiesValue,
          allergies: otherAllergiesValue,
          medicalCondition: values.medicalCondition,
          skills: skillsArray,
          haveDependents: values.haveDependents,
          dependents: isDependents === true && dependents
        }
      },
      () => setUpdateData(true)
    )
  };

  // get api
  useEffect(() => {
    getCountriesList()
    action.getStudentProfile()
      .then((data: any) => {
        const { firstName, lastName, gender, DOB, birthPlace, nationality, personalEmail, phoneCode,
          phoneNumber, insuranceNumber, visaStatus, aboutMe, postCode, address, city, delegateRef,
          country, profileImage, skills, hobbies, allergies, medicalCondition, houseNo, street, haveDependents
        } = data.personalInfo;
        form.setFieldsValue({
          firstName,
          lastName,
          gender,
          phoneCode,
          phoneNumber,
          birthPlace,
          nationality,
          postCode,
          personalEmail,
          DOB: DOB ? dayjs(DOB) : null,
          insuranceNumber,
          hobbies,
          allergies,
          address,
          visaStatus,
          delegateRef,
          aboutMe,
          houseNo,
          street,
          country,
          city,
          medicalCondition,
          haveDependents,
          dependents,
        });
        setDependents(data?.personalInfo?.dependents)
        setIsDependents(data?.personalInfo?.haveDependents)
        setSkillsArray(skills)
        setOtherAllergiesValue(allergies)
        setOtherHobbiesValue(hobbies)
        setFlagCode(phoneCode)
      })
  }, [form, updateData])

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
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="others">other</Option>
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
              name="DOB"
              rules={[{ required: false }]}
            >
              <CommonDatePicker
                open={open}
                setOpen={setOpen}
                disabledDates={disabledDate}
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
              <Input placeholder="Enter your Email" className="input-style" disabled />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24} className="p-0">
            <div className="flex items-center gap-x-2 flex-wrap md:flex-nowrap">
              {flagCode ?
                <Form.Item label='Phone Code' key={1}>
                  <CountryCodeSelect
                    onChange={(e: any) => setFlagCode(e)}
                    defaultVal={flagCode}
                  />
                </Form.Item>
                :
                <Form.Item label='Phone Code' key={2}>
                  <CountryCodeSelect
                    onChange={(e: any) => setFlagCode(e)}
                  />
                </Form.Item>
              }
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
                <Input placeholder="Enter Phone Number" className="input-style w-[100%]" />
              </Form.Item>
            </div>
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
                size="middle"
                suffixIcon={<CaretDownOutlined />}
              >
                {visa?.map((option: any) => (
                  <Option value={option.value}>
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
              <Input placeholder="Enter Refrence Number" className="input-style" disabled />
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
              <TextArea rows={4} placeholder="Write about yourself" maxLength={200}
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
              rules={[{ required: false }, { type: "string" }]}>
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
        <Divider />
        <div>
          <Typography className="title">Others</Typography>
        </div>
        <Row>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="flex items-center gap-4">
            <Form.Item
              label='Hobbies'
              name='hobbies'>
              <Button className="text-input-bg-color border-0 rounded-[14.5px]"
                onClick={() => setOpenHobbiesModal(true)}
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
            <div className="flex item-center gap-3">
              {personalInformation[0]?.personalInfo?.hobbies.map((item: any) => {
                return (
                  <div className="text-input-bg-color border-0 rounded-[14.5px] p-4">
                    {item ? item : 'N/A'}
                  </div>
                )
              })
              }
            </div>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="flex items-center gap-4">
            <Form.Item
              label="Allergies"
              name="allergies"
            >
              <Button className="text-input-bg-color border-0 rounded-[14.5px]"
                onClick={() => setOpenAllergiesModal(true)}
              >
                <PlusOutlined /> Add
              </Button>
            </Form.Item>
            <div className="flex items-center gap-3">
              {personalInformation[0]?.personalInfo?.allergies.map((item: any) => {
                return (
                  <div className="text-input-bg-color border-0 rounded-[14.5px] p-4">
                    {item ? item : 'N/A'}
                  </div>
                )
              })}
            </div>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Medical Condition"
              name="medicalCondition"
              rules={[{ required: false }, { type: "string" }]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" className="input-style" />
            </Form.Item>
          </Col>
          <Typography className="title">Dependents</Typography>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              name='haveDependents'
              label="Do you have Dependents"
            >
              <Radio.Group
                name="radiogroup"
                value={isDependents}
                onChange={(e) => {
                  setIsDependents(e.target.value);
                }}
              >
                <Radio value={true}>Yes</Radio>
                <Radio value={false}>No</Radio>
              </Radio.Group>
            </Form.Item>
            {isDependents && (
              <div className="pb-3">
                {dependents.map((item: any, index: any) => (
                  <Row className="flex items-center pb-5" gutter={15} key={index}>
                    <Col xxl={7} xl={7} lg={7} md={12} xs={24}>
                      <label className="text-teriary-color text-base font-normal">Name</label>
                      <Input
                        name={`name_${index}`}
                        placeholder="Enter name"
                        className="input-style "
                        value={item?.name}
                        onChange={(e: any) => { handleName(e.target.value, 'name', index) }} />
                    </Col>
                    <Col xxl={7} xl={7} lg={7} md={12} xs={24}>
                      <label className="text-teriary-color text-base font-normal">Relationship</label>
                      <Select
                        placeholder='Select'
                        className="w-full"
                        onChange={(e: any) => { handleName(e, 'relationship', index) }}
                        value={item?.relationship}>
                        <Option value="Spouse">Spouse</Option>
                        <Option value="Child">Child</Option>
                      </Select>
                    </Col>
                    <Col xxl={7} xl={7} lg={7} md={12} xs={24}>
                      <label className="text-teriary-color text-base font-normal pt-3">Date of Birth</label>
                      <CommonDatePicker
                        open={isdate2}
                        setOpen={setIsDate2}
                        setValue={item?.Dob}
                      />
                    </Col>
                    <Col xxl={2} xl={2} lg={2} md={12} sm={24} xs={24} >
                      {index === 0 ?
                        <div
                          onClick={() => {
                            const copyDependents = [...dependents];
                            copyDependents.push({ label: "", name: "" });
                            setDependents(copyDependents);
                          }}
                        >
                          <div className="teriary-bg-color pr-3 pl-3 pt-1 pb-1 w-[50px] h-[40px] rounded-lg">
                            <PlusCircleFilled className="text-3xl white-color" />
                          </div>
                        </div> :
                        <div
                          onClick={() => {
                            const copyDependents = [...dependents];
                            copyDependents.splice(index, 1);
                            setDependents(copyDependents);
                          }}
                        >
                          <div className="red-graph-tooltip-bg pr-3 pl-3 pt-1 pb-1 w-[50px] h-[40px] rounded-lg">
                            <DeleteFilled className="text-3xl white-color" />
                          </div>
                        </div>
                      }
                    </Col>
                  </Row>
                ))}
              </div>
            )}
          </Col>
        </Row>
        <Form.Item>
          <div className="flex justify-center md:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] 
                ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Save
              </Button>
            </Space>
          </div>
        </Form.Item>
      </Form>
      {openHobbiesModal && (
        <OthersItem
          openModal={openHobbiesModal}
          setOpenModal={setOpenHobbiesModal}
          title="Add Hobbies"
          setOtherValue={setOtherHobbiesUpdate}
          otherValue={otherHobbiesValue}
        />
      )}

      {openAllergiesModal && (
        <OthersItem
          openModal={openAllergiesModal}
          setOpenModal={setOpenAllergiesModal}
          title="Add Allergies"
          setOtherValue={setOtherAllergiesValue}
          otherValue={otherAllergiesValue}
        />
      )}
    </div>
  );
};

export default PersonalInformation;
