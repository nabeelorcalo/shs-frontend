import { useEffect, useState, useRef } from "react";
import { Form, Select } from "antd";
import { useRecoilState, useRecoilValue } from "recoil";
import dayjs from "dayjs";
import "dayjs/plugin/weekday";
import { allLeavesTypesState, filterState, paginationState } from "../../../store";
import { Button, DropDown } from "../../../components";
import useCustomHook from "../actionHandler";

const FilterDrawerForm = (props: any) => {
  const [form] = Form.useForm();
  const startDate = useRef("");
  const endDate = useRef("");

  const { onFinishFailed, setOpenDrawer } = props;
  const [filter, setFilter] = useRecoilState(filterState);
  const [tableParams, setTableParams] = useRecoilState(paginationState);
  const allLeaves = useRecoilValue(allLeavesTypesState);
  const { getLeaveTypes } = useCustomHook();

  const dateRange: any = {
    "This Week": [dayjs().startOf("week").format("YYYY-MM-DD"), dayjs().endOf("week").format("YYYY-MM-DD")],
    "Last Week": [dayjs().subtract(1, "week").startOf("week").format("YYYY-MM-DD"), dayjs().subtract(1, "week").endOf("week").format("YYYY-MM-DD")],
    "This Month": [dayjs().startOf("month").format("YYYY-MM-DD"), dayjs().endOf("month").format("YYYY-MM-DD")],
    "Last Month": [
      dayjs().subtract(1, "month").startOf("month").format("YYYY-MM-DD"),
      dayjs().subtract(1, "month").endOf("month").format("YYYY-MM-DD"),
    ],
  };

  const timeFrameOptions = ["All", "This Week", "Last Week", "This Month", "Last Month", "Date Range"];

  const statusFilterOptions = [
    { value: "", label: "All" },
    { value: "PENDING", label: "Pending" },
    { value: "DECLINED", label: "Declined" },
    { value: "APPROVED", label: "Approved" },
  ];

  const handleTimeframe = (val: any) => {
    let result = dateRange[val];

    if (result) {
      startDate.current = result[0];
      endDate.current = result[1];
    } else {
      let range = val.split(" , ");
      startDate.current = range[0];
      endDate.current = range[1];
    }

    setFilter((prevState) => ({
      ...prevState,
      timeFrame: val,
    }));
  };

  const onFinish = (e: any) => {
    const { status, type } = e;

    setFilter({
      ...filter,
      page: 1,
      leavePolicyId: type ?? filter.leavePolicyId,
      status: status ?? filter.status,
      startDate: startDate.current === "All" ? "" : startDate.current,
      endDate: startDate.current === "All" ? "" : endDate.current,
    });
    setTableParams((pre: any) => ({
      ...pre,
      pagination: {
        ...pre.pagination,
        current: 1,
      },
    }));

    setOpenDrawer(false);
  };

  const onReset = () => {
    setFilter({
      ...filter,
      leavePolicyId: "Select",
      status: "Select",
      timeFrame: "Select",
      startDate: "",
      endDate: "",
    });

    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1,
      },
    });

    form.resetFields();
  };

  useEffect(() => {
    if (!allLeaves?.length) getLeaveTypes();
  }, [allLeaves]);

  return (
    <div>
      <div className="data_container">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Leave Type" name="type">
            <Select placeholder="Select" options={allLeaves} defaultValue={filter.leavePolicyId} />
          </Form.Item>

          <Form.Item label="Time Frame" name="timeFrame">
            <DropDown
              name={filter.timeFrame}
              value={filter.timeFrame}
              options={timeFrameOptions}
              setValue={handleTimeframe}
              showDatePickerOnVal={"Date Range"}
              requireRangePicker
              placement="bottom"
            />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select placeholder="Select" options={statusFilterOptions} defaultValue={filter.status} />
          </Form.Item>

          <Form.Item>
            <div className="flex items-center justify-end form_button_wrapper mt-5">
              <Button label="Reset" htmlType="button" onClick={onReset} className="Reset_btn flex items-center justify-center mr-5" />
              <Button label="Apply" htmlType="submit" className="Apply_btn flex items-center justify-center " />
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FilterDrawerForm;
