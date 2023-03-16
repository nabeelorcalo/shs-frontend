import React, { useState } from "react";
import { Typography, Divider, Row, Col, Form, Input, Button } from "antd";
import {
  DepartmentAddIcon,
  SettingTimesheetIcon,
} from "../../../assets/images";
import { Alert, SearchBar } from "../../../components";
import DropDownForSetting from "../../../components/Setting/Common/CustomSettingDropdown";
import { PopUpModal } from "../../../components/Model";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import "./style.scss";

const { TextArea } = Input;
const { Title, Text } = Typography;

let overview = [
  {
    name: "Designing",
    content:
      "Producing consistently excellent visual work and  a host of ideas",
  },
  {
    name: "Coordination",
    content:
      "The process of organizing people or groups so that they work together properly and well",
  },
  {
    name: "Training",
    content:
      "Training has specific goals of improving one's capability, capacity, productivity and performance.",
  },
];

const SettingTimesheet = () => {
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
  const close = () => {
    setShowEditModal(false);
  };
  return (
    <div className="setting-time-sheet">
      <div>
        <div className="flex justify-between">
          <SearchBar size="middle" handleChange={handleChange} />
          <Button
            size="middle"
            onClick={() => {setShowEditModal(!showEditModal)}}
            className="flex gap-2 setting-add-button white-color teriary-bg-color"
          >
            <SettingTimesheetIcon /> Add Category
          </Button>
        </div>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={12} lg={8}>
              <div className="w-full setting-time-sheet-box-wrapper">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-base text-sm pb-1 ">
                        {data.content}
                      </Text>
                    </div>

                    <span className="float-right cursor-pointer w-[40px]">
                      <DropDownForSetting
                        showEditModal={showEditModal}
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                        setShowEditModal={setShowEditModal}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
      <PopUpModal
        open={showEditModal}
        title="Add Category"
        width={600}
        close={close}
        footer={
          <div className="timesheet-department-footer"> <Button key="Cancel" className="footer-cancel-btn ">
              Cancel
            </Button>
            <Button key="submit" className="footer-submit-btn ">
              Submit
            </Button>
          </div>
        }
      >
        <Form layout="vertical">
          <Form.Item
            name="locationName"
            rules={[{ required: true, message: "Please Enter your username!" }]}
          >
            <div className="d-flex w-full pl-1">
              <p className="py-2">Category Name</p>
              <Input placeholder="Title" className="input-style" />
            </div>
          </Form.Item>
          <div className="mt-3 flex flex-col">
            <label className="pb-2">Description<span className="text-[red]">*</span></label>
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
        title=""
      >
        <p>Are you sure you want to delete this item?</p>
      </Alert>
    </div>
  );
};

export default SettingTimesheet;
