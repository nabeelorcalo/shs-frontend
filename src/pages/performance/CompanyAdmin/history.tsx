import { useState, useEffect } from "react";
import { Avatar, Dropdown, Progress, Space, MenuProps } from 'antd';
// import all reusable componets from component/index.ts
import { PageHeader, SearchBar, FiltersButton, IconButton, DropDown, Button } from "../../../components";
import Drawer from "../../../components/Drawer";
import Table from "../../../components/Table/Table";
// end
import { DownlaodFileIcon, GlassMagnifier, MoreIcon } from '../../../assets/images';
import '../style.scss';

const PerformanceHistory = () => {
  const columnNames = [
    {
      title: 'No.',
      key: 'no',
      dataIndex: 'no',
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
      dataIndex: 'name',
    },
    {
      title: 'Department',
      key: 'department',
      dataIndex: 'department',
    },
    {
      title: 'Last Evaluation',
      key: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Evaluated By',
      key: 'evaluatedBy',
      dataIndex: 'evaluatedBy',
    },
    {
      title: 'Total Evaluations',
      key: 'totalEvaluations',
      dataIndex: 'totalEvaluations',
    },
    {
      title: 'Overall Performance',
      key: 'overallPerformance',
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
              // onClick={() => setActionType({ ...actionType, id: data.key })}
            />
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
      evaluatedBy: 'Mino Marina',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 40,
    },
    {
      id: 2,
      no: 2,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      evaluatedBy: 'Mino Marina',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 80,
    },
    {
      id: 3,
      no: 3,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      evaluatedBy: 'Mino Marina',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 50,
    },
    {
      id: 4,
      no: 4,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      evaluatedBy: 'Mino Marina',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 30,
    },
    {
      id: 5,
      no: 5,
      name: 'Mino Marina',
      department: 'UI UX Designer',
      evaluatedBy: 'Mino Marina',
      date: '22/09/2022',
      totalEvaluations: '08',
      src: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
      performance: 100,
    },
  ];

  const evaluatedByOptions = [
    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">
        Maria Sanoid
      </p>
    </div>,
    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">
        Janete Samson
      </p>
    </div>,
    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">
        Alen Juliet
      </p>
    </div>,
  ];

  const timeFrameOptions = [
    'This Week',
    'Last Week',
    'This Month',
    'Last Month',
    'Date Range'
  ];

  const departmentOptions = [
    'Design',
    'Business Analyst',
    'Data Scientist',
    'Product Manager',
    'Developer'
  ];

  const items: MenuProps['items'] = [
    {
      label: <p
        onClick={() => {
          // setActionType({ ...actionType, type: 'view' });
          // setOpenDrawer({ type: 'view', open: true })
        }}
      >
        View Details
      </p>,
      key: '0',
    },
    {
      label: <p
        // onClick={() => setActionType({ ...actionType, type: 'download' })}
      >
        Evaluate
      </p>,
      key: '1',
    },
    {
      label: <p
        // onClick={() => setActionType({ ...actionType, type: 'download' })}
      >
        Appreciate
      </p>,
      key: '2',
    },
    {
      label: <p
        // onClick={() => setActionType({ ...actionType, type: 'download' })}
      >
        Warn
      </p>,
      key: '3',
    },
  ];

  const [state, setState] = useState({
    openSidebar: false,
    timeFrameVal: 'Select',
    departmentVal: 'Select',
    evaluatedByVal: 'Select',
  });

  const handleSidebarClick = () => {
    setState(prevState => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  }

  const downloadClick = () => {

  }

  const sideBarContent = () => {
    return (<>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>)
  }

  const evaluatedBySelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      evaluatedByVal: value,
    }));
  }

  const timeFrameSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      timeFrameVal: value,
    }));
  }

  const departmentSelection = (event: any) => {
    const value = event.target.innerText;

    setState(prevState => ({
      ...prevState,
      departmentVal: value,
    }));
  }

  const onApplyFilterClick = () => {
    alert('Apply Filter')
  }

  const onResetFilterClick = () => {
    alert('Reset Filter')
  }

  return (
    <div className="company-admin-performance-history">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Performance History
            <span className="vertical-line">
              Performance
            </span>
          </div>
        }
      />

      <div className="flex">
        <div className="w-[33%]">
          <SearchBar
            className=""
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="search"
            size="small"
          />
        </div>

        <div className="flex justify-center ml-auto">
          <FiltersButton
            label="Filters"
            onClick={handleSidebarClick}
          />

          <IconButton
            size='large'
            className='icon-btn'
            onClick={downloadClick}
            icon={<DownlaodFileIcon />}
          />

          <Drawer
            title="Filters"
            open={state.openSidebar}
            onClose={handleSidebarClick}
            children={
              <div className="flex flex-col">
                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Evaluated By</p>
                  <DropDown
                    name="Select"
                    options={evaluatedByOptions}
                    setValue={() => evaluatedBySelection(event)}
                    value={state.evaluatedByVal}
                  />
                </div>

                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Time Frame</p>
                  <DropDown
                    name="Select"
                    options={timeFrameOptions}
                    setValue={() => timeFrameSelection(event)}
                    value={state.timeFrameVal}
                  />
                </div>

                <div className="flex flex-col my-2 gap-2">
                  <p className="sidebar-label">Department</p>
                  <DropDown
                    name="Select"
                    options={departmentOptions}
                    setValue={() => departmentSelection(event)}
                    value={state.departmentVal}
                  />
                </div>

                <div className="flex ml-auto my-2 gap-2">
                  <Button
                    label="Reset"
                    type="default"
                    onClick={onResetFilterClick}
                    className="performance-filter-reset-btn"
                  />

                  <Button
                    label="Apply"
                    onClick={onApplyFilterClick}
                    className="performance-filter-apply-btn"
                  />
                </div>
              </div>
            }
          />
        </div>
      </div>

      <div className="performace-history-list">
        <Table
          columns={columnNames}
          tableData={evaluationHistoryData}
          pagination={false}
        />
      </div>
    </div>
  )
}

export default PerformanceHistory;