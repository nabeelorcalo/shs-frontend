import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Progress, Space, Dropdown, Row, Col, Spin } from "antd";
import {
  TopPerformanceCard,
  MonthlyPerfomanceChart,
  PageHeader,
  GlobalTable,
  Breadcrumb,
  Notifications,
  BoxWrapper,
} from "../../components";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import { ColorLessMedalIcon, MoreIcon } from "../../assets/images";
import data from "./CompanyAdmin/data";
import useCustomHook from "./actionHandler";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import usePerformanceHook from "./actionHandler";
import { LoadingOutlined } from "@ant-design/icons";
import getUserRoleLable from "../../helpers/roleLabel";
import dayjs from "dayjs";
import "./style.scss";

const DetailHistory = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { evalId } = useParams();
  const navigate = useNavigate();
  const role = useRecoilValue(currentUserRoleState);
  const [loadingPerfDetail, setLoadingPerfDetail] = useState(false);
  const [loadingInternPerformance, setLoadingInternPerformance] =
    useState(false);
  const action = useCustomHook();
  const {
    getPerformanceDetail,
    performanceDetail,
    getInternPerformance,
    internPerformanceData,
  } = usePerformanceHook();
  const detailHistoryBreadCrumb = [
    { name: performanceDetail?.evaluatedUserName },
    {
      name: "Performance",
      onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}`,
    },
    {
      name:
        role === constants.UNIVERSITY
          ? "View History"
          : role === constants.MANAGER
          ? ""
          : "Performance History",
      onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`,
    },
  ];

  const evaluationHistoryData = [
    {
      id: 1,
      date: "22/09/2022",
      src: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 40,
    },
    {
      id: 2,
      date: "22/09/2022",
      src: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 80,
    },
    {
      id: 3,
      date: "22/09/2022",
      src: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 50,
    },
    {
      id: 4,
      date: "22/09/2022",
      src: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 30,
    },
    {
      id: 5,
      date: "22/09/2022",
      src: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 100,
    },
  ];

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getPerformanceDetail({
      setLoading: setLoadingPerfDetail,
      id: evalId,
      parmas: {},
    });
    getInternPerformance(setLoadingInternPerformance, evalId);
  }, []);
console.log('internPerformanceData:: ', internPerformanceData)
  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const progressData = () => {
    let overall:any = 0;
    let learning:any = 0;
    let discipline:any = 0;
    let personal:any = 0;

    if (internPerformanceData != null) {
      let length = internPerformanceData.length;
      for (let i = 0; i < length; i++) {
        overall += internPerformanceData[i]["overallRating"] / length;
        learning += internPerformanceData[i]["learningObjectiveRating"] / length;
        discipline += internPerformanceData[i]["disciplineRating"] / length;
        personal += internPerformanceData[i]["personalRating"] / length;
      }
    }
    return [
      {
        id: 1,
        title: "Overall",
        progressPercent: Math.round(overall),
        progressColor: "#4783FF",
      },
      {
        id: 2,
        title: "Learning Objectives",
        progressPercent: Math.round(learning),
        progressColor: "#A1D8EA",
      },
      {
        id: 3,
        title: "Discipline",
        progressPercent: Math.round(discipline),
        progressColor: "#F08D97",
      },
      {
        id: 4,
        title: "Personal",
        progressPercent: Math.round(personal),
        progressColor: "#78DAAC",
      },
    ];
  };

  const evaluationHistoryColumnNames = [
    {
      title: <span className="font-semibold text-secondary-color">Date</span>,
      key: "date",
      render: (_: any, row: any) => {
        return dayjs(row?.updatedAt).format("DD/MM/YYYY");
      },
    },
    {
      title: (
        <span className="font-semibold text-secondary-color">Performance</span>
      ),
      key: "performance",
      render: (_: any, row: any) => {
        return (
          <Space size="middle">
            <Progress
              size={[200, 13]}
              percent={Math.round(row.overallRating)}
              strokeColor={
                Math.round(row.overallRating) < 50 ? "#E95060" : "#4A9D77"
              }
              format={(percent: any) => (
                <p
                  className={
                    "myClass font-medium " +
                    (Math.round(percent) < 50
                      ? "secondary-color"
                      : "teriary-color")
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
      title: <span className="font-semibold text-secondary-color">Action</span>,
      key: "action",
      render: (_: any, row: any) => (
        <Space size="middle">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="menus_dropdown_main"
            menu={{
              items: [
                {
                  label: "View",
                  key: "ViewDetails",
                  onClick: () =>
                    navigate(
                      `/${ROUTES_CONSTANTS.PERFORMANCE}/${row?.inEvaluationUserId}/${ROUTES_CONSTANTS.EVALUATION_FORM}?performanceRatingId=${row?.id}`
                    ),
                },
                {
                  label: "Download",
                  key: "download",
                  onClick: () => {
                    action.downloadHistoryDataPdf(
                      evaluationHistoryColumnNames,
                      evaluationHistoryData
                    );
                    Notifications({
                      title: "Success",
                      description: "List Download",
                      type: "success",
                    });
                  },
                },
              ],
            }}
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
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={detailHistoryBreadCrumb} />}
      />

      <Row gutter={[25, 25]} className="company-admin-detail-history-container">
        <Col xs={24} md={24} xl={12}>
          <div className="performance-left-subcontainer ">
            <BoxWrapper className="flex flex-col h-[379px]">
              <Spin
                spinning={loadingInternPerformance}
                indicator={<LoadingOutlined />}
              >
                <TopPerformanceCard
                  id={1}
                  name={performanceDetail?.evaluatedUserName}
                  nameClassName="text-2xl text-primary-color font-medium"
                  profession={getUserRoleLable(
                    performanceDetail?.evaluatedUserRole
                  )}
                  className="bg-visible-btn evaluate-btn font-medium"
                  icon={<ColorLessMedalIcon />}
                  btnTxt={role !== constants.UNIVERSITY && "Evaluate"}
                  size={64}
                  url={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${evalId}`}
                  avatar={performanceDetail?.evaluatedUserName}
                />
                {progressData().map((item: any) => (
                  <div key={item.id} className="mt-2">
                    <p className="mt-4">{item.title}</p>
                    <Progress
                      className="flex"
                      percent={item.progressPercent}
                      strokeColor={item.progressColor}
                    />
                  </div>
                ))}
              </Spin>
            </BoxWrapper>
            <BoxWrapper className="my-6 h-[379px]">
              <MonthlyPerfomanceChart
                heading="Monthly Performance"
                data={data}
                XField="department"
                columnWidthRatio={0.5}
                height="315px"
              />
            </BoxWrapper>
          </div>
        </Col>
        <Col xs={24} md={24} xl={12}>
          <div className="performance-right-subcontainer">
            <BoxWrapper className="h-[785px]">
              <p className="font-medium text-xl mb-4">Evaluation History</p>
              <GlobalTable
                columns={evaluationHistoryColumnNames}
                tableData={internPerformanceData}
                pagination={false}
                loading={loadingInternPerformance}
              />
            </BoxWrapper>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DetailHistory;
