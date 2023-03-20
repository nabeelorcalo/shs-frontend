import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Progress, Space, Typography, Dropdown, MenuProps } from "antd";
// import all reusable componets from component/index.ts
import { TopPerformanceCard, MonthlyPerfomanceChart, PageHeader } from "../../../components";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import Table from "../../../components/Table/Table";
// end
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { ColorLessMedalIcon, MoreIcon } from "../../../assets/images";
import { AppreciationModal } from "./appreciationModal";
import { WarnModal } from "./warnModel";
import '../style.scss';
import data from './data';

const DetailHistory = () => {
  const [actionType, setActionType] = useState({ type: '', id: '' });

  const performanceData = [
    {
      percent: '85',
      strokeColor: '#4783FF',
      title: 'Overall'
    },
    {
      percent: '85',
      strokeColor: '#9BD5E8',
      title: 'Learning'
    },
    {
      percent: '75',
      strokeColor: '#F08D97',
      title: 'Discipline'
    },
    {
      percent: '68',
      strokeColor: '#78DAAC',
      title: 'Personal'
    }
  ];

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

  const items: MenuProps['items'] = [
    {
      label:
        < Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}/${ROUTES_CONSTANTS.EVALUATION_FORM}`}
        >
          View Details
        </Link >,
      key: '0',
    },
    {
      label:
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}/${ROUTES_CONSTANTS.EVALUATE}`}
        >
          Evaluate
        </Link >,
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

  const [state, setState] = useState({
    openAprreciationModal: false,
    openWarnModal: false,
  });

  const onSubmitAppreciationForm = (values: any) => {
    console.log("Form Data: ", values);
    setState(prevState => ({
      ...prevState,
      openAprreciationModal: !state.openAprreciationModal,
    }));
  }

  const onSubmitWarningForm = (values: any) => {
    console.log("Form Data: ", values);
    setState(prevState => ({
      ...prevState,
      openWarnModal: !state.openWarnModal,
    }));
  }

  const breadCrumbs = () => {
    const role = constants.USER_ROLE;

    switch (role) {
      case 'Intern':
        return (
          <Link
            className="bread-crumb"
            to={`/${ROUTES_CONSTANTS.PERFORMANCE}`}
          >
            Performance
          </Link>
        );
      case 'CompanyAdmin':
        return (
          <>
            <Link
              className="bread-crumb"
              to={`/${ROUTES_CONSTANTS.PERFORMANCE}`}
            >
              Performance
            </Link>
            /
            <Link
              className="bread-crumb"
              to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`}
            >
              Performance History
            </Link>
          </>
        );
      default:
        return <></>;
    }
  }

  return (
    <>
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Mino Marina
            <span className="vertical-line">
              {breadCrumbs()}
            </span>
          </div>
        }
      />

      <div className="company-admin-detail-history-container gap-4">
        <div className="performance-left-subcontainer ">
          <BoxWrapper className="flex flex-col">
            <TopPerformanceCard
              id={1}
              name="Maria Sanoid"
              nameClassName="text-2xl text-primary-color"
              profession="UI UX Designer"
              className="bg-visible-btn evaluate-btn"
              icon={<ColorLessMedalIcon />}
              btnTxt='Evaluate'
              size={64}
              url={`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`}
              avatar="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
            />

            <p className="mt-4">Overall</p>
            <Progress className="flex" percent={81} strokeColor="#4783FF" />

            <p>Learning Objectives</p>
            <Progress className="flex" percent={85} strokeColor="#A1D8EA" />

            <p>Discipline</p>
            <Progress className="flex" percent={75} strokeColor="#F08D97" />

            <p>Personal</p>
            <Progress className="flex" percent={68} strokeColor="#78DAAC" />
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

        <div className="performance-right-subcontainer ">
          <BoxWrapper >
            <Typography.Title level={4} >
              Evaluation  History
            </Typography.Title>
            <Table
              columns={evaluationHistoryColumnNames}
              tableData={evaluationHistoryData}
              pagination={false}
            />
          </BoxWrapper>
        </div>
      </div>

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