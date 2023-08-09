import React, { useEffect, useState } from "react";
import { Button, Col, Form, Menu, Row, Space, Select } from "antd";
import {
  DropDown,
  SearchBar,
  GlobalTable,
  PageHeader,
  FiltersButton,
  PopUpModal,
  Notifications
} from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { universitySystemAdminState } from "../../../store";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { Success, WarningIcon } from "../../../assets/images";
import city from "../../../citylist.json";
const { Option } = Select;

const statuses: any = {
  true: "#D83A52",
  false: "#3DC475",
  // null: '#3DC475',
}

const UniveristyMain = () => {
  const action = useCustomHook()
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const universitySubAdmin = useRecoilState<any>(universitySystemAdminState);
  const [searchItem, setSearchItem] = useState('');
  const [selectEmail, setSelectEmail] = useState('');
  const [uniId, setUniId] = useState();
  const [accessState, setAccessState] = useState('')
  const [openDelete, setOpenDelete] = useState(false);
  const [form] = Form.useForm();
  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  useEffect(() => {
    fetchSubUniversity()
  }, [searchItem])

  const fetchSubUniversity = () => {
    action.getSubAdminUniversity({ search: searchItem });
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
    fetchSubUniversity()
    setOpenDrawer(false)
  };

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

  const onFinish = (values: any) => {
    const { cityFilter, statusFilter } = values;
    let param: any = {}
    if (statusFilter) param['status'] = statusFilter;
    if (cityFilter) param['city'] = cityFilter;
    action.getSubAdminUniversity(param)
    setOpenDrawer(false)
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
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "Sr. No",
    },
    {
      dataIndex: "universityName",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.name}
        </div>
      ),
      key: "universityName",
      title: " University Name",
    },
    {
      dataIndex: "contactPerson",
      render: (_: any, item: any) => (
        <div>
          {item?.contact?.firstName} {item?.contact?.lastName}
        </div>
      ),
      key: "constactPerson",
      title: " Contact Person",
    },
    {
      dataIndex: "Email",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.email}
        </div>
      ),
      key: "Email",
      title: "Email",
    },
    {
      dataIndex: "noOfInterns",
      render: (_: any, item: any) => (
        <div>
          {item?.internCount}
        </div>
      ),
      key: "noOfInterns",
      title: "No. of Interns",
    },
    {
      dataIndex: "PhoneNumber",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.phoneNumber}
        </div>
      ),
      key: "PhoneNumber",
      title: "Phone Number",
    },
    {
      dataIndex: "address",
      render: (_: any, item: any) => (
        <div>
          {item?.university?.address}
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
          {item?.contact?.isBlocked === true ? 'Blocked' : 'Active'}
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
                    {city?.map((item:any, i:any) => {
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
          <SearchBar handleChange={searchValue} placeholder="Search by person name"/>
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
          <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
            <GlobalTable tableData={universitySubAdmin[0]} columns={columns} />
          </div>
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
  );
};

export default UniveristyMain;
