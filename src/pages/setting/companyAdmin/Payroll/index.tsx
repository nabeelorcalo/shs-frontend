import React, { useState } from "react";
import { Typography, Row, Col, Button } from "antd";
import { SettingPayrollAddIcon } from "../../../../assets/images";
import { Alert, SearchBar } from "../../../../components";
import { BoxWrapper } from "../../../../components/BoxWrapper/BoxWrapper";
import { NavLink } from "react-router-dom";
import DropDownForSetting from "../../../../components/Setting/Common/CustomSettingDropdown";
import './style.scss'

const { Title, Text } = Typography;
let overview = [
  {
    name: "Payroll Cycle01",
    content: "51 Employees",
    payrollCyle: "Payroll Cycle: jan,2023 (1 month)",
    addedDate: "Added Date: 02/03/2023",
    addedBy: "Added By: Avery Wyatt"
  },
  {
    name: "Payroll Cycle01",
    content: "51 Employees",
    payrollCyle: "Payroll Cycle: jan,2023 (1 month)",
    addedDate: "Added Date: 02/03/2023",
    addedBy: "Added By: Avery Wyatt"
  },
];

const SettingPayroll: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const handleChange = () => { };
  return (
    <div className="setting-shifts">
      <div>
        <div className="flex justify-between location-header">
          <SearchBar size="middle" handleChange={handleChange} />
          <NavLink to="/settings/payroll/add-category">
            <Button
              size="middle"
              onClick={() => { }}
              className="flex gap-2 setting-add-button white-color teriary-bg-color"
            >
              <SettingPayrollAddIcon /> Add Category
            </Button>
          </NavLink>
        </div>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} lg={12} xxl={8} >
              <BoxWrapper className="w-full">
                <div className="flex">
                  <div className="flex px-3 justify-between mt-2 w-full">
                    <div className="flex flex-col">
                      <Title level={5}>{data.name}</Title>
                      <Text className="text-base font-medium mb-1">
                        {data.content}
                      </Text>
                      <Text className="text-sm font-normal content-text">{data.payrollCyle}</Text>
                      <Text className="text-sm font-normal content-text">{data.addedDate}</Text>
                      <Text className="text-sm font-normal content-text">{data.addedBy}</Text>
                    </div>

                    <span className="float-right cursor-pointer w-[10px]">
                      <DropDownForSetting
                        link={"/settings/payroll/add-category"}
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
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingPayroll;
