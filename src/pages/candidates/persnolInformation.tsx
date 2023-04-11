import { Col, Divider, Row } from 'antd'

const PersnolInformationData = [
  { title: 'First name', value: 'Phylis' },
  { title: 'Last Name', value: 'Godley' },
  { title: 'Gender', value: 'Female' },
  { title: 'Date of Birth', value: '21stApril,1996' },
  { title: 'Place of Birth', value: 'London,United Kingdom' },
  { title: 'Nationality', value: 'British' },
  { title: 'Persnol Email', value: 'phylis@gmail.com' },
  { title: 'Phone Number', value: '+44 7700 900077' },
  { title: 'national Insurance Number', value: 'AB12356A' },
  { title: 'Visa Status', value: 'Post Study Work Visa PSW ' },
]
const AcademicData = [
  { title: 'University', value: 'Imperial College London' },
  { title: 'Course', value: 'Creatice Design' },
  { title: 'University Email', value: 'maria.sanaid@icl.co.uk' },
  { title: 'Post Code', value: 'SG121HW' },
  { title: 'Address', value: '263 Eversholt' },
  { title: 'City', value: 'London' },
  { title: 'Country', value: 'United Kingdom' },
  { title: 'University Contact Name ', value: 'Albert John' },
  { title: 'Universty Contact Phone', value: '+44 20 7589 5111' },
  { title: 'Internship Start Date', value: '01/01/2022' },
  { title: 'Internship End Date', value: '30/12/2022' },
  { title: 'Internship Duration', value: '12 months' },
]


const PersnolInformation = () => {
  return (
    <div className='persnol-main'>
      <p className='persnol-para mb-4'>Personal Details</p>
      <Row gutter={[30, 20]}>
        {PersnolInformationData.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className='personal-information-wrap'>
              <h2 className='m-0 font-medium text-base title'>{item.title}</h2>
              <p className='m-0'>{item.value}</p>
            </div>
          </Col>
        ))}
      </Row>

      <Divider type='horizontal' />
      <div className='personal-heading'>
        <p className='persnol-para mb-4'>About Me</p>
        <p className='persnol-para-text mt-2'>I'm Maria Sanoid, and I know I can help your company create stunning visuals. As someone who has studied in marketing and graphic design for last four years, I understand what brands need to capture their audiences' attention. With my intuitive design skills and knack for marketing, I have the right background for your company's needs.
          While marketing and graphic design are my two passions, I also enjoy surfing, doing crosswords and exploring the world. I am insanely curious about different cultures, so you'll also find my nose buried in a book or travel blog.</p>
      </div>

      <Divider type='horizontal' />

      <div className='acedmic-details'>
        <p className='persnol-para mb-4'>Academic Details</p>

        <Row gutter={[30, 20]}>
          {AcademicData.map((item: any) => (
            <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
              <div className='personal-information-wrap '>
                <h2 className='m-0 font-medium text-base title'>{item.title}</h2>
                <p className='m-0'>{item.value}</p>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default PersnolInformation
