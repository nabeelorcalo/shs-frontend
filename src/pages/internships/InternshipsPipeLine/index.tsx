import { useEffect, useState } from "react";
import { SearchBar, PageHeader, InternshipPipeLineCard, Breadcrumb } from "../../../components";
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DepartmentIcon, LocationIconCm, JobTimeIcon,
  PostedByIcon, EditIconinternships, ClosedStatus, SuccessStatus
} from '../../../assets/images';
import { ROUTES_CONSTANTS } from "../../../config/constants";
import useCustomHook from "../actionHandler";
import { Select, Avatar, Spin, Row, Col } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
import "../style.scss";

const statusArray = [
  {
    status: 'Applied',
    no: 3,
    className: "primary-bg-color"
  },
  {
    status: 'Interviewed',
    no: 5,
    className: "text-link-bg-color"
  },
  {
    status: 'Recommended',
    no: 2,
    className: "purple-bg"
  },
  {
    status: 'OfferLetter',
    no: 4,
    className: "light-purple-bg"
  },
  {
    status: 'Contract',
    no: 1,
    className: "line-bg"
  },
  {
    status: 'Hired',
    no: 5,
    className: "text-success-hover-bg-color"
  }
]

const tempArray = [
  { name: "Pipeline" },
  {
    name: "Internships",
    onClickNavigateTo: `/${ROUTES_CONSTANTS.INTERNSHIPS}`,
  },
];

const InternshipPipeLine = () => {
  dayjs.extend(relativeTime);
  const navigate = useNavigate();
  const { state }: any = useLocation()
  const [states, setState] = useState({
    status: 'Published'
  })
  console.log("data are", state);

  const { getInternshipDetails, internshipDetails, isLoading }: any = useCustomHook()

  useEffect(() => {
    getInternshipDetails()
  }, [])

  console.log('pipeline data is', internshipDetails);


  const myStatus = [
    { label: 'Published', value: 'Published', icon: SuccessStatus },
    { label: 'Closed', value: 'Closed', icon: ClosedStatus }
  ]
  const changeStatus = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      status: event
    }))
  }
  // const jobType = internshipDetails?.internType.replace("_", " ").toLowerCase()


  return (
    <>
      <PageHeader bordered title={<Breadcrumb breadCrumbData={tempArray} />} />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap gap-3 justify-between items-center">
          <div className="flex flex-row ">
            <h3>{internshipDetails?.title}</h3>
            <span className='pl-4 cursor-pointer'
              onClick={() => { navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.NEW_INTERNSHIP}`, { state: state.data }) }}>
              <EditIconinternships />
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <Select
              value={states.status}
              options={myStatus?.map((item: any) => {
                return { value: item.value, label: item?.label }
              })}
              onChange={(event: any) => { changeStatus(event) }}
            />
          </div>
        </div>
        <div>
          <div className='flex flex-row flex-wrap gap-6 max-sm:my-4'>
            <div className='flex flex-row gap-3 items-center'>
              <DepartmentIcon />
              <p>{internshipDetails?.departmentId}</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <JobTimeIcon />
              <p className="capitalize">{internshipDetails?.internType}</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <LocationIconCm />
              <p>{internshipDetails?.locationId}</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <PostedByIcon />
              <p>{internshipDetails?.postedBy}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-between items-center">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar handleChange={() => { }} name="search bar" placeholder="Search" />
          </div>
          <div className="flex flex-row gap-4">
            Total Candidate:
            {internshipDetails?.interns?.length < 10 ?
              `0${internshipDetails?.interns?.length}` : internshipDetails?.interns?.length}
          </div>
        </div>
        {/* <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-4 max-3xl:grid-cols-6 3xl:grid-cols-6 gap-0"> */}
        <Row gutter={[20, 20]}>
          {/* {isLoading ? */}
          {/* { internshipDetails?.map((items: any, index: any) => {
              return ( */}
          <div className="flex flex-row gap-2">
            {statusArray.map((val: any) => {
              return <>
                <div className={`h-5 w-5 rounded ${val.className}`}>
                </div>
                <p>{val.status}</p>
              </>
            })}


          </div>
          <Col xl={5} lg={8} md={12} xs={24} className="">
            <div className="flex flex-row justify-between white-bg-color pipeline-heading-style p-2">

              <div>
                <p className="h-5 w-6 text-sm text-center rounded text-input-bg-color text-teriary-color">
                  {
                    ('0' + internshipDetails?.interns?.filter((value: any) => {
                      return (value.interns?.stage === internshipDetails?.interns?.stage);
                    }).length).slice(-2)
                  }
                </p>
              </div>
            </div>
            <div className=" flex flex-col gap-2 p-2 pipeline-cards-container">
              {
                internshipDetails?.interns?.filter((item: any) => {
                  return (item.stage === internshipDetails?.interns?.stage);
                }).map((item: any, index: any) => {
                  const date = dayjs(item.createdAt); // Replace '2023-05-12' with your desired date
                  const today = dayjs(); // Get the current date
                  const daysAgo = today.diff(date, 'day');

                  return (
                    <>
                      <InternshipPipeLineCard
                        key={index}
                        name={`${item?.interns?.userDetail?.firstName} ${item?.userDetail?.interns?.lastName}`}
                        rating={item.rating}
                        time={`${daysAgo} days ago`}
                        status={item.sage}
                        img={<Avatar size={'small'} icon={<UserOutlined />} />}
                      />
                    </>
                  )
                })
              }
            </div>
          </Col>
          {/* )
            })} */}
          {/* // : <Spin tip="Processing...." />} */}
        </Row>
      </div>
      {/* </div> */}

    </>
  )
}

export default InternshipPipeLine