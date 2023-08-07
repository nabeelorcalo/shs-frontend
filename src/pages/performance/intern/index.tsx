import { useState, useEffect } from "react";
import { Dropdown, Space, Avatar, Progress, Typography, Spin } from "antd";
import { MoreIcon } from "../../../assets/images";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import usePerformanceHook from "../actionHandler";
import { currentUserState } from "../../../store";
import { useRecoilValue } from "recoil";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom"
import {LoadingOutlined} from "@ant-design/icons";
import {
  OverAllPerfomance,
  MonthlyPerfomanceChart,
  PageHeader,
  GlobalTable,
  BoxWrapper
} from "../../../components";

const InternPerformance = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const { getInternPerformance, internPerformanceData, getPerformanceSummary, performanceSummary } = usePerformanceHook();
  const userDetail = useRecoilValue(currentUserState);
  const [loadingInternPerformance, setLoadingInternPerformance] = useState(false)
  const [loadingSummary, setLoadingSummary] = useState(false)


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getInternPerformance(setLoadingInternPerformance, userDetail.id)
    getPerformanceSummary(setLoadingSummary)
  }, [])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const overAllPerformanceData = () => {
    let overall = 0;
    let learning = 0;
    let discipline = 0;
    let personal = 0;
    
    if(internPerformanceData != null) {
      for(let i = 0; i < internPerformanceData?.length; i++  ) {
        overall += Math.round(internPerformanceData[i]['overallRating'] / internPerformanceData.length)
        learning += Math.round(internPerformanceData[i]['learningObjectiveRating'] / internPerformanceData.length)
        discipline += Math.round(internPerformanceData[i]['disciplineRating'] / internPerformanceData.length)
        personal += Math.round(internPerformanceData[i]['personalRating'] / internPerformanceData.length)
      }
    }
    return [
      {
        percent: overall,
        strokeColor: "#4783FF",
        title: "Overall",
      },
      {
        percent: learning,
        strokeColor: "#9BD5E8",
        title: "Learning",
      },
      {
        percent: discipline,
        strokeColor: "#F08D97",
        title: "Discipline",
      },
      {
        percent: personal,
        strokeColor: "#78DAAC",
        title: "Personal",
      },
    ]
  }


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
              percent={Math.round(row?.overallRating)}
              strokeColor={Math.round(row?.overallRating) < 50 ? "#E95060" : "#4A9D77"}
              format={(percent: any) => (
                <p
                  className={
                    "myClass " +
                    (Math.round(percent) < 50 ? "secondary-color" : "teriary-color")
                  }
                >
                  {Math.round(percent)}%
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
                { label: 'View', key: 'View', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${row?.inEvaluationUserId}/${ROUTES_CONSTANTS.EVALUATION_FORM}?performanceRatingId=${row?.id}`)},
                // { label: 'Download', key: 'Download', onClick: () => console.log('Download')}
              ]
            }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="detail-history-dropdown"
          >
            <MoreIcon className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];

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
            data={overAllPerformanceData()}
            loading={loadingInternPerformance}
          />
          <div className="mt-5">
            <BoxWrapper>
              <Spin spinning={loadingSummary} indicator={<LoadingOutlined />}>
                <MonthlyPerfomanceChart
                  heading="Summary"
                  XField="month"
                  YField="value"
                  color={["#9BD5E8", "#F08D97", "#78DAAC"]}
                  columnStyle={{radius: [20, 20, 0, 0],}}
                  columnWidthRatio={0.4}
                  data={performanceSummary}
                  fontSize="20px"
                  fontWeight="500"
                  isGroup
                  marginRatio=".5"
                  seriesField="type"
                  textColor="#4E4B66"
                />
              </Spin>
            </BoxWrapper>
          </div>
        </div>

        <div className="performance-right-subcontainer">
          <BoxWrapper>
            <Typography.Title level={4}>Evaluation History</Typography.Title>
            <GlobalTable
              columns={columns}
              tableData={internPerformanceData}
              pagination={false}
              loading={loadingInternPerformance}
            />
          </BoxWrapper>
        </div>
      </div>
    </>
  );
};

export default InternPerformance;
