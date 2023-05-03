import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SettingAvater } from "../../../../../assets/images";
import { BoxWrapper, TimePickerComp } from "../../../../../components";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Radio,
  RadioChangeEvent,
  Button,
  Space,
  Input,
  Switch,
} from "antd";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import { Breadcrumb } from "../../../../../components";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import dayjs from "dayjs";
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
  const [state, setState] = useState(
    {
      openFromTime: false,
      openToTime: false,
      openFromTimeValue: "",
      openToTimeValue: "",
      intern: [],
      openModal: false,
      internValue: 1,
    });

  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setState({
        ...state, openModal: true, internValue: radioValue
      })
    }
    else if (e.target.value === 1) {
      setState({ ...state, internValue: radioValue, intern: [] })
    }
  };

  const openTimeFromHandler = () => {
    setState({ ...state, openFromTime: !state.openFromTime })
  }
  const openTimeToHandler = () => {
    setState({ ...state, openToTime: !state.openToTime })
  }
  return (
    <div className="leaves-add-policy">
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper>
        <Form
          layout="vertical"
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
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
                rules={[{ required: true }, { type: "string" }]}

              >
                <Input placeholder="Enter name" className="input-style" />
              </Form.Item>
              <div className="flex flex-col md:flex-row justify-between md:gap-5 w-full shift-time">
                <div className="flex flex-col justify-between w-full">
                  <Form.Item
                    name="timeForm"
                    required={false}
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <TimePickerComp
                      className="input-style"
                      label={<p className='pb-[6px]'>Time From</p>}
                      open={state.openFromTime}
                      setOpen={openTimeFromHandler}
                      value={state.openFromTimeValue}
                      setValue={(e: string) => setState({ ...state, openFromTimeValue: e })}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full ">
                  <Form.Item
                    name="timeto"
                    required={false}
                    rules={[{ required: true }, { type: "string" }]}
                  >
                    <TimePickerComp
                      className="input-style"
                      label={<p className='pb-[6px]'>Time To</p>}
                      open={state.openToTime}
                      setOpen={openTimeToHandler}
                      value={state.openToTimeValue}
                      setValue={(e: string) => setState({ ...state, openToTimeValue: e })}
                    />
                  </Form.Item>
                </div>
              </div>
              <Form.Item
                name="shiftDuration"
                label="Shift Duration"
                required={false}
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="0" type="number" className="input-style" />
              </Form.Item>
              <Form.Item
                name="roundOffCap"
                label="Round Off Cap"
                required={false}
                rules={[{ required: true }, { type: "string" }]}

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
              <div className=" flex items-center">
                <Radio.Group onChange={onChange} value={state.internValue}>
                  <Radio value={1}>All interns</Radio>
                  <Radio value={2}>Select Interns</Radio>
                </Radio.Group>
                <span >
                  <AvatarGroup maxCount={6} list={state.intern} />
                </span>
              </div>
              <div className="my-5">
                <Switch />
                <span className="px-2">Apply to all new hires</span>
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
        openModal={state.openModal}
        setOpenModal={setState}
        state={state}
        internValue={state.internValue}
        intern={state.intern}
      />
    </div>
  );
};

export default AddShift;
