import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SettingAvater } from "../../../../../assets/images";
import { BoxWrapper } from "../../../../../components/BoxWrapper/BoxWrapper";
import customParseFormat from "dayjs/plugin/customParseFormat";
import dayjs from "dayjs";
import "./style.scss";
import {
  Typography,
  Row,
  Col,
  Divider,
  Form,
  Radio,
  TimePicker,
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

const { Title, Paragraph } = Typography;
dayjs.extend(customParseFormat);

const AddShift: React.FC = () => {
  const breadcrumbArray = [
    { name: "Add Shift"},
    { name: "Setting"  },
    { name: "Shift" , onClickNavigateTo:`/settings/${ROUTES_CONSTANTS.SETTING_SHIFTS}` },
  
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
  const format = "HH:mm";
  const [value, setValue] = useState(1);
  const [openModal, setOpenModal] = useState<any>(false);
  const [intern, setIntern] = useState<any>();
  const [formValues, setFormValues] = useState<any>({
    shiftName: "",
    timeForm: "",
    timeTo: "",
    street: "",
    shiftDuration: "",
    roundOffCap: "",
    allEmployee: "",
    applyToAllNewHires: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
    if (e.target.value === 2) {
      setOpenModal(!openModal);
    }
    else if (e.target.value === 1) {
      setIntern(null)
    }
  };
   const SelectInternHandler = (data: any) => {
    console.log(data)
    setIntern(data)

  }

  return (
    <div className="leaves-add-policy">
   <Breadcrumb breadCrumbData={breadcrumbArray}  />
        <Divider />
      <BoxWrapper>
        <Form layout="vertical">
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
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <div className="flex flex-col md:flex-row justify-between w-full my-5">
                <div className="flex flex-col justify-between w-full pr-2 ">
                  <label>Time From</label>
                  <TimePicker
                    className="h-[45px]"
                    defaultValue={dayjs("12:08", format)}
                    format={format}
                  />
                </div>
                <div className="flex flex-col w-full pl-1">
                  <label>Time</label>
                <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
                </div>
              </div>
              <Form.Item
                name="shiftDuration"
                label="Shift Duration"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="0" />
              </Form.Item>
              <Form.Item
                name="roundOffCap"
                label="Round Off Cap"
                rules={[{ message: "Please Enter your username!" }]}
              >
                <Input placeholder="00:00:00" type="number" />
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
            <div className=" flex items-center"> <Radio.Group onChange={onChange} value={value}>
                <Radio value={1}>All interns</Radio>
                <Radio value={2}>Select Interns</Radio>
              </Radio.Group>
                <span >
                  <AvatarGroup maxCount={6} list={intern} />
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
            <NavLink to={`/settings/${ROUTES_CONSTANTS.SETTING_SHIFTS}`}> 
             Cancel 
             </NavLink>
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
        SelectInternHandler={SelectInternHandler}

      />
    </div>
  );
};

export default AddShift;
