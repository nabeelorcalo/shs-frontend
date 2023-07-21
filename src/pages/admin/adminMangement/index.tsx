import { useEffect, useState } from "react";
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
} from "antd";
import { CalendarIcon, Success } from "../../../assets/images";
import {
  CommonDatePicker,
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  FiltersButton,
  BoxWrapper,
  Notifications,
} from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { adminSystemAdminState } from "../../../store/adminSystemAdmin";
import dayjs from "dayjs";
import CountryCodeSelect from "../../../components/CountryCodeSelect";
const { Option } = Select;

const statuses: any = {
  true: "#D83A52",
  false: "#3DC475",
  null: '#3DC475',
}

const AdminManagement = () => {
  const action = useCustomHook();
  const pdfHeader = ['Name', 'Email', 'Phone Number', 'Status'];
  const [value, setValue] = useState("");
  const [selectEmail, setSelectEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [openC, setOpenC] = useState(false);
  const [isdate1, setIsDate1] = useState(false);
  const adminSubAdmin = useRecoilState<any>(adminSystemAdminState);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showStudentDropDown, setShowDropDown] = useState(false);
  const [showCompanyDropDown, setShowCompanyDropDown] = useState(false);
  const [showUniversityDropDown, setShowUniversityDropDown] = useState(false);
  const [form1Data, setForm1Data] = useState<any>();
  const [form2Data, setForm2Data] = useState({});
  const [allChecked, setAllChecked] = useState(false);
  const [dashboardChecked, setDashboardChecked] = useState(true);
  const [studentChecked, setStudentChecked] = useState(false);
  const [viewStudentDetailsChecked, setViewStudentDetailsChecked] = useState(false);
  const [studentPasswordResetChecked, setStudentPasswordResetChecked] = useState(false);
  const [companyPasswordResetChecked, setCompanyPasswordResetChecked] = useState(false);
  const [companyChecked, setCompanyChecked] = useState(false);
  const [universityChecked, setUniversityChecked] = useState(false);
  const [universityPasswordChecked, setUniversityPasswordChecked] = useState(false);
  const [delegatesChecked, setDelegatesChecked] = useState(false);
  const [agentManagementChecked, setAgentManagementChecked] = useState(false);
  const [issueManagementChecked, setIssueManagementChecked] = useState(false);
  const [settingChecked, setSettingChecked] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [accessState, setAccessState] = useState('')
  const [form] = Form.useForm();

  const pdfBody = adminSubAdmin[0].map((item: any) =>
    [
      item?.user?.firstName + ' ' + item?.user?.lastName,
      item?.user?.email,
      item?.user?.phoneNumber,
      item?.status,
    ]
  )

  const searchValue = (e: any) => {
    setSearchItem(e);
  };

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
    form.resetFields(); // Use the resetFields method to clear the form
  };

  const onFinishDrawer = (values: any) => {
    const { statusFilters, date } = values;
    let param: any = {}
    if (statusFilters) param['status'] = statusFilters;
    if (date) param['date'] = dayjs(date).format('YYYY-MM-DD');
    action.getSubAdminSUPERADMIN(param)
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
          "viewCompanyDetail": companyChecked
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
      () => action.getSubAdminSUPERADMIN('')
    );
  };

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => <div>{item?.id}</div>,
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
      render: (_: any, item: any) => <div>{item?.user?.phoneCode} {item?.user?.phoneNumber}</div>,
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
              action.getSubAdminSUPERADMIN('')
            }
          )
        }}
      >
        Active
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
              action.getSubAdminSUPERADMIN('')
            }
          )
        }}
      >
        Block
      </Menu.Item>
      <Menu.Item key="2"
        onClick={() => {
          action.forgotpassword({
            email: selectEmail,
          });
          Notifications({
            icon: <Success />,
            title: "Success",
            description: "Account resent link sent successfully",
            type: "success",
          })
        }}
      >
        Password Reset
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    action.getSubAdminSUPERADMIN({ search: searchItem });
  }, [searchItem]);

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
              requireAsButton
              btnIcon={CalendarIcon}
              btnClassName={"h-[48px]"}
              placement="bottomRight"
              open={isdate1}
              setOpen={setIsDate1}
              setValue={(e: any) => handleChangeSelect(e, 'date')}
            />
          </Form.Item>
          <Form.Item
            name='statusFilters'
            label='Status'
          >
            <div className="mt-2">
              <Select
                className="w-[100%]"
                onChange={(e: any) => handleChangeSelect(e, 'statusFilters')}
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </div>
          </Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold"
              onClick={() => {
                handleClearForm()
                setOpenDrawer(false)
                }}
              >
                Reset
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Submit
              </Button>
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
          <SearchBar handleChange={searchValue} />
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
            className="teriary-bg-color white-color text-base font-semibold flex items-center"
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
            <GlobalTable tableData={adminSubAdmin[0]} columns={columns} />
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
          onFinish={(values) => setForm1Data(values)}
          autoComplete="off"
        >
          <Row gutter={10}>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label="First Name" name="firstName">
                <Input
                  placeholder="Enter First Name"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
              <Form.Item label="Last Name" name="lastName">
                <Input
                  placeholder="Enter Last Name"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item label="Email" name="email">
                <Input
                  placeholder="Enter Email"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
            {/* <Row gutter={20} className="flex items-center"> */}
          <Col xxl={6} xl={6} lg={8} md={8} xs={24}>
            <Form.Item name="phoneCode" label="Phone Code" initialValue={"+44"}>
              <CountryCodeSelect />
            </Form.Item>
          </Col>
          <Col xxl={18} xl={18} lg={16} md={16} xs={24}>
            <Form.Item
              name="phoneNumber"
              label=" Phone Number"
              rules={[
                { required: false },
                {
                  pattern: /^[+\d\s()-]+$/,
                  message: "Please enter valid phone number  ",
                },
                {
                  min: 6,
                  message:
                    "Please enter a valid phone number with a minimum of 6 digits",
                },
              ]}
            >
              <Input placeholder="Enter Phone Number" className="text-input-bg-color text-input-color pl-2 text-base" />
            </Form.Item>
          </Col>
        {/* </Row> */}
          </Row>
          <div className="flex justify-end">
            <Button
              key="Cancel"
              className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5 mr-2"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              className="teriary-bg-color border-1 border-solid border-[#4a9d77] white-color pt-0 pb-0 pr-5 pl-5 ml-2"
              onClick={() => {
                setOpen(false);
                setOpenC(true);
              }}
            >
              Next
            </Button>
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
                  onChange={(e) => setAllChecked(e.target.checked)}
                >
                  All
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  checked={dashboardChecked}
                  className="text-base font-normal primary-color"
                  onChange={(e) => setDashboardChecked(e.target.checked)}
                >
                  Dashboard
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <div>
                  <Checkbox
                    className="text-base font-normal primary-color"
                    onClick={handleDropdownClick}
                  // checked={false}
                  // onChange={(e) => setUserManagementChecked(e.target.checked)}
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
                          onChange={(e) => setStudentChecked(e.target.checked)}
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
                                onChange={(e) =>
                                  setViewStudentDetailsChecked(e.target.checked)
                                }
                              >
                                View Student details
                              </Checkbox>
                            </div>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={studentPasswordResetChecked}
                                onChange={(e) =>
                                  setStudentPasswordResetChecked(
                                    e.target.checked
                                  )
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
                          onChange={(e) => setCompanyChecked(e.target.checked)}
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
                                checked={companyChecked}
                                onChange={(e) =>
                                  setCompanyChecked(e.target.checked)
                                }
                              >
                                View Company details
                              </Checkbox>
                            </div>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={companyPasswordResetChecked}
                                onChange={(e) =>
                                  setCompanyPasswordResetChecked(
                                    e.target.checked
                                  )
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
                          onChange={(e) =>
                            setUniversityChecked(e.target.checked)
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
                                onChange={(e) =>
                                  setUniversityChecked(e.target.checked)
                                }
                              >
                                View University Detail
                              </Checkbox>
                            </div>
                            <div className=" p-2 m-3">
                              <Checkbox
                                className="text-base font-normal primary-color"
                                checked={universityPasswordChecked}
                                onChange={(e) =>
                                  setUniversityPasswordChecked(
                                    e.target.checked
                                  )
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
                          onChange={(e) =>
                            setDelegatesChecked(e.target.checked)
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
                  onChange={(e) => setAgentManagementChecked(e.target.checked)}
                >
                  Agent Management
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  className="text-base font-normal primary-color"
                  checked={issueManagementChecked}
                  onChange={(e) => setIssueManagementChecked(e.target.checked)}
                >
                  Issue Management
                </Checkbox>
              </Col>
              <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
                <Checkbox
                  className="text-base font-normal primary-color"
                  checked={settingChecked}
                  onChange={(e) => setSettingChecked(e.target.checked)}
                >
                  Setting
                </Checkbox>
              </Col>
            </Row>
            <div className="flex justify-end pt-3">
              <Button
                key="Cancel"
                className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5 mr-2"
                onClick={() => {
                  setOpenC(false);
                }}
              >
                Cancel
              </Button>
              <Button
                htmlType="submit"
                className="teriary-bg-color border-1 border-solid border-[#4a9d77] white-color pt-0 pb-0 pr-5 pl-5 ml-2"
                onClick={() => {
                  setOpenC(false);
                }}
              >
                Invite
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminManagement;
