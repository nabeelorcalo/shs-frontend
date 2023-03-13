import React, { useState } from "react";
import { Typography, Divider, Row, Col,Form ,Input} from "antd";
import { Alert } from "../../Alert";
import { SearchBar } from "../../SearchBar/SearchBar";
import { Button } from "../../Button";
import { DepartmentAddIcon } from "../../../assets/images";
import { PopUpModal } from "../../Model";
import DropDownForSetting from "../Common/CustomSettingDropdown";
const { TextArea } = Input;
const { Title, Text } = Typography;




let overview = [
  {
    name: "Designing",
    content: "Producing consistently excellent visual work and  a host of ideas",
  },
  {
    name: "Coordination",
    content: "The process of organizing people or groups so that they work together properly and well",
  },
  {
    name: "Training",
    content: "Training has specific goals of improving one's capability, capacity, productivity and performance.",
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
  return (
    <div className="setting-shifts">
      <div>
        <div className="flex justify-between">
          <SearchBar size="large" handleChange={handleChange} />

          <Button
            color="#4a9d77"
            icon={<DepartmentAddIcon className="mx-2" />}
            label="Add Category"
            type="primary"
            size="middle"
          />

          {/* <Button type="primary" icon={<span><DepartmentAddIcon className="mx-2" /></span>} size="small">
        <span className="">  Add department</span> </Button> */}
        </div>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={6} lg={8}>
              <div className="setting-shift-box-wrapper w-full">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-base text-sm ">
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
        title="Edit Category"
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
        <p>Are you sure you want to delete this item?</p>
      </Alert>
    </div>
  );
};

export default SettingTimesheet;
