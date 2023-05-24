import { useEffect, useState } from "react";
import { Typography, Row, Col, Input, Button } from "antd";
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
import { Alert, SearchBar, DropDownForSetting } from "../../../../components";
import { NavLink } from "react-router-dom";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import useLeavesCustomHook from "./actionHandler";
const { Text } = Typography;


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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<any>(null);

  const { getSettingLeaves, settingLeaveData } = useLeavesCustomHook();

  useEffect(() => {
    getSettingLeaves(searchValue)
  }, [searchValue])

  const imageHanlder = (type: any) => {
    switch (type) {
      case 'Sick Leave':
        return <SickLeave />
      case 'Casual Leave':
        return <CasualLeave />
      case 'WFH Leave':
        return <WorkFromHome />
      case 'Medical Leave':
        return <MedicalLeave />
    }
  }

  // const handleChange = (event: any) => {
  //   const { name, value } = event.target;
  //   setFormValues((prevState: any) => ({ ...prevState, [name]: value }));
  // };
  return (
    <div className="setting-leaves">
      <div>
        <div className="flex justify-between location-header">
          <SearchBar size="middle" handleChange={(e: any) => setSearchValue(e)} />
          <NavLink to={ROUTES_CONSTANTS.LEAVES_ADD_POLICY}>
            <Button
              size="middle"
              onClick={() => { }}
              className="flex gap-2 setting-add-button white-color teriary-bg-color"
            >
              <SettingLeaves /> Add Policy
            </Button>
          </NavLink>
        </div>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {settingLeaveData?.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row" xs={24} lg={12} xl={8}>
              <div className="setting-leaves-box-wrapper w-full flex flex-col">
                <div className="float-right place-items-end cursor-pointer flex justify-end">
                  <DropDownForSetting
                    link={ROUTES_CONSTANTS.LEAVES_ADD_POLICY}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                  />
                </div>
                <div className="flex ">
                  <span> {imageHanlder(data?.name)}</span>
                  <Text className="text-sm font-normal md:text-lg md:font-semibold pt-3 pl-2 m-0">
                    {data?.name}
                  </Text>
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
        title=""
        children={<p>Are you sure you want to delete this?</p>}
      />
    </div>
  );
};

export default SettingLeave;
