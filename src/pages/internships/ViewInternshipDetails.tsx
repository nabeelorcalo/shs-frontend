import { PageHeader, BoxWrapper, Breadcrumb } from '../../components'
import { Button, Space } from 'antd'
import './style.scss'
import '../../scss/global-color/Global-colors.scss'
import { RejectedApplicantIcon, HiredIcon, TotalApplicantIcon, DownloadDocumentIcon, EditIcon } from '../../assets/images'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ROUTES_CONSTANTS } from '../../config/constants'

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
  console.log(internshipStatus)
  return (
    <>
      <PageHeader
        actions
        bordered
        title={<Breadcrumb bordered breadCrumbData={tempArray} />}
      >
        <Space wrap>
          <div className='p-2 download-icon-style text-input-bg-color'>
            <DownloadDocumentIcon />
          </div>
        </Space>
      </PageHeader>
      <BoxWrapper>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row justify-between  flex-wrap'>
            <div>
              <h2
                className='font-semibold dashboard-primary-color'
              >
                UI/UX Designer
                <span className='pl-4' onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS + "/" + ROUTES_CONSTANTS.NEW_INTERNSHIP); }}><EditIcon /></span></h2>
              <p className='text-lg'>Design</p>
            </div>
            {internshipStatus == "Published" || internshipStatus == "Closed" ?
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
            <p>We are looking for a talented individual to build user experiences through intuitive, user-centered design. You will be responsible for conceptualizing and delivering new feature designs and producing the required assets necessary for the implementation of those designs. Besides the new feature work, you will also work to improve existing products. You will need hands-on experience going through the design ideation process, from inception to the final product along with a graphic design skillset to produce the final assets.</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>Responsibilities</h3>
            <p>Act as a strategic thought partner to the product, design and development teams.</p>
            <p>Lead the design of useful, usable, and desirable products and solution</p>
            <p>Own the end-to-end process for user research, wireframing, prototyping, testing, mockups, final design and implementation.</p>
            <p>Design complex navigation flows. Turn functional requirements into simple user journeys.</p>
            <p>Establish and promote UX/UI design guidelines, best practices and standards based on user behavior.</p>
            <p>Works within the product team, reporting directly to the product owner</p>
          </div>
          <div className='flex flex-col gap-2'>
            <h3>Requirments</h3>
            <div className='flex flex-col gap-3'>
              <div>
                <p>Strong written and oral communication skills</p>
                <p>Ability to collaborate well on a team</p>
                <p>Can deliver solutions independently</p>
                <p>Able to see the big picture</p>
              </div>
              <div className='flex flex-row gap-6'>
                <div className='flex flex-col gap-3'>
                  <p>Internship Type: <span>Paid</span></p>
                  <p>Nature of work: <span>On Site</span></p>
                  <p>Total Positions: <span>10</span></p>
                  <p>Expected Closing Date: <span>22/11/2022</span></p>
                  <p>Internship Duration: <span>6 Months</span></p>
                </div>
                <div className='flex flex-col gap-3'>
                  <p>Frequency: <span>$ 200/ month</span></p>
                  <p>Location: <span>United Kingdom</span></p>
                </div>
              </div>
            </div>
          </div>
          {internshipStatus == "Published" || internshipStatus == "Closed" ?
            <div className="flex flex-row gap-3 justify-end max-sm:flex-col">
              <Button
                type="default"
                className="button-default-tertiary max-sm:w-full"
                onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS)}}
              >
                Back
              </Button>
            </div>
            :
            <div className="flex flex-row gap-3 justify-end max-sm:flex-col">
              <Button
                type="default"
                className="button-default-tertiary max-sm:w-full"
                onClick={() => { navigate("/" + ROUTES_CONSTANTS.INTERNSHIPS)}}
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
