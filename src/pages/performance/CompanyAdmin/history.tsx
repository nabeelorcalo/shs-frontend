import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Dropdown, Progress, Space, Row, Col, Form, Select, Button } from "antd";
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
import usePerformanceHook from "../actionHandler";
import { currentUserRoleState } from "../../../store";


const PerformanceHistory = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const action = useCustomHook();
  const {getAllPerformance, allPerformance, getEvaluatdBy, evaluatedByList, getDepartments, departmentsList} = usePerformanceHook();
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const [filterForm] = Form.useForm();
  const role = useRecoilValue(currentUserRoleState);
  const initReqBody = {
    page: 1,
    limit: 8,
  }
  const [reqBody, setReqBody] = useState(initReqBody)
  const [filterParams, setFilterParams] = useState({});
  const [loadingEvalbyList, setLoadingEvalbyList] = useState(false);
  const [loadingDep, setLoadingDep] = useState(false);
  
  const historyBreadCrumb = [
    { name: role === constants.COMPANY_ADMIN ? 'Performance History' : "View History" },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
  ];

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
    getAllPerformance(setLoadingAllPerformance, reqBody);
    getEvaluatdBy(setLoadingEvalbyList)
    getDepartments({page: 1, limit: 100}, setLoadingDep);
  }, [])

  useEffect(() => {
    getAllPerformance(setLoadingAllPerformance, reqBody);
  }, [reqBody])


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSidebarClick = () => {
    setState((prevState) => ({
      ...prevState,
      openSidebar: !state.openSidebar,
    }));
  };

  const handleSearch = (value: any) => {
    setReqBody((prev) => {
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

  const handleSetFilterParams = (changedValue:any, allValues:any) => {
    setFilterParams((prev) => {
      return {
        ...prev,
        ...changedValue
      }
    })
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

  const resetFilterForm = () => {
    filterForm.resetFields();
    setReqBody(initReqBody);
    setState((prevState) => ({
      ...prevState,
      openSidebar: false,
    }));
  }

  const handleApplyFilter = () => {
    setReqBody((prev:any) => {
      return {
        ...prev,
        ...filterParams
      }
    })
    setState({
      ...state,
      openSidebar: false
    });
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

  const handleMenuClick = (key:any, id:any) => {
    if(key === "ViewDetails") {
      navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.EVALUATION_FORM}`)
    } else if(key === "ViewDetailUR") {
      navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.DETAIL}`)
    } else if(key === "Appreciate") {
      openAprreciationModal()
    } else if(key === "Warn") {
      openWarnModal()
    }
  }

  // Table action items
  const itemsCA = [
    { label: 'View Details', key: 'ViewDetails'},
    { label: 'Evaluate', key: 'Evaluate'},
    { label: 'Appreciate', key: 'Appreciate'},
    { label: 'Warn', key: 'Warn'},
  ];
  const itemsUR = [
    { label: 'View Details', key: 'ViewDetailUR'},
  ];

  // History Table Column
  const performanceHistoryColumns = [
    {
      title: "No.",
      key: "no",
      render: (_: any, data: any, index: any) => (
        role !== constants.COMPANY_ADMIN ? <div className="bread-crumb">
          {index + 1}
        </div> : index + 1
      ),
    },
    {
      title: "Avatar",
      key: "avatar",
      align: 'center',
      render: (_: any, row: any) => ( role !== constants.COMPANY_ADMIN ? 
      (
        <Space size="middle">
          <div className="bread-crumb">
            <Avatar size={32} src={row.avatar} alt={row.userName}>
              {row.userName.split(' ').map((name:any) => name.charAt(0))}
            </Avatar>
          </div>
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
        role !== constants.COMPANY_ADMIN ? <div className="bread-crumb">
          {row.userName}
        </div> : row.userName
      ),
    },
    {
      title: "Department",
      key: "department",
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <div className="bread-crumb">
          {row.department}
        </div> : row.department
      ),
    },
    {
      title: "Last Evaluation",
      key: "date",
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <div className="bread-crumb">
          {dayjs(row.lastEvaluationDate).format('DD/MM/YYYY')}
        </div> : dayjs(row.lastEvaluationDate).format('DD/MM/YYYY')
      ),
    },
    {
      title: "Evaluated By",
      key: "evaluatedBy",
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <div className="bread-crumb">
          {row.evaluatedBy}
        </div> : row.evaluatedBy
      ),
    },
    {
      title: "Total Evaluations",
      key: "totalEvaluations",
      align: 'center',
      render: (_: any, row: any) => (
        role !== constants.COMPANY_ADMIN ? <div className="bread-crumb">
          {row.totalEvaluations}
        </div> : row.totalEvaluations
      ),
    },
    {
      title: "Overall Performance",
      key: "overallPerformance",
      render: (_: any, row: any) => {
        // let val = ;

        return (
          <Space size="middle">
            <div className="flex gap-2 bread-crumb">
              <Progress
                size={[200, 13]}
                percent={Math.round(row.sumOverallRating)}
                strokeColor={Math.round(row.sumOverallRating) < 50 ? "#E95060" : "#4A9D77"}
                format={(percent: any) => {
                  return (
                    <p
                      className={
                        "myClass font-normal " +
                        (Math.round(percent) < 50 ? "secondary-color" : "teriary-color")
                      }
                    >
                      {Math.round(percent)}%
                    </p>
                  )
                }}
              />
              {row.sumOverallRating > 89 ? <TalentBadge /> : <></>}
            </div>
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
              items: role === constants.UNIVERSITY ? itemsUR: itemsCA,
              onClick: ({key}) => handleMenuClick(key, row.inEvaluationUserId) 
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
                onValuesChange={handleSetFilterParams}
              >
                <Form.Item name="evaluatedBy" label="Evaluated By">
                  <Select
                    placeholder="Select"
                    placement="bottomRight"
                    suffixIcon={<IconAngleDown />}
                  >
                    {evaluatedByList?.map((user:any) => {
                      return (
                        <Select.Option value={user?.companyManager?.id}>
                          <div className="select-option-cont">
                            <Avatar size={24} src={user?.companyManager?.avatar}>
                              {user?.companyManager?.firstName.charAt(0)} {user?.companyManager?.lastName.charAt(0)}
                            </Avatar>
                            {user?.companyManager?.firstName} {user?.companyManager?.lastName}
                          </div>
                        </Select.Option>
                      )
                    })}
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
                </Form.Item>

                <Form.Item name="department" label="Department">
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    {departmentsList?.map((department:any) => {
                      return (
                        <Select.Option key={department?.id} value={department?.id}>{department?.name}</Select.Option>
                      )  
                    })}
                  </Select>
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'flex-end'}}>
                  <Space align="end" size={20}>
                    <Button className="button-tertiary" ghost onClick={() => resetFilterForm()}>
                      Reset
                    </Button>
                    <Button className="button-tertiary" onClick={handleApplyFilter}>
                      Apply
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
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
