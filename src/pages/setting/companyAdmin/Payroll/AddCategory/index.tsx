import React, { useState } from "react";
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
import { SettingAvater} from "../../../../../assets/images";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, CommonDatePicker , BoxWrapper } from "../../../../../components";
import SettingCommonModal from "../../../../../components/Setting/Common/SettingCommonModal";
import "./style.scss";

const { Title, Paragraph } = Typography;

const PayrollAddCategory = () => {
  const navigate = useNavigate();
  const breadcrumbArray = [
    { name: "Add Category"},
    { name: "Setting"  },
    { name: "Payroll" , onClickNavigateTo:"/settings/payroll" },
  
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

  const deselectArray:any = [];

  const [value, setValue] = useState(1);
  const [openModal, setOpenModal] = useState<any>(false);
  const [openDatePickerFrom, setOpenDatePickerFrom] = useState(false);
  const [openDatePickerTo, setOpenDatePickerTo] = useState(false);
  const [formValues, setFormValues] = useState<any>({
    shiftName: "",
    formDate: "",
    toDate: "",
    addInterns: "",
    officeLocation: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const onChange = (e: RadioChangeEvent) => {
    if(e.target.value===2){
      setOpenModal(!openModal);
    }
    setValue(e.target.value);
  };

  console.log("formValues", formValues);
  return (
    <div className="payroll-add-category">
      {/*------------------------ Header----------------------------- */}

      <Breadcrumb breadCrumbData={breadcrumbArray}  />

      <Divider  />
      <BoxWrapper>
        <Form layout="vertical">
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Payroll Details
              </Title>
              <Paragraph>Enter shift details here</Paragraph>
            </Col>
            <Col className="gutter-row" xs={24} md={12} xxl={8}>
              <Form.Item
                name="shiftName"
                label="Shift Name"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter Name" />
              </Form.Item>
              <div className="flex flex-col md:flex-row justify-between w-full my-5">
                <div className="flex flex-col justify-between w-full pr-2 ">
                  <label>From</label>
                  <CommonDatePicker
                    name="Date Picker"
                    open={openDatePickerFrom}
                    onBtnClick={() => {}}
                    setOpen={setOpenDatePickerFrom}
                    setValue={function noRefCheck() {}}
                  />
                </div>
                <div className="flex flex-col w-full pl-1">
                  <label>To</label>
                  <CommonDatePicker
                    name="Date Picker"
                    open={openDatePickerTo}
                    onBtnClick={() => {}}
                    setOpen={setOpenDatePickerTo}
                    setValue={function noRefCheck() {}}
                  />
                </div>
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
                <Radio value={1}>All Employees</Radio>
                <Radio value={2}>Select Employees</Radio>
              </Radio.Group>
              <div className="my-5">
                <Switch />
                <span className="px-2">Apply to all new hires</span>
              </div>
            </Col>
          </Row>

          <Space className="flex justify-end">
            <Button danger size="middle" type="primary"
               onClick={()=>navigate("/settings/payroll")}>
              Cencal
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

export default PayrollAddCategory;
