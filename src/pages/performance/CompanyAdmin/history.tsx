import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { Avatar, Dropdown, Progress, Space, MenuProps, Row, Col, Form, Select, Button } from "antd";
import dayjs from 'dayjs';
import {
  PageHeader,
  SearchBar,
  FiltersButton,
  IconButton,
  DropDown,
  GlobalTable,
  Breadcrumb,
  Notifications,
  BoxWrapper,
  Drawer
} from "../../../components";
import {
  DownlaodFileIcon,
  GlassMagnifier,
  MoreIcon,
  TalentBadge,
  IconAngleDown
} from "../../../assets/images";
import "../style.scss";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { AppreciationModal } from "./appreciationModal";
import { WarnModal } from "./warnModel";
import useCustomHook from "./actionHandler";
import { header, tableData } from "./pdfData";
import { Link } from "react-router-dom";
import usePerformanceHook from "../actionHandler";
import { allPerformanceState, allPerformancesfilterParamsState, currentUserRoleState } from "../../../store";

const PerformanceHistory = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { getAllPerformance } = usePerformanceHook();
  const allPerformance = useRecoilValue(allPerformanceState);
  const [filterParams, setFilterParams] = useRecoilState(allPerformancesfilterParamsState);
  const resetFilterParams = useResetRecoilState(allPerformancesfilterParamsState);
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const [filterForm] = Form.useForm();
  const action = useCustomHook();
  const role = useRecoilValue(currentUserRoleState);
  const id = 1;
  const limit = 10;


  const historyBreadCrumb = [
    { name: role === constants.COMPANY_ADMIN ? 'Performance History' : "View History" },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
  ];

  const columnNames = [
    {
      title: "No.",
      key: "no",
      render: (_: any, data: any, index: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {index + 1}
        </Link> : index + 1
      ),
    },
    {
      title: "Avatar",
      key: "avatar",
      render: (_: any, data: any) => (
        role !== constants.COMPANY_ADMIN ?
          <Space size="middle">
            <Link
              className="bread-crumb"
              to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
            >
              <Avatar
                size={32}
                alt="avatar"
                src={<img src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" />}
              />
              {/* <Avatar size={32} alt="avatar" src={<img src={data.avatar} />} /> */}
            </Link>
          </Space> :
          <Avatar
            size={32}
            alt="avatar"
            src={<img src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png" />}
          />
        // <Avatar size={32} alt="avatar" src={<img src={data.avatar} />} />
      ),
    },
    {
      title: "Name",
      key: "name",
      render: (_: any, data: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.userName}
        </Link> : data.userName
      ),
    },
    {
      title: "Department",
      key: "department",
      render: (_: any, data: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.department}
        </Link> : data.department
      ),
    },
    {
      title: "Last Evaluation",
      key: "date",
      render: (_: any, data: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {dayjs(data.lastEvaluationDate).format('DD/MM/YYYY')}
        </Link> : dayjs(data.lastEvaluationDate).format('DD/MM/YYYY')
      ),
    },
    {
      title: "Evaluated By",
      key: "evaluatedBy",
      render: (_: any, data: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.evaluatedBy}
        </Link> : data.evaluatedBy
      ),
    },
    {
      title: "Total Evaluations",
      key: "totalEvaluations",
      render: (_: any, data: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {data.totalEvaluations}
        </Link> : data.totalEvaluations
      ),
    },
    {
      title: "Overall Performance",
      key: "overallPerformance",
      render: (_: any, data: any) => {
        let val = Math.round(data.sumOverallRating);

        return (
          <Space size="middle">
            <Link
              className="flex gap-2 bread-crumb"
              to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
            >
              <Progress
                size={[200, 13]}
                percent={val}
                strokeColor={val < 50 ? "#E95060" : "#4A9D77"}
                format={(percent: any) => {
                  let val = Math.round(percent);

                  return (
                    <p
                      className={
                        "myClass font-normal " +
                        (val < 50 ? "secondary-color" : "teriary-color")
                      }
                    >
                      {val}%
                    </p>
                  )
                }}
              />
              {data.isBadge ? <TalentBadge /> : ""}
            </Link>
          </Space>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, data: any) => (
        <Space size="middle">
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="menus_dropdown_main"
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
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 40,
      isBadge: true,
    },
    {
      id: 2,
      no: 2,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 80,
      isBadge: false,
    },
    {
      id: 3,
      no: 3,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 50,
      isBadge: true,
    },
    {
      id: 4,
      no: 4,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 30,
      isBadge: false,
    },
    {
      id: 5,
      no: 5,
      name: "Mino Marina",
      department: "UI UX Designer",
      evaluatedBy: "Mino Marina",
      date: "22/09/2022",
      totalEvaluations: "08",
      avatar:
        "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
      performance: 100,
      isBadge: true,
    },
  ];

  const evaluatedByOptions: any = [
    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">Maria Sanoid</p>
    </div>,

    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">Janete Samson</p>
    </div>,

    <div className="flex items-center">
      <Avatar
        size={24}
        src="https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png"
      />
      <p className="mx-2">Alen Juliet</p>
    </div>,
  ];

  const timeFrameOptions = [
    "Select",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "Date Range",
  ];

  const departmentOptions = [
    "All",
    "Design",
    "Business Analyst",
    "Data Scientist",
    "Product Manager",
    "Developer",
  ];

  let items: MenuProps["items"] = [
    {
      label: (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${1}/${role !== constants.UNIVERSITY ?
            ROUTES_CONSTANTS.EVALUATION_FORM : ROUTES_CONSTANTS.DETAIL
            }`}
        >
          View Details
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${1}/${ROUTES_CONSTANTS.EVALUATE
            }`}
        >
          Evaluate
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <p
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              openAprreciationModal: !state.openAprreciationModal,
            }));
          }}
        >
          Appreciate
        </p>
      ),
      key: "2",
    },
    {
      label: (
        <p
          onClick={() => {
            setState((prevState) => ({
              ...prevState,
              openWarnModal: !state.openWarnModal,
            }));
          }}
        >
          Warn
        </p>
      ),
      key: "3",
    },
  ];

  if (role === constants.UNIVERSITY && items.length > 2) {
    items = items.slice(0, -3)
  }

  const [state, setState] = useState({
    openSidebar: false,
    timeFrameVal: "Select",
    departmentVal: "Select",
    evaluatedByVal: "Select",
    openAprreciationModal: false,
    openWarnModal: false,
    page: 1,
  });

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getAllPerformance(setLoadingAllPerformance, filterParams)
  }, [])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSidebarClick = () => {
    setState((prevState) => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  };

  const evaluatedBySelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      evaluatedByVal: value,
    }));
  };

  const departmentSelection = (event: any) => {
    const value = event.target.innerText;

    setState((prevState) => ({
      ...prevState,
      departmentVal: value,
    }));
  };

  const onApplyFilterClick = () => {
    // alert("Apply Filter");
  };

  const onResetFilterClick = () => {
    // alert("Reset Filter");
    setState((prevState) => ({
      ...prevState,
      timeFrameVal: "Select",
      departmentVal: "Select",
      evaluatedByVal: "Select",
    }));
  };

  const onSubmitAppreciationForm = (values: any) => {
    setState((prevState) => ({
      ...prevState,
      openAprreciationModal: !state.openAprreciationModal,
    }));
  };

  const onSubmitWarningForm = (values: any) => {
    setState((prevState) => ({
      ...prevState,
      openWarnModal: !state.openWarnModal,
    }));
  };

  const onValuesChange = (changedValue: any, allValues: any) => {
    setFilterParams((old) => {
      return {
        ...old,
        ...changedValue
      }
    })
  };

  const resetFilterForm = () => {
    filterForm.resetFields();
    resetFilterParams();
  }

  const handleApplyFilter = () => {
    getAllPerformance(setLoadingAllPerformance, filterParams);
    setState({
      ...state,
      openSidebar: false
    });
    resetFilterForm()
  }


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="company-admin-performance-history">
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={historyBreadCrumb} />}
      />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar
            handleChange={() => { }}
            icon={<GlassMagnifier />}
            name="searchBar"
            placeholder="Search"
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end  gap-4">
          <FiltersButton label="Filters" onClick={handleSidebarClick} />
          <IconButton
            size="large"
            className="icon-btn"
            onClick={() => {
              action.downloadPdf(header, tableData);
              Notifications({ title: "Success", description: "Download Done", type: 'success' })
            }}
            icon={<DownlaodFileIcon />}
          />
          <Drawer
            title="Filters"
            open={state.openSidebar}
            onClose={handleSidebarClick}
            children={
              <>
              <Form
                form={filterForm}
                layout="vertical"
                name="performanceFilter"
                onValuesChange={onValuesChange}
              >
                <Form.Item name="evaluatedBy" label="Evaluated By">
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />} className="filled">
                    <Select.Option value={1}>User ID 1</Select.Option>
                    <Select.Option value={8}>User ID 8</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="filterType" label="Time Frame">
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />} className="filled">
                    <Select.Option value={'THIS_WEEK'}>This Week</Select.Option>
                    <Select.Option value={'LAST_WEEK'}>Last Week</Select.Option>
                    <Select.Option value={'THIS_MONTH'}>This Month</Select.Option>
                    <Select.Option value={'LAST_MONTH'}>Last Month</Select.Option>
                    <Select.Option value={'DATE_RANGE'}>Date Range</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="department" label="Department">
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />} className="filled">
                    <Select.Option value={1}>Design</Select.Option>
                    <Select.Option value={2}>Business Analyst</Select.Option>
                    <Select.Option value={3}>Data Scientist</Select.Option>
                    <Select.Option value={4}>Product Manager</Select.Option>
                    <Select.Option value={5}>Developer</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Space align="end" size={20}>
                    <Button className="button-tertiary" ghost onClick={() => resetFilterForm()}>
                      Reset
                    </Button>
                    <Button className="button-tertiary" onClick={() => handleApplyFilter()}>
                      Apply
                    </Button>
                  </Space>
                </Form.Item>
            </Form>
            {/* <div className="flex flex-col">
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
                  setValue={(e: string) => setState((prevState) => ({
                    ...prevState,
                    timeFrameVal: e,
                  }))}
                  value={state.timeFrameVal}
                  showDatePickerOnVal="Date Range"
                  placement="topLeft"
                  requireRangePicker
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
            </div> */}
            </>
            }
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <GlobalTable 
              columns={columnNames} 
              tableData={allPerformance}
              pagination={true}
              loading={loadingAllPerformance}
            />
          </BoxWrapper>
        </Col>
      </Row>
      <AppreciationModal
        open={state.openAprreciationModal}
        title="Appreciation Email"
        initialValues={{
          name: "Mino Marina",
          description: "hello world",
          avatar:
            "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
          }}
        onSave={onSubmitAppreciationForm}
        onCancel={() => {
          setState((prevState) => ({
            ...prevState,
            openAprreciationModal: !state.openAprreciationModal,
          }));
        }}
      />

      <WarnModal
        open={state.openWarnModal}
        title="Alert"
        initialValues={{ description: "hello world" }}
        onIssue={onSubmitWarningForm}
        onCancel={() => {
          setState((prevState) => ({
            ...prevState,
            openWarnModal: !state.openWarnModal,
          }));
        }}
      />
    </div>
  );
};

export default PerformanceHistory;
