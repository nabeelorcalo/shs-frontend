import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  Typography, Row, Col, Divider, Form, Radio,
  RadioChangeEvent, Button, Space, Input, Switch,
} from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Breadcrumb, BoxWrapper } from "../../../../../components";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import { ROUTES_CONSTANTS } from "../../../../../config/constants";
import AvatarGroup from "../../../../../components/UniversityCard/AvatarGroup";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import useCustomHook from "../../../../Payroll/actionHandler";
import { currentUserState } from '../../../../../store';
import { useRecoilState } from "recoil";
import NewTimePicker from "../../../../../components/calendars/TimePicker/newTimePicker";
import "./style.scss";

const { Paragraph } = Typography;
const PayrollAddCategory = () => {
  const currentUser = useRecoilState(currentUserState);
  const { state } = useLocation();
  const deselectArray: any = [];
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { postPayroll, internsData, getAllInterns, editPayroll } = useCustomHook();
  const filteredInternsData = internsData?.map((item: any, index: any) => {
    return (
      {
        id: item?.userDetail?.id,
        name: `${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`,
        image: `${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      }
    )
  })
  const [states, setState] = useState(
    {
      openFromTime: false,
      openToTime: false,
      openFromTimeValue: undefined,
      openToTimeValue: undefined,
      intern: filteredInternsData ? filteredInternsData?.map((item: any) => item.id) :[],
      openModal: false,
      internValue: 1,
      applyToNewHires: false
    });


  useEffect(() => {
    getAllInterns(currentUser[0]?.company?.id)
  }, [])

  console.log(state);

  const initialValues = {
    payrollName: state?.name,
    from: dayjs(state?.from),
    timeTo: dayjs(state?.to),
    applyToNewHires: state?.applyToNewHires,
    interns: state?.interns
  }

  const breadcrumbArray = [
    { name: "Add Category" },
    { name: "Setting" },
    { name: "Payroll", onClickNavigateTo: `/${ROUTES_CONSTANTS.SETTING}/${ROUTES_CONSTANTS.SETTING_PAYROLL}` },

  ];

  const onChange = (e: RadioChangeEvent) => {
    const radioValue = e.target.value
    if (e.target.value === 2) {
      setState({
        ...state, openModal: true, internValue: radioValue
      })
    }
    else if (e.target.value === 1) {
      setState({ ...state, internValue: radioValue, intern: filteredInternsData?.map((item: any) => item.id) })
    }
  };

  const handlePayollForm = (values: any) => {
    const newValues = {
      ...values,
      to: states.openToTimeValue,
      from: states.openFromTimeValue,
      interns: states.intern,
      applyToNewHires: states.applyToNewHires
    }
    if (state !== null) {
      editPayroll(state.id, newValues)
    } else {
      postPayroll(newValues)
    }
    navigate(ROUTES_CONSTANTS.PAYROLL_CATEGORY)
    form.resetFields()
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
          onFinish={handlePayollForm}
          initialValues={initialValues}
        >
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <span className="font-medium mt-0.5 sm:font-semibold text-xl text-primary-color" >
                Payroll Details
              </span>
              <Paragraph>Enter payroll details here</Paragraph>
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
                    <NewTimePicker
                      placeholder='Select'
                      value={states.openFromTimeValue}
                      onChange={(e: any) => { setState({ ...states, openFromTimeValue: e }) }}
                    />
                  </Form.Item>
                </div>
                <div className="flex flex-col w-full mt-5 md:mt-0 md:pl-1">
                  <Form.Item
                    name="timeTo"
                    required={false}
                    label='Time to'
                  >
                    <NewTimePicker
                      placeholder='Select'
                      value={states.openToTime}
                      onChange={(e: any) => { setState({ ...states, openToTimeValue: e }) }}
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
              <Paragraph>Select the people you want to add in this payroll</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <div className=" flex items-center">
                <Radio.Group onChange={onChange} value={states.internValue}>
                  <Radio value={1}>All interns</Radio>
                  <Radio value={2}>Select Interns</Radio>
                </Radio.Group>
                <span >
                  <AvatarGroup maxCount={6} list={states.intern} />
                </span>
              </div>
              <div className="my-5">
                <Form.Item name='applyToNewHire'>
                  <Switch
                    checked={states?.applyToNewHires}
                    onChange={(e: any) => setState({ ...states, applyToNewHires: e })}
                  />
                  <span className="px-2">Apply to all new hires</span>
                </Form.Item>
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
              {state !== null ? 'Update' : 'Add'}
            </Button>
          </Space>
        </Form>
      </BoxWrapper>
      <SettingCommonModal
        selectArray={filteredInternsData}
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

export default PayrollAddCategory;
