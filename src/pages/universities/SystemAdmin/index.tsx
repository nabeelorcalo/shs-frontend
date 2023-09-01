import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Menu,
  Row,
  Space,
  Select,
  TablePaginationConfig
} from "antd";
import {
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  FiltersButton,
  PopUpModal,
  Notifications,
  BoxWrapper,
  ButtonThemeSecondary,
  ButtonThemePrimary
} from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  systemUniFilterState,
  systemUniPaginationState,
  universitySystemAdminState
} from "../../../store";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { Success, WarningIcon } from "../../../assets/images";
import city from "../../../citylist.json";
const { Option } = Select;

const statuses: any = {
  true: "#D83A52",
  false: "#3DC475",
}

const UniveristyMain = () => {
  const action = useCustomHook()
  const navigate = useNavigate();
  const [tableParams, setTableParams]: any = useRecoilState(systemUniPaginationState);
  const [filter, setFilter] = useRecoilState(systemUniFilterState);
  const resetList = useResetRecoilState(systemUniFilterState);
  const resetTableParams = useResetRecoilState(systemUniPaginationState);
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const universitySubAdmin = useRecoilState<any>(universitySystemAdminState);
  const [searchItem, setSearchItem] = useState('');
  const [selectEmail, setSelectEmail] = useState('');
  const [uniId, setUniId] = useState();
  const [accessState, setAccessState] = useState('')
  const [openDelete, setOpenDelete] = useState(false);
  const [form] = Form.useForm();

  const pdfHeader = [
    "Name",
    "Contact Person",
    "Email",
    "Intern Count",
    "Phone Number",
    "Address",
    "Status",
  ]
  const pdfBody = universitySubAdmin[0].map((item: any) =>
    [
      item?.university?.name,
      item?.contact?.firstName + ' ' + item?.contact?.lastName,
      item?.university?.email,
      item?.internCount,
      item?.university?.phoneNumber,
      item?.university?.address,
      item?.university?.status
    ]
  )

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any, index: any) => (
        <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>
      ),
      key: "no",
      title: "Sr. No",
    },
    {
      dataIndex: "universityName",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.name || 'N/A'}
        </div>
      ),
      key: "universityName",
      title: " University Name",
    },
    {
      dataIndex: "contactPerson",
      render: (_: any, item: any) => (
        <div>
          {item?.contact?.firstName || 'N/A'} {item?.contact?.lastName || 'N/A'}
        </div>
      ),
      key: "constactPerson",
      title: " Contact Person",
    },
    {
      dataIndex: "Email",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.email || 'N/A'}
        </div>
      ),
      key: "Email",
      title: "Email",
    },
    {
      dataIndex: "noOfInterns",
      render: (_: any, item: any) => (
        <div>
          {item?.internCount || 'N/A'}
        </div>
      ),
      key: "noOfInterns",
      title: "No. of Interns",
    },
    {
      dataIndex: "PhoneNumber",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.phoneCode}  {item?.university?.phoneNumber || 'N/A'}
        </div>
      ),
      key: "PhoneNumber",
      title: "Phone Number",
    },
    {
      dataIndex: "address",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.address || 'N/A'}
        </div>
      ),
      key: "address",
      title: "Address",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center px-2 py-1 rounded-lg white-color"
          style={{
            backgroundColor: statuses[item?.contact?.isBlocked],
          }}
        >
          {item?.contact?.isBlocked === true ? 'Blocked' : 'Active' || 'N/A'}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span onClick={() => {
          setSelectEmail(data?.contact?.email)
          setAccessState(data?.contact?.email)
          setUniId(data?.id)
        }}>
          <CustomDroupDown menu1={data?.contact?.isBlocked ? active : blocked} />
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
              fetchSubUniversity()
            })
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
        onClick={() => navigate(`/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}/${uniId}`)}
        key="1"
      >
        View Details
      </Menu.Item>
      <Menu.Item key="2"
        onClick={() => {
          action.adminAccess({ access: 'block', email: accessState },
            () => {
              fetchSubUniversity()
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
      <Menu.Item key="3"
        onClick={() => {
          setOpenDelete(true)
        }}
      >
        Password Reset
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    fetchSubUniversity()
  }, [searchItem, filter])

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

  const fetchSubUniversity = () => {
    action.getSubAdminUniversity(filter, tableParams, setTableParams)
  }

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log('search:', value);
  }

  const handleClearForm = () => {
    form.resetFields();
    setFilter({
      page: 1,
      limit: 10,
      city: "",
      search: "",
      status: "",
    })
    setOpenDrawer(false)
  };

  const onFinish = (values: any) => {
    setTableParams((prevFilter: any) => ({
      ...prevFilter,
      pagination: {
        ...prevFilter.pagination,
        current: 1
      }
    }))
    const { cityFilter, statusFilter } = values;
    let param: any = {}
    if (statusFilter) param['status'] = statusFilter;
    if (cityFilter) param['city'] = cityFilter;
    setFilter({ ...filter, page: 1, ...param })
    setOpenDrawer(false)
  }

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
    <div className="univeristy-main">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setOpenDrawer(false)}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Status" name="statusFilter">
            <Select
              defaultValue="Select"
              className="w-[100%]"
              onChange={(e: any) => handleChangeSelect(e, 'statusFilter')}
            >
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <div className="mb-6">
            <Form.Item
              label='City'
              name='cityFilter'
            >
              <div className="mt-2">
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
              </div>
            </Form.Item>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold"
                onClick={() => handleClearForm()}
              >
                Reset
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Apply
              </Button>
            </Space>
          </div>
        </Form>
      </Drawer>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <PageHeader title='Universities' bordered={true} />
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} placeholder="Search by person name" />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <FiltersButton label='Filter' onClick={() => setOpenDrawer(true)} />
          <div className="w-25">
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              value={value}
              setValue={(val: any) => {
                action.downloadPdfOrCsv(val, pdfHeader, universitySubAdmin[0].map((item: any) => {
                  return {
                    name: item?.university?.name,
                    contactperson: item?.contact?.firstName + ' ' + item?.contact?.lastName,
                    email: item?.university?.email,
                    interncount: item?.internCount,
                    phoneNumber: item?.phoneNumber,
                    address: item?.university?.address,
                    status: item?.university?.status,
                  }
                }
                ), 'University Data', pdfBody)
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <GlobalTable
              tableData={universitySubAdmin[0]}
              columns={columns}
              pagination={tableParams?.pagination}
              handleTableChange={handleTableChange}
              pagesObj={action.universityPaginationObject}
            />
          </BoxWrapper>
        </Col>
      </Row>
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

export default UniveristyMain;
