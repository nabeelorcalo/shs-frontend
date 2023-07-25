import React, { useEffect, useState } from "react";
import { BoxWrapper } from "../../../../../components";
import {
  Typography, Row, Col, Divider, Form, Radio, Select,
  RadioChangeEvent, Button, Space, Input, Switch, Avatar
} from "antd";
import { Breadcrumb, CommonDatePicker } from "../../../../../components";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import "./style.scss";
import constants, { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { useLocation, useNavigate } from "react-router-dom";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useLeaveCustomHook from "../actionHandler";
import dayjs from "dayjs";
import { currentUserState } from "../../../../../store";
import { useRecoilState } from "recoil";
import UserSelector from "../../../../../components/UserSelector";

const LeavesAddPolicy: React.FC = () => {
  const currentUser = useRecoilState(currentUserState);
  const { postSettingLeaves, editSettingLeaves, getAllInterns, internsData } = useLeaveCustomHook()

  const filteredInternsData = internsData?.map((item: any) => {
    return (
      {
        id: item?.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        image: `${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      }
    )
  })
  const { state } = useLocation()
  const [states, setState] = useState<any>(
    {
      carryforward: null,
      assignDate: "",
      accrualFrequency: "",
      openDatePicker: false,
      interns: state?.interns ?? filteredInternsData,
      openModal: false,
      internValue: state?.interns?.length === filteredInternsData?.length ? 1 : (state?.interns ? 2 : 1),
      applyForNewHire: false
    });

  const navigate = useNavigate()
  const { TextArea } = Input;
  const { Paragraph } = Typography;
  const [form] = Form.useForm();
  const deselectArray: any = [];

  useEffect(() => {
    getAllInterns(currentUser[0]?.company?.id)
  }, [states.openModal])

  const breadcrumbArray = [
    { name: "Add Policy" },
    { name: "Setting", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}` },
    { name: "Leaves", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}` },
  ];

  const carryForwardSelectValue = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
  ]

  const leavesTypes = [
    { value: 'Casual', label: 'Casual' },
    { value: 'Sick', label: 'Sick' },
    { value: 'Work From Home', label: 'Work From Home' },
    { value: 'Medical', label: 'Medical' },
    { value: 'Maternity', label: 'Maternity' },
    { value: 'Paternity', label: 'Paternity' },
    { value: 'Matrimonial', label: 'Matrimonial' }
  ]

  const assignDateSelectValue = [
    { value: 'joining Date', label: 'Joining Date' },
  ]
  const accrualFrequencySelectValue = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Yearly', label: 'Yearly' },
  ]
  const validatePositiveNumber = (rule: any, value: any, callback: any) => {
    if (value < 0) {
      callback('Negative values are not allowed');
    } else {
      callback();
    }
  }

  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setState({
        ...states, openModal: true, internValue: radioValue
      })
    }
    else if (e.target.value === 1) {
      setState({ ...states, internValue: radioValue, interns: filteredInternsData })
    }
  };

  const openDatePickerHandler = () => {
    setState({
      ...states, openDatePicker: !states.openDatePicker
    })
  }

  const onFinish = (values: any) => { 
    values.applyToNewHires = states.applyForNewHire;
    values.interns = states.interns;
    if (state) {
      editSettingLeaves(state.id, values)
    }
    else {
      postSettingLeaves(values)
    }
    navigate(`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}`)
  }

  const initialValues = {
    policyName: state?.name,
    description: state?.description,
    carryforwardexpiration: dayjs(state?.carryForwardExpiry),
    applyForNewHire: state?.applyToNewHires,
    intern: state?.intern,
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
                Policy Details
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
                <UserSelector
                  placeholder="Select Leave"
                  options={leavesTypes}
                />
              </Form.Item>
              <Form.Item
                name="description"
                label={<span>Description <span className="text-success-placeholder-color">(optional)</span></span>}
                required={false}
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
                label="Accrual Frequency"
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
                rules={[{ required: true }, { type: "string" }, { validator: validatePositiveNumber }]}
              >
                <Input placeholder="0" type="number" min={0} />
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
              <span className="text-success-placeholder-color"> (optional)</span>
              <Paragraph>
                Define the carry forward days for your policy
              </Paragraph>
            </Col>
            <Col className="gutter-row " xs={24} md={12} xxl={8}>
              <Form.Item
                label="Maximum Carry Forward (Days Per Year)"
                required={false}
                name="carryforward"
                rules={[{ required: true }, { type: "number" }]}
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
                rules={[{ required: true }]}
              >
                <CommonDatePicker
                  open={states.openDatePicker}
                  setOpen={openDatePickerHandler}
                  setValue={(e: any) => console.log(e)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider />

          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color" >
                Applies to
              </span>
              <Paragraph>Select the people you want to add in this policy</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={9}>
              <Form.Item name="interns">
                <div className="flex items-center">
                  <Radio.Group onChange={onChange} value={states.internValue}>
                    <Radio value={1}>All Employees</Radio>
                    <Radio value={2}>Select Employees</Radio>
                  </Radio.Group>
                  <span >
                    {/* <Avatar.Group
                      maxCount={4}
                      size="small"
                      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}>
                      {states.intern?.map((item: any) => {
                        return (
                          <Avatar
                            src={item.image}
                          >{item.name}</Avatar>
                        )
                      })}
                    </Avatar.Group> */}
                    <Avatar.Group
                      maxCount={4}
                      size="small"
                      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}>
                      {(states?.interns ?? states.interns)?.map((item: any) => {
                        return (
                          <Avatar src={item.image}>{item.name}</Avatar>
                        )
                      })}
                    </Avatar.Group>
                  </span>
                </div>
              </Form.Item>
              <div className="my-5">
                <Form.Item name='applyForNewHire'>
                  <Switch defaultChecked={state?.applyToNewHires} onChange={(e: any) => setState({ ...states, applyForNewHire: e })} />
                  <span className="px-3 text-success-placeholder-color">Apply to all new hires</span>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary"
              onClick={() => navigate(`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_LEAVES}`)}>
              Cancel
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
      {states.openModal && <SettingCommonModal
        selectArray={filteredInternsData}
        deselectArray={deselectArray}
        openModal={states.openModal}
        setOpenModal={setState}
        state={states}
      />}
    </div>
  );
};

export default LeavesAddPolicy;
