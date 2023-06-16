import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import { Avatar, Dropdown, Progress, Space, MenuProps, Row, Col, Form, Select, Button } from "antd";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom"
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
import UserSelector from "../../../components/UserSelector";

const PerformanceHistory = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const action = useCustomHook();
  const {getAllPerformance, allPerformance, getEvaluatdBy, evaluatedByList, getDepartments, departmentsList} = usePerformanceHook();
  const resetFilterParams = useResetRecoilState(allPerformancesfilterParamsState);
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const [filterForm] = Form.useForm();
  const role = useRecoilValue(currentUserRoleState);
  const id = 1;
  const limit = 10;
  const initFilterParams = {
    page: 1,
    limit: 8,
  }
  const [filterParams, setFilterParams] = useState(initFilterParams);
  const [loadingEvalbyList, setLoadingEvalbyList] = useState(false);
  const [loadingDep, setLoadingDep] = useState(false);
  


  const historyBreadCrumb = [
    { name: role === constants.COMPANY_ADMIN ? 'Performance History' : "View History" },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
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
    getAllPerformance(setLoadingAllPerformance, filterParams);
    getEvaluatdBy(setLoadingEvalbyList)
    getDepartments({page: 1, limit: 100}, setLoadingDep);
  }, [])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSidebarClick = () => {
    setState((prevState) => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  };

  const handleSearch = (value: any) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        search: value
      }
    })
  }

  const getFilterType = (value:any) => {
    let filterType;
    if (value === "This Week") {
      filterType = 'THIS_WEEK';
    } else if (value === "Last Week") {
      filterType = 'LAST_WEEK';
    } else if (value === "This Month") {
      filterType = 'THIS_MONTH';
    } else if (value === "Last Month") {
      filterType = 'LAST_MONTH';
    } else {
      filterType = 'DATE_RANGE';
    }
    return filterType;
  }

  const handleTimeFrameFilter = (value: string) => {
    let filterType = getFilterType(value);
    const date = dayjs(new Date()).format("YYYY-MM-DD");
    if(filterType === 'DATE_RANGE') {
      const [startDate, endDate] = value.split(",").map((date:any) => date.trim())
      setFilterParams((prev) => {
        return {
          ...prev,
          filterType: filterType,
          startDate: startDate,
          endDate: endDate
        }
      })
    } else {
      setFilterParams((prev) => {
        return {
          ...prev,
          filterType: filterType,
          currentDate: date
        }
      })
    }
  }

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
    setFilterParams((prev) => {
      return {
        ...prev,
        ...changedValue
      }
    })
    console.log('parmas changed:: ', filterParams)
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

  const openAprreciationModal = () => {
    setState((prevState) => ({
      ...prevState,
      openAprreciationModal: !state.openAprreciationModal,
    }));
  };

  const openWarnModal = () => {
    setState((prevState) => ({
      ...prevState,
      openWarnModal: !state.openWarnModal,
    }));
  }

  // History Table Column
  const performanceHistoryColumns = [
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
      align: 'center',
      render: (_: any, row: any) => ( role !== constants.COMPANY_ADMIN ? 
      (
        <Space size="middle">
          <Link
            className="bread-crumb"
            to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
          >
            <Avatar size={32} src={row.avatar} alt={row.userName}>
              {row.userName.split(' ').map((name:any) => name.charAt(0))}
            </Avatar>
          </Link>
        </Space>
      ): (
        <Avatar size={32} src={row.avatar} alt={row.userName}>
          {row.userName.split(' ').map((name:any) => name.charAt(0))}
        </Avatar>
      )),
    },
    {
      title: "Name",
      key: "name",
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {row.userName}
        </Link> : row.userName
      ),
    },
    {
      title: "Department",
      key: "department",
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {row.department}
        </Link> : row.department
      ),
    },
    {
      title: "Last Evaluation",
      key: "date",
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {dayjs(row.lastEvaluationDate).format('DD/MM/YYYY')}
        </Link> : dayjs(row.lastEvaluationDate).format('DD/MM/YYYY')
      ),
    },
    {
      title: "Evaluated By",
      key: "evaluatedBy",
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {row.evaluatedBy}
        </Link> : row.evaluatedBy
      ),
    },
    {
      title: "Total Evaluations",
      key: "totalEvaluations",
      align: 'center',
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <Link
          className="bread-crumb"
          to={`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.HISTORY}`}
        >
          {row.totalEvaluations}
        </Link> : row.totalEvaluations
      ),
    },
    {
      title: "Overall Performance",
      key: "overallPerformance",
      render: (_: any, row: any) => {
        let val = Math.round(row.sumOverallRating);

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
              {row.sumOverallRating > 89 ? <TalentBadge /> : <></>}
            </Link>
          </Space>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, row: any) => (
        <Space size="middle">
          <Dropdown
            trigger={["click"]}
            placement="bottomRight"
            overlayClassName="menus_dropdown_main"
            menu={{
              items: [
                { label: 'View Details', key: 'ViewDetails', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${row.inEvaluationUserId}/${role !== constants.UNIVERSITY ? ROUTES_CONSTANTS.EVALUATION_FORM : ROUTES_CONSTANTS.DETAIL}`) },
                { label: 'Evaluate', key: 'Evaluate', onClick: () => navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${row.inEvaluationUserId}`)},
                { label: 'Appreciate', key: 'Appreciate', onClick: () => openAprreciationModal()},
                { label: 'Warn', key: 'Warn', onClick: () => openWarnModal()},
              ]
            }}
          >
            <MoreIcon className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];

console.log('evaluatedByList:: ', departmentsList)
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
            handleChange={handleSearch}
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
                  <Select
                    placeholder="Select"
                    placement="bottomRight"
                    suffixIcon={<IconAngleDown />}
                  >
                    <Select.Option value={1}>
                      <div className="select-option-cont">
                        <Avatar size={24} src={undefined}>
                          AS
                        </Avatar>
                        User ID 1
                      </div>
                    </Select.Option>
                    <Select.Option value={8}>
                      <div className="select-option-cont">
                        <Avatar size={24} src={undefined}>
                          AS
                        </Avatar>
                        User ID 8
                      </div>
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item name="filterType" label="Time Frame">
                  <DropDown
                    name="Time Frame"
                    options={["This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
                    placement="bottomRight"
                    showDatePickerOnVal={"Date Range"}
                    setValue={handleTimeFrameFilter}
                    requireRangePicker
                  />
                  {/* <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    <Select.Option value={'THIS_WEEK'}>This Week</Select.Option>
                    <Select.Option value={'LAST_WEEK'}>Last Week</Select.Option>
                    <Select.Option value={'THIS_MONTH'}>This Month</Select.Option>
                    <Select.Option value={'LAST_MONTH'}>Last Month</Select.Option>
                    <Select.Option value={'DATE_RANGE'}>Date Range</Select.Option>
                  </Select> */}
                </Form.Item>

                <Form.Item name="department" label="Department">
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    {departmentsList?.map((department:any) => {
                      console.log("department:; ", department)
                      return (
                        <Select.Option key={department?.id} value={1}>Design</Select.Option>
                      )  
                    })}
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
              columns={performanceHistoryColumns} 
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
