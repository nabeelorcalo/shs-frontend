import { useEffect, useState } from "react";
import {
  Typography, Row, Col, Divider, Form, Radio,
  RadioChangeEvent, Button, Space, Input, Switch,
} from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { Breadcrumb, BoxWrapper, TimePickerComp } from "../../../../../components";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useCustomHook from "../../../../Payroll/actionHandler";
import { currentUserState } from '../../../../../store';
import { useRecoilState } from "recoil";
import "./style.scss";

const { Paragraph } = Typography;
const PayrollAddCategory = () => {
  const navigate = useNavigate();
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
  const { postPayroll, internsData, getAllInterns } = useCustomHook();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const deselectArray: any = [];
  const [form] = Form.useForm();

  useEffect(() => {
    getAllInterns(currentUser?.company?.id)
  }, [])

  const filteredInternsData = internsData?.map((item: any, index: any) => {
    return (
      {
        id: item?.userDetail?.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        image: `${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      }
    )
  })
  const breadcrumbArray = [
    { name: "Add Category" },
    { name: "Setting" },
    { name: "Payroll", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_PAYROLL}` },

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
      to: state.openToTimeValue,
      from: state.openFromTimeValue,
      intern: state.intern,
      applyToNewHires: state.applyToNewHires
    }
    form.resetFields()
    postPayroll(newValues)
    navigate(ROUTES_CONSTANTS.PAYROLL_CATEGORY)

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
                name="payrollName"
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
                    label='Time From'
                  >
                    <TimePickerComp
                      className="input-style"
                      open={state.openFromTime}
                      customSetValue
                      setOpen={openTimeFromHandler}
                      value={state.openFromTimeValue}
                      setValue={(e: any) => setState({ ...state, openFromTimeValue: e })}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full mt-5 md:mt-0 md:pl-1">
                  <Form.Item
                    name="to"
                    required={false}
                    label='Time to'
                  >
                    <TimePickerComp
                      className="input-style"
                      open={state.openToTime}
                      customSetValue
                      setOpen={openTimeToHandler}
                      value={state.openToTimeValue}
                      setValue={(e: any) => setState({ ...state, openToTimeValue: e })}
                    />
                  </Form.Item>
                  {/* <Form.Item
                    name="to"
                    required={false}
                    label="Time To"
                  >
                    <TimePickerComp
                      className="input-style"
                      open={state.openToTime}
                      setOpen={openTimeToHandler}
                      value={state.openToTimeValue}
                      setValue={(e: any) => setState({ ...state, openToTimeValue: e })}
                    />
                  </Form.Item> */}
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
                <Form.Item name='applyToNewHire'>
                  <Switch
                    checked={state?.applyToNewHires}
                    onChange={(e: any) => setState({ ...state, applyToNewHires: e })}
                  />
                  <span className="px-2">Apply to all new hires</span>
                </Form.Item>
                {/* <Form.Item name='applyForNewHire'>
                  <Switch
                    checked={state?.applyToNewHires}
                  // onChange={(e: any) => setState({ ...state, applyForNewHire: e })} 
                  />
                  <span className="px-2">Apply to all new hires</span>
                </Form.Item> */}
                {/* <span className="px-2">Apply to all new hires</span> */}
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
        selectArray={filteredInternsData}
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
