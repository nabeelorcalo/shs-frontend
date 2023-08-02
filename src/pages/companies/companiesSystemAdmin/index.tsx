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
  Alert
} from "../../../components";
import { useNavigate } from 'react-router-dom';
import { More, Success, WarningIcon } from "../../../assets/images"
import { Button, Menu, MenuProps, Form, Select, Space } from 'antd';
import { Dropdown, Avatar } from 'antd';
import Drawer from "../../../components/Drawer";
import useCustomHook from "./actionHandler";
import '../../../scss/global-color/Global-colors.scss'
import "./style.scss";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useRecoilState } from "recoil";
import { companySystemAdminState } from "../../../store/companySystemAdmin";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
const { Option } = Select;

const statuses: any = {
  true: "#D83A52",
  false: "#3DC475",
  null: '#3DC475',
}

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const CompaniesSystemAdmin = () => {
  const navigate = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [showStageStepper, setShowStageStepper] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const companySubAdmin = useRecoilState<any>(companySystemAdminState);
  const [selectEmail, setSelectEmail] = useState('');
  const [compId, setCompId] = useState();
  const [value, setValue] = useState("");
  const [accessState, setAccessState] = useState('')
  const [openDelete, setOpenDelete] = useState(false);
  const action = useCustomHook()
  const [state, setState] = useState({
    timeFrame: "",
    natureOfWork: "",
    typeOfWork: "",
    stage: "",
    terminate: false
  })
  const [searchItem, setSearchItem] = useState('');
  const [form] = Form.useForm();

  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  useEffect(() => {
    fetchSubCompany()
  }, [searchItem])

  const fetchSubCompany = () => {
    action.getSubAdminCompany({ search: searchItem })
  }

  const handleClearForm = () => {
    form.resetFields(); // Use the resetFields method to clear the form
  };

  const pdfHeader =
    [
      "Company Name",
      "Company Admin",
      "Email",
      "Phone Number",
      "Address",
      "Status",
    ]

  const pdfBody = companySubAdmin[0].map((item: any) =>
    [
      item?.businessName,
      item?.admin?.firstName + ' ' + item?.admin?.lastName,
      item?.admin?.email,
      item?.admin?.phoneNumber,
      item?.address,
      item?.status
    ]
  )
  const mainDrawerWidth = DrawerWidth();

  const passwordResetHandler = () => {
    setOpenDelete(false)
    action.forgotpassword({
      email: selectEmail,
    });
  }

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "Sr.No",
    },
    {
      dataIndex: "company_name",
      render: (_: any, item: any) => (
        <div>
          {item?.businessName}
        </div>
      ),
      key: "company_name",
      title: "Company Name",
    },
    {
      dataIndex: "company_admin",
      render: (_: any, item: any) => (
        <div>
          {item?.admin?.firstName}  {item?.admin?.lastName}
        </div>
      ),
      key: "company_admin",
      title: "Company Admin",
    },
    {
      dataIndex: "email",
      render: (_: any, item: any) => (
        <div>
          {item?.admin?.email}
        </div>
      ),
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_number",
      render: (_: any, item: any) => (
        <div>
          {item?.admin?.phoneNumber}
        </div>
      ),
      key: "phone_number",
      title: "Phone Number",
    },
    {
      dataIndex: "address",
      render: (_: any, item: any) => (
        <div>
          {item?.address}
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
            backgroundColor: statuses[item?.admin?.isBlocked],
          }}
        >
          {item?.admin?.isBlocked === true ? 'Inactive' : "Active"}

        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span
          onClick={() => {
            setCompId(data?.id)
            setSelectEmail(data?.admin?.email)
            setAccessState(data?.admin?.email)
          }}>
          <CustomDroupDown menu1={data?.admin?.isBlocked ? active : blocked} />
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
              fetchSubCompany()
            })
            Notifications({
              icon: <Success />,
              title: "Success",
              description: "User unblocked successfully",
              type: "success",
            })
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
          navigate(`${ROUTES_CONSTANTS.COMPANIES_DETAIL}/${compId}`)
        }}
      >
        View Detail
      </Menu.Item>
      <Menu.Item
        key="1"
        onClick={() => {
          action.adminAccess({ access: 'block', email: accessState },
            () => {
              fetchSubCompany()
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
      <Menu.Item
        key="3"
        onClick={() => setOpenDelete(true)}
      >
        Password Reset
      </Menu.Item>
    </Menu>
  );

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    const { type, statusFilter } = values;
    let param: any = {}
    if (statusFilter) param['status'] = statusFilter;
    action.getSubAdminCompany(param)
    setShowDrawer(false);
  }

  const updateTerminate = (value: any) => {
    setState((prevState) => ({
      ...prevState,
      terminate: value
    }))
  }
  return (
    <>
      <PageHeader title="Companies" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between gap-3 max-sm:flex-col md:flex-row">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar handleChange={searchValue} />
          </div>
          <div className="flex flex-row gap-4">
            <FiltersButton
              label="Filters"
              onClick={() => {
                setShowDrawer(true);
              }}
            />
            <DropDown
              options={[
                'pdf',
                'excel'
              ]}
              requiredDownloadIcon
              value={value}
              setValue={(val: any) => {
                action.downloadPdfOrCsv(val, pdfHeader, companySubAdmin[0].map((item: any) => {
                  return {
                    name: item?.businessName,
                    contactperson: item?.admin?.firstName + ' ' + item?.admin?.lastName,
                    email: item?.admin?.email,
                    phoneNumber: item?.admin?.phoneNumber,
                    address: item?.address,
                    status: item?.status,
                  }
                }
                ), 'Company Data', pdfBody)
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
              <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
              >
                <Form.Item label="Status" name="statusFilter">
                  <Select
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, 'statusFilter')}
                  >
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="City" name="cityFilter">
                  <Select
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, 'cityFilter')}
                  >
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <div className="flex justify-center sm:justify-end">
                  <Space>
                    <Button className="border-1 border-[#4A9D77] teriary-color font-semibold"
                      onClick={() => {
                        handleClearForm()
                        setShowDrawer(false)
                      }}
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
            <Drawer
              closable
              width={mainDrawerWidth > 1400 ? 1000 : mainDrawerWidth > 900 ? 900 : mainDrawerWidth > 576 ? 600 : 300}
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
            {
              listandgrid ? <div className="flex flex-row flex-wrap gap-6">
                {
                  cardDummyArray.map((items: any, idx: any) => {
                    return (
                      <InternsCard />
                    )
                  })
                }
              </div>
                :
                <GlobalTable
                  columns={columns}
                  tableData={companySubAdmin[0]}
                />
            }
          </div>
        </BoxWrapper>
      </div>
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
    </>
  );
};

export default CompaniesSystemAdmin;
