import { useEffect, useState } from "react";
import { BoxWrapper, FiltersButton, GlobalTable } from "../../../components";
import { Button, Col, Row, Space, Form, Menu, Select } from "antd";
import Drawer from "../../../components/Drawer";
import CustomDroupDown from "../../digiVault/Student/dropDownCustom";
import "../style.scss";
import { useRecoilState } from "recoil";
import { getRecentListingState } from "../../../store/getListingState";
import useCustomHook from "../actionHandler";
import { useNavigate } from "react-router-dom";

const status: any = {
  'pending': "#FFC15D",
  'published': '#3DC475',
  'rejected': 'D83A52'
}

const verif: any = {
  'checked': '#3DC575',
  'unchecked': '#D83A52'
}

const ListingRequest = () => {
  const navigate = useNavigate();
  const action = useCustomHook();
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const recentList = useRecoilState<any>(getRecentListingState);
  const [form] = Form.useForm();

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
    console.log(`selected ${value}`);
  };
  const onFinish = (values: any) => {
    const { statusFilter } = values;
    let param: any = {}
    if (statusFilter) param['status'] = statusFilter;
    action.getRecentListing()

  }

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
      <Menu.Item
        key="1"
        onClick={() =>
          recentList[0]?.publicationStatus === "published" ||
            "rejected" ||
            "pending"
            ? navigate(`${recentList[0].id}`)
            : ""
        }
      >
        View Details
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    action.getRecentListing();
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
            <label>Agent</label>
            <div className="mt-2">
              <Select
                className="w-[100%]"
                defaultValue="Select"
                // onChange={handleChangeSelect}
                options={[
                  { value: "DarrelSteward", label: "DarrelSteward" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </div>
          </div>
          <Form.Item label='Status' name='statusFilter'>
            <Select
              className="w-[100%]"
              defaultValue="Select"
              onChange={(e: any) => handleChangeSelect(e, 'statusFilter')}
              options={[
                { value: "Active", label: "Active" },
                { value: "Inactive", label: "Inactive" },
                { value: "Publish", label: "Publish" },
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
            <GlobalTable tableData={recentList[0]} columns={columns} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default ListingRequest;
