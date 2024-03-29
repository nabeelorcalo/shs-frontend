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
  PopUpModal,
  Notifications,
  ButtonThemeSecondary,
  ButtonThemePrimary,
} from "../../../components";
import { useNavigate } from "react-router-dom";
import { Success, WarningIcon } from "../../../assets/images";
import {
  Button,
  Menu,
  Form,
  Select,
  Space,
  TablePaginationConfig
} from "antd";
import Drawer from "../../../components/Drawer";
import useCustomHook from "./actionHandler";
import "../../../scss/global-color/Global-colors.scss";
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  companySystemAdminState,
  systemCompanyFilterState,
  systemCompanyPaginationState
} from "../../../store/companySystemAdmin";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import city from "../../../citylist.json";
const { Option } = Select;

const statuses: any = {
  true: "#D83A52",
  false: "#3DC475",
  null: "#3DC475",
};

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CompaniesSystemAdmin = () => {
  const navigate = useNavigate();
  const [tableParams, setTableParams]: any = useRecoilState(systemCompanyPaginationState);
  const [filter, setFilter] = useRecoilState(systemCompanyFilterState);
  const resetList = useResetRecoilState(systemCompanyFilterState);
  const resetTableParams = useResetRecoilState(systemCompanyPaginationState);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showStageStepper, setShowStageStepper] = useState(false);
  const [listandgrid, setListandgrid] = useState(false);
  const companySubAdmin = useRecoilState<any>(companySystemAdminState);
  const [selectEmail, setSelectEmail] = useState("");
  const [compId, setCompId] = useState();
  const [value, setValue] = useState("");
  const [accessState, setAccessState] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const action = useCustomHook();
  const [searchItem, setSearchItem] = useState("");
  const [form] = Form.useForm();

  const pdfHeader = [
    "Company Name",
    "Company Admin",
    "Email",
    "Phone Number",
    "Address",
    "Status",
  ];

  const pdfBody = companySubAdmin[0].map((item: any) => [
    item?.businessName,
    item?.admin?.firstName + " " + item?.admin?.lastName,
    item?.admin?.email,
    item?.admin?.phoneNumber,
    item?.address,
    item?.status,
  ]);

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
      title: "Sr.No",
    },
    {
      dataIndex: "company_name",
      render: (_: any, item: any) => <div>{item?.businessName || 'N/A'}</div>,
      key: "company_name",
      title: "Company Name",
    },
    {
      dataIndex: "company_admin",
      render: (_: any, item: any) => (
        <div>
          {item?.admin?.firstName || 'N/A'} {item?.admin?.lastName || 'N/A'}
        </div>
      ),
      key: "company_admin",
      title: "Company Admin",
    },
    {
      dataIndex: "email",
      render: (_: any, item: any) => <div>{item?.admin?.email || 'N/A'}</div>,
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_number",
      render: (_: any, item: any) =>
        <div>
          {item?.admin?.phoneCode} {item?.admin?.phoneNumber || 'N/A'}
        </div>,
      key: "phone_number",
      title: "Phone Number",
    },
    {
      dataIndex: "address",
      render: (_: any, item: any) => <div>{item?.address || 'N/A'}</div>,
      key: "address",
      title: "Address",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center px-2 py-1 rounded-lg white-color"
          style={{
            backgroundColor: statuses[item?.admin?.isBlocked],
          }}
        >
          {item?.admin?.isBlocked === true ? "Blocked" : "Active" || 'N/A'}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span
          onClick={() => {
            setCompId(data?.id);
            setSelectEmail(data?.admin?.email);
            setAccessState(data?.admin?.email);
          }}
        >
          <CustomDroupDown menu1={data?.admin?.isBlocked ? active : blocked} />
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
          action.adminAccess({ access: "active", email: accessState }, () => {
            fetchSubCompany();
          });
          Notifications({
            icon: <Success />,
            title: "Success",
            description: "Company unblocked successfully",
            type: "success",
          });
        }}
      >
        Unblock
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => {
          setOpenDelete(true);
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
          navigate(`${ROUTES_CONSTANTS.COMPANIES_DETAIL}/${compId}`);
        }}
      >
        View Detail
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          action.adminAccess({ access: "block", email: accessState }, () => {
            fetchSubCompany();
          });
          Notifications({
            icon: <Success />,
            title: "Success",
            description: "Company blocked successfully",
            type: "success",
          });
        }}
      >
        Block
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setOpenDelete(true)}>
        Password Reset
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    fetchSubCompany();
  }, [searchItem, filter]);

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

  const fetchSubCompany = () => {
    action.getSubAdminCompany(
      filter,
      tableParams,
      setTableParams);
  };

  const handleClearForm = () => {
    form.resetFields();
    setShowDrawer(false);
    setFilter({
      page: 1,
      limit: 10,
      city: "",
      search: "",
      status: "",
    })
  };

  const onFinish = (values: any) => {
    const { cityFilter, statusFilter } = values;
    let param: any = {};
    if (statusFilter) param["status"] = statusFilter;
    if (cityFilter) param["city"] = cityFilter;
    setFilter({ ...filter, page: 1, ...param })
    setShowDrawer(false);
  };

  const mainDrawerWidth = DrawerWidth();

  const passwordResetHandler = () => {
    setOpenDelete(false);
    action.forgotpassword({
      email: selectEmail,
    });
  };

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value,
    });
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
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
    <>
      <PageHeader title="Companies" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar
              handleChange={searchValue}
              placeholder="Search by person name"
            />
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
              requiredDownloadIcon
              value={value}
              setValue={(val: any) => {
                action.downloadPdfOrCsv(
                  val,
                  pdfHeader,
                  companySubAdmin[0].map((item: any) => {
                    return {
                      name: item?.businessName,
                      contactperson:
                        item?.admin?.firstName + " " + item?.admin?.lastName,
                      email: item?.admin?.email,
                      phoneNumber: item?.admin?.phoneNumber,
                      address: item?.address,
                      status: item?.status,
                    };
                  }),
                  "Company Data",
                  pdfBody
                );
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
                <Form.Item label="Status" name="statusFilter">
                  <Select
                    defaultValue="Select"
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, "statusFilter")}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
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
                        <option key={i} value={item?.city}>
                          {item?.city}
                        </option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <div className="flex justify-center sm:justify-end">
                  <Space>
                    <ButtonThemeSecondary
                      onClick={() => handleClearForm()}
                    >
                      Reset
                    </ButtonThemeSecondary>
                    <ButtonThemePrimary
                      htmlType="submit"
                    >
                      Apply
                    </ButtonThemePrimary>
                  </Space>
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
                tableData={companySubAdmin[0]}
                columns={columns}
                pagination={tableParams?.pagination}
                handleTableChange={handleTableChange}
                pagesObj={action.companyPaginationObject}
              />
            )}
          </div>
        </BoxWrapper>
      </div>
      <PopUpModal
        open={openDelete}
        width={500}
        close={() => setOpenDelete(false)}
        children={
          <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center gap-3">
              <div>
                <WarningIcon />
              </div>
              <div>
                <h2>Reset Password</h2>
              </div>
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
    </>
  );
};

export default CompaniesSystemAdmin;
