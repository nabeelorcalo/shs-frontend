import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Row,
  Space,
  Typography,
} from "antd";
import {
  CommonDatePicker,
  Drawer,
  DropDown,
  FiltersButton,
  SearchBar
} from "../../../../components";
import { GlobalTable } from "../../../../components";
import useCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { getRecentActivities } from "../../../../store/getListingState";
import dayjs from "dayjs";

const activities = [
  'Add User',
  'Remove User',
  'Rejected Post',
  'Performance Evaluate',
  'Updated Task',
  'Reset Password',
  'Registered University',
]

const userRoles = [
  'Company_Admin',
  'INTERN',
  'Student',
  'Company Manager',
  'SYS_ADMIN',
  'University Representatives'
];

const ActivityData = () => {
  const action = useCustomHook();
  const [openDrawer, setOpenDrawer] = useState(false)
  const [openDrawerDate, setOpenDrawerDate] = useState(false);
  const [searchItem, setSearchItem] = useState('');
  const [value, setValue] = useState("");
  const [state, setState] = useState<any>({
    activity: '',
    jobTitle: '',
    date: null,
    active: ''
  });
  const recentActivity = useRecoilState<any>(getRecentActivities);
  const pdfHeader = ['Activity', 'Performed By', 'Job Title', 'Date & Time'];

  const pdfBody = recentActivity[0].map((item: any) =>
    [
      item?.activity,
      item?.performedByuser?.firstName + ' ' + item?.performedByuser?.lastName,
      item?.performedByuser?.role,
      dayjs(item?.createdAt).format('DD/MM/YY'), dayjs(item?.createdAt).format('HH:mm A')
    ]
  )

  const resetHandler = () => {
    action.generalActivityData(null)
    setState({
      activity: '',
      role: '',
      performerRole: '',
      date: null,
    })
    setOpenDrawer(false);
  }

  useEffect(() => {
    action.generalActivityData({ search: searchItem });
  }, [searchItem])

  const searchValue = (e: any) => {
    setSearchItem(e);
  };
  const columns = [
    {
      dataIndex: "no",
      render: (_: any, data: any) => (
        <div>
          {data?.id || 'N/A'}
        </div>
      ),
      key: "no",
      title: "No",
    },
    {
      dataIndex: "Activity",
      render: (_: any, data: any) => (
        <div>
          {data?.activity || 'N/A'}
        </div>
      ),
      key: "Activity",
      title: "Activity",
    },
    {
      dataIndex: "Description",
      key: "Description",
      render: (_: any, data: any) => (
        <div>
          {
            data?.activity === "user sign up" ?
              data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' registerd successfully'
              :
              data?.activity === 'addAssement' ?
                data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' add assesment'
                :
                data?.activity === 'create internship' ?
                  data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' created internship'
                  :
                data?.activity === 'NewUser' ?
                  data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' Join internship ken'
                  :
                data?.activity === 'Reset Password' ?
                  data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + 'password changed'
                  :
                data?.activity === 'update candidate detail' ?
                  data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName +  'detail updated'
                  :
                  data?.activity === 'create company manager' ?
                    data?.performedByuser?.firstName + " " + data?.performedByuser?.lastName + ' added company manager'
                    :
                    null
                    || 'N/A'
          }
        </div>
      ),
      title: "Description",
    },
    {
      dataIndex: "PerformedBy",
      render: (_: any, data: any) => (
        <div>
          {data?.performedByuser?.firstName || 'N/A'} {data?.performedByuser?.lastName || 'N/A'}
        </div>
      ),
      key: "PerformedBy",
      title: "Performed By",
    },
    {
      dataIndex: "JobTitle",
      render: (_: any, data: any) => (
        <div>
          {data?.performedByuser?.role || 'N/A'}
        </div>
      ),
      key: "JobTitle",
      title: "Job Title",
    },
    {
      dataIndex: "datetime",
      render: (_: any, data: any) => (
        <div>
          {dayjs(data?.createdAt).format('DD/MM/YY')},{dayjs(data?.createdAt).format('HH:mm A') || 'N/A'}
        </div>
      ),
      key: "datetime",
      title: "Date & Time",
    },
  ];

  return (
    <div className="activity-data">
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Filters"
      >
        <div>
          <div className="mb-2 text-primary-color font-medium text-base">
            Activity
          </div>
          <div className="flex flex-wrap gap-2 mb-7">
            {activities?.map((item: any, index) => {
              return (
                <button
                  key={index}
                  className={`text-input-bg-color text-secondary-color capitalize rounded-xl text-sm 
                  font-normal cursor-pointer border-none py-0.5 px-3 ${state.activity === item && state.active}`}
                  value={item}
                  onClick={() => setState({
                    ...state,
                    activity: item,
                    active: 'active'
                  })}>
                  {item?.toLowerCase().replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div className="mb-2 text-primary-color font-medium text-base">
            Job Titles
          </div>
          <div className="flex flex-wrap gap-2 mb-7">
            {userRoles?.map((item: any, index) => {
              return (
                <button
                  key={index}
                  className={`text-input-bg-color text-secondary-color capitalize rounded-xl text-sm 
                  font-normal cursor-pointer border-none py-0.5 px-3 ${state.performerRole === item && state.active}`}
                  value={item}
                  onClick={() => setState({
                    ...state,
                    performerRole: item,
                    active: 'active'
                  })}
                >
                  {item?.toLowerCase().replace("_", " ")}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mb-5">
          <CommonDatePicker
            label="Date"
            setOpen={setOpenDrawerDate}
            open={openDrawerDate}
            setValue={(e: any) => setState({ ...state, date: e })}
          />
        </div>
        <div className="flex justify-center sm:justify-end">
          <Space>
            <Button
              className="border-1 border-[#4A9D77] teriary-color font-semibold"
              onClick={resetHandler}
            >
              Reset
            </Button>
            <Button
              className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
              onClick={() => { action.generalActivityData(state), setOpenDrawer(false) }}
            >
              Apply
            </Button>
          </Space>
        </div>
      </Drawer>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div>
            <Typography className="main-title">Activity Log</Typography>
          </div>
        </Col>
      </Row>
      <Divider />
      <Row className="m-2">
        <Col xxl={6} xl={6} lg={6} md={6} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={18} sm={24} xs={24}>
          <div className="flex justify-end items-center gap-2">
            <FiltersButton
              label='Filter'
              onClick={() => setOpenDrawer(true)}
            />
            <div className="w-25">
              <DropDown
                requiredDownloadIcon
                options={["pdf", "excel"]}
                value={value}
                setValue={(val: any) => {
                  action.downloadPdfOrCsv(val, pdfHeader, recentActivity[0].map((item: any) => {
                    return {
                      activity: item?.activity,
                      performedby: item?.performedByuser?.firstName + ' ' + item?.performedByuser?.lastName,
                      jobtitle: item?.performedByuser?.role,
                      dateandtime: dayjs(item?.createdAt).format('DD/MM/YY') + ' ' + dayjs(item?.createdAt).format('HH:mm A')
                    }
                  }
                  ), 'Activity Log', pdfBody)
                }}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <div className="activity-data-table">
            <GlobalTable tableData={recentActivity[0]} columns={columns} pagination={true} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ActivityData;
