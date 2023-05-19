import { useEffect, useState } from "react";
import { Button, Col, Divider, Row, Space, Tag } from "antd";
import { CommonDatePicker, DropDown, SearchBar, FiltersButton } from "../../../components";
import Drawer from "../../../components/Drawer";
import { BoxWrapper } from "../../../components";
import { GlobalTable } from "../../../components";
import useCustomHook from "../actionHandler"
import "./style.scss";
import dayjs from "dayjs";
import CheckableTag from "antd/es/tag/CheckableTag";

const columns = [
  {
    title: "ID",
    dataIndex: "ID",
    key: "key",
    minWidth: 300,
  },
  {
    title: "Users",
    dataIndex: "Users",
    key: "Users",
  },
  {
    title: "UserRole",
    dataIndex: "UserRole",
    key: "UserRole",
  },

  {
    title: "Activity",
    dataIndex: "Activity",
    key: "Activity",
  },
  {
    title: "Performed By",
    dataIndex: "PerformedBy",
    key: "PerformedBy",
  },
  {
    title: "Performer Role",
    dataIndex: "PerformerRole",
    key: "PerformerRole",
  },
  {
    title: "Date & Time",
    dataIndex: "DateTime",
    key: "Date&Time",
  },
];

const filterData = [
  {
    title: "UserRole",
    userRole: [
      "Company Admin",
      "System Admin",
      "Intern",
      "Student",
      "manager",
      "Company Admin",
      "Student",
    ],
  },

  {
    title: "Activity",
    userRole: [
      "Add User",
      "Remove User",
      "Rejected Post",
      "Performance Evaluate",
      "Updated Task",
      "Password Reset",
      "Registered University",
    ],
  },

  {
    title: "Performer Role",
    userRole: [
      "Company Admin",
      "System Admin",
      "Intern",
      "Student",
      "University Representatives",
      "Mananger",
      "Student",
    ],
  },
];

const ActivityLog = () => {

  const { downloadPdfOrCsv, logDetails, getLogDetails, searchHandler } = useCustomHook();

  useEffect(() => {
    getLogDetails()
  }, [])

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDate, setOpenDrawerDate] = useState(false);
  const [selectedTag, setSelectedTag] = useState<any>('');
  const { CheckableTag } = Tag;

  const handleClick = () => {
    setOpenDrawer(true);
  };

  const logsTableData = logDetails?.map((item: any, index: number) => {
    const dateTime = dayjs(item.createdAt).format("DD/MM/YYYY, hh:mm A");
    return (
      {
        key: index,
        ID: logDetails?.length < 10 && `0 ${index + 1}`,
        Users: `${item?.user?.firstName} ${item?.user?.lastName}`,
        UserRole: item?.user?.role?.replace("_", " ").toLowerCase(),
        Activity: item?.activity,
        PerformedBy: `${item?.performedByuser?.firstName} ${item?.performedByuser?.lastName}`,
        PerformerRole: item?.performedByuser?.role?.replace("_", " ").toLowerCase(),
        DateTime: dateTime
      }
    )
  })

  const handleSelectedTags = (tag: string, checked: boolean) => {
    console.log(tag, checked);

    // const nextSelectedTags = checked ? tag : selectedTag.filter((t:any) => t !== tag);
    setSelectedTag(checked && tag);
  };
  const newArr: any = logDetails?.map((item: any) => item?.user?.role)
  const uniqueArray = [...new Set(newArr)];

  return (
    <div className="activity-log">
      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        title="Filters"
      >
        <div className="mb-2 text-primary-color font-medium text-base pl-2 pr-2">
          User Role
        </div>
        <div className="flex flex-wrap gap-2 mb-7">
          {uniqueArray.map((item: any, index) => {
            return (
              <CheckableTag
                key={index}
                checked={selectedTag}
                onChange={(checked) => handleSelectedTags(item, checked)}
                className="text-input-bg-color rounded-xl text-sm font-normal cursor-pointer"
              >
                {item}
              </CheckableTag>
            );
          })}
        </div>
        <div>
          <CommonDatePicker
            label="Date"
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
          />
        </div>

        <div className="mt-4 justify-end flex">
          <Button className="activity-log-drawer-reset-btn teriary-color hover:teriary-color mr-4 w-28">
            Reset
          </Button>
          <Button className="activity-log-drawer-apply-btn teriary-bg-color hover:white-color white-color w-28">
            Apply
          </Button>
        </div>
      </Drawer>

      <Row>
        <Col xs={24}>
          <div className="text-2xl font-semibold text-[#363565]">
            Activity Log
          </div>
        </Col>

        <Divider />

        <Col xs={24} className='logs-content'>
          <Row gutter={[20, 30]}>
            <Col xl={6} lg={9} md={24} sm={24} xs={24}>
              <SearchBar size="middle" handleChange={(e: any) => searchHandler(e)} />
            </Col>

            <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
              <FiltersButton label="Filter" onClick={handleClick} />
              <DropDown
                options={['pdf', 'excel']}
                requiredDownloadIcon
                setValue={() => { downloadPdfOrCsv(event, columns, logsTableData, "Activity Log Detail") }}
              />
            </Col>
            <Col xs={24}>
              <BoxWrapper>
                <GlobalTable columns={columns} tableData={logsTableData} />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityLog;
