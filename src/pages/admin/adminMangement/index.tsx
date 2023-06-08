import { useEffect, useState } from "react";
import {
  CloseCircleFilled,
  DownOutlined,
  EllipsisOutlined,
  RightOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
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
import { CalendarIcon } from "../../../assets/images";
import {
  CommonDatePicker,
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  FiltersButton,
  BoxWrapper,
} from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { adminSystemAdminState } from "../../../store/adminSystemAdmin";
import dayjs from "dayjs";

const tableData = [
  {
    Actions: "fffff",
    date: "23/09/2022",
    status: "Active",
    email: "anablack@gmail.com",
    phoneNumber: "0333333333",
    name: "Natwest Group",
    no: "01",
  },
  {
    Actions: "fffff",
    date: "23/09/2022",
    status: "Active",
    phoneNumber: "0333333333",
    email: "anablack@gmail.com",
    no: "02",
    name: "Natwest Group",
  },
  {
    Actions: (
      <div>
        <EllipsisOutlined />
      </div>
    ),
    date: "23/09/2022",
    status: "Inactive",
    phoneNumber: "0333333333",
    email: "anablack@gmail.com",
    no: "03",
    name: "Natwest Group",
  },
];

const cities = [
  { value: "London", label: "London" },
  { value: "Lacaster", label: "Lacaster" },
  { value: "Birmingham", label: "Birmingham" },
  { value: "Glassgow", label: "Glassgow" },
];

const statuses: any = {
  'Pending': "#FFC15D",
  'ACTIVE': '#3DC475',
  'inACTIVE': '#D83A52',
}

const AdminManagement = () => {
  const action = useCustomHook();
  const [value, setValue] = useState("");
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
  const [userManagementChecked, setUserManagementChecked] = useState({});
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

  const handleChangeSelect = (value: string) => {
    `selected ${value}`;
  };

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
          "viewCompanyDetail":companyChecked
        },
        "univeristy": {
          "universityPasswordReset": universityPasswordChecked,
          "viewUniversityDetail":universityChecked
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
    action.addAdminSystemAdmin(
      payloadBackend
    );
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  const searchValue = () => { };
  const csvColum = ["No.", "Name", "Email", "Phone Number", "Date", "Status"];

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
      render: (_: any, item: any) => <div>{item?.user?.phoneNumber}</div>,
      key: "phoneNumber",
      title: "Phone Number",
    },
    {
      dataIndex: "date",
      render: (_: any, item: any) => (
        <div>{dayjs(item?.createdAt).format("DD/MM/YY")}</div>
      ),
      key: "date",
      title: "Date",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor: statuses[item?.status],
            padding: " 2px 3px 2px 3px",
            borderRadius:"8px"
          }}
        >
          {item?.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span>
          <CustomDroupDown menu1={menu2} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item key="2">Blocked</Menu.Item>
      <Menu.Item key="3">
        <a href="create-password">Password Reset</a>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    action.getSubAdminSUPERADMIN();
  }, []);

  return (
    <div className="admin-management">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Status" name="status">
            <CommonDatePicker
              requireAsButton
              btnIcon={CalendarIcon}
              btnClassName={"h-[48px]"}
              placement="bottomRight"
              open={isdate1}
              setOpen={setIsDate1}
              setValue={setValue}
            />
          </Form.Item>
          <div className="mb-6">
            <label>City</label>
            <div className="mt-2">
              <Select
                className="w-[100%]"
                defaultValue="Select"
                onChange={handleChangeSelect}
                options={cities}
              />
            </div>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
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
              setValue={() => {
                action.downloadPdfOrCsv(
                  event,
                  csvColum,
                  tableData,
                  "Admin Management Detail"
                );
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
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item label="Phone Number" name="phoneCode">
                <Input
                  placeholder="Enter Phone Code"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input
                  placeholder="Enter Phone Number"
                  size="large"
                  className="text-input-bg-color text-input-color pl-2 text-base"
                />
              </Form.Item>
            </Col>
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
