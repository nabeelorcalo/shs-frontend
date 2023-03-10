import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { DepartmentAddIcon, LocationMore } from "../../../assets/images";
import { Col, Row, Typography, Space, Dropdown, Menu, Form, } from "antd";
// import { Button } from "../../Button";
import { SearchBar } from "../../SearchBar/SearchBar";
import { BoxWrapper } from "../../BoxWrapper/boxWrapper";
import "./Department.scss";
import { PopUpModal } from "../../Model";
import { Button } from "../../Button";
import { Input } from "antd";
import { Alert } from "../../Alert";
import DropDownForSetting from "../Common/CustomSettingDropdown";
const { TextArea } = Input;
const { Title, Text } = Typography;


let overview = [
  {
    id: 0,
    name: "Finance",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
  {
    id: 1,
    name: "Human Resources",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
  {
    id: 2,
    name: "Design",
    content:
      "The finance department is responsible for the financial planning and management of the company.",
  },
];



const SettingDepartment: React.FC = (props: any) => {
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
    <div className="setting-department">
     
      <div className="flex justify-between">
        <SearchBar size="large" handleChange={handleChange} />

        <Button
          color="#4a9d77"
          icon={<DepartmentAddIcon className="mx-2" />}
          label="Add Department"
          onClick={() => setShowEditModal(!showEditModal)}
          type="primary"
          size="middle"
        />

        {/* <Button type="primary" icon={<span><DepartmentAddIcon className="mx-2" /></span>} size="small">
          <span className="">  Add department</span> </Button> */}
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} md={12} xxl={8}>
               <div className="department-box-wrapper">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-sm font-normal">

                        {data.content}
                      </Text>
                    </div>

                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForSetting showEditModal={showEditModal} showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} setShowEditModal={setShowEditModal} />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <PopUpModal
        cancelBtntxt="Cancel"
        okBtntxt="Submit"
        state={showEditModal}
        setState={setShowEditModal}
        title="Department"
        width={600}
      >
        <Form layout="vertical">
          <Form.Item
            name="locationName"
            rules={[
              { required: true, message: "Please Enter your username!" },
            ]}
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
      </PopUpModal>
      <Alert
        cancelBtntxt="Cancel"
        okBtntxt="Delete"
        state={showDeleteModal}
        setState={setShowDeleteModal}
        type="error"
        width={500}
      >
        <p>
          Are you sure you want to delete this item?
        </p>
      </Alert>
    </div>
  );
};

export default SettingDepartment;
