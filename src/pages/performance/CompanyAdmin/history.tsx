import { useState, useEffect } from "react";
import { Avatar, Dropdown, Progress, Space, MenuProps } from 'antd';
// import all reusable componets from component/index.ts
import { PageHeader, SearchBar, FiltersButton, IconButton, DropDown, Button } from "../../../components";
import Drawer from "../../../components/Drawer";
import Table from "../../../components/Table/Table";
// end
import { DownlaodFileIcon, GlassMagnifier, MoreIcon } from '../../../assets/images';
import '../style.scss';
import { Link } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { AppreciationModal } from "./appreciationModal";
import { WarnModal } from "./warnModel";

const PerformanceHistory = () => {
  const columnNames = [
    {
      title: 'No.',
      key: 'no',
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
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
          <Link
            className="bread-crumb"
            to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
          >
            <Avatar
              size={32}
              alt="avatar"
              src={<img src={data.src} />}
            />
          </Link>
        </Space>
      ),
    },
    {
      title: 'Name',
      key: 'name',
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
        >
          {data.name}
        </Link >
      ),
    },
    {
      title: 'Department',
      key: 'department',
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
        >
          {data.department}
        </Link >
      ),
    },
    {
      title: 'Last Evaluation',
      key: 'date',
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
        >
          {data.date}
        </Link >
      ),
    },
    {
      title: 'Evaluated By',
      key: 'evaluatedBy',
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
        >
          {data.evaluatedBy}
        </Link >
      ),
    },
    {
      title: 'Total Evaluations',
      key: 'totalEvaluations',
      render: (_: any, data: any) => (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
        >
          {data.totalEvaluations}
        </Link >
      ),
    },
    {
      title: 'Overall Performance',
      key: 'overallPerformance',
      render: (_: any, data: any) => {
        return (
          <Space size="middle">
            <Link
              className="bread-crumb"
              to={`/${ROUTES_CONSTANTS.VIEW_PERFORMANCE_HISTORY}`}
            >
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
            </Link >
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
    openSidebar: false,
    timeFrameVal: 'Select',
    departmentVal: 'Select',
    evaluatedByVal: 'Select',
    openAprreciationModal: false,
    openWarnModal: false,
  });

  const handleSidebarClick = () => {
    setState(prevState => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  }

  const downloadClick = () => {

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
    return (
      <Link
        className="bread-crumb"
        to={`/${ROUTES_CONSTANTS.PERFORMANCE}`}
      >
        Performance
      </Link>
    )
  }

  return (
    <div className="company-admin-performance-history">
      <PageHeader
        bordered
        title={
          <div className="font-medium">
            Performance History
            <span className="vertical-line">
              {breadCrumbs()}
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
                    className="border-visible-btn"
                  />

                  <Button
                    label="Apply"
                    onClick={onApplyFilterClick}
                    className="bg-visible-btn"
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
    </div>
  )
}

export default PerformanceHistory;