import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Progress, Space, Typography, Dropdown, MenuProps, Row, Col, Spin } from "antd";
import { TopPerformanceCard, MonthlyPerfomanceChart, PageHeader, GlobalTable, Breadcrumb, Notifications, BoxWrapper } from "../../components";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import { ColorLessMedalIcon, MoreIcon } from "../../assets/images";
import { AppreciationModal } from "./CompanyAdmin/appreciationModal";
import { WarnModal } from "./CompanyAdmin/warnModel";
import './style.scss';
import data from './CompanyAdmin/data';
import useCustomHook from "./actionHandler";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import usePerformanceHook from "./actionHandler";
import { LoadingOutlined } from "@ant-design/icons";
import getUserRoleLable from '../../helpers/roleLabel'
import dayjs from 'dayjs';


const DetailHistory = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {evalId} = useParams();
  const navigate = useNavigate();
  console.log('evalId:: ', evalId)
  const role = useRecoilValue(currentUserRoleState);
  const [actionType, setActionType] = useState({ type: '', id: '' });
  const [loadingPerfDetail, setLoadingPerfDetail] = useState(false);
  const [loadingIntern, setLoadingIntern] = useState(false);
  const action = useCustomHook();
  const {getPerformanceDetail, performanceDetail, getInternPerformance, internPerformanceData } = usePerformanceHook();
  const detailHistoryBreadCrumb = [
    { name: performanceDetail?.evaluatedUserName },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
    { name: role === constants.UNIVERSITY ? "View History" : role === constants.MANAGER ? '' : 'Performance History', onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}` },
  ];
  
  const evaluationHistoryData = [
    {
      id: 1,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 40,
    },
    {
      id: 2,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 80,
    },
    {
      id: 3,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 50,
    },
    {
      id: 4,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 30,
    },
    {
      id: 5,
      date: '22/09/2022',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 100,
    },
  ];

  let items: MenuProps['items'] = [
    {
      label:
        < Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${1}/${ROUTES_CONSTANTS.EVALUATION_FORM}`}
        >
          {role === constants.COMPANY_ADMIN ? "View Details" : "View"}
        </Link >,
      key: '0',
    },
    {
      label: role === constants.COMPANY_ADMIN ?
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${1}/${ROUTES_CONSTANTS.EVALUATE}`}
        >
          Evaluate
        </Link >
        :
        <p
          onClick={() => {
            action.downloadHistoryDataPdf(evaluationHistoryColumnNames, evaluationHistoryData);
            Notifications({ title: 'Success', description: 'List Download', type: 'success' })
          }}
        >
          Download
        </p>,
      key: '1',
    },
    {
      label:
        <p
          onClick={() => {
            setState(prevState => ({
              ...prevState,
              openAprreciationModal: !state.openAprreciationModal,
            }));
          }}
        >
          Appreciate
        </p>,
      key: '2',
    },
    {
      label:
        <p
          onClick={() => {
            setState(prevState => ({
              ...prevState,
              openWarnModal: !state.openWarnModal,
            }));
          }}
        >
          Warn
        </p>,
      key: '3',
    },
  ];

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getPerformanceDetail(setLoadingPerfDetail, evalId, {});
    getInternPerformance(setLoadingIntern, evalId)
  }, [])
console.log('internEvalHistory:: ', internPerformanceData)
  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  // remove last two items if role is of Manager
  if (role === constants.MANAGER || role === constants.UNIVERSITY && items.length > 2) {
    items = items.slice(0, -2)
  }

  const [state, setState] = useState({
    openAprreciationModal: false,
    openWarnModal: false,
  });

  const onSubmitAppreciationForm = (values: any) => {
    setState(prevState => ({
      ...prevState,
      openAprreciationModal: !state.openAprreciationModal,
    }));
  }

  const onSubmitWarningForm = (values: any) => {
    setState(prevState => ({
      ...prevState,
      openWarnModal: !state.openWarnModal,
    }));
  }
  const progressData = [
    { id: 1, title: 'Overall', progressPercent: Math.round(performanceDetail?.overallRating), progressColor: '#4783FF' },
    { id: 2, title: 'Learning Objectives', progressPercent: Math.round(performanceDetail?.learningObjectiveRating), progressColor: '#A1D8EA' },
    { id: 3, title: 'Discipline', progressPercent: Math.round(performanceDetail?.disciplineRating), progressColor: '#F08D97' },
    { id: 4, title: 'Personal', progressPercent: Math.round(performanceDetail?.personalRating), progressColor: '#78DAAC' },
  ]

  const evaluationHistoryColumnNames = [
    {
      title: <span className="font-semibold text-secondary-color">Date</span>,
      key: 'date',
      render: (_:any, row:any) => {
        return (
          
          dayjs(row?.updatedAt).format('DD/MM/YYYY')
        )
      },
    },
    {
      title: <span className="font-semibold text-secondary-color">Performance</span>,
      key: 'performance',
      render: (_: any, row:any) => {
        return (
          <Space size="middle">
            <Progress
              size={[200, 13]}
              percent={Math.round(row.overallRating)}
              strokeColor={Math.round(row.overallRating) < 50 ? '#E95060' : '#4A9D77'}
              format={(percent: any) =>
                <p className={"myClass font-medium " + (Math.round(percent) < 50 ? 'secondary-color' : 'teriary-color')} >
                  {Math.round(percent)}%
                </p>
              }
            />
          </Space>
        )
      },
    },
    {
      title: <span className="font-semibold text-secondary-color">Action</span>,
      key: 'action',
      render: (_: any, row: any) => (
        <Space size="middle">
          <Dropdown
            trigger={['click']}
            placement="bottomRight"
            overlayClassName='menus_dropdown_main'
            menu={{ items: [
              { label: 'View', key: 'ViewDetails', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${row?.inEvaluationUserId}/${role !== constants.UNIVERSITY ? ROUTES_CONSTANTS.EVALUATION_FORM : ROUTES_CONSTANTS.DETAIL}?performanceRatingId=${row?.id}`) },
              { label: 'Download', key: 'download', onClick: () => {action.downloadHistoryDataPdf(evaluationHistoryColumnNames, evaluationHistoryData);
                Notifications({ title: 'Success', description: 'List Download', type: 'success' })}},
            ]}}
          >
            <MoreIcon
              className="cursor-pointer"
            />
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
      <Spin spinning={loadingPerfDetail} indicator={<LoadingOutlined />}>
      <Row gutter={[25, 25]} className="company-admin-detail-history-container">
        <Col xs={24} md={24} xl={12}>
          <div className="performance-left-subcontainer ">
            <BoxWrapper className="flex flex-col h-[379px]">
              <TopPerformanceCard
                id={1}
                name={performanceDetail?.evaluatedUserName}
                nameClassName="text-2xl text-primary-color font-medium"
                profession={getUserRoleLable(performanceDetail?.evaluatedUserRole)}
                className="bg-visible-btn evaluate-btn font-medium"
                icon={<ColorLessMedalIcon />}
                btnTxt={role !== constants.UNIVERSITY && 'Evaluate'}
                size={64}
                url={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${evalId}`}
                avatar={performanceDetail?.evaluatedUserName}
              />
              {progressData.map((item: any) => (
                <div key={item.id} className="mt-2">
                  <p className="mt-4">{item.title}</p>
                  <Progress className="flex" percent={item.progressPercent} strokeColor={item.progressColor} />
                </div>
              ))}
            </BoxWrapper>
            <BoxWrapper className="my-6 h-[379px]">
              <MonthlyPerfomanceChart
                heading="Monthly Performance"
                data={data}
                XField="department"
                columnWidthRatio={0.5}
                height='315px'
              />
            </BoxWrapper>
          </div>
        </Col>
        <Col xs={24} md={24} xl={12}>
          <div className="performance-right-subcontainer">
            <BoxWrapper className="h-[785px]">
              <p className="font-medium text-xl mb-4">
                Evaluation History
              </p>
              <GlobalTable
                columns={evaluationHistoryColumnNames}
                tableData={internPerformanceData}
                pagination={false}
              />
            </BoxWrapper>
          </div>
        </Col>
      </Row>
      </Spin>
      <AppreciationModal
        open={state.openAprreciationModal}
        title="Appreciation Email"
        initialValues={
          {
            name: "Mino Marina",
            description: "hello world",
            avatar: "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
          }
        }
        onSave={onSubmitAppreciationForm}
        onCancel={() => {
          setState(prevState => ({
            ...prevState,
            openAprreciationModal: !state.openAprreciationModal,
          }));
        }}
      />

      <WarnModal
        open={state.openWarnModal}
        title="Alert"
        initialValues={
          { description: "hello world", }
        }
        onIssue={onSubmitWarningForm}
        onCancel={() => {
          setState(prevState => ({
            ...prevState,
            openWarnModal: !state.openWarnModal,
          }));
        }}
      />
    </>
  )
}

export default DetailHistory;