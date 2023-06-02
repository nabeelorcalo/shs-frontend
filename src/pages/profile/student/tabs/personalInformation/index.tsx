import React, { useEffect, useState } from "react";
import {
  AutoComplete,
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
import { PlusOutlined, PlusCircleFilled, DeleteFilled } from '@ant-design/icons';
import { CommonDatePicker, DropDown } from "../../../../../components";
import { CalendarIcon } from "../../../../../assets/images";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import PhoneInput from "react-phone-input-2";
import '../../../style.scss';
import { Option } from "antd/es/mentions";
import constants from "../../../../../config/constants";
import { useRecoilState } from "recoil";
import { studentProfileState } from "../../../../../store";
import useCustomHook from "../../../actionHandler";
import DrawerTabs from '../../../../candidates/drawerTabs';

const PersonalInformation = () => {
  const action = useCustomHook();
  const [value, setValue] = useState('');
  const [isdate1, setIsDate1] = useState(false);
  const [isDependents, setIsDependents] = React.useState(2);
  const [dependents, setDependents] = React.useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const personalInformation = useRecoilState<any>(studentProfileState);

  console.log(personalInformation,'personalInformation')

  useEffect(() => {
    action.getStudentProfile(44);
  },[])

  const onFinish = (values: any) => {
   console.log(values);
   
  };

  console.log("name" , personalInformation[0].user?.firstName);

  return (
    <div className="personal-information">
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div>
          <Typography className="title">Personal Details</Typography>
        </div>
        <Row gutter={20}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true }, { type: "string" }]}
              
            >
              <Input  className="input-style" defaultValue={personalInformation[0].user?.firstName} />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Last Name" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name='Select'
                value={value}
                options={['Male', 'Female', 'others']}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Place Of Birth"
              name="pob"
              rules={[{ required: true }, { type: "date" }]}
            >
              <Input placeholder="Enter your Birth Place" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name='Select'
                value={value}
                options=
                {
                  ['Afghanistan',
                    'America',
                    'British',
                    'Canadian',
                    'German'
                  ]
                }
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[{ required: true }, { type: "date" }]}
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
              rules={[{ required: true }, { type: "email" }]}
            >
              <Input placeholder="Enter your Email" className="input-style" />
            </Form.Item>
          </Col>
          {/* <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[{ required: true }, { type: "string" }]}
            >
              <PhoneInput
                country={'pk'}
                placeholder="Enter phone number"
                value={value}
                onChange={() => setValue}
                inputStyle={{ width: "100%", height: "48px", background: "#e6f4f9" }}
              />
            </Form.Item>
          </Col> */}
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="National Ensurance Number"
              name="nen"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Ensurance Number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Visa Status"
              name="visastatus"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name='Select'
                value={value}
                options=
                {
                  ['Student Visa',
                    'Post Study Work Visa',
                    'Work Permit',
                    'Dependent on Work Permit'
                  ]
                }
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Delegate Refrence Number"
              name="drn"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Refrence Number" className="input-style" />
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
              name="description"
              rules={[{ required: true }, { type: "string" }]}
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
              name="postcode"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name='Select'
                value={value}
                options={['search', 'item 1']}
                setValue={setValue}
                requireSearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="House No"
              name="houseno"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter House Number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Street"
              name="street"
              rules={[{ required: true }, { type: "string" }]}
            >
              <Input placeholder="Enter Street Number" className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true }, { type: "string" }]}
            >
              <DropDown
                name='Select'
                value={value}
                options={constants.OPTIONS_COUNTRIES}
                setValue={setValue}
              />
            </Form.Item>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <Form.Item
              label="City"
              name="city"
              rules={[{ required: true }, { type: "string" }]}
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
              rules={[{ required: true }, { type: "string" }]}
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
              rules={[{ required: true }, { type: "string" }]}
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
              name="medicalcondition"
              rules={[{ required: true }, { type: "string" }]}
            >
              <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} className="input-style" />
            </Form.Item>
          </Col>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Form.Item
              label="Do you have Dependies"
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
                  label="Name"
                  name="username"
                  rules={[{ required: true }, { type: "string" }]}
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
