import { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Progress, Space, MenuProps } from 'antd';
import { PageHeader, SearchBar, GlobalTable, DropDown, BoxWrapper } from "../../../components";
import { GlassMagnifier, MoreIcon, TalentBadge } from '../../../assets/images';
import '../style.scss';
import { ROUTES_CONSTANTS } from "../../../config/constants";

const ManagerPerformance = () => {
  const columnNames = [
    {
      title: 'No.',
      key: 'no',
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`${1}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.no}
        </Link >
      ),
    },
    {
      title: 'Avatar',
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
      title: 'Name',
      key: 'name',
      render: (_: any, data: any) => (
        <p>
          {data.name}
        </p>
      ),
    },
    {
      title: 'Department',
      key: 'department',
      render: (_: any, data: any) => (
        <p>
          {data.department}
        </p >
      ),
    },
    {
      title: 'Last Evaluation',
      key: 'date',
      render: (_: any, data: any) => (
        <p>
          {data.date}
        </p>
      ),
    },
    {
      title: 'Total Evaluations',
      key: 'totalEvaluations',
      render: (_: any, data: any) => (
        <p>
          {data.totalEvaluations}
        </p>
      ),
    },
    {
      title: 'Overall Performance',
      key: 'overallPerformance',
      render: (_: any, data: any) => {
        return (
          <Space size="middle" className="flex">
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
            {data.isBadged ? <TalentBadge /> : ''}
          </Space>
        )
      },
    },
    {
      title: 'Actions',
      key: 'action',
      render: (_: any, data: any) => (
        <Space size="middle">
          <Dropdown
            menu={{ items }}
            trigger={['click']}
            placement="bottomRight"
            overlayClassName='menus_dropdown_main'
          >
            <MoreIcon className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const evaluationHistoryData = [
    {
      id: 1,
      no: 1,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 40,
      isBadged: true,
    },
    {
      id: 2,
      no: 2,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 80,
      isBadged: false,
    },
    {
      id: 3,
      no: 3,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 50,
      isBadged: true,
    },
    {
      id: 4,
      no: 4,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 30,
      isBadged: false,
    },
    {
      id: 5,
      no: 5,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 100,
      isBadged: true,
    },
  ];

  const timeFrameOptions = [
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'Date Range'
  ];

  const professionOptions = [
    'Design',
    'Business Analyst',
    'Data Scientist',
    'Product Manager',
    'Developer'
  ];

  const items: MenuProps['items'] = [
    {
      label:
        < Link
          className="bread-crumb"
          to={`${1}/${ROUTES_CONSTANTS.DETAIL}`}
        >
          View Details
        </Link >,
      key: '0',
    },
    {
      label:
        <Link
          className="bread-crumb"
          to={`${1}/${ROUTES_CONSTANTS.EVALUATE}`}
        >
          Evaluate
        </Link >,
      key: '1',
    },
  ];

  const [state, setState] = useState({
    openSidebar: false,
    timeFrameVal: 'Time Frame',
    professionVal: 'Status',
  });

  const timeFrameSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      timeFrameVal: value,
    }));
  }

  const professionSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      professionVal: value,
    }));
  }

  return (
    <div className="manager-performance-history">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Performance
          </div>
        }
      />
      <div className="flex performance-header">
        <div className="w-[30%] performance-search-bar">
          <SearchBar
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="Search"
          />
        </div>

        <div className="flex justify-center ml-auto gap-4 manager-dropdowns-container">
          <DropDown
            name="time-frame"
            options={timeFrameOptions}
            setValue={() => timeFrameSelection(event)}
            value={state.timeFrameVal}
            showDatePickerOnVal='Date Range'
            requireDatePicker
            placement='topLeft'
          />

          <DropDown
            name="profession"
            options={professionOptions}
            setValue={() => professionSelection(event)}
            value={state.professionVal}
          />
        </div>
      </div>
      <BoxWrapper>
        <div className="performace-history-list">
          <GlobalTable
            columns={columnNames}
            tableData={evaluationHistoryData}
            pagination={false}
          />
        </div>
      </BoxWrapper>

    </div>
  )
}

export default ManagerPerformance;