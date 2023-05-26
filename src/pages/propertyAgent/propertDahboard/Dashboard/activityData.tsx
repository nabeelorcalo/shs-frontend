import React, { useEffect, useState } from "react";
import { NodeExpandOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row, Typography } from "antd";
import { DropDown, SearchBar } from "../../../../components";
import { GlobalTable } from "../../../../components";
import useCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { getRecentActivities } from "../../../../store/getListingState";
import dayjs from "dayjs";

const ActivityData = () => {

  const action = useCustomHook();
  const recentActivity = useRecoilState<any>(getRecentActivities);
 
  useEffect(() => {
    action.generalActivityData();
  }, [])

  const [value, setValue] = useState("");
  const searchValue = () => { };
  const columns = [
    {
      dataIndex: "no",
      render: (_: any, data: any) => (
        <div>
          {data?.id}
        </div>
      ),
      key: "no",
      title: "No",
    },
    {
      dataIndex: "Activity",
      render: (_: any, data: any) => (
        <div>
          {data?.activity}
        </div>
      ),
      key: "Activity",
      title: "Activity",
    },
    {
      dataIndex: "Description",
      key: "Description",
      render: (_: any, data: any) => (
        <div>
          {
            data?.activity === "user sign up" ?
              data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' registerd successfully'
              :
              data?.activity === 'addAssement' ?
                data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' add assesment'
                :
                data?.activity === 'create internship' ?
                  data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' created internship'
                  :
                  data?.activity === 'create company manager' ?
                    data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' added company manager'
                    :
                    null
          }
        </div>
      ),
      title: "Description",
    },
    {
      dataIndex: "PerformedBy",
      render: (_: any, data: any) => (
        <div>
          {data?.performedByuser?.firstName} {data?.performedByuser?.lastName}
        </div>
      ),
      key: "PerformedBy",
      title: "Performed By",
    },
    {
      dataIndex: "JobTitle",
      render: (_: any, data: any) => (
        <div>
          {data?.performedByuser?.role}
        </div>
      ),
      key: "JobTitle",
      title: "Job Title",
    },
    {
      dataIndex: "datetime",
      render: (_: any, data: any) => (
        <div>
          {dayjs(data?.createdAt).format('DD/MM/YY')},{dayjs(data?.createdAt).format('HH:mm A')}
        </div>
      ),
      key: "datetime",
      title: "Date & Time",
    },
  ];

  return (
    <div className="activity-data">
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <Typography className="main-title">Activity Log</Typography>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row className="m-2">
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
          <div className="flex justify-end items-center">
            <Button className="text-input-bg-color rounded-lg text-[#A0A3BD] font-normal text-base m-3">
              <NodeExpandOutlined className="text-base" />
              Filter
              <RightOutlined className="text-xs" />
            </Button>
            <div className="w-25">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={setValue}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="activity-data-table">
            <GlobalTable tableData={recentActivity[0]} columns={columns} pagination={true} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityData;
