import React, { useState } from "react";
import { SettingAvater } from "../../../../../assets/images";
import { BoxWrapper } from "../../../../../components";
import {
  Typography, Row, Col, Divider, Form, Radio, Select,
  RadioChangeEvent, Button, Space, Input, Switch,
} from "antd";
import { Breadcrumb, CommonDatePicker } from "../../../../../components";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useLeaveCustomHook from "../actionHandler";

const LeavesAddPolicy: React.FC = () => {
  const [states, setState] = useState(
    {
      carryforward: "",
      assignDate: "",
      accrualFrequency: "",
      openDatePicker: false,
      intern: [],
      openModal: false,
      internValue: 1,
      applyForNewHire: false
    });

  const navigate = useNavigate()
  const { postSettingLeaves, editSettingLeaves } = useLeaveCustomHook()
  const { TextArea } = Input;
  const { Paragraph } = Typography;
  const { state } = useLocation()
  const [form] = Form.useForm();
  const deselectArray: any = [];

  const breadcrumbArray = [
    { name: "Add Policy" },
    { name: "Setting", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}` },
    { name: "Leaves", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}` },
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
  const carryForwardSelectValue = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
  ]
  const assignDateSelectValue = [
    { value: 'joining Date', label: 'joining Date' },
  ]
  const accrualFrequencySelectValue = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly' },
  ]


  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setState(prevState => ({
        ...prevState, openModal: true, internValue: radioValue
      }))
    }
    else if (e.target.value === 1) {
      setState(prevState => ({
        ...prevState,
        internValue: radioValue,
        intern: []
      }))
    }
  };
  const openDatePickerHandler = () => {
    setState({
      ...states, openDatePicker: !states.openDatePicker
    })
  }

  const onFinish = (values: any) => {
    values.applyToNewHires = states.applyForNewHire;
    console.log("valies", values.applyToNewHires)
    if (state) {
      editSettingLeaves(state.id, values)
    }
    else {
      postSettingLeaves(values)
    }
    // navigate(`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}`)
  }
  const initialValues = {
    policyName: state?.name,
    description: state?.description,
    // carryforwardexpiration: state?.carryForwardExpiry,
    applyForNewHire: state?.applyToNewHires,
    intern: [],
    entitlement: state?.entitlement,
    carryforward: state?.maxCarryForward,
    assignDate: state?.assignedDate,
    accrualFrequency: state?.accrualFrequency
  }

  return (
    <div className="leaves-add-policy">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper>
        <Form layout="vertical"
          form={form}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          initialValues={initialValues}
          onFinish={onFinish}>
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Policy Details   Office
              </span>

              <Paragraph>Enter policy details for time-off</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="policyName"
                label="Policy Name"
                required={false}
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                name="description"
                label="Description (optional)"
                required={false}
                rules={[{ required: true }, { type: "string" }]}
              >
                <TextArea
                  className="text-input-bg-color"
                  rows={6}
                  placeholder="Write Something..."
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Policy Accrual----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Policy Accrual
              </span>
              <Paragraph>Define the occrual period of your policy</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                label="Assigned Date"
                required={false}
                name="assignDate"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Select
                  className="w-full"
                  placeholder="Select"
                  onChange={(e: string) => setState({ ...states, assignDate: e })}
                  options={assignDateSelectValue}
                />
              </Form.Item>
              <Form.Item
                label="Assigned Date"
                required={false}
                name="accrualFrequency"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Select
                  className="w-full"
                  placeholder="Select"
                  onChange={(e: string) => setState({ ...states, accrualFrequency: e })}
                  options={accrualFrequencySelectValue}
                />
              </Form.Item>

              <Form.Item
                name="entitlement"
                label="Entitlement"
                required={false}
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="0" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Carry Forward----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Carry Forward
              </span>
              <Paragraph>
                Define the carry farward days for your policy
              </Paragraph>
            </Col>
            <Col className="gutter-row " xs={24} md={12} xxl={8}>
              <Form.Item
                label="Maximum Carry Forward (Days Per Year)"
                required={false}
                name="carryforward"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Select
                  className="w-full"
                  placeholder="Select"
                  onChange={(e: string) => setState({ ...states, carryforward: e })}
                  options={carryForwardSelectValue}
                />
              </Form.Item>
              <Form.Item
                label="Carry Forward Expiration"
                name="carryforwardexpiration"
              // rules={[{ required: true }, { type: "string" }]}
              >
                <CommonDatePicker
                  open={states.openDatePicker}
                  setOpen={openDatePickerHandler}
                  setValue={(e: any) => console.log(e)}
                />
                {/* <DatePicker  /> */}
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Add Interns
              </span>
              <Paragraph>Select for this office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item name="intern">
                <div className=" flex items-center">
                  <Radio.Group onChange={onChange} value={states.internValue}>
                    <Radio value={1}>All interns</Radio>
                    <Radio value={2}>Select Interns</Radio>
                  </Radio.Group>
                  <span >
                    <AvatarGroup maxCount={6} list={states.intern} />
                  </span>
                </div>
              </Form.Item>
              <div className="my-5">
                <Form.Item name='applyForNewHire'>
                  <Switch checked={state?.applyToNewHires} onChange={(e: any) => setState({ ...states, applyForNewHire: e })} />
                  <span className="px-3 ">Apply to all new hires</span>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary">
              <NavLink to={`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}`}>
                Cancel
              </NavLink>
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              htmlType="submit"
            >
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={selectArray}
        deselectArray={deselectArray}
        openModal={states.openModal}
        setOpenModal={setState}
        state={states}
        internValue={states.internValue}
        intern={states.intern}
      />
    </div>
  );
};

export default LeavesAddPolicy;
