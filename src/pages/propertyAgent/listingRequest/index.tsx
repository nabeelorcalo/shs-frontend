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

const ListingRequest = () => {
  const navigate = useNavigate();
  const action = useCustomHook();
  const [value, setValue] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const recentList = useRecoilState<any>(getRecentListingState);

  const handleChangeSelect = (value: string) => {
    console.log(`selected ${value}`);
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
            backgroundColor:
              item?.publicationStatus === "pending"
                ? "#FFC15D"
                : item?.publicationStatus === "published"
                ? "#3DC475"
                : item?.publicationStatus === "rejected"
                ? "#D83A52"
                : "",
            padding: " 2px 3px 2px 3px",
            textTransform: "capitalize",
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
            backgroundColor:
              item?.verificationStatus === "checked"
                ? "#3DC575"
                : item?.verificationStatus === "unchecked"
                ? "#D83A52"
                : "",
            padding: " 2px 3px 2px 3px",
            textTransform: "capitalize",
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
        <Form layout="vertical">
          <div className="mb-6">
            <label>Agent</label>
            <div className="mt-2">
              <Select
                className="w-[100%]"
                defaultValue="Select"
                onChange={handleChangeSelect}
                options={[
                  { value: "DarrelSteward", label: "DarrelSteward" },
                  { value: "Inactive", label: "Inactive" },
                ]}
              />
            </div>
          </div>
          <div className="mb-6">
            <label>Status</label>
            <div className="mt-2">
              <Select
                className="w-[100%]"
                defaultValue="Select"
                onChange={handleChangeSelect}
                options={[
                  { value: "Active", label: "Active" },
                  { value: "Inactive", label: "Inactive" },
                  { value: "Publish", label: "Publish" },
                ]}
              />
            </div>
          </div>
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
