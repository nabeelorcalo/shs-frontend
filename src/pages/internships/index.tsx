import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  GlobalTable, PageHeader,
  BoxWrapper, FiltersButton, Loader
} from "../../components";
import Drawer from "../../components/Drawer";
import { Avatar, Button, Dropdown, Row, Col, Input } from "antd";
import type { MenuProps } from 'antd';
import { GlassMagnifier, InternshipsIcon, More, InfoAlert } from "../../assets/images";
import { ROUTES_CONSTANTS } from "../../config/constants";
import useCustomHook from "./actionHandler";
import UserSelector from "../../components/UserSelector";
import AlertBanner from "../../components/AlertBanner";
import "./style.scss";


const Internships = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [state, setState] = useState({
    status: undefined,
    value: "",
    showDrawer: false,
    location: undefined,
    department: undefined
  })

  const { getAllInternshipsData, internshipData,
    getDuplicateInternship, getAllDepartmentData, getAllLocationsData,
    departmentsData, locationsData, debouncedSearch, isLoading,
    deleteInternshipData
  } = useCustomHook();

  useEffect(() => {
    getAllDepartmentData();
    getAllLocationsData();
  }, [])

  useEffect(() => {
    getAllInternshipsData(state, searchValue);
  }, [searchValue])

  const handleDublicate = (id: any) => {
    getDuplicateInternship(id)
  }

  const handleDelete = (id: any) => {
    deleteInternshipData(id)
  }

  const PopOver = (props: any) => {
    const { item } = props;
    const items: MenuProps['items'] = [
      {
        key: '1',
        label: (
          <a rel="noopener noreferrer" onClick={() =>
            navigate(ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS, { state: { data: item } })}>
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
      <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight" overlayStyle={{ width: 180 }}>
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

  const newTableData = internshipData?.map((item: any, index: number) => {
    const postingDate = dayjs(item?.createdAt).format('DD/MM/YYYY');
    const closingDate = dayjs(item?.closingDate).format('DD/MM/YYYY');
    const currentStatus = item?.status?.toLowerCase()
    return (
      {
        no: internshipData?.length < 10 ? `0${index + 1}` : `${index + 1}`,
        title: item?.title,
        department: item?.department?.name,
        posting_date: postingDate,
        closing_date: closingDate,
        // location: item?.location ? item.location?.name : "___",
        location: item?.locationType,
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
        posted_by: <Avatar size={50} src={item?.avatar}>
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

  const updateLocation = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      location: event
    }))
  }

  const updateDepartment = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      department: event
    }))
  }
  const handleApplyFilter = () => {
    getAllInternshipsData(state, searchValue);
    setState((prevState) => ({
      ...prevState,
      showDrawer: false
    }))
  }
  const handleResetFilter = () => {
    setState((prevState) => ({
      ...prevState,
      status: undefined,
      location: undefined,
      department: undefined
    }))
  }
  // handle search internships 
  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  const locationFilteredData = locationsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  locationFilteredData.unshift({ key: 'all', value: 'All', label: 'All' })

  const departmentsFilteredData = departmentsData?.map((item: any, index: any) => {
    return (
      {
        key: index,
        value: item?.id,
        label: item?.name
      }
    )
  })
  departmentsFilteredData.unshift({ key: 'all', value: 'All', label: 'All' })

  return (
    <>
      <PageHeader title="Internships" bordered />
      <Row gutter={[20, 20]} className="manager-internships">
        <Col xs={24}>
          <AlertBanner
            className='my-2 py-3'
            type='info'
            message='Your internship request for Content Writer is still pending. Remind admin to approve your request.'
            showIcon={true}
            actions={
              <Link to="/">
                <InfoAlert />
                <span className="pl-3">Send Reminder</span>
              </Link>
            }
          />
          <AlertBanner
            className='my-2 py-3'
            type='error'
            message='Your internship request for Content Writer has been declined.'
            showIcon
          />
          <AlertBanner
            className="py-3"
            message="Your internship request for Content Writer has been approved."
            type="success"
            showIcon
          />
        </Col>
        <Col xl={6} lg={9} md={24} sm={24} xs={24} className="input-wrapper">
          <Input
            className='search-bar'
            placeholder="Search by title"
            onChange={debouncedResults}
            prefix={<GlassMagnifier />}
          />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <FiltersButton
            label="Filters"
            onClick={handleDrawer}
          />
          <Drawer
            closable
            open={state.showDrawer}
            onClose={handleDrawer}
            title="Filters"
          >
            <>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <UserSelector
                    label="Location"
                    placeholder="Select"
                    value={state.location}
                    onChange={(event: any) => { updateLocation(event) }}
                    options={locationFilteredData}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <UserSelector
                    label="Department"
                    placeholder="Select"
                    value={state.department}
                    onChange={(event: any) => { updateDepartment(event) }}
                    options={departmentsFilteredData}
                  />
                </div>
                <div className="flex flex-row gap-3 justify-end">
                  <Button type="default" size="middle" className="button-default-tertiary"
                    onClick={handleResetFilter}>Reset</Button>
                  <Button type="primary" size="middle" className="button-tertiary"
                    onClick={handleApplyFilter}>Apply</Button>
                </div>
              </div>
            </>
          </Drawer>
          <Button
            type="primary"
            size="middle"
            icon={<InternshipsIcon />}
            className="button-tertiary"
            onClick={() => { navigate(ROUTES_CONSTANTS.NEW_INTERNSHIP); }}
          >
            New Internship
          </Button>
        </Col>
        <Col xs={24}>
          {isLoading ?
            <BoxWrapper>
              <div className="Internships-table">
                <GlobalTable columns={columns} tableData={newTableData} />
              </div>
            </BoxWrapper> : <Loader />}
        </Col>
      </Row>
    </>
  );
};

export default Internships;
