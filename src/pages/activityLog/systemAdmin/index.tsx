import { useEffect, useState } from "react";
import { Button, Col, Divider, Row, TablePaginationConfig } from "antd";
import {
  CommonDatePicker,
  DropDown, SearchBar,
  FiltersButton,
  BoxWrapper, GlobalTable,
  Drawer
} from "../../../components";
import useCustomHook from "../actionHandler";
import "./style.scss";
import dayjs from "dayjs";
import { useRecoilState } from "recoil";
import { filterLogState, paginationLogState } from "../../../store";

const userRoles = ['Company Admin', 'Intern', 'Student', 'Company Manager'];
const activities = [
  'User Sign Up',
  'Addassement',
  'Create Internship',
  'Create Company Manager',
  'Intern Stage Change To Interviewes',
  'Intern Stage Change To Recommended']

const ActivityLog = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDrawerDate, setOpenDrawerDate] = useState(false);
  const [tableParams, setTableParams]: any = useRecoilState(paginationLogState);
  const [filter, setFilter] = useRecoilState(filterLogState);
  const [loading, setLoading] = useState(true);
  const { downloadPdfOrCsv, logDetails, getLogDetails }: any = useCustomHook();

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };
  let Arguments = removeEmptyValues(filter)

  useEffect(() => {
    getLogDetails(Arguments, tableParams, setTableParams, setLoading)
  }, [filter.search,filter.page])

  const logTableData = logDetails?.data

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "key",
      render: (_: any, data: any, index: any) =>
        <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
    },
    {
      title: "Users",
      dataIndex: "Users",
      key: "Users",
    },
    {
      title: "User Role",
      dataIndex: "UserRole",
      key: "UserRole",
    },

    {
      title: "Activity",
      dataIndex: "Activity",
      key: "Activity",
      minWidth: 300,
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
      align: 'center'
    },
  ];

  const logsTableData = logTableData?.map((item: any, index: number) => {
    const dateTime = dayjs(item.createdAt).format("DD/MM/YYYY, hh:mm A");
    return (
      {
        key: index,
        // ID: logTableData?.length < 10 && `0 ${index + 1}`,
        Users: `${item?.user?.firstName} ${item?.user?.lastName}`,
        UserRole: item?.user?.role?.replace("_", " ").toLowerCase(),
        Activity: item?.activity,
        PerformedBy: item?.performedByuser?.firstName ?
          `${item?.performedByuser?.firstName} ${item?.performedByuser?.lastName}` : 'N/A',
        PerformerRole: item?.performedByuser?.role?.replace("_", " ").toLowerCase() ?? 'N/A',
        DateTime: dateTime
      }
    )
  })

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  const filterApplyHandler = () => {
    getLogDetails(Arguments, tableParams, setTableParams, setLoading)
    setOpenDrawer(false)
  }

  const resetHandler = () => {
    setFilter({
      ...filter,
      activity: '',
      userRole: '',
      performerRole: '',
      date: ''
    })
  }

  return (
    <div className="activity-log">
      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        title="Filters"
      >
        <div className="mb-2 text-primary-color font-medium text-base">
          User Role
        </div>
        <div className="flex flex-wrap gap-2 mb-7">
          {userRoles?.map((item: any, index) => {
            return (
              <button
                key={index}
                className={`text-input-bg-color text-secondary-color
                 capitalize rounded-xl text-sm font-normal cursor-pointer 
                 border-none py-0.5 px-3 ${filter?.userRole === item && filter.active}`}
                value={item}
                onClick={() => {
                  setFilter({ ...filter, userRole: item, active: 'active' });
                }}>
                {item?.toLowerCase().replace("_", " ")}
              </button>
            );
          })}
        </div>
        <div className="mb-2 text-primary-color font-medium text-base">
          Activity
        </div>
        <div className="flex flex-wrap gap-2 mb-7">
          {activities?.map((item: any, index) => {
            return (
              <button
                key={index}
                className={`text-input-bg-color text-secondary-color
                 capitalize rounded-xl text-sm font-normal cursor-pointer 
                 border-none py-0.5 px-3 ${filter.activity === item && filter.active}`}
                value={item}
                onClick={() => setFilter({ ...filter, activity: item, active: 'active' })}>
                {item?.toLowerCase().replace("_", " ")}
              </button>
            );
          })}
        </div>
        <div className="mb-2 text-primary-color font-medium text-base">
          Performer Role
        </div>
        <div className="flex flex-wrap gap-2 mb-7">
          {userRoles?.map((item: any, index) => {
            return (
              <button
                key={index}
                className={`text-input-bg-color text-secondary-color capitalize rounded-xl 
                text-sm font-normal cursor-pointer border-none py-0.5 px-3
                 ${filter.performerRole === item && filter.active}`}
                value={item}
                onClick={() => setFilter({ ...filter, performerRole: item, active: 'active' })}>
                {item?.toLowerCase().replace("_", " ")}
              </button>
            );
          })}
        </div>
        <div>
          <CommonDatePicker
            label="Date"
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
            setValue={(e: any) => setFilter({ ...filter, date: e })}
          />
        </div>

        <div className="mt-4 justify-end flex">
          <Button onClick={resetHandler} className="activity-log-drawer-reset-btn teriary-color hover:teriary-color mr-4 w-28">
            Reset
          </Button>
          <Button onClick={() => filterApplyHandler()} className="activity-log-drawer-apply-btn teriary-bg-color hover:white-color white-color w-28">
            Apply
          </Button>
        </div>
      </Drawer >

      <Row>
        <Col xs={24}>
          <div className="text-2xl font-semibold text-[#363565]">
            Activity Log
          </div>
        </Col>
        <Divider />
        <Col xs={24} className='logs-content'>
          <Row gutter={[20, 30]}>
            <Col xl={8} lg={9} md={24} sm={24} xs={24}>
              <SearchBar size="middle" handleChange={(e: any) => setFilter({ ...filter, search: e })} />
            </Col>

            <Col xl={16} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col justify-end gap-4">
              <FiltersButton label="Filters" onClick={() => setOpenDrawer(true)} />
              <DropDown
                options={['pdf', 'excel']}
                requiredDownloadIcon
                setValue={() => { downloadPdfOrCsv(event, columns, logsTableData, "Activity Log Detail") }}
              />
            </Col>
            <Col xs={24}>
              <BoxWrapper>
                <GlobalTable
                  id="activityTable"
                  loading={loading}
                  columns={columns}
                  pagination={tableParams.pagination}
                  tableData={logsTableData}
                  handleTableChange={handleTableChange}
                  pagesObj={logDetails?.pagination}
                />
              </BoxWrapper>
            </Col>
          </Row>
        </Col>
      </Row>
    </div >
  );
};

export default ActivityLog;
