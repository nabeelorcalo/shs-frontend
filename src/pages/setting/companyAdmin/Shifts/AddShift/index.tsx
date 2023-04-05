import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const { Title, Paragraph } = Typography;
dayjs.extend(customParseFormat);

const AddShift: React.FC = () => {
  const navigate = useNavigate();
  const breadcrumbArray = [
    { name: "Add Shift"},
    { name: "Setting"  },
    { name: "Shift" , onClickNavigateTo:"/settings/shifts" },
  
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
    if(e.target.value===2){
      setOpenModal(!openModal);
    }
    setValue(e.target.value);
  };
  return (
    <div className="leaves-add-policy">
   <Breadcrumb breadCrumbData={breadcrumbArray}  />
        <Divider />
      <BoxWrapper>
        <Form layout="vertical">
          {/*------------------------ Policy Details----------------------------- */}
          <Row className="mt-5">
            <Col className="gutter-row md-px-3" xs={24} md={12} xxl={8}>
              <Title className="mt-0.5" level={4}>
                Shift
              </Title>
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
            onClick={()=>navigate("/settings/shifts")}>
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

export default AddShift;
