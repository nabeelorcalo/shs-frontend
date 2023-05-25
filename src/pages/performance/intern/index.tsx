import { useState, useEffect } from "react";
import { Dropdown, MenuProps, Space, Avatar, Progress, Typography } from "antd";
import {
  OverAllPerfomance,
  MonthlyPerfomanceChart,
  PageHeader,
  GlobalTable,
} from "../../../components";
import { MoreIcon } from "../../../assets/images";
import { BoxWrapper } from "../../../components";
import { Link } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import usePerformanceHook from "../actionHandler";
import { internEvaluationHistoryState, currentUserState, allPerformanceState } from "../../../store";
import { useRecoilValue } from "recoil";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom"

const InternPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const { getInternEvaluationHistory } = usePerformanceHook();
  const internEvalHistory = useRecoilValue(internEvaluationHistoryState);
  const userDetail = useRecoilValue(currentUserState);
  const [actionType, setActionType] = useState({ type: "", id: "" });
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: "" });
  const [evalHistoryLoading, setEvalHistoryLoading] = useState(false)
  const { getAllPerformance } = usePerformanceHook();
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const allPerformance = useRecoilValue(allPerformanceState);
  const performanceData = [
    {
      percent: "85",
      strokeColor: "#4783FF",
      title: "Overall",
    },
    {
      percent: "85",
      strokeColor: "#9BD5E8",
      title: "Learning",
    },
    {
      percent: "75",
      strokeColor: "#F08D97",
      title: "Discipline",
    },
    {
      percent: "68",
      strokeColor: "#78DAAC",
      title: "Personal",
    },
  ];

  const columns = [
    {
      title: "Date",
      key: "updatedAt",
      render: (text:any, row:any) => (
        <>{dayjs(row.updatedAt).format('DD/MM/YYYY')}</>
      ),
    },
    {
      title: "Manager",
      key: "avatar",
      align: 'center',
      render: (text:any, row:any) => (
        <Avatar size={32} src={row?.ratedBy?.avatar}>
          {row.ratedBy.firstName.charAt(0)}{row.ratedBy.lastName.charAt(0)}
        </Avatar>
      ),
    },
    {
      title: "Performance",
      key: "overallRating",
      render: (text:any, row: any) => {
        return (
          <Space size="middle">
            <Progress
              size={[200, 13]}
              percent={row.overallRating}
              strokeColor={row.overallRating < 50 ? "#E95060" : "#4A9D77"}
              format={(percent: any) => (
                <p
                  className={
                    "myClass " +
                    (percent < 50 ? "secondary-color" : "teriary-color")
                  }
                >
                  {percent}%
                </p>
              )}
            />
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (tex:any, row: any) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: [
                { label: 'View', key: 'View', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATION_FORM}/${row.id}`)},
                { label: 'Download', key: 'Download', onClick: () => console.log('Download')}
              ]
            }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="menus_dropdown_main"
          >
            <MoreIcon className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const monthlyPerformanceData = [
    {
      city: "Jan",
      type: "Learning Objectives",
      value: 10000,
    },
    {
      city: "Jan",
      type: "Dicipline",
      value: 15000,
    },
    {
      city: "Jan",
      type: "Personal",
      value: 7000,
    },
    {
      city: "Feb",
      type: "Learning Objectives",
      value: 10000,
    },
    {
      city: "Feb",
      type: "Dicipline",
      value: 15000,
    },
    {
      city: "Feb",
      type: "Personal",
      value: 7000,
    },
    {
      city: "Mar",
      value: 10000,
    },
    {
      city: "Mar",
      type: "Dicipline",
      value: 15000,
    },
    {
      city: "Mar",
      type: "Personal",
      value: 7000,
    },
    {
      city: "Apr",
      value: 10000,
    },
    {
      city: "Apr",
      type: "Dicipline",
      value: 15000,
    },
    {
      city: "Apr",
      type: "Personal",
      value: 7000,
    },
    {
      city: "May",
      value: 10000,
    },
    {
      city: "May",
      type: "Dicipline",
      value: 15000,
    },
    {
      city: "May",
      type: "Personal",
      value: 7000,
    },
    {
      city: "Jun",
      value: 10000,
    },
    {
      city: "Jun",
      type: "Dicipline",
      value: 15000,
    },
    {
      city: "Jun",
      type: "Personal",
      value: 7000,
    },
  ];


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getInternEvaluationHistory(setEvalHistoryLoading, userDetail.id)
    getAllPerformance(setLoadingAllPerformance, {page: 1, limit: 25})
  }, [])
  console.log('internEvalHistory:: ', internEvalHistory)
  console.log('allPerformance::: ', allPerformance)

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <PageHeader title="Performance" />

      <div className="performance-container">
        <div className="performance-left-subcontainer ">
          <OverAllPerfomance
            heading="Overall Performance"
            trailColor="#E6F4F9"
            strokeWidth={10}
            type="circle"
            width={100}
            data={[
              {
                percent: internEvalHistory[0]['overallRating'],
                strokeColor: "#4783FF",
                title: "Overall",
              },
              {
                percent: internEvalHistory[0]['learningObjectiveRating'],
                strokeColor: "#9BD5E8",
                title: "Learning",
              },
              {
                percent: internEvalHistory[0]['disciplineRating'],
                strokeColor: "#F08D97",
                title: "Discipline",
              },
              {
                percent: internEvalHistory[0]['overallRating'],
                strokeColor: "#78DAAC",
                title: "Personal",
              },
            ]}
          />
          <div className="mt-5">
            <BoxWrapper>
              <MonthlyPerfomanceChart
                heading="Monthly Perfomance"
                data={monthlyPerformanceData}
                columnWidthRatio={ 0.5}
              />
            </BoxWrapper>
          </div>
        </div>

        <div className="performance-right-subcontainer">
          <BoxWrapper>
            <Typography.Title level={4}>Evaluation History</Typography.Title>
            <GlobalTable
              columns={columns}
              tableData={internEvalHistory}
              pagination={false}
              loading={evalHistoryLoading}
            />
          </BoxWrapper>
        </div>
      </div>
    </>
  );
};

export default InternPerformance;
