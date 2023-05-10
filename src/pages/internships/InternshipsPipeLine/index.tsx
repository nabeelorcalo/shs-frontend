import {
  SearchBar,
  PageHeader,
  InternshipPipeLineCard,
  Breadcrumb,
  DropDown
} from "../../../components";
import "../style.scss";
import { useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { DepartmentIcon, LocationIconCm, JobTimeIcon, PostedByIcon, EditIconinternships } from '../../../assets/images'
import { ROUTES_CONSTANTS, STATUS_CONSTANTS } from "../../../config/constants";
import { useState } from "react";

const { ACTIVE, PENDING, CLOSED, REJECTED } = STATUS_CONSTANTS

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
const cardArray = [
  {
    name: "Jane Cooper",
    rating: 4,
    time: "2 days ago",
    status: "Applied",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },
  {
    name: "Jane Cooper",
    rating: 4,
    time: "2 days ago",
    status: "Applied",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },

  {
    name: "Roman Akhmervo",
    rating: 2,
    time: "2 days ago",
    status: "Hired",
    img: "https://faces-img.xcdn.link/image-lorem-face-5896.jpg"
  },
  {
    name: "janen gooper",
    rating: 4,
    time: "2 days ago",
    status: "Contract",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },
  {
    name: "Jane swister",
    rating: 5,
    time: "2 days ago",
    status: "Interviewed",
    img: "https://faces-img.xcdn.link/image-lorem-face-975.jpg"
  },
  {
    name: "Laura gail",
    rating: 4,
    time: "2 days ago",
    status: "Recommended",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },
  {
    name: "Leopard cris",
    rating: 1,
    time: "2 days ago",
    status: "Recommended",
    img: "https://faces-img.xcdn.link/image-lorem-face-1903.jpg"
  },
  {
    name: "Dineo meno",
    rating: 2,
    time: "2 days ago",
    status: "Hired",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },
  {
    name: "Clonde filte",
    rating: 4,
    time: "2 days ago",
    status: "OfferLetter",
    img: "https://faces-img.xcdn.link/image-lorem-face-262.jpg"
  },
  {
    name: "loversa tripe",
    rating: 1,
    time: "2 days ago",
    status: "Contract",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },
  {
    name: "Nicobe mobal",
    rating: 3,
    time: "2 days ago",
    status: "OfferLetter",
    img: "https://faces-img.xcdn.link/image-lorem-face-569.jpg"
  },
  {
    name: "diverdentine stlo",
    rating: 5,
    time: "2 days ago",
    status: "Applied",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },
  {
    name: "Desgino modu",
    rating: 1,
    time: "2 days ago",
    status: "Applied",
    img: "https://faces-img.xcdn.link/image-lorem-face-4370.jpg"
  },
  {
    name: "Laiq faild",
    rating: 3,
    time: "2 days ago",
    status: "Interviewed",
    img: "https://faces-img.xcdn.link/image-lorem-face-1196.jpg"
  },
  {
    name: "turba droped",
    rating: 2,
    time: "2 days ago",
    status: "Recommended",
    img: "https://faces-img.xcdn.link/image-lorem-face-5543.jpg"
  },
  {
    name: "calse doplin",
    rating: 5,
    time: "2 days ago",
    status: "Applied",
    img: "https://faces-img.xcdn.link/image-lorem-face-5750.jpg"
  },
  {
    name: "lowang eenal",
    rating: 1,
    time: "2 days ago",
    status: "Hired",
    img: "https://faces-img.xcdn.link/image-lorem-face-3621.jpg"
  },
]
const tempArray = [
  { name: "Pipeline" },
  {
    name: "Internships",
    onClickNavigateTo: `/${ROUTES_CONSTANTS.INTERNSHIPS}`,
  },
];

const InternshipPipeLine = () => {
  const navigate = useNavigate()
  const [state, setState] = useState({
    status: 'Publshed'
  })
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const changeStatus = (event: any) => {
    const value = event.target.innerHTML
    setState((prevState) => ({
      ...prevState,
      status: value
    }))
  }
  return (
    <>
      <PageHeader
        bordered
        title={<Breadcrumb breadCrumbData={tempArray} />}
      />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row flex-wrap gap-3 justify-between items-center">
          <div className="flex flex-row ">
            <h3>UI/UX Designer</h3>
            <span
              className='pl-4 cursor-pointer'
              onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS + "/" + ROUTES_CONSTANTS.NEW_INTERNSHIP + '?id=1'); }}
            >
              <EditIconinternships />
            </span>
          </div>
          <div className="flex flex-row gap-4">
            <DropDown
              value={state.status}
              options={[
                "Published",
                "Closed"
              ]}
              setValue={() => { changeStatus(event) }}
            />
          </div>
        </div>
        <div>
          <div className='flex flex-row flex-wrap gap-6 max-sm:my-4'>
            <div className='flex flex-row gap-3 items-center'>
              <DepartmentIcon />
              <p>Design</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <JobTimeIcon />
              <p>Full Time</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <LocationIconCm />
              <p>London, United Kingdom</p>
            </div>
            <div className='flex flex-row gap-3 items-center'>
              <PostedByIcon />
              <p>Amelia Carl</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-3 justify-between items-center">
          <div className="max-sm:w-full md:w-[25%]">
            <SearchBar handleChange={() => { }} name="search bar" placeholder="Search by name" size="middle" />
          </div>
          <div className="flex flex-row gap-4">
            Total Candidate: {cardArray.length}
          </div>
        </div>
        <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-3 max-2xl:grid-cols-4 max-3xl:grid-cols-6 3xl:grid-cols-6 gap-0">
          {
            statusArray.map((items, idx) => {
              return (
                <div className="flex flex-col p-2 ">
                  <div key={idx} className="flex flex-row justify-between white-bg-color pipeline-heading-style p-2">
                    <div className="flex flex-row gap-2">
                      <div className={`h-5 w-5 rounded ${items.className}`}></div>
                      <p>{items.status}</p>
                    </div>
                    <div>
                      <p className="h-5 w-6 text-sm text-center rounded text-input-bg-color text-teriary-color">
                        {
                          ('0' + cardArray.filter((value) => {
                            return (value.status === items.status);
                          }).length).slice(-2)
                        }
                      </p>
                    </div>
                  </div>
                  <div className=" flex flex-col gap-2 p-2 pipeline-cards-container">
                    {
                      cardArray.filter((item) => {
                        return (item.status === items.status);
                      }).map((items, idx) => {
                        return (
                          <>
                            <InternshipPipeLineCard
                              key={idx}
                              name={items.name}
                              rating={items.rating}
                              time={items.time}
                              status={items.status}
                              img={items.img}
                            />
                          </>
                        )
                      })
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default InternshipPipeLine