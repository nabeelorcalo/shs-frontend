import { useState } from "react";
import { Link } from "react-router-dom";
import { Progress, Space, Typography, Dropdown, MenuProps, Row, Col } from "antd";
// import all reusable componets from component/index.ts
import { TopPerformanceCard, MonthlyPerfomanceChart, PageHeader, GlobalTable, Breadcrumb, Notifications } from "../../components";
import { BoxWrapper } from "../../components";
// end
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import { ColorLessMedalIcon, MoreIcon } from "../../assets/images";
import { AppreciationModal } from "./CompanyAdmin/appreciationModal";
import { WarnModal } from "./CompanyAdmin/warnModel";
import './style.scss';
import data from './CompanyAdmin/data';
import useCustomHook from "./actionHandler";
import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";

const DetailHistory = () => {
  const role = useRecoilValue(currentUserRoleState);
  const [actionType, setActionType] = useState({ type: '', id: '' });
  const detailHistoryBreadCrumb = [
    { name: "Mino Marina" },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
    { name: role === constants.UNIVERSITY ? "View History" : role === constants.MANAGER ? '' : 'Performance History', onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}` },
  ];
  const action = useCustomHook();

  const evaluationHistoryColumnNames = [
    {
      title: 'Date',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_: any, data: any) => {
        return (
          <Space size="middle">
            <Progress
              size={[200, 13]}
              percent={data.performance}
              strokeColor={data.performance < 50 ? '#E95060' : '#4A9D77'}
              format={(percent: any) =>
                <p className={"myClass " + (percent < 50 ? 'secondary-color' : 'teriary-color')} >
                  {percent}%
                </p>
              }
            />
          </Space>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, data: any) => (
        <Space size="middle">
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            overlayClassName='menus_dropdown_main'
          >
            <MoreIcon
              className="cursor-pointer"
              onClick={() => setActionType({ ...actionType, id: data.key })}
            />
          </Dropdown>
        </Space>
      ),
    },
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
    { id:1,title: 'Overall', progressPercent: 81, progressColor: '#4783FF' },
    { id:2,title: 'Learning Objectives', progressPercent: 85, progressColor: '#A1D8EA' },
    { id:3,title: 'Discipline', progressPercent: 75, progressColor: '#F08D97' },
    { id:4,title: 'Personal', progressPercent: 68, progressColor: '#78DAAC' },
  ]
  return (
    <>
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={detailHistoryBreadCrumb} />}
      />

      <Row gutter={[20, 20]} className="company-admin-detail-history-container">
        <Col xs={24} md={24} xl={12}>
          <div className="performance-left-subcontainer ">
            <BoxWrapper className="flex flex-col">
              <TopPerformanceCard
                id={1}
                name="Maria Sanoid"
                nameClassName="text-2xl text-primary-color"
                profession="UI UX Designer"
                className="bg-visible-btn evaluate-btn"
                icon={<ColorLessMedalIcon />}
                btnTxt={role !== constants.UNIVERSITY && 'Evaluate'}
                size={64}
                url={`/${ROUTES_CONSTANTS.PERFORMANCE}/${1}/${ROUTES_CONSTANTS.EVALUATE}`}
                avatar="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
              />
              {progressData.map((item: any) => (
                <div key={item.id}>
                  <p className="mt-4">{item.title}</p>
                  <Progress className="flex" percent={item.progressPercent} strokeColor={item.progressColor} />
                </div>
              ))}
            </BoxWrapper>

            <div className="my-4 h-[502px]">
              <MonthlyPerfomanceChart
                heading="Summary"
                data={data}
                XField="department"
                columnWidthRatio={0.5}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} md={24} xl={12}>
          <div className="performance-right-subcontainer ">
            <BoxWrapper >
              <Typography.Title level={4} >
                Evaluation History
              </Typography.Title>
              <GlobalTable
                columns={evaluationHistoryColumnNames}
                tableData={evaluationHistoryData}
                pagination={false}
              />
            </BoxWrapper>
          </div>
        </Col>
      </Row>
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