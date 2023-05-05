import { PageHeader, BoxWrapper, Breadcrumb } from '../../components'
import { Button } from 'antd'
import { RejectedApplicantIcon, HiredIcon, TotalApplicantIcon, EditIcon } from '../../assets/images'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES_CONSTANTS } from '../../config/constants'
import useCustomHook from './actionHandler'
// import '../../scss/global-color/Global-colors.scss'
import './style.scss'
import { useEffect } from 'react'

const tempArray = [
  { name: "Job Details" },
  {
    name: "Internships",
    onClickNavigateTo: `/${ROUTES_CONSTANTS.INTERNSHIPS}`,
  },
];

const ViewInternshipDetails = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const internshipStatus = searchParams.get('status')
  const {getInternshipDetails,internshipDetails} : any = useCustomHook()
  useEffect(() => {
    getInternshipDetails()
  }, [])
  return (
    <>
      <PageHeader bordered title={<Breadcrumb breadCrumbData={tempArray} />} />
      <BoxWrapper>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row justify-between  flex-wrap'>
            <div>
              <h2 className='font-semibold dashboard-primary-color'>
                {internshipDetails.title}
                <span
                  className='pl-4 cursor-pointer'
                  onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS + "/" + ROUTES_CONSTANTS.NEW_INTERNSHIP); }}
                >
                  <EditIcon />
                </span>
              </h2>
              <p className='text-lg'>Design</p>
            </div>
            {internshipStatus == "PUBLISHED" || internshipStatus == "Closed" ?
              <div className='flex flex-row gap-10 flex-wrap'>
                <div className='flex flex-row gap-6'>
                  <TotalApplicantIcon />
                  <p>Total Applicants: <span>03</span></p>
                </div>
                <div className='flex flex-row gap-6'>
                  <HiredIcon />
                  <p>Hired: <span>15</span></p>
                </div>
                <div className='flex flex-row gap-6'>
                  <RejectedApplicantIcon />
                  <p>Rejected: <span>15</span></p>
                </div>
              </div> : null}
          </div>
          <div className='flex flex-col gap-2'>
            <h3>Discription</h3>
            <p>{internshipDetails.description}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>Responsibilities</h3>
            <p>{internshipDetails.responsibilities}</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>Requirments</h3>
            <div className='flex flex-col gap-3'>
              <div>
                <p>{internshipDetails.requirements}</p>
              </div>
              <div className='flex flex-row gap-6'>
                <div className='flex flex-col gap-3'>
                  <p>Internship Type: <span>{internshipDetails.internType}</span></p>
                  <p>Nature of work: <span>{internshipDetails.status}</span></p>
                  <p>Total Positions: <span>{internshipDetails.totalPositions}</span></p>
                  <p>Expected Closing Date: <span>{internshipDetails.closingDate}</span></p>
                  <p>Internship Duration: <span>{internshipDetails.duration}</span></p>
                </div>
                <div className='flex flex-col gap-3'>
                  <p>Frequency: <span>{internshipDetails.salaryFrequency}</span></p>
                  <p>Location: <span>{internshipDetails.locationType}</span></p>
                </div>
              </div>
            </div>
          </div>
          {internshipStatus == "Published" || internshipStatus == "Closed" ?
            <div className="flex flex-row gap-3 justify-end max-sm:flex-col">
              <Button
                type="default"
                className="button-default-tertiary max-sm:w-full"
                onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS) }}
              >
                Back
              </Button>
            </div>
            :
            <div className="flex flex-row gap-3 justify-end max-sm:flex-col">
              <Button
                type="default"
                className="button-default-tertiary max-sm:w-full"
                onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS) }}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="button-tertiary max-sm:w-full"
              >
                Publish
              </Button>
            </div>}
        </div>
      </BoxWrapper>
    </>
  )
}

export default ViewInternshipDetails;
