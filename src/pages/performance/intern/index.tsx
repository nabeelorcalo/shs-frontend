import { useState, useEffect } from "react";
import { Dropdown, MenuProps, Space, Avatar, Progress } from 'antd';
// import all reusable componets from component/index.ts
import { OverAllPerfomance, MonthlyPerfomanceChart, PageHeader } from "../../../components";
import Table from "../../../components/Table/Table";
// end
import { MoreIcon } from "../../../assets/images";

const InternPerformance = () => {
  const performanceData = [
    {
      percent1: '85',
      strokeColor: '#4783FF',
      title: 'Overall'
    },
    {
      percent1: '85',
      strokeColor: '#9BD5E8',
      title: 'Learning'
    },
    {
      percent1: '75',
      strokeColor: '#F08D97',
      title: 'Discipline'
    },
    {
      percent1: '68',
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
      title: 'Manager',
      key: 'avatar',
      render: (_: any, data: any) => (
        <Space size="middle">
          <Avatar
            size={32}
            alt="avatar"
            src={<img src={data.src} />}
          />
        </Space>
      ),
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

  const monthlyPerformanceData = [
    {
      city: 'Jan',
      type: 'Learning Objectives',
      value: 10000
    },
    {
      city: 'Jan',
      type: 'Dicipline',
      value: 15000
    },
    {
      city: 'Jan',
      type: 'Personal',
      value: 7000
    },
    {
      city: 'Feb',
      type: 'Learning Objectives',
      value: 10000
    },
    {
      city: 'Feb',
      type: 'Dicipline',
      value: 15000
    },
    {
      city: 'Feb',
      type: 'Personal',
      value: 7000
    },
    {
      city: 'Mar',
      value: 10000
    },
    {
      city: 'Mar',
      type: 'Dicipline',
      value: 15000
    },
    {
      city: 'Mar',
      type: 'Personal',
      value: 7000
    },
    {
      city: 'Apr',
      value: 10000
    },
    {
      city: 'Apr',
      type: 'Dicipline',
      value: 15000
    },
    {
      city: 'Apr',
      type: 'Personal',
      value: 7000
    },
    {
      city: 'May',
      value: 10000
    },
    {
      city: 'May',
      type: 'Dicipline',
      value: 15000
    },
    {
      city: 'May',
      type: 'Personal',
      value: 7000
    },
    {
      city: 'Jun',
      value: 10000
    },
    {
      city: 'Jun',
      type: 'Dicipline',
      value: 15000
    },
    {
      city: 'Jun',
      type: 'Personal',
      value: 7000
    }
  ];

  const [actionType, setActionType] = useState({ type: '', id: '' });
  const [openDrawer, setOpenDrawer] = useState({ open: false, type: '' });

  const items: MenuProps['items'] = [
    {
      label: <p
        onClick={() => {
          setActionType({ ...actionType, type: 'view' });
          setOpenDrawer({ type: 'view', open: true })
        }}
      >
        View
      </p>,
      key: '0',
    },
    {
      label: <p
        onClick={() => setActionType({ ...actionType, type: 'download' })}
      >
        Download
      </p>,
      key: '1',
    }
  ];

  return (
    <>
      <PageHeader title="Performance" />

      <div className="performance-container">
        <div className="performance-left-subcontainer ">
          <OverAllPerfomance
            heading="Overall Performance"
            data={performanceData}
            trailColor="#E6F4F9"
            strokeWidth={10}
            type="circle"
            width={100}
          />

          <div className="mt-10">
            <MonthlyPerfomanceChart
              heading="Perfomance Analytics"
              data={monthlyPerformanceData}
            />
          </div>
        </div>

        <div className="performance-right-subcontainer">
          <Table
            columns={evaluationHistoryColumnNames}
            tableData={evaluationHistoryData}
            pagination={false}
          />
        </div>
      </div>
    </>
  )
}

export default InternPerformance;