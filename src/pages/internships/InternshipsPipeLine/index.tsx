import { useEffect, useState } from "react";
import {
  SearchBar,
  PageHeader,
  InternshipPipeLineCard,
  Breadcrumb,
  NoDataFound,
} from "../../../components";
import { useLocation, useNavigate } from 'react-router-dom';
import { DepartmentIcon, LocationIconCm, JobTimeIcon, PostedByIcon, EditIconinternships } from '../../../assets/images'
import { ROUTES_CONSTANTS } from "../../../config/constants";
// import DetailDrawer from "../../candidates/viewDetails";
import useCustomHook from "../actionHandler";
import SelectComp from "../../../components/Select/Select";
import { Avatar,Input } from "antd";
import dayjs from 'dayjs';
import "../style.scss";


const tempArray = [
  { name: "Pipeline" },
  {
    name: "Internships",
    onClickNavigateTo: `/${ROUTES_CONSTANTS.INTERNSHIPS}`,
  },
];

const InternshipPipeLine = () => {
  const navigate = useNavigate();
  const { state }: any = useLocation()
  const [searchValue, setSearchValue] = useState('')
  const [states, setState] = useState({
    status: 'Published',
    isOpen: false,
    userData: {}
  })

  const { getInternshipDetails, internshipDetails,debouncedSearch } = useCustomHook(searchValue);

  useEffect(() => {
    getInternshipDetails()
  }, [searchValue])

  const getStatus = (status: string) => {
    let statusData = internshipDetails?.interns?.filter((obj: any) => obj?.stage?.toLowerCase() === status.toLowerCase());
    return { totalInterns: statusData?.length < 10 ? `0${statusData?.length}` : statusData?.length, statusData }
  }

  const statusArray = [
    {
      data: getStatus('applied').statusData,
      status: 'Applied',
      no: getStatus('applied').totalInterns,
      className: "primary-bg-color"
    },
    {
      data: getStatus('interviewed').statusData,
      status: 'Interviewed',
      no: getStatus('interviewed').totalInterns,
      className: "text-link-bg-color"
    },
    {
      data: getStatus('Recommended').statusData,
      status: 'Recommended',
      no: getStatus('Recommended').totalInterns,
      className: "purple-bg"
    },
    {
      data: getStatus('OfferLetter').statusData,
      status: 'OfferLetter',
      no: getStatus('OfferLetter').totalInterns,
      className: "light-purple-bg"
    },
    {
      data: getStatus('Contract').statusData,
      status: 'Contract',
      no: getStatus('Contract').totalInterns,
      className: "line-bg"
    },
    {
      data: getStatus('Hired').statusData,
      status: 'Hired',
      no: getStatus('Hired').totalInterns,
      className: "text-success-hover-bg-color"
    }
  ]

  const dateFormat = (data: string) => {
    const date = dayjs(data); // Replace '2023-05-12' with your desired date
    const today = dayjs(); // Get the current date
    return `${today.diff(date, 'day')} days ago`;
  }

  const changeStatus = (event: any) => {
    setState((prevState) => ({
      ...prevState,
      status: event
    }))
  }

  const debouncedResults = (event: any) => {
    const { value } = event.target;
    debouncedSearch(value, setSearchValue);
  };
  return (
    <>
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={tempArray} />}
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap gap-3 justify-between items-center">
          <div className="flex flex-row">
            <h3 className="font-medium text-2xl">{internshipDetails?.title}</h3>
            <span
              className='pl-4 cursor-pointer'
              onClick={() => {
                navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.NEW_INTERNSHIP}`,
                  { state: state.data })
              }}
            >
              <EditIconinternships />
            </span>
          </div>
          <SelectComp
            value={states.status}
            options={[
              { label: "Published", value: "published" },
              { label: "Closed", value: "close" },
            ]}
            onChange={(event: any) => { changeStatus(event) }}
          />
        </div>
        <div>
          <div className='flex flex-row flex-wrap gap-6 max-sm:my-4'>
            <div className='flex flex-row gap-3 items-center'>
              <DepartmentIcon />
              <p>{internshipDetails?.department?.name}</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <JobTimeIcon />
              <p className="capitalize">{internshipDetails?.internType?.replace('_', " ").toLowerCase()}</p>
            </div>
            {internshipDetails?.location?.name &&
              <div className='flex flex-row gap-3 items-center'>
                <LocationIconCm />
                <p>{internshipDetails?.location?.name}</p>
              </div>
            }
            <div className='flex flex-row gap-3 items-center'>
              <PostedByIcon />
              <p className="capitalize">{`${internshipDetails?.jobPoster?.firstName} ${internshipDetails?.jobPoster?.lastName}`}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-between items-center">
          <div className="max-sm:w-full md:w-[25%]">
            {/* <SearchBar handleChange={changeHandler} name="search bar" placeholder="Search by name" size="middle" /> */}
            <Input placeholder="search" onChange={debouncedResults} />
          </div>
          <div className="flex flex-row gap-4">
            <span className="font-semibold">Total Candidates:</span>{internshipDetails?.interns?.length < 10 ?
              `0${internshipDetails?.interns?.length}`
              : internshipDetails?.interns?.length}
          </div>
        </div>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-4 max-3xl:grid-cols-6 3xl:grid-cols-6 gap-0">
          {
            statusArray.map((items, index: number) => {
              return (
                <div className="flex flex-col p-2 " key={index}>
                  <div className="flex flex-row justify-between white-bg-color pipeline-heading-style p-2">
                    <div className="flex flex-row gap-2">
                      <div className={`h-5 w-5 rounded ${items.className}`}></div>
                      <p className="text-primary-title-color font-medium">{items.status}</p>
                    </div>
                    <div>
                      <p className="h-5 w-6 text-sm text-center rounded text-input-bg-color text-teriary-color">
                        {items?.no}
                      </p>
                    </div>
                  </div>
                  {items?.data?.length > 0 ? <div className=" flex flex-col gap-2 p-2 pipeline-cards-container">
                    {
                      items?.data?.map((item: any, i: number) => (
                        <>
                          {items?.data ?
                            <InternshipPipeLineCard
                              key={i}
                              name={`${item?.userDetail?.firstName} ${item?.userDetail?.lastName}`}
                              rating={item?.rating}
                              time={dateFormat(item?.createdAt)}
                              status={item?.stage}
                              img={<Avatar size={50} src={item?.avatar}>
                                {item?.userDetail?.firstName?.charAt(0)}{item?.userDetail?.lastName?.charAt(0)}
                              </Avatar>}
                              handleUserClick={() => { setState({ ...states, isOpen: !states.isOpen, userData: item }) }}
                            /> : <NoDataFound />
                          }
                        </>
                      ))
                    }
                  </div>
                    :
                    <NoDataFound />
                  }
                </div>
              )
            })
          }
        </div>
      </div>
      {/* <DetailDrawer 
      // userData={states.userData} 
      open={states.isOpen} 
      setOpen={() => setState({ ...states, isOpen: !states.isOpen })} 
      /> */}
    </>
  )
}

export default InternshipPipeLine