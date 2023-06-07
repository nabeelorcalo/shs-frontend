import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BoxWrapper } from "../../../../../components";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Typography, Row, Col, Divider, Form, Radio,
  RadioChangeEvent, Button, Space, Input, Switch
} from "antd";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import { Breadcrumb } from "../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useShiftsCustomHook from "../actionHandler";
import { currentUserState } from '../../../../../store';
import { useRecoilState } from "recoil";
import NewTimePicker from "../../../../../components/calendars/TimePicker/newTimePicker";
import "./style.scss";

const AddShift: React.FC = () => {
  const navigate = useNavigate()
  const [states, setStates] = useState(
    {
      openFromTime: false,
      openToTime: false,
      openFromTimeValue: undefined,
      openToTimeValue: undefined,
      intern: [],
      openModal: false,
      internValue: 1,
      applyForNewHire: false,
    });

  const { postShiftData, getAllInterns, internsData, editShifts } = useShiftsCustomHook();
  const currentUser = useRecoilState(currentUserState);
  const deselectArray: any = [];
  const { state } = useLocation()
  const [form] = Form.useForm();
  const { Paragraph } = Typography;
  dayjs.extend(customParseFormat);

  useEffect(() => {
    getAllInterns(currentUser[0]?.company?.id)
  }, [])

  const breadcrumbArray = [
    { name: "Add Shift" },
    { name: "Setting" },
    { name: "Shift", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_SHIFTS}` },
  ];

  const initialValues = {
    shiftName: state?.name,
    timeFrom: dayjs(state?.from),
    timeTo: dayjs(state?.to),
    shiftDuration: state?.duration,
    roundOffCap: state?.roundOfCap,
    applyForNewHire: state?.applyToNewHires,
    interns: state?.interns
  }
  // getting functions from custom hook 
  const filteredInternsData = internsData?.map((item: any, index: any) => {
    return (
      {
        id: item?.userDetail?.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        image: `${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      }
    )
  })

  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setStates({
        ...states, openModal: true, internValue: radioValue
      })
    }
    else if (e.target.value === 1) {
      setStates({ ...states, internValue: radioValue, intern: [] })
    }
  };

  const validatePositiveNumber = (rule: any, value: any, callback: any) => {
    if (value < 0) {
      callback('Negative values are not allowed');
    } else {
      callback();
    }
  };

  const handleFormValues = (values: any) => {
    const newValues = {
      ...values,
      timeTo: states.openToTimeValue,
      timeFrom: states.openFromTimeValue,
      interns: states.intern
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
                  <Form.Item name="timeFrom" label="Time From" >
                    <NewTimePicker
                      placeholder='Select'
                      value={states.openFromTimeValue}
                      onChange={(e: any) => { setStates({ ...states, openFromTimeValue: e }) }}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full ">
                  <Form.Item name="timeTo" required={false} label="Time To">
                    <NewTimePicker
                      placeholder='Select'
                      value={states.openToTimeValue}
                      onChange={(e: any) => { setStates({ ...states, openToTimeValue: e }) }}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name="shiftDuration"
                label="Shift Duration"
                required={false}
                rules={[{ required:  true }, { type: "string" }, {
                  validator: validatePositiveNumber,
                }]}
              >
                <Input placeholder="0" type="string" className="input-style" />
              </Form.Item>
              <Form.Item
                name="roundOffCap"
                label="Round Off Cap"
                required={false}
                rules={[{ required:  true }, { type: "string" }, {
                  validator: validatePositiveNumber,
                }]}
              >
                <Input placeholder="00:00:00" type="string" className="input-style" />
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
                  <Switch
                    checked={state?.applyToNewHires}
                    onChange={(e: any) => setStates({ ...states, applyForNewHire: e })}
                  />
                  <span className="px-2">Apply to all new hires</span>
                </Form.Item>
              </div>
            </Col>
          </Row>
          <Space className="flex justify-end">
            <Button danger size="middle" type="primary">
              <NavLink to={`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_SHIFTS}`} className="border-0">
                Cancel
              </NavLink>
            </Button>
            <Button
              size="middle"
              className="teriary-bg-color white-color add-button"
              htmlType="submit">
              {state !== null ? "Update" : "Add"}
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={filteredInternsData}
        deselectArray={deselectArray}
        openModal={states.openModal}
        setOpenModal={setStates}
        state={states}
        internValue={states.internValue}
        intern={states.intern}
      />
    </div>
  );
};

export default AddShift;
