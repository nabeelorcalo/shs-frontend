import React, { useState } from "react";
import { Button, Form, Avatar as AntAvatar } from "antd";
import { DropDown } from "../../../components";
import "./style.scss";
import { ArrowDownDark, Avatar, UserAvatar } from "../../../assets/images";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { getData } from "../../../helpers/getData";
import dayjs from "dayjs";
import constants from "../../../config/constants";

const Filters: React.FC<any> = (props: any) => {
  const { managers, fetchData, selectedTab, setShowDrawer, setFilter } = props;
  console.log("🚀 ~ file: filters.tsx:13 ~ selectedTab:", selectedTab);
  const [form] = Form.useForm();
  const timeFramObj: any = {
    "This Week": "THIS_WEEK",
    "Last Week": "LAST_WEEK",
    "This Month": "THIS_MONTH",
    "Last Month": "LAST_MONTH",
    "range picker": "DATE_RANGE",
  };
  const filtersTab: any = {
    1: "ESCALATEDTOME",
    2: "ESCALATEDBYME",
    3: "INTERN",
    4: "MANAGER",
  };
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
  const timeFrame = ["This Week", "Last Week", "This Month", "Last Month", "range picker"];
  const type = ["New", "In Progress", "Re-Opened", "Resolved"];
  const status = ["Work", "Personal", "Discipline", "Other"];
  const [filterValue, setFilterValue] = useState({
    type: "Select",
    timeFrame: "Select",
    status: "Select",
    escalatedBy: "Select",
    escalatedTo: "Select",
    userImg: "",
    escalatedToImage: "",
    escalatedToUsername: "Select",
    userName: "Select",
  });

  const handleSubmit = (values: any) => {
    let params: any = {};
    params["filterTab"] = filtersTab[parseInt(selectedTab)];
    if (values?.type) params["type"] = values.type?.toUpperCase();
    if (values?.status)
      values?.status === "Re-Opened" ? (params["status"] = "REOPEN") : (params["status"] = values?.status.replace(" ", "")?.toUpperCase());

    if (values?.escalatedBy) {
      if (selectedTab == 2) params["escalatedTo"] = values?.escalatedBy;
      else params["escalatedBy"] = values?.escalatedBy;
    }
    if (values?.escalatedTo) {
      if (selectedTab == 3 || selectedTab == 4) params["escalatedTo"] = values?.escalatedTo;
    }
    if (values?.timeFrame) {
      const seperatedValue = values?.timeFrame.split(",");
      if (seperatedValue?.length > 1) {
        params["filterType"] = timeFramObj["range picker"];
        params["startDate"] = dayjs(seperatedValue[0]).format("YYYY-MM-DD");
        params["endDate"] = dayjs(seperatedValue[1]).format("YYYY-MM-DD");
      } else {
        params["filterType"] = timeFramObj[values?.timeFrame];
        params["currentDate"] = dayjs().format("YYYY-MM-DD");
      }
    }
    // fetchData(params);
    setFilter((prevFilter: any) => {
      return { ...prevFilter, ...params, page: 1 };
    });
    setShowDrawer(false);
  };
  const ResetHandler = () => {
    setFilterValue({
      type: "Select",
      timeFrame: "Select",
      status: "Select",
      escalatedBy: "Select",
      userImg: "",
      userName: "Select",
      escalatedTo: "Select",
      escalatedToImage: "",
      escalatedToUsername: "Select",
    });
    form.resetFields();
    let params: any = {};
    params["filterTab"] = filtersTab[parseInt(selectedTab)];
    // fetchData(params);
    setFilter((prevFilter: any) => {
      return {
        ...prevFilter,
        status: "",
        startDate: "",
        endDate: "",
        page: 1,
        escalatedTo: "",
        escalatedBy: "",
        filterType: "",
        currentDate: "",
        type: "",
      };
    });
    setShowDrawer(false);
  };
  return (
    <div className="filter_main_wrapper">
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item name="escalatedBy" label={`Escalated ${selectedTab == 2 ? "To" : "By"}`}>
          <div className="asignee-wrap w-[100%]">
            <DropDownNew
              placement={"bottomRight"}
              items={[
                {
                  label: (
                    <div className="max-h-96 overflow-y-auto">
                      {managers &&
                        managers.map((item: any) => (
                          <div
                            className="flex items-center gap-3 mb-[20px]"
                            onClick={() => {
                              setFilterValue({
                                ...filterValue,
                                userName: item?.companyManager?.firstName + " " + item?.companyManager?.lastName,
                                userImg: `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`,
                              });
                              form.setFieldValue("escalatedBy", item?.managerId);
                            }}
                          >
                            {/* <img
                              src={
                                item?.companyManager?.profileImage
                                  ? `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`
                                  : UserAvatar
                              }
                              className="h-[24px] w-[24px] rounded-full object-cover"
                            /> */}
                            <AntAvatar
                              size={30}
                              src={`${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`}
                            >
                              {item?.companyManager?.firstName?.charAt(0)}
                              {item?.companyManager?.lastName?.charAt(0)}
                            </AntAvatar>
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
                <div className="flex items-center gap-3 mr-[40px] flex-grow">
                  {filterValue.userImg != "" && (
                    // <img src={filterValue.userImg} className="h-[24px] w-[24px] rounded-full object-cover" />
                    <AntAvatar size={30} src={filterValue.userImg}>
                      {filterValue?.userName?.split(" ").map((word) => word?.charAt(0))}
                    </AntAvatar>
                  )}
                  <p>{filterValue.userName}</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>
          </div>
        </Form.Item>
        {(selectedTab == 3 || selectedTab == 4) && (
          <Form.Item name="escalatedTo" label={`Escalated To`}>
            <div className="asignee-wrap w-[100%]">
              <DropDownNew
                placement={"bottomRight"}
                items={[
                  {
                    label: (
                      <div className="max-h-96 overflow-y-auto">
                        {managers &&
                          managers.map((item: any) => (
                            <div
                              className="flex items-center gap-3 mb-[20px]"
                              onClick={() => {
                                setFilterValue({
                                  ...filterValue,
                                  escalatedToUsername: item?.companyManager?.firstName + " " + item?.companyManager?.lastName,
                                  escalatedToImage: `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`,
                                });
                                form.setFieldValue("escalatedTo", item?.managerId);
                              }}
                            >
                              {/* <img
                              src={
                                item?.companyManager?.profileImage
                                  ? `${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`
                                  : UserAvatar
                              }
                              className="h-[24px] w-[24px] rounded-full object-cover"
                            /> */}
                              <AntAvatar
                                size={30}
                                src={`${constants.MEDIA_URL}/${item?.companyManager?.profileImage?.mediaId}.${item?.companyManager?.profileImage?.metaData?.extension}`}
                              >
                                {item?.companyManager?.firstName?.charAt(0)}
                                {item?.companyManager?.lastName?.charAt(0)}
                              </AntAvatar>
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
                  <div className="flex items-center gap-3 mr-[40px] flex-grow">
                    {filterValue.escalatedToImage != "" && (
                      // <img src={filterValue.userImg} className="h-[24px] w-[24px] rounded-full object-cover" />
                      <AntAvatar size={30} src={filterValue.escalatedToImage}>
                        {filterValue?.escalatedToUsername?.split(" ").map((word) => word?.charAt(0))}
                      </AntAvatar>
                    )}
                    <p>{filterValue.escalatedToUsername}</p>
                  </div>
                  <ArrowDownDark />
                </div>
              </DropDownNew>
            </div>
          </Form.Item>
        )}
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
        <Form.Item name="status" label="Status">
          <DropDown
            name={filterValue.type}
            value={filterValue.type}
            options={type.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => {
              setFilterValue({ ...filterValue, type: e });
              form.setFieldValue("status", e);
            }}
          />
        </Form.Item>

        <Form.Item name="type" label="Type">
          <DropDown
            name={filterValue.status}
            value={filterValue.status}
            options={status.map((item: any) => {
              return item;
            })}
            setValue={(e: string) => {
              setFilterValue({ ...filterValue, status: e });
              form.setFieldValue("type", e);
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
