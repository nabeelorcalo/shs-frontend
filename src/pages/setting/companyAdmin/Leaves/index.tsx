import { useState } from "react";
import { Typography, Row, Col, Form, Input, Button } from "antd";
import {
  BereavementLeave,
  CasualLeave,
  SettingLeaves,
  MaternityLeave,
  MatrimonialLeave,
  MedicalLeave,
  PaternityLeave,
  SickLeave,
  WorkFromHome,
} from "../../../../assets/images";
import { Alert, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { PopUpModal } from "../../../../components/Model";
import { NavLink } from "react-router-dom";
import "./style.scss";

const { TextArea } = Input;
const { Title, Text } = Typography;

let overview = [
  {
    name: "Casual Leave",
    image: <CasualLeave />,
  },
  {
    name: "Sick Leave",
    image: <SickLeave />,
  },
  {
    name: "Work Form Home",
    image: <WorkFromHome />,
  },
  {
    name: "Medical Leave",
    image: <MedicalLeave />,
  },
  {
    name: "Maternity Leave",
    image: <MaternityLeave />,
  },
  {
    name: "Paternity Leave",
    image: <PaternityLeave />,
  },
  {
    name: "Matrimonial Leave",
    image: <MatrimonialLeave />,
  },
  {
    name: "Bereavement Leave",
    image: <BereavementLeave />,
  },
];

const SettingLeave = () => {
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>({
    departmentName: "",
    Description: "",
  });
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  };
  return (
    <div className="setting-leaves">
      <div>
        <div className="flex justify-between">
          <SearchBar size="large" handleChange={handleChange} />
          <NavLink to="/settings/leaves/add-policy">
          <Button
            size="middle"
            onClick={() => {}}
            className="flex gap-2 setting-add-button white-color teriary-bg-color"
          >
            <SettingLeaves /> Add Policy
          </Button>
          </NavLink>
        </div>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row" xs={24} md={12} lg={8}>
              <div className="setting-leaves-box-wrapper w-full flex flex-col">
                <div className="float-right place-items-end cursor-pointer flex justify-end">
                  <DropDownForSetting
                     link={"/settings/leaves/add-policy"}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    // setShowEditModal={setShowEditModal}
                  />
                </div>
                <div className="flex ">
                  <span> {data.image}</span>
                  <Title level={5} className="pt-3 pl-2 m-0">
                    {data.name}
                  </Title>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      {/* <PopUpModal
        // cancelBtntxt="Cancel"
        okBtntxt="Submit"
        state={showEditModal}
        setState={setShowEditModal}
        title="Edit Category"
        width={600}
      >
        <Form layout="vertical">
          <Form.Item
            name="locationName"
            rules={[{ required: true, message: "Please Enter your username!" }]}
          >
            <div className="d-flex w-full pl-1">
              <p className="py-2">Recurrence</p>
              <Input placeholder="Title" className="input-style" />
            </div>
          </Form.Item>
          <div className="mt-3 flex flex-col">
            <label className="pb-2">Description</label>
            <TextArea rows={6} placeholder="Write Something..." maxLength={6} />
          </div>
        </Form>
      </PopUpModal> */}
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={showDeleteModal}
        setState={setShowDeleteModal}
        type="error"
        width={500}
        title=""
      >
        <p>Are you sure you want to delete this item?</p>
      </Alert>
    </div>
  );
};

export default SettingLeave;
