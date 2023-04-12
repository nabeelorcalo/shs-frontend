import React, { useState } from "react";
import { SettingAvater } from "../../../../../assets/images";
import { BoxWrapper } from "../../../../../components/BoxWrapper/BoxWrapper";
import {
  Typography, Row, Col, Divider, Form, Radio,
  RadioChangeEvent, Button, Space, Input, Switch,
} from "antd";
import { Breadcrumb, CommonDatePicker, DropDown, SearchBar } from "../../../../../components";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
const { TextArea } = Input;
const { Title, Paragraph } = Typography;
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { NavLink } from "react-router-dom";

const LeavesAddPolicy: React.FC = () => {
  const breadcrumbArray = [
    { name: "Add Policy"},
    { name: "Setting"  },
    { name: "Leaves" , onClickNavigateTo:`/settings/${ROUTES_CONSTANTS.SETTING_LEAVES}`},
  ];
  const selectArray = [
    {
      name: "Eva Smith",
      image: <SettingAvater />,
    },
    {
      name: "Martha Stewart",
      image: <SettingAvater />,
    },
    {
      name: "Evelyn Josh",
      image: <SettingAvater />,
    },
    {
      name: "Arthur Lewis",
      image: <SettingAvater />,
    },
    {
      name: "Tom Edward",
      image: <SettingAvater />,
    },
    {
      name: "Carisle Cullen",
      image: <SettingAvater />,
    },
  ];

  const deselectArray: any = [];
  const dropdownValues = ['1', '2', '3', '4', '5', '6']
  const [value, setValue] = useState(1);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openModal, setOpenModal] = useState<any>(false);
  const [formValues, setFormValues] = useState<any>({
    policyName: "",
    description: "",
    assignedDate: "",
    accrualFrequency: "",
    entitlement: "",
    maximumCarryForward: "",
    carryForwardExpiration: "",
    AllInterns: "",
    switch: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };
  const onChange = (e: RadioChangeEvent) => {
    if (e.target.value === 2) {
      setOpenModal(!openModal);
    }
    setValue(e.target.value);
  };
  return (
    <div className="leaves-add-policy">
        <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider/>
      <BoxWrapper>
        <Form layout="vertical">
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Policy Details
              </Title>
              <Paragraph>Enter policy details for time-off</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="policyName"
                label="Policy Name"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <div className="mt-3 flex flex-col">
                <label>Description (optional)</label>
                <TextArea
                  className="text-input-bg-color"
                  rows={6}
                  placeholder="Write Something..."
                  maxLength={6}
                />
              </div>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Policy Accrual----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Policy Accrual
              </Title>
              <Paragraph>Define the occrual period of your policy</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <p>Assigned Date</p>

              <DropDown
                name="Select"
                options={[
                  'joining Date',
                ]}
                setValue={() => { }}
                value=""
              />
              <div className="my-3">
                <p>Accrual Frequency</p>

                <DropDown
                  name="this month"
                  options={[
                    'Monthly',
                    'Yearly',
                  ]}
                  setValue={() => { }}
                  value=""
                />
              </div>

              <Form.Item
                name="entitlement"
                label="Entitlement"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Basic usage" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Carry Forward----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Carry Forward
              </Title>
              <Paragraph>
                Define the carry farward days for your policy
              </Paragraph>
            </Col>
            <Col className="gutter-row " xs={24} md={12} xxl={8}>
              <div className="my-3">
                <p>Maximum Carry Forward (Days Per Year)</p>

                <DropDown
                  name="Select"
                  options={dropdownValues}
                  setValue={() => { }}
                  value=""
                />
              </div>
              <div>
                <p>Carry Forward Expiration</p>
                <CommonDatePicker
                  onBtnClick={() => { }}
                  open={openDatePicker}
                  setOpen={setOpenDatePicker}
                  setValue={function noRefCheck() { }}
                />
              </div>
            </Col>
          </Row>
          <Divider />

          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Add Interns
              </Title>
              <Paragraph>Select for this office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>All interns</Radio>
                <Radio value={2}>Select Interns</Radio>
              </Radio.Group>
              <div className="my-5">
                <Switch />
                <span className="px-3 ">Apply to all new hires</span>
              </div>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary">
            <NavLink to={`/settings/${ROUTES_CONSTANTS.SETTING_LEAVES}`}> 
             Cancel 
             </NavLink>
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={selectArray}
        deselectArray={deselectArray}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default LeavesAddPolicy;
