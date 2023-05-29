import React, { useState } from "react";
import dayjs from "dayjs";
import { NavLink, useLocation } from "react-router-dom";
import { SettingAvater } from "../../../../../assets/images";
import { BoxWrapper, TimePickerComp } from "../../../../../components";
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
import "./style.scss";

const { Paragraph } = Typography;
dayjs.extend(customParseFormat);

const AddShift: React.FC = () => {
  const breadcrumbArray = [
    { name: "Add Shift" },
    { name: "Setting" },
    { name: "Shift", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_SHIFTS}` },
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
  const { state } = useLocation()
  const [form] = Form.useForm();
  const [states, setStates] = useState(
    {
      openFromTime: false,
      openToTime: false,
      openFromTimeValue: "",
      openToTimeValue: "",
      intern: [],
      openModal: false,
      internValue: 1,
      applyForNewHire:false
    });

  // getting functions from custom hook 
  const { postShiftData } = useShiftsCustomHook()

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
  const openTimeFromHandler = () => {
    setStates({ ...states, openFromTime: !states.openFromTime })
  }
  const openTimeToHandler = () => {
    setStates({ ...states, openToTime: !states.openToTime })
  }
  const handleFormValues = (values: any) => {

    const newValues = {
      ...values,
      timeTo: states.openToTimeValue,
      timeFrom: states.openFromTimeValue
    }
    console.log('forms values are', newValues);
    postShiftData(newValues)

  }
  console.log('previous state is', state);

  const initialValues = {
    shiftName: state?.name,
    timeFrom: dayjs(state?.from),
    timeTo: dayjs(state?.to),
    shiftDuration: dayjs(state?.duration),
    roundOffCap: dayjs(state?.roundOfCap),
    applyForNewHire: state?.applyToNewHires,
    interns: state?.interns
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
                <div className="flex flex-col justify-between w-full">
                  <Form.Item
                    name="timeFrom">
                    <TimePickerComp
                      className="input-style"
                      label={<p className='pb-[6px]'>Time From</p>}
                      open={states.openFromTime}
                      customSetValue
                      setOpen={openTimeFromHandler}
                      value={states.openFromTimeValue}
                      setValue={(e: string) => setStates({ ...states, openFromTimeValue: e })}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full ">
                  <Form.Item
                    name="timeTo"
                    required={false}>
                    <TimePickerComp
                      className="input-style"
                      label={<p className='pb-[6px]'>Time To</p>}
                      open={states.openToTime}
                      customSetValue
                      setOpen={openTimeToHandler}
                      value={states.openToTimeValue}
                      setValue={(e: string) => setStates({ ...states, openToTimeValue: e })}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name="shiftDuration"
                label="Shift Duration"
                required={false}
                rules={[{ required: true }]}
              >
                <Input placeholder="0" type="number" className="input-style" />
              </Form.Item>
              <Form.Item
                name="roundOffCap"
                label="Round Off Cap"
                required={false}
                rules={[{ required: true }]}

              >
                <Input placeholder="00:00:00" type="number" className="input-style" />
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
                  <Switch checked={state?.applyToNewHires} onChange={(e: any) => setStates({ ...states, applyForNewHire: e })}/>
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
              Add
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={selectArray}
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
