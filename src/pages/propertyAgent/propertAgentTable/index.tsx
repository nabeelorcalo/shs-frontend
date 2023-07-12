import { useEffect, useState } from "react";
import { EllipsisOutlined } from "@ant-design/icons";
import { Button, Col, Row, Menu, Form, Space, Select } from "antd";
import { DropDown, SearchBar, GlobalTable, FiltersButton, PopUpModal, Notifications } from "../../../components";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import "../style.scss";
import { Success, WarningIcon } from "../../../assets/images";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { useRecoilState } from "recoil";
import { getPropertyAgentState } from "../../../store/getListingState";

const PropertyAgentTable = () => {
  const action = useCustomHook();
  const navigate = useNavigate();
  const [state, setState] = useState({ openDrawer: false, open: false })
  const [searchItem, setSearchItem] = useState('');
  const [accessState, setAccessState] = useState('')
  const [value, setValue] = useState("")
  const agentsData = useRecoilState<any>(getPropertyAgentState);
  const [selectEmail, setSelectEmail] = useState('');
  const { openDrawer, open } = state
  const [form] = Form.useForm();

  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  const onFinish = (values: any) => {
    const { statusFilter, agentFilter } = values;
    let param: any = {}
    if (statusFilter) param['status'] = statusFilter;
    if (statusFilter) param['agentId'] = agentFilter;
    action.getPropertyAgents(param)
    setState({ ...state, openDrawer: false })
  }

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
  };
  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "No",
    },
    {
      dataIndex: "Agent",
      render: (_: any, item: any) => (
        <div>
          {item?.firstName} {item?.lastName}
        </div>
      ),
      key: "Agent",
      title: "Agent",
    },
    {
      dataIndex: "Email",
      render: (_: any, item: any) => (
        <div>
          {item?.email}
        </div>
      ),
      key: "Email",
      title: "Email",
    },
    {
      dataIndex: "PhoneNumber",
      render: (_: any, item: any) => (
        <div>
          {item?.phoneNumber}
        </div>
      ),
      key: "PhoneNumber",
      title: "Phone Number",
    },
    {
      dataIndex: "Publishedlisting",
      render: (_: any, item: any) => (
        <div>
          {item?.counts}
        </div>
      ),
      key: "Publishedlisting",
      title: "Published listing",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor: item?.isBlocked === false
              ? "#3DC475" :
              item.isBlocked === true ?
                "#D83A52"
                : item?.isBlocked === null
                  ? "#D83A52"
                  : "",
            padding: " 2px 3px 2px 3px",
            borderRadius: "8px"
          }}
        >
          {item?.isBlocked === true ? 'Inactive' : "Active"}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, data: any) => (
        <span
          onClick={() => {
            setSelectEmail(data?.email)
            setAccessState(data?.email)
          }}
        >
          <CustomDroupDown menu1={data.isBlocked ? active : blocked} />
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
          action.propertyAgentAccess(accessState, { access: 'active' },
            () => {
              action.getPropertyAgents('')
            }
          )
        }}
      >
        Active
      </Menu.Item>
      <Menu.Item key="2">
        <div onClick={() => setState({ ...state, open: true })}>
          Password Reset
        </div>
      </Menu.Item>
    </Menu>
  );
  const blocked = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          action.propertyAgentAccess(accessState, { access: 'block' },
            () => {
              action.getPropertyAgents('')
            }
          )
        }}
      >
        Block
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    action.getPropertyAgents({ search: searchItem });
  }, [searchItem]);

  return (
    <div className="property-agent-table">
      <Drawer
        open={openDrawer}
        title=" Filters"
        onClose={() => setState({ ...state, openDrawer: false })}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label='Agent' name='agentFilter'>
            <div className="mt-2">
              <Select
                className="w-[100%]"
                defaultValue="Select"
                onChange={(e: any) => handleChangeSelect(e, 'agentFilter')}
                options={agentsData[0].map((item: any) => ({
                  value: item?.id,
                  label: item?.firstName + ' ' + item?.lastName
                }))}
              />
            </div>
          </Form.Item>
          <Form.Item label='Status' name='statusFilter'>
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={(e: any) => handleChangeSelect(e, 'statusFilter')}
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "InActive" },
                { value: "publish", label: "Publish" },
              ]}
            />
          </Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold">
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
      <div className="inner-agent-table">
        <Row gutter={[20, 20]}>
          <Col xl={6} lg={9} md={24} sm={24} xs={24}>
            <SearchBar handleChange={searchValue} />
          </Col>
          <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
            <FiltersButton label="Filter" onClick={() => setState({ ...state, openDrawer: true })} />
            <div className="w-25">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={setValue}
              />
            </div>
          </Col>
          <Col xs={24}>
            <GlobalTable tableData={agentsData[0]} columns={columns} pagination={false} />
          </Col>
        </Row>
      </div>
      <PopUpModal
        open={open}
        width={500}
        close={() => { setState({ ...state, open: false }) }}
        children={
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><WarningIcon /></div>
              <div><h2>Reset Password</h2></div>
            </div>
            <p>Are you sure you want to generate reset the password request?</p>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="small"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => setState({ ...state, open: false })}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="small"
              className="button-tertiary max-sm:w-full"
              onClick={() => {
                setState({ ...state, open: false })
                action.forgotpassword({
                  email: selectEmail,
                });
                Notifications({
                  icon: <Success />,
                  title: "Success",
                  description:
                    "Account resent link sent successfully",
                  type: "success",
                });
              }
              }
            >
              Reset
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default PropertyAgentTable;
