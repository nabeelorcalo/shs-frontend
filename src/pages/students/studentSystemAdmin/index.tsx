import { useEffect, useState } from "react";
import {
  GlobalTable,
  SearchBar,
  PageHeader,
  BoxWrapper,
  InternsCard,
  FiltersButton,
  DropDown,
  StageStepper,
  DrawerWidth,
  TextArea,
  PopUpModal,
  Notifications,
  Alert,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import { WarningIcon, More, Success } from "../../../assets/images";
import { Button, Menu, MenuProps, Select, Form } from "antd";
import { Dropdown, Avatar } from "antd";
import Drawer from "../../../components/Drawer";
import useCustomHook from "./actionHandler";
import "../../../scss/global-color/Global-colors.scss";
import "./style.scss";
import { useRecoilState } from "recoil";
import { studentSystemAdminState } from "../../../store/studentSystemAdmin";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import city from "../../../citylist.json";
import { LoadingOutlined } from "@ant-design/icons";
const { Option } = Select;

const statuses: any = {
  true: "#D83A52",
  false: "#3DC475",
  null: "#3DC475",
};

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const StudentSystemAdmin = () => {
  const navigate = useNavigate();
  const action = useCustomHook();
  const [value, setValue] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectEmail, setSelectEmail] = useState("");
  const [stuId, setStuId] = useState();
  const [showStageStepper, setShowStageStepper] = useState(false);
  const [listandgrid, setListandgrid] = useState(false);
  const studentSubAdmin = useRecoilState<any>(studentSystemAdminState);
  const [searchItem, setSearchItem] = useState("");
  const [accessState, setAccessState] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const searchValue = (e: any) => {
    setSearchItem(e);
  };
  const [form] = Form.useForm();

  const pdfHeader = [
    "Name",
    "Email",
    "Phone Number",
    "University",
    "City",
    "Hired",
    "Status",
  ]
  const pdfBody = studentSubAdmin[0].map((item: any) =>
    [
      item?.firstName + ' ' + item?.lastName,
      item?.email,
      item?.phoneNumber,
      item?.userUniversity?.university?.name,
      item?.city,
      item?.hired === true ? 'Yes' : 'No',
      item?.isBlocked === true ? 'InActive' : 'Active',
    ]
  )

  const handleClearForm = () => {
    form.resetFields();
    setShowDrawer(false);
    fetchSubStudent();
  };

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value,
    });
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  }

  const onFinish = (values: any) => {
    const { typeFilter, statusFilter, cityFilter } = values;
    let param: any = {};
    if (statusFilter) param["status"] = statusFilter;
    if (typeFilter) param["stage"] = typeFilter;
    if (cityFilter) param["city"] = cityFilter;
    action.getSubAdminStudent(param);
    setShowDrawer(false);
  };

  const mainDrawerWidth = DrawerWidth();

  useEffect(() => {
    fetchSubStudent()
  }, [searchItem]);

  const fetchSubStudent = () => {
    action.getSubAdminStudent({ search: searchItem });
  }

  const passwordResetHandler = () => {
    setOpenDelete(false)
    action.forgotpassword({
      email: selectEmail,
    });
  }

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any, index:any) => <div>{index + 1 || 'N/A'}</div>,
      key: "no",
      title: "Sr.No",
    },
    {
      dataIndex: "name",
      render: (_: any, item: any) => (
        <div>
          {item?.firstName || 'N/A'} {item?.lastName || 'N/A'}
        </div>
      ),
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "email",
      render: (_: any, item: any) => (
        <div>
          {item?.email || 'N/A'}
        </div>
      ),
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_number",
      render: (_: any, item: any) => (
        <div>
          {item?.phoneCode} {item?.phoneNumber || 'N/A'}
        </div>
      ),
      key: "phone_number",
      title: "Phone Number",
    },
    {
      dataIndex: "university",
      render: (_: any, item: any) => (
        <div>
          {item?.university || 'N/A'}
        </div>
      ),
      key: "university",
      title: "University",
    },
    {
      dataIndex: "city",
      render: (_: any, item: any) => (
        <div>
          {item?.city || 'N/A'}
        </div>
      ),
      key: "city",
      title: "City",
    },
    {
      dataIndex: "hired",
      render: (_: any, item: any) => <div>{item?.hired === true ? "Yes" : "No" || 'N/A'}</div>,
      key: "hired",
      title: "Hired",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color px-2 py-1 rounded-lg"
          style={{
            backgroundColor: statuses[item?.isBlocked],
          }}
        >
          {item?.isBlocked === true ? 'In Active' : "Active" || 'N/A'}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span onClick={() => {
          setSelectEmail(data?.email)
          setAccessState(data?.email)
          setStuId(data?.id)
        }}>
          <CustomDroupDown menu1={data?.isBlocked ? active : blocked} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const active = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          action.studentAccess({ access: "active", email: accessState }, () => {
            fetchSubStudent()
          });
          Notifications({
            icon: <Success />,
            title: "Success",
            description: "User unblocked successfully",
            type: "success",
          })
        }}
      >
        Unblock
      </Menu.Item>
      <Menu.Item key="2"
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
          action.getProfile(stuId);
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          action.studentAccess({ access: "block", email: accessState }, () => {
            fetchSubStudent()
          });
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
      <Menu.Item
        key="3"
        onClick={() => {
          setOpenDelete(true)
        }}
      >
        Password Reset
      </Menu.Item>
    </Menu>
  );
  return (
    <>
      <PageHeader title="Students" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar handleChange={searchValue} placeholder="Search by person name" />
          </div>
          <div className="flex flex-row gap-4">
            <FiltersButton
              label="Filters"
              onClick={() => {
                setShowDrawer(true);
              }}
            />
            <DropDown
              options={["pdf", "excel"]}
              value={value}
              requiredDownloadIcon
              setValue={(val: any) => {
                action.downloadPdfOrCsv(val,
                  pdfHeader,
                  studentSubAdmin[0].map((item: any) => {
                    return {
                      name: item?.firstName + ' ' + item?.lastName,
                      title: item?.email,
                      Phone: item?.phoneNumber,
                      university: item?.university,
                      city: item?.city,
                      hired: item.hired === true ? 'Yes' : 'No',
                      status: item?.isBlocked === true ? 'Inactive' : 'Active',
                    }
                  }
                  ), 'Student Data', pdfBody)
              }}
            />
            <Drawer
              closable
              open={showDrawer}
              onClose={() => {
                setShowDrawer(false);
              }}
              title="Filters"
            >
              <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item label="Type" name="typeFilter">
                  <Select
                    placeholder="Select"
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, "typeFilter")}
                  >
                    <Option value="hired">Hired</Option>
                    <Option value="notHired">Not Hired</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Status" name="statusFilter">
                  <Select
                    placeholder="Select"
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, "statusFilter")}
                  >
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="City" name="cityFilter">
                  <Select
                    defaultValue="Select"
                    className="w-[100%]"
                    onSearch={onSearch}
                    showSearch
                    onChange={(e: any) => handleChangeSelect(e, "cityFilter")}
                  >
                    {city?.map((item: any, i: any) => {
                      return (
                        <Option key={i} value={item?.city}>
                          {item?.city}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <div className="flex flex-row gap-3 justify-end">
                  <Button
                    type="default"
                    size="middle"
                    className="button-default-tertiary"
                    onClick={() => handleClearForm()}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    size="middle"
                    className="button-tertiary"
                    htmlType="submit"
                  >
                    Apply
                  </Button>
                </div>
              </Form>
            </Drawer>
            <Drawer
              closable
              width={
                mainDrawerWidth > 1400
                  ? 1000
                  : mainDrawerWidth > 900
                    ? 900
                    : mainDrawerWidth > 576
                      ? 600
                      : 300
              }
              open={showStageStepper}
              onClose={() => {
                setShowStageStepper(false);
              }}
            >
              <StageStepper />
            </Drawer>
          </div>
        </div>
        <BoxWrapper>
          <div className="pt-3">
            {listandgrid ? (
              <div className="flex flex-row flex-wrap gap-6">
                {cardDummyArray.map((items: any, idx: any) => {
                  return <InternsCard />;
                })}
              </div>
            ) : (
              <GlobalTable
                columns={columns}
                hideTotal
                pagination={true}
                tableData={studentSubAdmin[0]}
              />
            )}
          </div>
        </BoxWrapper>
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
              <Button
                type="default"
                size="middle"
                className="button-default-tertiary max-sm:w-full"
                onClick={() => setOpenDelete(false)}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                size="middle"
                className="button-tertiary max-sm:w-full"
                onClick={passwordResetHandler}
              >
                Reset
              </Button>
            </div>
          }
        />
      </div>
    </>
  );
};

export default StudentSystemAdmin;
