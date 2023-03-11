import React, { useState } from "react";
import { Typography, Divider, Row, Col } from "antd";
import { Alert } from "../../Alert";
import { SearchBar } from "../../SearchBar/SearchBar";
import { Button } from "../../Button";
import { DepartmentAddIcon } from "../../../assets/images";
import "./Shifts.scss";
import TemplateCommonDropdown from "../Templates/Common/TemplateCommonDropdown";

const { Title, Text } = Typography;

let overview = [
  {
    name: "Morning",
    content: "51 Employees",
    time:"Time: 08:00 to 02:00",
    duration: "Duration 8 Hours"
  },
  {
    name: "Evening",
    content: "44 Employees",
    time:"Time: 08:00 to 02:00",
    duration: "Duration 8 Hours"
  },

];
const SettingShifts: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleChange = () => {};
  return (
    <div className="setting-shifts">
      <div>
        <div className="flex justify-between">
          <SearchBar size="large" handleChange={handleChange} />

          <Button
            color="#4a9d77"
            icon={<DepartmentAddIcon className="mx-2" />}
            label="New Template"
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
            <Col key={index} className="gutter-row flex" xs={24} md={6} lg={8} >
              <div className="setting-shift-box-wrapper w-full">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-base font-medium">
                        {data.content}
                      </Text>
                      <Text className="text-sm font-normal content-text">{data.time}</Text>
                      <Text className="text-sm font-normal content-text">{data.duration}</Text>
                    </div>

                    <span className="float-right cursor-pointer w-[40px]">
                      <TemplateCommonDropdown
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
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

export default SettingShifts;
