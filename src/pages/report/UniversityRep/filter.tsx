import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Select } from "antd";
import useCustomHook from "../actionHandler";
import "./style.scss";

const Filters = ({ setShowDrawer }: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [filterValue, setFilterValue] = useState<any>();
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getFiltersData();
    }
  }, []);
  const { getData, handleFilterParams, getFiltersData, universityReportsFilters } = useCustomHook();
  const onFinish = () => {
    // maintain filter params on search also
    handleFilterParams(filterValue);
    getData(filterValue);
    setShowDrawer(false);
  };

  const ResetHandler = () => {
    // reset filter params
    setFilterValue(undefined);
    handleFilterParams({});
    getData("resetFilter");
  };
  return (
    <div className="uni-report-filter_main_wrapper">
      <Form layout="vertical">
        <Form.Item label="Company">
          <Select
            value={filterValue?.company}
            placeholder="Select"
            allowClear
            onChange={(e: string) => {
              setFilterValue({ ...filterValue, company: e });
            }}
            options={universityReportsFilters?.companies?.map(({ id, businessName }: any) => ({
              value: id,
              label: businessName,
            }))}
          />
        </Form.Item>
        <Form.Item label="Department">
          <Select
            value={filterValue?.department}
            placeholder="Select"
            allowClear
            onChange={(e: string) => setFilterValue({ ...filterValue, department: e })}
            options={universityReportsFilters?.departments?.map(({ id, name }: any) => ({
              value: id,
              label: name,
            }))}
          />
        </Form.Item>
        <Form.Item label="Reviewer">
          <Select
            value={filterValue?.reviewer}
            placeholder="Select"
            allowClear
            onChange={(e: string) => setFilterValue({ ...filterValue, reviewer: e })}
            options={universityReportsFilters?.managers?.map(({ id, firstName, lastName }: any) => ({
              value: id,
              label: `${firstName} ${lastName}`,
            }))}
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
