import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocation, useNavigate } from "react-router-dom";
import { BoxWrapper, ButtonThemePrimary } from "../../../../../components";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Typography, Row, Col, Divider, Form, Radio,
  RadioChangeEvent, Button, Space, Input, Switch, Avatar
} from "antd";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import { Breadcrumb } from "../../../../../components";
import constants, { ROUTES_CONSTANTS } from "../../../../../config/constants";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useShiftsCustomHook from "../actionHandler";
import { currentUserState } from '../../../../../store';
import { useRecoilState } from "recoil";
import NewTimePicker from "../../../../../components/calendars/TimePicker/newTimePicker";
import "./style.scss";

const AddShift: React.FC = () => {
  const { state } = useLocation()

  const { postShiftData, getAllInterns, internsData, editShifts } = useShiftsCustomHook();

  // getting functions from custom hook 
  const filteredInternsData = internsData?.map((item: any) => {
    return (
      {
        id: item?.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        image: `${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      }
    )
  })

  const navigate = useNavigate()
  const [states, setStates] = useState(
    {
      openFromTime: false,
      openToTime: false,
      openFromTimeValue: undefined,
      openToTimeValue: undefined,
      interns: state?.interns ?? filteredInternsData,
      openModal: false,
      internValue: state?.interns?.length === filteredInternsData?.length ? 1 : (state?.interns ? 2 : 1),
      applyToNewHires: state?.applyToNewHires ? state?.applyToNewHires : false,
    });

  useEffect(() => {
    getAllInterns(currentUser[0]?.company?.id)
  }, [states.openModal])
  // internsData

  const currentUser = useRecoilState(currentUserState);
  const deselectArray: any = [];
  const [form] = Form.useForm();
  const { Paragraph } = Typography;
  dayjs.extend(customParseFormat);



  const breadcrumbArray = [
    { name: "Add Shift" },
    { name: "Settings", onClickNavigateTo: `/settings/${ROUTES_CONSTANTS.SETTING_TEMPLATE}` },
    { name: "Shifts", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_SHIFTS}` },
  ];

  const initialValues = {
    shiftName: state?.name,
    timeFrom: state?.from ? dayjs(state?.from) : undefined,
    timeTo: state?.to ? dayjs(state?.to) : undefined,
    shiftDuration: state?.duration,
    roundOffCap: state?.roundOfCap,
    applyToNewHires: state?.applyToNewHires,
    interns: state?.interns
  }

  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setStates({
        ...states, openModal: true, internValue: radioValue
      })
    }
    else if (e.target.value === 1) {
      setStates({ ...states, internValue: radioValue, interns: filteredInternsData })
    }
  };


  // validate positive numbers 
  const validatePositiveNumber = (a: any, value: any, callback: any) => {
    if (value < 0) {
      callback('Negative values are not allowed');
    } else {
      callback();
    }
  };

  // Validation function for the "Round Off Cap" input field
  const validateRoundOffCap = (_: any, value: any) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
    if (!regex.test(value)) {
      return Promise.reject(new Error("Invalid format. Please use hh:mm:ss"));
    }
    return Promise.resolve();
  };

  const handleFormValues = (values: any) => {
    const newValues = {
      ...values,
      timeTo: dayjs(states.openToTimeValue),
      timeFrom: dayjs(states.openFromTimeValue),
      interns: states.interns,
      // interns: states.interns?.map(item => item.id),
      applyToNewHires: states.applyToNewHires
    }

    if (state !== null) {
      editShifts(state.id, newValues)
    } else {
      postShiftData(newValues)
    }
    form.resetFields()
    navigate(ROUTES_CONSTANTS.ADD_SHIFTS_MAIN)
  }

  return (
    <div className="leaves-add-policy">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper>
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={handleFormValues}
          layout="vertical"
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
          {/* initialValues={initialValues} */}
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Shift
              </span>
              <Paragraph>Enter shift details here</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="shiftName"
                label="Shift Name"
                required={false}
                rules={[{ required: true }, { type: "string" }]}>
                <Input placeholder="Enter name" className="input-style" />
              </Form.Item>

              <div className="flex flex-col md:flex-row justify-between md:gap-5 w-full shift-time">
                <div className="flex flex-col justify-between w-full time-picker-wrapper">
                  <Form.Item
                    name="timeFrom"
                    label="Time From"
                    required={false}
                    rules={[{ required: true }]}>
                    <NewTimePicker
                      placeholder='Select'
                      value={states.openFromTimeValue}
                      onChange={(e: any) => { setStates({ ...states, openFromTimeValue: e }) }}/>
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full ">
                  <Form.Item
                    name="timeTo"
                    label="Time To"
                    required={false}
                    rules={[{ required: true }]}>
                    <NewTimePicker
                      placeholder='Select'
                      value={states.openToTimeValue}
                      onChange={(e: any) => { setStates({ ...states, openToTimeValue: e }) }}/>
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name="shiftDuration"
                label="Shift Duration"
                required={false}
                rules={[{ required: true }, {
                  validator: validatePositiveNumber,
                }]}>
                <Input placeholder="0" type="number" className="input-style" />
              </Form.Item>
              <Form.Item
                name="roundOffCap"
                label="Round Off Cap"
                required={false}
                rules={[{ required: true }, {
                  validator: validateRoundOffCap,
                }]}>
                <Input
                  placeholder="00:00:00"
                  className="input-style"/>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          {/*------------------------ Add Interns----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md:px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color " >
                Applies to
              </span>
              <Paragraph>Select for this office location</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item name="interns">
                <div className=" flex items-center">
                  <Radio.Group onChange={onChange} value={states.internValue}>
                    <Radio value={1}>All Employees</Radio>
                    <Radio value={2}>Select Employees</Radio>
                  </Radio.Group>
                  <span>
                    <Avatar.Group
                      maxCount={4}
                      size="small"
                      maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' }}>
                      {(state?.interns ?? states.interns)?.map((item: any) => {
                        return (
                          <Avatar src={item.image} >{item.name}</Avatar>
                        )
                      })}
                    </Avatar.Group>
                  </span>
                </div>
              </Form.Item>
              <div className="my-5">
                <Form.Item name='applyToNewHires'>
                  <Switch
                    checked={state?.applyToNewHires ? state?.applyToNewHires : states?.applyToNewHires}
                    onChange={(e: any) => setStates({ ...states, applyToNewHires: e })}
                  />
                  <span className="px-2">Apply to all new hires</span>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary" onClick={() => { navigate(`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_SHIFTS}`) }}>
              Cancel
            </Button>
            <ButtonThemePrimary
              htmlType="submit">
              {state !== null ? "Update" : "Add"}
            </ButtonThemePrimary>
          </Space>
        </Form>
      </BoxWrapper>
      {states.openModal && <SettingCommonModal
        selectArray={filteredInternsData}
        deselectArray={deselectArray}
        openModal={states.openModal}
        setOpenModal={setStates}
        state={states}
      />}
    </div>
  );
};

export default AddShift;
