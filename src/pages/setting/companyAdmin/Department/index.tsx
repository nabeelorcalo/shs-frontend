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
  const [form] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
 
  const handleChange = (event: any) => {

  };

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    console.log(values);
    
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
        close={() => setShowEditModal(false)}
        footer=""
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Department Name"
            name="departmentName"
          >
            <Input
              className="input"
              id="departmentName"
              name="departmentName"
              placeholder="Enter department name "
              size="small"
              type="text"
              defaultValue=""

            />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
          >

            <TextArea rows={6} placeholder="Write Something..." maxLength={6}
              id="description"
              name="description"
              size="small"
              defaultValue=""
              />
          </Form.Item>
          <div className="setting-department-footer flex justify-end mt-4 gap-2">
            <Button key="Cancel" className="footer-cancel-btn " onClick={() => { setShowEditModal(false) }}>
              Cancel
            </Button>
            <Button key="submit" className="footer-submit-btn" onClick={handleSubmit}>
              Submit
            </Button>
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
