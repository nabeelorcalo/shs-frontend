import React, { useEffect, useState } from "react";
import { Button, Form, Select } from "antd";
import { DropDown } from "../../../components";
import useCustomHook from "../actionHandler";
import "./style.scss";

const Filters: React.FC = ({ setShowDrawer }: any) => {
  const { getData, getDepartmentList, handleFilterParams, departmentList, getCompanyManagerList, companyManagerList } =
    useCustomHook();
  const company = ["Power DevSpot", "Abacus", "Orcalo Holdings", "Coding Hub"];
  const department = ["Design", "Research", "Management", "Development", "Business"];
  const reviewer = ["Mino Marino", "David Miller", "Amila Clark"];
  const [openDataPicker, setOpenDataPicker] = useState(false);
  const [filterValue, setFilterValue] = useState<any>();
  const [intern, setIntern] = useState<any>();

  const onFinish = () => {
    // maintain filter params on search also
    handleFilterParams(filterValue);
    getData(filterValue);
    setShowDrawer(false);
  };

  const ResetHandler = () => {
    // reset filter params
    setFilterValue({});
    setIntern("");
    handleFilterParams({});
    getData("resetFilter");
  };

  useEffect(() => {
    getDepartmentList();
    getCompanyManagerList();
    // getInternList();
  }, []);

  return (
    <div className="uni-report-filter_main_wrapper">
      <Form layout="vertical">
        <Form.Item name="company" label="Company">
          <DropDown
            name={filterValue?.company}
            value={filterValue?.company}
            options={company.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => setFilterValue({ ...filterValue, company: e })}
          />
        </Form.Item>
        <Form.Item name="department" label="Department">
          {/* <DropDown
            name={filterValue.department}
            value={filterValue.department}
            options={department.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => setFilterValue({ ...filterValue, department: e })}
          /> */}
          <Select
            value={filterValue?.intern}
            placeholder="Select"
            onChange={(e: string) => setFilterValue({ ...filterValue, department: e })}
            options={departmentList}
          />
        </Form.Item>
        <Form.Item name="reviewer" label="Reviewer">
          <DropDown
            name={filterValue?.reviewer}
            value={filterValue?.reviewer}
            options={reviewer.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => setFilterValue({ ...filterValue, reviewer: e })}
          />
        </Form.Item>
        <div className="report-filter-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " onClick={ResetHandler}>
            Reset
          </Button>
          <Button key="submit" className="footer-submit-btn" onClick={onFinish}>
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
