import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  GlobalTable, PageHeader,
  BoxWrapper, FiltersButton,ButtonThemePrimary, SearchBar, ButtonThemeSecondary
} from "../../components";
import Drawer from "../../components/Drawer";
import { Avatar, Button, Dropdown, Row, Col } from "antd";
import type { MenuProps, TablePaginationConfig } from 'antd';
import { InternshipsIcon, More, InfoAlert } from "../../assets/images";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import useCustomHook from "./actionHandler";
import UserSelector from "../../components/UserSelector";
import AlertBanner from "../../components/AlertBanner";
import { useRecoilState, useResetRecoilState } from "recoil";
import { currentUserState, internshipFilterState, internshipPaginationState } from "../../store";
import "./style.scss";


const Internships = () => {
  const navigate = useNavigate();
  const [notifyBanner, setNotifyBanner] = useState(true);
  const currentUser = useRecoilState(currentUserState);
  const [state, setState] = useState({
    status: undefined,
    value: "",
    showDrawer: false,
  });
  // table pagination states 
  const [tableParams, setTableParams]: any = useRecoilState(internshipPaginationState);
  const resetTableParams = useResetRecoilState(internshipPaginationState);
  const [filter, setFilter] = useRecoilState(internshipFilterState);
  const resetList = useResetRecoilState(internshipFilterState);
  const [loading, setLoading] = useState(true);

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };
  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value && value !== ""));
  };


  const { getAllInternshipsData, allInternshipData,
    getDuplicateInternship, getAllDepartmentData, getAllLocationsData,
    departmentsData, locationsData, deleteInternshipData
  }: any = useCustomHook();

  const internshipData = allInternshipData?.data;
  const managersInternships = internshipData?.filter((item: any) => item?.postedBy === currentUser[0]?.id);

  useEffect(() => {
    getAllDepartmentData();
    getAllLocationsData();
  }, [])

  useEffect(() => {
    let args = removeEmptyValues(filter);
    getAllInternshipsData(args, setLoading);
  }, [filter.search, filter.page]);

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotifyBanner(false);
    }, 4000);

    return () => clearTimeout(timeout);
  }, [managersInternships && managersInternships[0]?.status]);

  const handleDublicate = (id: any) => {
    let args = removeEmptyValues(filter)
    getDuplicateInternship(id, setLoading, args)
  }

  const handleDelete = (id: any) => {
    let args = removeEmptyValues(filter)
    deleteInternshipData(id, setLoading, args)
  }

  const PopOver = (props: any) => {
    const { item } = props;
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() =>
            navigate(ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS + "?status=" + item?.status, { state: { data: item } })}>
            View Details
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a rel="noopener noreferrer" onClick={() => { handleDublicate(item.id) }}>
            Duplicate
          </a>
        ),
      },
    ];
    if (item?.status === "REJECTED" || item?.status === "DRAFT") {
      items.push(
        {
          key: '3',
          label: (
            <a rel="noopener noreferrer" onClick={() => handleDelete(item.id)}>
              Delete
            </a>
          ),
        },
        {
          key: '4',
          label: (
            <a rel="noopener noreferrer"
              onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP, { state: item }) }}>
              Edit
            </a>
          ),
        }
      );
    }

    return (
      <Dropdown className="cursor-pointer" menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
        <More />
      </Dropdown>
    )
  }

  const columns = [
    {
      dataIndex: "no",
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
    },
    {
      dataIndex: "department",
      key: "department",
      title: "Department",
    },
    {
      dataIndex: "posting_date",
      key: "posting_date",
      title: "Posting Date",
    },
    {
      dataIndex: "closing_date",
      key: "closing-_date",
      title: "Closing Date",
    },
    {
      dataIndex: "location",
      key: "location",
      title: "Location",
    },
    {
      dataIndex: "status",
      key: "status",
      title: "Status",
    },
    {
      dataIndex: "posted_by",
      key: "posted_by",
      title: "Posted By",
    },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: 'Actions'
    }
  ]

  const formatRowNumber = (number: number) => {
    return number < 10 ? `0${number}` : number;
  };

  const newTableData = internshipData?.map((item: any, index: number) => {
    const postingDate = dayjs(item?.createdAt).format('DD/MM/YYYY');
    const closingDate = dayjs(item?.closingDate).format('DD/MM/YYYY');
    const currentStatus = item?.status?.toLowerCase()
    return (
      {
        no: <div>{formatRowNumber((params?.page - 1) * params?.limit + index + 1)}</div>,
        title: item?.title,
        department: item?.department?.name,
        posting_date: postingDate,
        closing_date: closingDate === "Invalid Date" || null ? "N/A" : closingDate,
        location: item?.location ? item.location?.name : item?.locationType,
        // location:item?.locationType,
        status:
          <Button
            size="small"
            className={
              `${currentStatus === "published" ?
                `text-success-bg-color`
                :
                currentStatus === "pending" ?
                  `text-warning-bg-color`
                  :
                  currentStatus === "closed" ?
                    `text-info-bg-color`
                    :
                    currentStatus === "rejected" ?
                      `text-error-bg-color`
                      : currentStatus === "draft" ?
                        `text-secondary-bg-disabled-color` : `light-sky-blue-bg`
              }  
                text-[#fff] status-btn`
            }
          >
            {currentStatus?.charAt(0)?.toUpperCase() + currentStatus?.slice(1)}
          </Button>,
        posted_by: <Avatar size={50}
          src={`${constants.MEDIA_URL}/${item?.jobPoster?.profileImage?.mediaId}.${item?.jobPoster?.profileImage?.metaData?.extension}`}>
          {item?.jobPoster?.firstName?.charAt(0)}{item?.jobPoster?.lastName?.charAt(0)}
        </Avatar>,
        actions: <PopOver item={item} />
      }
    )
  })

  const handleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      showDrawer: !state.showDrawer
    }))
  }

  const handleApplyFilter = () => {
    let args = removeEmptyValues(filter);
    getAllInternshipsData(args, setLoading);
    setState((prevState) => ({
      ...prevState,
      showDrawer: false
    }))
  }

  const handleResetFilter = () => {
    let args = removeEmptyValues(filter);;
    args.locationId = undefined;
    args.departmentId = undefined;
    getAllInternshipsData(args, setLoading);
    setFilter((prevState: any) => ({
      ...prevState,
      locationId: undefined,
      departmentId: undefined,
    }));
  }


  const locationFilteredData = locationsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  locationFilteredData.unshift({ key: 'all', value: 'ALL', label: 'All' })

  const departmentsFilteredData = departmentsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  departmentsFilteredData.unshift({ key: 'all', value: 'ALL', label: 'All' })

  const alertsObj: any = {
    PUBLISHED: {
      message: <>Your internship request for <span className="font-bold text-lg">
        {managersInternships && managersInternships[0]?.title}</span> has been approved.</>,
      type: "success",
      action: false
    },
    REJECTED: {
      message: <>Your internship request for <span className="font-bold text-lg">
        {managersInternships && managersInternships[0]?.title}</span> has been declined.</>,
      type: "error",
      action: false
    },
    PENDING: {
      message: <>Your internship request for <span className="font-bold text-lg">
        {managersInternships && managersInternships[0]?.title}</span> is still pending.
        Remind admin to approve your request.</>,
      type: "info",
      action: <Link to="/">
        <InfoAlert />
        <span className="pl-3">Send Reminder</span>
      </Link>
    }
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };
  return (
    <>
      <PageHeader title="Internships" bordered />
      <Row gutter={[20, 20]} className="manager-internships">
        <Col xs={24}>
          {(notifyBanner && managersInternships && managersInternships[0]?.status && managersInternships[0]?.status !== 'CLOSED') && < AlertBanner
            className={(managersInternships && alertsObj[managersInternships[0]?.status]?.type === "success") ? "suc"
              : (managersInternships && alertsObj[managersInternships[0]?.status]?.type === "error") ? "err" : ''}
            type={managersInternships && alertsObj[managersInternships[0]?.status]?.type}
            message={managersInternships && alertsObj[managersInternships[0]?.status]?.message}
            closable
            showIcon={true}
            hasAction
            actions={managersInternships && alertsObj[managersInternships[0]?.status]?.action}
          />}
        </Col>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <SearchBar
            className="search-bar"
            placeholder="Search by title"
            handleChange={(e: any) => setFilter({ ...filter, search: e })}
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <FiltersButton
            label="Filters"
            onClick={handleDrawer} />
          <Drawer
            closable
            open={state.showDrawer}
            onClose={handleDrawer}
            title="Filters">
            <>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <UserSelector
                    label="Location"
                    placeholder="Select"
                    value={filter.locationId}
                    onChange={(event: any) => {
                      setFilter({
                        ...filter,
                        locationId: event,
                      });
                    }}
                    options={locationFilteredData}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <UserSelector
                    label="Department"
                    placeholder="Select"
                    value={filter.departmentId}
                    onChange={(event: any) => {
                      setFilter({
                        ...filter,
                        departmentId: event,
                      });
                    }}
                    options={departmentsFilteredData}
                  />
                </div>
                <div className="flex flex-row gap-3 justify-end">
                  <ButtonThemeSecondary type="default" size="middle" className="button-default-tertiary"
                    onClick={handleResetFilter}>Reset</ButtonThemeSecondary>
                  <ButtonThemePrimary type="primary" size="middle" className="button-tertiary"
                    onClick={handleApplyFilter}>Apply</ButtonThemePrimary>
                </div>
              </div>
            </>
          </Drawer>
          <ButtonThemePrimary
            icon={<InternshipsIcon />}
            onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP); }}>
            New Internship
          </ButtonThemePrimary>
        </Col>
        <Col xs={24}>

          <BoxWrapper>
            <div className="Internships-table">
              <GlobalTable
                columns={columns}
                tableData={newTableData}
                loading={loading}
                pagination={tableParams?.pagination}
                handleTableChange={handleTableChange}
                pagesObj={allInternshipData?.pagination}
              />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </>
  );
};

export default Internships;
