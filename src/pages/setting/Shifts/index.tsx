import React, { useState } from "react";
import { Typography, Divider, Row, Col ,Button} from "antd";
import { DepartmentAddIcon , SettingShift } from "../../../assets/images";
import TemplateCommonDropdown from "../Templates/Common/TemplateCommonDropdown";
import { Alert,  SearchBar } from "../../../components";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import './style.scss'

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
          <SearchBar size="middle" handleChange={handleChange} />

          <Button
            size="middle"
            onClick={() => {}}
            className="flex gap-2 setting-add-button white-color teriary-bg-color"
          >
            <SettingShift /> Add Shift
          </Button>

 
        </div>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={6} lg={8} >
              <BoxWrapper className="setting-shift-box-wrapper w-full">
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
              </BoxWrapper>
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
        title=""
       
      >
        <p>Are you sure you want to delete this item?</p>
      </Alert>
    </div>
  );
};

export default SettingShifts;
