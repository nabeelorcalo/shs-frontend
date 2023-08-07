import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Avatar, Dropdown, Progress, Space, Row, Col, Form, Select, Button, Input, Table } from "antd";
import type { PaginationProps } from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom"
import {
  PageHeader,
  SearchBar,
  FiltersButton,
  IconButton,
  DropDown,
  Breadcrumb,
  Notifications,
  Drawer,
  PopUpModal,
  Loader, 
} from "../../../components";
import {
  DownlaodFileIcon,
  GlassMagnifier,
  MoreIcon,
  TalentBadge,
  IconAngleDown,
  AlertIcon
} from "../../../assets/images";
import "../style.scss";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";
import { AppreciationModal } from "./appreciationModal";
import useCustomHook from "./actionHandler";
import { header, tableData } from "./pdfData";
import usePerformanceHook from "../actionHandler";
import { currentUserRoleState, currentUserState } from "../../../store";
interface TableParams {
  pagination?: TablePaginationConfig;
}


const PerformanceHistory = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const action = useCustomHook();
  const {
    getAllPerformance,
    allPerformance,
    totalRequests,
    getEvaluatdBy,
    evaluatedByList,
    getDepartments,
    departmentsList,
    sendEmail,
    downloadPerformanceHistoryPDF,
    getManagersList,
    evalManagersList
  } = usePerformanceHook();
  const [loadingAllPerformance, setLoadingAllPerformance] = useState(false);
  const [filterForm] = Form.useForm();
  const role = useRecoilValue(currentUserRoleState);
  const currentUser = useRecoilValue(currentUserState);
  const [pageNo, setPageNo] = useState(1);
  const initReqBody = {
    page: 1,
    limit: 8,
  }
  const [reqBody, setReqBody] = useState(initReqBody)
  const [filterParams, setFilterParams] = useState({});
  const [loadingEvalbyList, setLoadingEvalbyList] = useState(false);
  const [loadingDep, setLoadingDep] = useState(false);
  const [warnModalOpen, setWarnModalOpen] = useState(false);
  const [appreciateModalOpen, setAppreciateModalOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false)
  const historyBreadCrumb = [
    { name: role === constants.COMPANY_ADMIN ? 'Performance History' : "View History" },
    { name: "Performance", onClickNavigateTo: `/${ROUTES_CONSTANTS.PERFORMANCE}` },
  ];
  const initWarnEmailData = {
    subject: 'Warning',
    text: ''
  }
  const [warnEmailData, setWarnEmailData] = useState(initWarnEmailData);
  const [loadingWarn, setLoadingWarn] = useState(false)
  const [timeFrameValue, setTimeFrameValue] = useState('Time Frame');
  const [loadingMangList, setLoadingMangList] = useState(false);

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getEvaluatdBy(setLoadingEvalbyList)
    getDepartments({page: 1, limit: 100}, setLoadingDep);
    getManagersList(currentUser?.userUniversity?.id, setLoadingMangList)
  }, [])

  useEffect(() => {
    getAllPerformance(setLoadingAllPerformance, reqBody);
  }, [reqBody]);
  console.log('evalManagersList:: ', evalManagersList);

  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  async function sendEmailReq() {
    setLoadingWarn(true);
    try {
      const response = await sendEmail(warnEmailData);
      if(!response.error) {
        Notifications({title: "Success", description: "Email sent successfully.", type: 'success'});
      }
    } catch(error) {
      console.error(error)
      return;
    } finally {
      setLoadingWarn(false);
      closeWarnModal();
    }
  }


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const openWarnModal = (email:any) => {
    setWarnEmailData((prev) => {
      return {
        ...prev,
        recipients: [email],
      }
    })
    setWarnModalOpen(true)
  }

  const closeWarnModal = () => {
    setWarnModalOpen(false)
    setWarnEmailData(initWarnEmailData)
  }

  const handleChangeWarn = (e: any) => {
    setWarnEmailData((prev) => {
      return {
        ...prev,
        text: e.target.value
      }
    })
  }

  const openAppreciateModal = () => {
    setAppreciateModalOpen(true)
  }

  const closeAppreciateModal = () => {
    setAppreciateModalOpen(false)
  }

  const openDrawer = () => {
    setOpenSidebar(true)
  }
  
  const closeDrawer = () => {
    setOpenSidebar(false)
  }

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
    console.log('filere:: ', value)
    let filterType = getFilterType(value);
    const date = dayjs(new Date()).format("YYYY-MM-DD");
    if(filterType === 'DATE_RANGE') {
      const [startDate, endDate] = value.split(",").map((date:any) => date.trim())
      setTimeFrameValue(`${startDate} , ${endDate}`);
      setFilterParams((prev) => {
        return {
          ...prev,
          filterType: filterType,
          startDate: startDate,
          endDate: endDate
        }
      })
    } else {
      setTimeFrameValue(value);
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
    closeAppreciateModal();
  };

  const resetFilterForm = () => {
    filterForm.resetFields();
    setReqBody(initReqBody);
    closeDrawer()
  }

  const handleApplyFilter = () => {
    setReqBody((prev:any) => {
      return {
        ...prev,
        ...filterParams
      }
    })
    closeDrawer()
  }

  const handleMenuClick = (key:any, id:any, email:any) => {
    if(key === "ViewDetails") {
      navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.EVALUATION_FORM}`)
    } else if(key === "ViewDetailUR") {
      navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${id}/${ROUTES_CONSTANTS.DETAIL}`)
    } else if(key === "Evaluate") {
      navigate(`/${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/${id}`)
    } else if(key === "Appreciate") {
      openAppreciateModal()
    } else if(key === "Warn") {
      openWarnModal(email)
    }
  }

  const handlePagination:PaginationProps['onChange'] = (page:any) => {
    setPageNo(page.current)
    setReqBody((prev:any) => {
      return {...prev, page: page.current}
    })
  };

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
  const performanceHistoryColumns:any = [
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
              onClick: ({key}) => handleMenuClick(key, row.inEvaluationUserId, row.userEmail) 
            }}
          >
            <MoreIcon className="cursor-pointer" />
          </Dropdown>
        </Space>
      ),
    },
  ];
  
  const tablePdfData = () => {
    return allPerformance?.map((data: any) => ({
      key: data.id,
      name: data?.userName,
      department: data?.department,
      lastEvaluation: dayjs(data.lastEvaluationDate).format('DD/MM/YYYY'),
      evaluatedBy: data?.evaluatedBy,
      totalEvaluations: data?.totalEvaluations,
      overallPerformance: Math.round(data?.sumOverallRating)
    })) || [];
  };
  
  
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
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
          <FiltersButton label="Filters" onClick={openDrawer} />
          <IconButton
            size="large"
            className="icon-btn"
            onClick={() => {
              downloadPerformanceHistoryPDF(tablePdfData());
              Notifications({ title: "Success", description: "Download Done", type: 'success' })
            }}
            icon={<DownlaodFileIcon />}
          />
          <Drawer
            title="Filters"
            open={openSidebar}
            onClose={closeDrawer}
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
                    {role === constants.UNIVERSITY ?
                      (
                        evalManagersList?.map((user:any) => {
                          return (
                            <Select.Option value={user?.id} key={user.id}>
                              <div className="select-option-cont">
                                <Avatar size={24} src={user?.avatar}>
                                  {user?.firstName.charAt(0)} {user?.lastName.charAt(0)}
                                </Avatar>
                                {user?.firstName} {user?.lastName}
                              </div>
                            </Select.Option>
                          )
                        })
                      ) : (
                        evaluatedByList?.map((user:any) => {
                          return (
                            <Select.Option value={user?.companyManager?.id} key={user.id}>
                              <div className="select-option-cont">
                                <Avatar size={24} src={user?.companyManager?.avatar}>
                                  {user?.companyManager?.firstName.charAt(0)} {user?.companyManager?.lastName.charAt(0)}
                                </Avatar>
                                {user?.companyManager?.firstName} {user?.companyManager?.lastName}
                              </div>
                            </Select.Option>
                          )
                        })
                      )
                    }
                  </Select>
                </Form.Item>

                <Form.Item label="Time Frame">
                  <DropDown
                    name="Time Frame"
                    options={["This Week", "Last Week", "This Month", "Last Month", "Date Range"]}
                    placement="bottomRight"
                    showDatePickerOnVal={"Date Range"}
                    setValue={handleTimeFrameFilter}
                    dateRangePlacement="bottomRight"
                    value={timeFrameValue}
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
          <div className="shs-table-card">
            <div className="shs-table">
              <Table
                loading={{spinning: loadingAllPerformance, indicator: <Loader />}}
                columns={performanceHistoryColumns}
                dataSource={allPerformance}
                onChange={(page:any, pageSize:any) => handlePagination(page, pageSize)}
                pagination={{
                  pageSize: 8,
                  current: pageNo,
                  total: totalRequests,
                  showSizeChanger: false,
                  showTotal: (total) => <>Total: {total}</>
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <AppreciationModal
        open={appreciateModalOpen}
        title="Appreciation Email"
        initialValues={{
          name: "Mino Marina",
          description: "hello world",
          avatar:
            "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
          }}
        onSave={onSubmitAppreciationForm}
        onCancel={closeAppreciateModal}
      />

      {/* Warn Modal */}
      <PopUpModal
        title={
          <div className="flex gap-2">
            <AlertIcon />
            <p className="text-primary-color font-medium text-3xl">Alert</p>
          </div>
        }
        open={warnModalOpen}
        width={700}
        wrapClassName="modal-wrapper performance-modal"
        close={closeWarnModal}
        children={
          <Form
            layout="vertical"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 24 }}
          >
            <p className="mb-7 font-medium">Are you sure you want to issue warning letter?</p>

            <Form.Item label={<span className="text-primary-color">Description</span>}>
              <Input.TextArea 
                value={warnEmailData.text} 
                name="description" 
                className="w-full" 
                rows={6} 
                onChange={(e:any) => handleChangeWarn(e)} 
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }} className="flex justify-end">
              <Space align="end" size={20}>
                <Button className="button-secondary" ghost onClick={closeWarnModal}>
                  Cancel
                </Button>
                <Button disabled={warnEmailData.text === ''} loading={loadingWarn} className="button-secondary" onClick={sendEmailReq}>
                  Issue
                </Button>
              </Space>
            </Form.Item>
          </Form>
        }
        footer={false}
      />
    </div>
  );
};

export default PerformanceHistory;
