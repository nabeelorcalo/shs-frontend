import { useEffect, useState } from "react";
import { BoxWrapper, FiltersButton, GlobalTable } from "../../../components";
import { Button, Col, Row, Space, Form, Menu, Select } from "antd";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import "../style.scss";
import { useRecoilState } from "recoil";
import { getAllListingState, getPropertyAgentState, getRecentListingState } from "../../../store/getListingState";
import useCustomHook from "../actionHandler";
import { useNavigate } from "react-router-dom";

const status: any = {
  'pending': "#FFC15D",
  'published': '#3DC475',
  'rejected': '#D83A52'
}

const verif: any = {
  'checked': '#3DC575',
  'unchecked': '#D83A52'
}

const ListingRequest = (props: any) => {

  const navigate = useNavigate();
  const action = useCustomHook();
  const [value, setValue] = useState("");
  const [statusId, setStatusId] = useState({ id: "", status: "" });
  const [openDrawer, setOpenDrawer] = useState(false);
  const recentAllList = useRecoilState<any>(getAllListingState);
  const recentAllFilter = useRecoilState<any>(getPropertyAgentState);

  const [form] = Form.useForm();
  const { resetFields } = form;

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    console.log(values, '>>><<')
    const { statusFilter, agentFilter } = values;
    let param: any = {}
    if (statusFilter) param['status'] = statusFilter;
    if (agentFilter) param['agentId'] = agentFilter;
    action.getAllListingData(param)
    setOpenDrawer(false)
  }

  const handleReset = () => {
    resetFields();
    setOpenDrawer(false)
  };

  const columns = [
    {
      dataIndex: "Name",
      render: (_: any, item: any) => (
        <div>
          {item?.user?.firstName} {item?.user?.lastName}
        </div>
      ),
      key: "Name",
      title: "Name",
    },
    {
      dataIndex: "Address",
      render: (_: any, item: any) => <div>{item?.addressOne}</div>,
      key: "Address",
      title: "Address",
    },
    {
      dataIndex: "propertyType",
      render: (_: any, item: any) => <div>{item?.propertyType}</div>,
      key: "Property Type",
      title: "Property Type",
    },
    {
      dataIndex: "Rent",
      render: (_: any, item: any) => <div>£{item?.rent}</div>,
      key: "Rent",
      title: "Rent",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor: status[item?.publicationStatus],
            padding: " 2px 3px 2px 3px",
            textTransform: "capitalize",
            borderRadius: "8px"
          }}
        >
          {item?.publicationStatus}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "Verification",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor: verif[item?.verificationStatus],
            padding: " 2px 3px 2px 3px",
            textTransform: "capitalize",
            borderRadius: "8px"
          }}
        >
          {item?.verificationStatus}
        </div>
      ),
      key: "Verification",
      title: "Verification",
    },
    {
      render: (_: any, data: any) => (
        <span onClick={() => {
          setStatusId({
            id: data.id,
            status: data.publicationStatus
          })
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
        onClick={() =>
          statusId.status === "published" ||
            "rejected" ||
            "pending"
            ? navigate(`${statusId.id}`)
            : ""
        }
      >
        View Details
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    action.getAllListingData({});
    action.getPropertyAgents('');
  }, []);

  return (
    <div className="listing-request">
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Filters"
      >
        <Form layout="vertical"
          onFinish={onFinish}
          form={form}>
          <div className="mb-6">
            <Form.Item label='Agent' name='agentFilter'>
              <div className="mt-2">
                <Select
                  className="w-[100%]"
                  defaultValue="Select"
                  onChange={(e: any) => handleChangeSelect(e, 'agentFilter')}
                  options={recentAllFilter[0].map((item: any) => ({
                    value: item?.id,
                    label: item?.firstName + ' ' + item?.lastName
                  }))}
                />
              </div>
            </Form.Item>
          </div>
          <Form.Item label='Status' name='statusFilter'>
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={(e: any) => handleChangeSelect(e, 'statusFilter')}
              options={[
                { value: "pending", label: " Pending" },
                { value: "published", label: "Published" },
                { value: "rejected", label: "Rejected" },
              ]}
            />
          </Form.Item>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button
                className="border-1 border-[#4A9D77] teriary-color font-semibold"
                onClick={handleReset}
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
      <Row gutter={[20, 20]}>
        <Col
          xxl={24}
          xl={24}
          lg={24}
          md={24}
          sm={24}
          xs={24}
          className="flex max-sm:flex-col justify-end"
        >
          <FiltersButton label="Filter" onClick={() => setOpenDrawer(true)} />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <GlobalTable tableData={action.allListing} columns={columns} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ListingRequest;
