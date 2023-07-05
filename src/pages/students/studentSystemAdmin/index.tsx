import { useEffect, useState } from "react";
import { GlobalTable, SearchBar, PageHeader, BoxWrapper, InternsCard, FiltersButton, DropDown, StageStepper, DrawerWidth, TextArea, PopUpModal, Notifications } from "../../../components";
import { useNavigate } from 'react-router-dom';
import { WarningIcon, More, Success } from "../../../assets/images"
import { Button, Menu, MenuProps, Select, Form } from 'antd';
import { Dropdown, Avatar } from 'antd';
import Drawer from "../../../components/Drawer";
import useCustomHook from "./actionHandler";
import '../../../scss/global-color/Global-colors.scss'
import "./style.scss";
import { useRecoilState } from "recoil";
import { studentSystemAdminState } from "../../../store/studentSystemAdmin";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
const { Option } = Select;

const statuses: any = {
  'Pending': "#FFC15D",
  'ACTIVE': '#3DC475',
  'inACTIVE': '#D83A52',
};

const cardDummyArray: any = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const StudentSystemAdmin = () => {
  const navigate = useNavigate()
  const action = useCustomHook()
  const [value, setValue] = useState("");
  const [showDrawer, setShowDrawer] = useState(false)
  const [selectEmail, setSelectEmail] = useState('');
  const [stuId, setStuId] = useState();
  const [showStageStepper, setShowStageStepper] = useState(false)
  const [listandgrid, setListandgrid] = useState(false)
  const studentSubAdmin = useRecoilState<any>(studentSystemAdminState);
  const [searchItem, setSearchItem] = useState('');
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
    "Status",
  ]
  const pdfBody = studentSubAdmin[0].map((item: any) =>
    [
      item?.userDetail?.firstName + ' ' + item?.userDetail?.lastName,
      item?.userDetail?.email,
      item?.userDetail?.phoneNumber,
      item?.userUniversity?.university?.name,
      item?.userDetail?.city,
      item?.userDetail?.status
    ]
  )

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    const { typeFilter, statusFilter, cityFilter } = values;
    let param: any = {}
    if (statusFilter) param['status'] = statusFilter;
    if (typeFilter) param['stage'] = typeFilter;
    if (cityFilter) param['city'] = cityFilter;
    action.getSubAdminStudent(param)
    setShowDrawer(false);
  }

  const mainDrawerWidth = DrawerWidth();

  useEffect(() => {
    action.getSubAdminStudent({ search: searchItem })
  }, [searchItem])

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
      dataIndex: "name",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.firstName} {item?.userDetail?.lastName}
        </div>
      ),
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "email",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.email}
        </div>
      ),
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "phone_number",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.phoneNumber}
        </div>
      ),
      key: "phone_number",
      title: "Phone Number",
    },
    {
      dataIndex: "university",
      render: (_: any, item: any) => (
        <div>
          {item?.userUniversity?.university?.name}
        </div>
      ),
      key: "university",
      title: "University",
    },
    {
      dataIndex: "city",
      render: (_: any, item: any) => (
        <div>
          {item?.userDetail?.city}
        </div>
      ),
      key: "city",
      title: "City",
    },
    {
      dataIndex: "hired",
      render: (_: any, item: any) => (
        <div>
          {item?.stage === 'hired' ? 'Yes' : 'No'}
        </div>
      ),
      key: "hired",
      title: "Hired",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center rounded white-color"
          style={{
            backgroundColor: statuses[item?.userDetail?.status],
            padding: " 2px 3px 2px 3px",
            borderRadius: "8px"
          }}
        >
          {item?.userDetail?.status}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span onClick={() => {
          setSelectEmail(data?.userDetail?.email)
          setStuId(data?.id)
        }}>
          <CustomDroupDown menu1={menu2} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const menu2 = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          navigate(`/${ROUTES_CONSTANTS.STUDENTPROFILE}/${stuId}`)
        }}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="2"
      >
        Block
      </Menu.Item>
      <Menu.Item
        key="3"
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
        Password Reset</Menu.Item>
    </Menu>
  );
  return (
    <>
      <PageHeader title="Students" />
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
              value={value}
              requiredDownloadIcon
              setValue={(val: any) => {
                action.downloadPdfOrCsv(val, pdfHeader, studentSubAdmin[0].map((item: any) => {
                  return {
                    name: item?.userDetail?.firstName + ' ' + item?.userDetail?.lastName,
                    title: item?.userDetail?.email,
                    Phone: item?.userDetail?.phoneNumber,
                    university: item?.userUniversity?.university?.name,
                    city: item?.userDetail?.city,
                    status: item?.userDetail?.status,
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
              <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
              >
                <Form.Item label="Type" name="typeFilter">
                  <Select
                    placeholder='Select'
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, 'typeFilter')}
                  >
                    <Option value="hired">Hired</Option>
                    <Option value="notHired">Not Hired</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Status" name="statusFilter">
                  <Select
                    placeholder='Select'
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, 'statusFilter')}
                  >
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="City" name="cityFilter">
                  <Select
                    placeholder='Select'
                    className="w-[100%]"
                    onChange={(e: any) => handleChangeSelect(e, 'cityFilter')}
                  >
                    <Option value="london">London</Option>
                    <Option value="satellite">Sattelite</Option>
                  </Select>
                </Form.Item>
                <div className="flex flex-row gap-3 justify-end">
                  <Button
                    type="default"
                    size="middle"
                    className="button-default-tertiary"
                    onClick={() => { setShowDrawer(false) }}
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
                  hideTotal
                  pagination={true}
                  tableData={studentSubAdmin[0]}
                />
            }
          </div>
        </BoxWrapper>
      </div>
      {/* <PopUpModal
        open={state.terminate}
        width={500}
        close={() => { updateTerminate(false) }}
        children={
          <div>
            <div className="flex flex-col gap-5">
              <div className='flex flex-row items-center gap-3'>
                <div><WarningIcon /></div>
                <div><h2>Reset Password ?</h2></div>
              </div>
              <p>Do you want to reset the password?</p>
            </div>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => updateTerminate(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
            >
              Reset
            </Button>
          </div>
        }
      /> */}
    </>
  );
};

export default StudentSystemAdmin;
