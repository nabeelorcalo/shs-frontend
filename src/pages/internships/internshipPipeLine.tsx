import {
  SearchBar,
  PageHeader,
  InternshipPipeLineCard
} from "../../components";
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { Select, Divider } from 'antd';
import { DepartmentIcon, LocationIconCm, JobTimeIcon, PostedByIcon } from '../../assets/images'
import { STATUS_CONSTANTS } from "../../config/constants";

const { ACTIVE, PENDING, CLOSED, REJECTED } = STATUS_CONSTANTS

const statusArray = [
  {
    status: 'Applied',
    no: 3
  },
  {
    status: 'Interviewed',
    no: 5
  },
  {
    status: 'Recommended',
    no: 2
  },
  {
    status: 'Offer Letter',
    no: 4
  },
  {
    status: 'Contract',
    no: 1
  },
  {
    status: 'Hired',
    no: 5
  }
]


const InternshipPipeLine = () => {
  const navigate = useNavigate()

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <>
      <PageHeader title="Internships Pipeline" />
      <Divider />
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <h3>UI/UX Designer</h3>
          <div className="flex flex-row gap-4">
            <Select
              defaultValue="Published"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 'Published', label: 'Published' },
                { value: 'Closed', label: 'Closed' },
              ]}
            />
          </div>
        </div>
        <div>
          <div className='flex flex-row gap-6'>
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
        <div className="flex flex-row justify-between items-center">
          <SearchBar
            className=""
            handleChange={() => { }}
            name="search bar"
            placeholder="search"
            size="middle"
          />
          <div className="flex flex-row gap-4">
            Total Candidate: 40
          </div>
        </div>
        <div className="flex flex-row gap-4 justify-between">
          {
            statusArray.map((item, idx) => {
              return (
                <div className="w-full flex flex-col gap-3">
                  <div key={idx} className="flex flex-row justify-between white-bg-color border-2 border-solid border-[#e2e2e2] p-2 rounded-lg">
                    <div className="flex flex-row gap-2">
                      <div className="h-5 w-5 rounded text-off-white-bg-color"></div>
                      <p>{item.status}</p>
                    </div>
                    <div>
                      <div className="h-5 w-5 rounded text-off-white-bg-color">02</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">

                    {
                      Array(item.no).fill(item.no).map((items, idx) => {
                        return (
                          <InternshipPipeLineCard key={idx} />
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