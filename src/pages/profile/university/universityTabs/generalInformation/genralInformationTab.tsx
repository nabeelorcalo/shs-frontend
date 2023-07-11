import { useEffect } from 'react'
import dayjs from 'dayjs'
import { Row, Col, Divider } from 'antd'
import { useParams } from 'react-router-dom'
import useCustomHook from '../../../actionHandler'
import { useRecoilState } from 'recoil'
import { studentProfileState } from '../../../../../store'

const GenralInformationTab = () => {
  let params = useParams()
  const action = useCustomHook()
  const generalInformation = useRecoilState<any>(studentProfileState)

  const firstName = generalInformation[0]?.general?.userUniversity?.contact?.firstName
  const lastName = generalInformation[0]?.general?.userUniversity?.contact?.lastName

  useEffect(() => {
    action.getStudentProfile(params?.id)
  }, [])

  const PersnolInformationData = [
    {
      title: 'University',
      value: generalInformation[0]?.general?.userUniversity?.university?.name
    },
    {
      title: 'Course',
      value: generalInformation[0]?.general?.course
        ? generalInformation[0]?.general?.course
        : 'N/A'
    },
    {
      title: 'University Email',
      value: generalInformation[0]?.general?.userUniversity?.university?.email
    },
    {
      title: 'Post Code',
      value:
        generalInformation[0]?.general?.userUniversity?.university?.postCode
    },
    {
      title: 'Address',
      value: generalInformation[0]?.general?.userUniversity?.university?.address
    },
    {
      title: 'City',
      value: generalInformation[0]?.general?.userUniversity?.university?.city
    },
    {
      title: 'Country',
      value: generalInformation[0]?.general?.userUniversity?.university?.country
    },
    {
      title: 'University Contact Name',
      value: firstName + ' ' + lastName
    },
    {
      title: 'University Contact Phone',
      value: generalInformation[0]?.general?.userUniversity?.contact?.phoneNumber
    },
    {
      title: 'Internship Start Date',
      value: dayjs(generalInformation[0]?.general?.internshipStartDate).format('DD MMMM, YYYY')
    },
    {
      title: 'Internship End Date',
      value: dayjs(generalInformation[0]?.general?.internshipEndDate).format('DD MMMM, YYYY' )
    },
    {
      title: 'Internship Duration',
      value: generalInformation[0]?.general?.internshipDuration
        ? generalInformation[0]?.general?.internshipDuration
        : 'N/A'
    },
    {
      title: 'Loan Details',
      value: generalInformation[0]?.general?.loanDetails
    },
    {
      title: 'Work History',
      value: generalInformation[0]?.general?.workHistory
    }
  ]

  const Address = [
    { title: 'Name', value: 'HSBC Holdings' },
    { title: 'Phone', value: 'Maria Sanoid' },
    { title: 'Relationship', value: '002-0805412-003' },
    { title: 'Street', value: '263 Eversholt' },
    { title: 'City', value: 'London' },
    { title: 'Post Code', value: 'SG12 1HW' }
  ]
  const countryData = [
    {
      title: 'Name',
      value: generalInformation[0]?.general?.emergencyContactName
    },
    {
      title: 'Phone',
      value: generalInformation[0]?.general?.emergencyContactPhoneNumber
    },
    {
      title: 'RelationShip',
      value: generalInformation[0]?.general?.emergencyContactRelationship
    },
    {
      title: 'Street',
      value: generalInformation[0]?.general?.emergencyContactAddress
    },
    {
      title: 'City',
      value: generalInformation[0]?.general?.emergencyContactCity
    },
    {
      title: 'Post Code',
      value: generalInformation[0]?.general?.emergencyContactPostCode
    },
    {
      title: 'Country',
      value: generalInformation[0]?.general?.emergencyContactCountry
    }
  ]
  return (
    <div>
      <p className='text-primary-color font-semibold text-xl mb-4'>
        Academic Details
      </p>
      <Row gutter={[30, 20]}>
        {PersnolInformationData.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className='personal-information-wrap text-primary-color'>
              <h2 className='m-0 text-base  title font-medium'>{item.title}</h2>
              <p className='m-0 text-teriary-color text-lg'>{item.value}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Divider type='horizontal' />
      <p className='text-primary-color font-semibold text-xl mb-4'>
        Bank Details
      </p>
      <Row gutter={[30, 20]}>
        {Address.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className='personal-information-wrap '>
              <h2 className='m-0 text-base  title font-medium title'>
                {item.title}
              </h2>
              <p className='m-0 text-teriary-color text-lg'>{item.value}</p>
            </div>
          </Col>
        ))}
      </Row>
      <Divider type='horizontal' />
      <p className='text-primary-color font-semibold text-xl mb-4'>
        Emergency Contact
      </p>
      <Row gutter={[30, 20]}>
        {countryData.map((item: any) => (
          <Col xl={8} lg={8} md={8} sm={12} xs={24} key={item.id}>
            <div className='personal-information-wrap '>
              <h2 className='m-0 text-base title font-medium title'>
                {item.title}
              </h2>
              <p className='m-0 text-teriary-color text-lg'>{item.value}</p>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default GenralInformationTab
