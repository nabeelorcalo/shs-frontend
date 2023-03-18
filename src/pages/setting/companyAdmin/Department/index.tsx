import React, { useState } from "react";
import { DepartmentAddIcon, LocationMore } from "../../../../assets/images";
import { Col, Row, Typography, Button, Form } from "antd";
import "./style.scss";
import { Input } from "antd";
import { Alert, SearchBar } from "../../../../components";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import { PopUpModal } from "../../../../components/Model";

const { TextArea } = Input;
const { Title, Text } = Typography;
const overview = [
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

  const close = () => {
    setShowEditModal(false);
  };

  return (
    <div className="setting-department">
      <div className="flex justify-between">
        <SearchBar size="middle" handleChange={handleChange} />

        <Button
          size="middle"
          onClick={() => {
            setShowEditModal(!showDeleteModal);
          }}
          className="flex gap-2 setting-add-button white-color teriary-bg-color"
        >
          <DepartmentAddIcon /> Add Department
        </Button>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index) => {
          return (
            <Col key={index} className="gutter-row" xs={24} lg={12} xxl={8}>
              <div className="department-box-wrapper flex">
                <div className="flex">
                  <div className="flex pl-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-sm font-normal">
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
        title="Department"
        width={600}
        close={close}
        footer={
          <div className="setting-department-footer"> <Button key="Cancel" className="footer-cancel-btn ">
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
        title=""
      >
        <p>Are you sure you want to delete this item?</p>
      </Alert>
    </div>
  );
};

export default SettingDepartment;
