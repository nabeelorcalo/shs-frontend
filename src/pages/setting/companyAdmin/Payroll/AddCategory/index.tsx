import { useState } from "react";
import {
  Typography, Row, Col, Divider, Form, Radio,
  RadioChangeEvent, Button, Space, Input, Switch,
} from "antd";
import { SettingAvater } from "../../../../../assets/images";
import { NavLink } from "react-router-dom";
import { Breadcrumb, BoxWrapper, TimePickerComp } from "../../../../../components";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";

const { Paragraph } = Typography;
const PayrollAddCategory = () => {
  const deselectArray: any = [];
  const [form] = Form.useForm();
  const [state, setState] = useState(
    {
      openFromTime: false,
      openToTime: false,
      openFromTimeValue: "",
      openToTimeValue: "",
      intern: [],
      openModal: false,
      internValue: 1,
      applyToNewHires: false
    });

  const breadcrumbArray = [
    { name: "Add Category" },
    { name: "Setting" },
    { name: "Payroll", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_PAYROLL}` },

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

  const openTimeFromHandler = () => {
    setState({ ...state, openFromTime: !state.openFromTime })
  }

  const openTimeToHandler = () => {
    setState({ ...state, openToTime: !state.openToTime })
  }

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

  const handlePayollForm = (values: any) => {
    const newValues = {
      ...values,
      timeTo: state.openToTimeValue,
      timeFrom: state.openFromTimeValue
    }
  }

  return (
    <div className="payroll-add-category">
      {/*------------------------ Header----------------------------- */}
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <BoxWrapper>
        <Form
          layout="vertical"
          form={form}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={handlePayollForm}>
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color" >
                Payroll Details
              </span>
              <Paragraph>Enter shift details here</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="payrolName"
                label="Payroll Name"
                required={false}
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input placeholder="Enter name" className="input-style" />
              </Form.Item>
              <div className="flex flex-col md:flex-row justify-between w-full md:my-5">
                <div className="flex flex-col justify-between w-full md:pr-2 ">
                  <Form.Item
                    name="from"
                    required={false}
                    rules={[{ required: true }]}
                    label='Time From'
                  >
                    <TimePickerComp
                      className="input-style"
                      open={state.openFromTime}
                      customSetValue
                      setOpen={openTimeFromHandler}
                      value={state.openFromTimeValue}
                      setValue={(e: string) => setState({ ...state, openFromTimeValue: e })}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full mt-5 md:mt-0 md:pl-1">
                  <Form.Item
                    name="to"
                    required={false}
                    rules={[{ required: true }]}
                    label="Time To"
                  >
                    <TimePickerComp
                      className="input-style"
                      open={state.openToTime}
                      setOpen={openTimeToHandler}
                      value={state.openToTimeValue}
                      setValue={(e: any) => setState({ ...state, openToTimeValue: e })}
                    />
                  </Form.Item>
                </div>
              </div>
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

                <Form.Item name='applyForNewHire'>
                  <Switch
                    checked={state?.applyToNewHires}
                  // onChange={(e: any) => setState({ ...state, applyForNewHire: e })} 
                  />
                  <span className="px-2">Apply to all new hires</span>
                </Form.Item>
                <span className="px-2">Apply to all new hires</span>
              </div>
            </Col>
          </Row>

          <Space className="flex justify-end">
            <Button danger size="middle" type="primary">
              <NavLink to={`/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_PAYROLL}`}>
                Cancel
              </NavLink>
            </Button>
            <Button
              htmlType="submit"
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
        openModal={state.openModal}
        setOpenModal={setState}
        state={state}
        internValue={state.internValue}
        intern={state.intern}
      />
    </div>
  );
};

export default PayrollAddCategory;
