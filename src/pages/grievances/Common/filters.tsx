import React, { useState } from "react";
import { Button, Form } from "antd";
import { DropDown } from "../../../components";
import "./style.scss";
import { ArrowDownDark, Avatar, UserAvatar } from "../../../assets/images";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { getData } from "../../../helpers/getData";

const Filters: React.FC<any> = (props: any) => {
  const { managers, fetchData, selectedTab } = props;
  const [form] = Form.useForm();
  // const detailsData = [
  //   {
  //     userImg: UserAvatar,
  //     userName: "john doe",
  //   },
  //   {
  //     userImg: UserAvatar,
  //     userName: "mina marino",
  //   },
  //   {
  //     userImg: UserAvatar,
  //     userName: "clark",
  //   },
  //   {
  //     userImg: UserAvatar,
  //     userName: "sarah joe",
  //   },
  //   {
  //     userImg: <Avatar />,
  //     userName: "Other",
  //   },
  // ];
  const timeFrame = ["This Week ", "Last Week ", "This Month", "Last Month", "range picker"];
  const type = ["New", "In Progress", "Re-Open", "Resolved"];
  const status = ["Work", "Personal", "Discipline", "Other"];
  const [filterValue, setFilterValue] = useState({
    type: "Select",
    timeFrame: "Select",
    status: "Select",
    escalatedBy: "Select",
    userImg: "",
    userName: "Select",
  });

  const handleSubmit = (values: any) => {
    let params: any = {};
    selectedTab === "1" ? (params["filterTab"] = "ESCALATEDTOME") : (params["filterTab"] = "ESCALATEDBYME");
    if (values?.type) params["type"] = values.type?.replace("-", "")?.replace(" ", "")?.toUpperCase();
    if (values?.status) params["status"] = values?.status?.toUpperCase();
    if (values?.escalatedBy) params["escalatedBy"] = values?.escalatedBy;

    fetchData(params);
  };
  const ResetHandler = () => {
    setFilterValue({
      type: "Select",
      timeFrame: "Select",
      status: "Select",
      escalatedBy: "Select",
      userImg: "",
      userName: "Select",
    });
    form.resetFields();
    let params: any = {};
    selectedTab === "1" ? (params["filterTab"] = "ESCALATEDTOME") : (params["filterTab"] = "ESCALATEDBYME");
    fetchData(params);
  };
  return (
    <div className="filter_main_wrapper">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="escalatedBy" label="Escalated By">
          <div className="asignee-wrap w-[100%]">
            <DropDownNew
              placement={"bottomRight"}
              items={[
                {
                  label: (
                    <div>
                      {managers &&
                        managers.map((item: any) => (
                          <div
                            className="flex items-center gap-3 mb-[20px]"
                            onClick={() => {
                              setFilterValue({
                                ...filterValue,
                                userName: item?.companyManager?.firstName + " " + item?.companyManager?.lastName,
                                userImg: UserAvatar,
                              });
                              console.log(item);
                              form.setFieldValue("escalatedBy", item?.managerId);
                            }}
                          >
                            <img src={UserAvatar} className="h-[24px] w-[24px] rounded-full object-cover" />
                            <p>{item?.companyManager?.firstName + " " + item?.companyManager?.lastName}</p>
                          </div>
                        ))}
                    </div>
                  ),
                  key: "users",
                },
              ]}
            >
              <div className="drop-down-with-imgs flex items-center gap-3">
                <div className="flex items-center gap-3 mr-[40px]">
                  {filterValue.userImg != "" && <img src={filterValue.userImg} />}
                  <p>{filterValue.userName}</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>
          </div>
        </Form.Item>
        <Form.Item name="timeFrame" label="Time Frame">
          <DropDown
            name={filterValue.timeFrame}
            value={filterValue.timeFrame}
            options={timeFrame.map((item: any) => {
              return item;
            })}
            requireRangePicker
            placement="bottomLeft"
            showDatePickerOnVal={"range picker"}
            setValue={(e: string) => {
              setFilterValue({ ...filterValue, timeFrame: e });
              form.setFieldValue("timeFrame", e);
            }}
          />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <DropDown
            name={filterValue.type}
            value={filterValue.type}
            options={type.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => {
              setFilterValue({ ...filterValue, type: e });
              form.setFieldValue("type", e);
            }}
          />
        </Form.Item>

        <Form.Item name="status" label="Status">
          <DropDown
            name={filterValue.status}
            value={filterValue.status}
            options={status.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => {
              setFilterValue({ ...filterValue, status: e });
              form.setFieldValue("status", e);
            }}
          />
        </Form.Item>

        <div className="whistle-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " onClick={ResetHandler}>
            Reset
          </Button>
          <Button htmlType="submit" className="footer-submit-btn">
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
