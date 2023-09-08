import {
  CloseCircleFilled,
  DownOutlined,
  RightOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
  Space,
  TablePaginationConfig
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Success, WarningIcon } from "../../../assets/images";
import {
  BoxWrapper,
  ButtonThemePrimary,
  ButtonThemeSecondary,
  CommonDatePicker,
  DropDown,
  FiltersButton,
  GlobalTable,
  Notifications,
  PageHeader,
  PopUpModal,
  SearchBar,
} from "../../../components";
import CountryCodeSelect from "../../../components/CountryCodeSelect";
import Drawer from "../../../components/Drawer";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import {
  adminFilterState,
  adminPaginationState,
  adminSystemAdminState
} from "../../../store/adminSystemAdmin";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import usePhoneNumberHook from "../../../helpers/phoneNumber";
import { PhoneInput } from 'react-international-phone';
const { Option } = Select;


const statuses: any = {
  true: "#D83A52",
  false: "#3DC475",
  null: '#3DC475',
}

const AdminManagement = () => {
  const action = useCustomHook();
  const [tableParams, setTableParams]: any = useRecoilState(adminPaginationState);
  const [filter, setFilter] = useRecoilState(adminFilterState);
  const resetList = useResetRecoilState(adminFilterState);
  const resetTableParams = useResetRecoilState(adminPaginationState);
  const pdfHeader = ['Name', 'Email', 'Phone Number', 'Status'];
  const [value, setValue] = useState("");
  const [selectEmail, setSelectEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const adminSubAdmin = useRecoilState<any>(adminSystemAdminState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showStudentDropDown, setShowDropDown] = useState(false);
  const [showCompanyDropDown, setShowCompanyDropDown] = useState(false);
  const [showUniversityDropDown, setShowUniversityDropDown] = useState(false);
  const [form1Data, setForm1Data] = useState<any>();
  const [allChecked, setAllChecked] = useState(false);
  const [dashboardChecked, setDashboardChecked] = useState(true);
  const [studentChecked, setStudentChecked] = useState(false);
  const [viewStudentDetailsChecked, setViewStudentDetailsChecked] = useState(false);
  const [studentPasswordResetChecked, setStudentPasswordResetChecked] = useState(false);
  const [companyPasswordResetChecked, setCompanyPasswordResetChecked] = useState(false);
  const [companyChecked, setCompanyChecked] = useState(false);
  const [companyDetailChecked, setCompanyDetailChecked] = useState(false);
  const [universityChecked, setUniversityChecked] = useState(false);
  const [universityPasswordChecked, setUniversityPasswordChecked] = useState(false);
  const [delegatesChecked, setDelegatesChecked] = useState(false);
  const [agentManagementChecked, setAgentManagementChecked] = useState(false);
  const [issueManagementChecked, setIssueManagementChecked] = useState(false);
  const [userManagementChecked, setUserManagementChecked] = useState(false);
  const [settingChecked, setSettingChecked] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [accessState, setAccessState] = useState('')
  const [phone, setPhone] = useState('');
  const { PhoneValidator} = usePhoneNumberHook();
  const [openDelete, setOpenDelete] = useState(false);
  const [form] = Form.useForm();


  const pdfBody = adminSubAdmin[0].map((item: any) =>
    [
      item?.user?.firstName + ' ' + item?.user?.lastName,
      item?.user?.email,
      item?.user?.phoneNumber,
      item?.status,
    ]
  )

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any, index: any) =>
        <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "name",
      render: (_: any, item: any) => (
        <div>
          {item?.user?.firstName} {item?.user?.lastName}
        </div>
      ),
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "email",
      render: (_: any, item: any) => <div>{item?.user?.email}</div>,
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phoneNumber",
      render: (_: any, item: any) =>
        <div>
          {item?.user?.phoneCode} {item?.user?.phoneNumber}
        </div>,
      key: "phoneNumber",
      title: "Phone Number",
    },
    {
      dataIndex: "date",
      render: (_: any, item: any) => (
        <div>{dayjs(item?.createdAt).format("YYYY-MM-DD")}</div>
      ),
      key: "date",
      title: "Date",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center px-2 py-1 rounded-lg white-color"
          style={{
            backgroundColor: statuses[item?.user?.isBlocked],
          }}
        >
          {item?.user?.isBlocked === true ? 'Inactive' : "Active"}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span onClick={() => {
          setSelectEmail(data?.user?.email)
          setAccessState(data?.user?.email)
        }}>
          <CustomDroupDown menu1={data?.user?.isBlocked ? active : blocked} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const active = (
    <Menu>
      <Menu.Item key="1"
        onClick={() => {
          action.adminAccess({ access: 'active', email: accessState },
            () => {
              fetchSubAdmin()
            })
          Notifications({
            icon: <Success />,
            title: "Success",
            description: "User unblocked successfully",
            type: "success",
          })
        }}
      >
        Unblocked
      </Menu.Item>
      <Menu.Item key="3"
        onClick={() => {
          setOpenDelete(true)
        }}
      >
        Password Reset
      </Menu.Item>
    </Menu>
  );
  const blocked = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          action.adminAccess({ access: 'block', email: accessState },
            () => {
              fetchSubAdmin()
            })
          Notifications({
            icon: <Success />,
            title: "Success",
            description: "User blocked successfully",
            type: "success",
          })
        }}
      >
        Block
      </Menu.Item>
      <Menu.Item key="2"
        onClick={() => setOpenDelete(true)}
      >
        Password Reset
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    fetchSubAdmin()
  }, [searchItem, filter]);

  // to reset page 
  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const searchValue = (e: any) => {
    setSearchItem(e);
    setFilter({ ...filter, page: 1, search: e })
    setTableParams((prevFilter: any) => ({
      ...prevFilter,
      pagination: {
        ...prevFilter.pagination,
        current: 1
      }
    }))
  };

  const fetchSubAdmin = () => {
    action.getSubAdminSUPERADMIN(filter,
      tableParams,
      setTableParams);
  }

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };
  const handleStudentDropdownClick = () => {
    setShowDropDown(!showStudentDropDown);
  };
  const handleCompanyDropdownClick = () => {
    setShowCompanyDropDown(!showCompanyDropDown);
  };
  const handleUniversityDropdownClick = () => {
    setShowUniversityDropDown(!showUniversityDropDown);
  };

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
    console.log(`selected ${value}`);
  };

  const handleClearForm = () => {
    form.resetFields();
    setOpenDrawer(false)
    setFilter({
      page: 1,
      limit: 10,
      date: "",
      search: "",
      status: "",
    })
  };

  const onFinishDrawer = (values: any) => {
    const { statusFilters, date } = values;
    let param: any = {}
    if (statusFilters) param['status'] = statusFilters;
    if (date) param['date'] = dayjs(date).format('YYYY-MM-DD');
    setFilter({ ...filter, page: 1, ...param });
    setOpenDrawer(false)
  }

  const onFinish = (values: any) => {
    const payloadBackend = {
      "all": allChecked,
      "dashboard": dashboardChecked,
      "userManagement": {
        "student": {
          "studentPasswordReset": studentPasswordResetChecked,
          "viewStudentDetail": studentChecked
        },
        "company": {
          "companyPasswordReset": companyPasswordResetChecked,
          "viewCompanyDetail": companyDetailChecked
        },
        "univeristy": {
          "universityPasswordReset": universityPasswordChecked,
          "viewUniversityDetail": universityChecked
        },
        "delegates": delegatesChecked
      },
      "agentManagement": agentManagementChecked,
      "issueManagement": issueManagementChecked,
      "setting": settingChecked,
      "firstName": form1Data?.firstName,
      "lastName": form1Data?.lastName,
      "email": form1Data?.email,
      "phoneCode": form1Data?.phoneCode,
      "phoneNumber": form1Data?.phoneNumber
    }
    setOpenC(false);
    action.addAdminSystemAdmin(payloadBackend,
      () => action.getSubAdminSUPERADMIN(
        { search: searchItem },
        tableParams,
        setTableParams
      )
    );
  };

  const passwordResetHandler = () => {
    setOpenDelete(false)
    action.forgotpassword({
      email: selectEmail,
    });
  }

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <div className="admin-management">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
        <Form
          layout="vertical"
          onFinish={onFinishDrawer}
          form={form}
        >
          <Form.Item label="Date" name="date">
            <CommonDatePicker
              name="date"
              open={openDate}
              setOpen={setOpenDate}
              setValue={(e: any) => {
                handleChangeSelect(e, 'date')
                setFilter({ ...filter, page: 1 })
                setTableParams((prevFilter: any) => ({
                  ...prevFilter,
                  pagination: {
                    ...prevFilter.pagination,
                    current: 1
                  }
                }))
              }}
            />
          </Form.Item>
          <Form.Item
            name='statusFilters'
            label='Status'
          >
            <div className="mt-2">
              <Select
                defaultValue='Select'
                className="w-[100%]"
                onChange={(e: any) => {
                  handleChangeSelect(e, 'statusFilters')
                  setFilter({ ...filter, page: 1 })
                  setTableParams((prevFilter: any) => ({
                    ...prevFilter,
                    pagination: {
                      ...prevFilter.pagination,
                      current: 1
                    }
                  }))
                }}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
            </div>
          </Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <ButtonThemeSecondary
                onClick={() => handleClearForm()}
              >
                Reset
              </ButtonThemeSecondary>
              <ButtonThemePrimary
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Apply
              </ButtonThemePrimary>
            </Space>
          </div>
        </Form>
      </Drawer>
      <Row>
        <Col xs={24}>
          <PageHeader title="Admin Management" bordered={true} />
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} placeholder="Search by person name" />
        </Col>
        <Col
          xl={18}
          lg={15}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col justify-end gap-4"
        >
          <FiltersButton label="Filter" onClick={() => setOpenDrawer(true)} />
          <div className="w-25 download-btn">
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              value={value}
              setValue={(val: any) => {
                action.downloadPdfOrCsv(val, pdfHeader, adminSubAdmin[0].map((item: any) => {
                  return {
                    name: item?.user?.firstName + ' ' + item?.user?.lastName,
                    title: item?.user?.email,
                    Phone: item?.user?.phoneNumber,
                    status: item?.status,
                  }
                }
                ), 'Admin Data', pdfBody)
              }}
            />
          </div>
          <Button
            className="teriary-bg-color white-color hover:white-color text-base font-semibold flex items-center "
            onClick={() => {
              setOpen(true);
            }}
          >
            <UserAddOutlined className="text-base font-semibold" />
            Add User
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24} className="my-2">
          <BoxWrapper>
            {/* <GlobalTable tableData={adminSubAdmin[0]} columns={columns} /> 
            */}
            <GlobalTable
              columns={columns}
              tableData={adminSubAdmin[0]}
              pagination={tableParams?.pagination}
              handleTableChange={handleTableChange}
              pagesObj={action.paginationObject}

            />
          </BoxWrapper>
        </Col>
      </Row>
      <Modal
        open={open}
        closeIcon={<CloseCircleFilled
          onClick={() => {
            setOpen(false);
          }}
          className="text-teriary-color text-xl" />}
        footer={null}
        title="Add User"
        width={570}
        centered
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={(values) => {
            setForm1Data(values)
            setOpen(false);
            setOpenC(true);
          }}
          autoComplete="off"
        >
          <Row gutter={10}>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input
                  placeholder="Enter First Name"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input
                  placeholder="Enter Last Name"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true }, { type: "email" }]}
              >
                <Input
                  placeholder="Enter Email"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              className={ phone ? 'phone-input' : 'phone-input-error'}
              rules={[
                {
                  validator: (_, value) => PhoneValidator(phone, value)
                }
              ]}
            >
              <PhoneInput
                value={phone}
                className="w-auto"
                defaultCountry="pk"
                // placeholder="+92 312-9966188"
                // disableDialCodePrefill
                onChange={(phone: string, country: any) => {setPhone(phone)}}
                />
                </Form.Item>
            </Col>
          </Row>
          <div className="flex justify-end gap-3">
            <ButtonThemeSecondary
              onClick={() => setOpen(false)}
            >
              Cancel
            </ButtonThemeSecondary>
            <ButtonThemePrimary
              htmlType="submit"
            >
              Next
            </ButtonThemePrimary>
          </div>
        </Form>
      </Modal>
      <Modal
        open={openC}
        closeIcon={
          <CloseCircleFilled
            className="text-teriary-color text-xl"
            onClick={() => {
              setOpenC(false);
            }}
          />
        }
        footer={null}
        title="Permission"
        centered
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <div className="h-[36vh] overflow-y-scroll overflow-x-hidden">
            <Row gutter={[5, 20]}>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  checked={allChecked}
                  className="text-base font-normal primary-color"
                  onChange={(e) => {
                    setAllChecked(e.target.checked)
                    setDashboardChecked(e.target.checked)
                    setStudentChecked(e.target.checked)
                    setViewStudentDetailsChecked(e.target.checked)
                    setStudentPasswordResetChecked(e.target.checked)
                    setCompanyChecked(e.target.checked)
                    setCompanyDetailChecked(e.target.checked)
                    setCompanyPasswordResetChecked(e.target.checked)
                    setUniversityChecked(e.target.checked)
                    setUniversityPasswordChecked(e.target.checked)
                    setDelegatesChecked(e.target.checked)
                    setAgentManagementChecked(e.target.checked)
                    setIssueManagementChecked(e.target.checked)
                    setSettingChecked(e.target.checked)
                    setUserManagementChecked(e.target.checked)
                  }
                  }
                >
                  All
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  checked={dashboardChecked}
                  className="text-base font-normal primary-color"
                  onChange={(e) => {
                    setDashboardChecked(e.target.checked)
                    if (!e.target.checked) {
                      setAllChecked(false)
                    }
                  }
                  }
                >
                  Dashboard
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div>
                  <Checkbox
                    className="text-base font-normal primary-color"
                    checked={userManagementChecked}
                    onClick={handleDropdownClick}
                    onChange={(e) => {
                      setUserManagementChecked(e.target.checked)
                      if (!e.target.checked) {
                        setAllChecked(false)
                      }
                    }
                    }
                  >
                    User Management
                    {showDropdown ? <DownOutlined /> : <RightOutlined />}
                  </Checkbox>
                  {showDropdown && (
                    <div className="m-3">
                      <div className=" p-2 m-3">
                        <Checkbox
                          onClick={handleStudentDropdownClick}
                          className="text-base font-normal primary-color"
                          checked={studentChecked}
                          onChange={(e) => {
                            setStudentChecked(e.target.checked)
                            if (!e.target.checked) {
                              setAllChecked(false)
                            }
                          }}
                        >
                          Student
                          {showStudentDropDown ? (
                            <DownOutlined />
                          ) : (
                            <RightOutlined />
                          )}
                        </Checkbox>
                        {showStudentDropDown && (
                          <>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={viewStudentDetailsChecked}
                                onChange={(e) => {
                                  setViewStudentDetailsChecked(e.target.checked)
                                  if (!e.target.checked) {
                                    setAllChecked(false)
                                  }
                                }
                                }
                              >
                                View Student details
                              </Checkbox>
                            </div>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={studentPasswordResetChecked}
                                onChange={(e) => {
                                  setStudentPasswordResetChecked(e.target.checked)
                                  if (!e.target.checked) {
                                    setAllChecked(false)
                                  }
                                }
                                }
                              >
                                Student Password Reset
                              </Checkbox>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="p-2 m-3">
                        <Checkbox
                          onClick={handleCompanyDropdownClick}
                          className="text-base font-normal primary-color"
                          checked={companyChecked}
                          onChange={(e) => {
                            setCompanyChecked(e.target.checked)
                            if (!e.target.checked) {
                              setAllChecked(false)
                            }
                          }}
                        >
                          Company {showCompanyDropDown ? (
                            <DownOutlined />
                          ) : (
                            <RightOutlined />
                          )}
                        </Checkbox>
                        {showCompanyDropDown && (
                          <>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={companyDetailChecked}
                                onChange={(e) => {
                                  setCompanyDetailChecked(e.target.checked)
                                  if (!e.target.checked) {
                                    setAllChecked(false)
                                  }
                                }
                                }
                              >
                                View Company details
                              </Checkbox>
                            </div>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={companyPasswordResetChecked}
                                onChange={(e) => {
                                  setCompanyPasswordResetChecked(e.target.checked)
                                  if (!e.target.checked) {
                                    setAllChecked(false)
                                  }
                                }
                                }
                              >
                                Company Password Reset
                              </Checkbox>
                            </div>
                          </>
                        )}
                      </div>
                      <div className=" p-2 m-3">
                        <Checkbox
                          onClick={handleUniversityDropdownClick}
                          className="text-base font-normal primary-color"
                          checked={universityChecked}
                          onChange={(e) => {
                            setUniversityChecked(e.target.checked)
                            if (!e.target.checked) {
                              setAllChecked(false)
                            }
                          }
                          }
                        >
                          University {showUniversityDropDown ? (
                            <DownOutlined />
                          ) : (
                            <RightOutlined />
                          )}
                        </Checkbox>
                        {showUniversityDropDown && (
                          <>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={universityChecked}
                                onChange={(e) => {
                                  setUniversityChecked(e.target.checked)
                                  if (!e.target.checked) {
                                    setAllChecked(false)
                                  }
                                }
                                }
                              >
                                View University Detail
                              </Checkbox>
                            </div>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={universityPasswordChecked}
                                onChange={(e) => {
                                  setUniversityPasswordChecked(e.target.checked)
                                  if (!e.target.checked) {
                                    setAllChecked(false)
                                  }
                                }
                                }
                              >
                                University Password Reset
                              </Checkbox>
                            </div>
                          </>
                        )}
                      </div>
                      <div className=" p-2 m-3">
                        <Checkbox
                          className="text-base font-normal primary-color"
                          checked={delegatesChecked}
                          onChange={(e) => {
                            setDelegatesChecked(e.target.checked)
                            if (!e.target.checked) {
                              setAllChecked(false)
                            }
                          }
                          }
                        >
                          Delegates
                        </Checkbox>
                      </div>
                    </div>
                  )}
                </div>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  className="text-base font-normal primary-color"
                  checked={agentManagementChecked}
                  onChange={(e) => {
                    setAgentManagementChecked(e.target.checked)
                    if (!e.target.checked) {
                      setAllChecked(false)
                    }
                  }
                  }
                >
                  Agent Management
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  className="text-base font-normal primary-color"
                  checked={issueManagementChecked}
                  onChange={(e) => {
                    setIssueManagementChecked(e.target.checked)
                    if (!e.target.checked) {
                      setAllChecked(false)
                    }
                  }
                  }
                >
                  Issue Management
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  className="text-base font-normal primary-color"
                  checked={settingChecked}
                  onChange={(e) => {
                    setSettingChecked(e.target.checked)
                    if (!e.target.checked) {
                      setAllChecked(false)
                    }
                  }
                  }
                >
                  Setting
                </Checkbox>
              </Col>
            </Row>
            <div className="flex justify-end pt-3 gap-3">
              <ButtonThemeSecondary
                onClick={() => {
                  setOpenC(false);
                }}
              >
                Cancel
              </ButtonThemeSecondary>
              <ButtonThemePrimary
                htmlType="submit"
                onClick={() => {
                  setOpenC(false);
                }}
              >
                Invite
              </ButtonThemePrimary>
            </div>
          </div>
        </Form>
      </Modal>
      <PopUpModal
        open={openDelete}
        width={500}
        close={() => setOpenDelete(false)}
        children={
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><WarningIcon /></div>
              <div><h2>Reset Password</h2></div>
            </div>
            <p>Are you sure to generate reset the password request</p>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <ButtonThemeSecondary
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </ButtonThemeSecondary>
            <ButtonThemePrimary
              onClick={passwordResetHandler}
            >
              Reset
            </ButtonThemePrimary>
          </div>
        }
      />
    </div>
  );
};

export default AdminManagement;
