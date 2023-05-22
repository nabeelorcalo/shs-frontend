import React, { useEffect, useState } from 'react'
import { Select, Row, Col } from 'antd'
import { IconAngleDown } from '../../../assets/images';
import { BoxWrapper, DropDown, Notifications, PageHeader, SearchBar } from '../../../components'
import UniversityTable from './universityTable';
import useCustomHook from './actionHandler';
import DropDownNew from '../../../components/Dropdown/DropDownNew'
import { ThreeDots } from '../../../assets/images'
import { NavLink } from 'react-router-dom'
import './style.scss'
import { ROUTES_CONSTANTS } from '../../../config/constants';

const index: React.FC = () => {
  const [Country,setCountry]=useState("");
  const TableColumn = ['No.', 'Avater', 'University Name', 'Univerity Rep', 'Email', 'Contact', 'City']
  const dropdownValue = ["London", "Bristol", "Manchester", "Oxford", "Belfast"]
  const action = useCustomHook();

  const { getUniversities, universitiesData }: any = useCustomHook();

  useEffect(() => {
    getUniversities(Country)
  }, [])


  const UniversityTableColumn =
    [
      {
        dataIndex: 'no',
        key: 'no',
        title: 'No'
      },
      {
        dataIndex: 'logo',
        key: 'logo',
        title: 'Logo',
        render: (logo: any) => {
          return {
            children: (
              <img src={logo} alt="logo" />
            )
          }
        }
      },
      {
        dataIndex: 'universityName',
        key: 'universityName',
        title: 'University Name'
      },
      {
        dataIndex: 'universityRep',
        key: 'universityRep',
        title: 'University Rep'
      },
      {
        dataIndex: 'email',
        key: 'email',
        title: 'Email'
      },
      {
        dataIndex: 'contact',
        key: 'contact',
        title: 'Contact'
      },
      {
        dataIndex: 'city',
        key: 'city',
        title: 'City',
      },
      {
        title: 'Action',
        dataIndex: '',
        render: (_: any, data: any) => <DropDownNew placement={'bottomRight'}
          items={[
            {
              label:
                <NavLink to={`/${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}`}>
                  View Details
                </NavLink>,
              key: 'interns'
            },
            {
              label:
                <NavLink to={`/${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`}>
                  Profile
                </NavLink>,
              key: 'profile'
            },
            {
              label: <NavLink to={`/${ROUTES_CONSTANTS.CHAT}`}>
                Chat
              </NavLink>,
              key: 'chat'
            }
          ]}>
          <ThreeDots className='cursor-pointer' />
        </DropDownNew>
      },
    ]

  const univertyTableData = universitiesData?.map((item: any, index: number) => {
    return (
      {
        key: index,
        no: universitiesData?.length < 10 && `0${index + 1}`,
        universityName: item?.name,
        email: item?.email,
        contact: item?.phoneNumber,
        city: item?.city,
      }
    )
  })

  const handleChange = () => { };

  return (
    <div className='company-university '>
      <PageHeader title="Universities" actions bordered />
      <Row className="mt-8" gutter={[20, 20]} >
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleChange} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <Select onChange={(e: any) => setCountry(e)} className='md:w-[200px] select' placeholder="Country" suffixIcon={<IconAngleDown />}>
            {dropdownValue.map((item, index) => <Select.Option key={index} value={item}>{item}</Select.Option>)}
          </Select>
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(event, UniversityTableColumn, univertyTableData, "Report")
              Notifications({ title: "Success", description: "University list downloaded ", type: 'success' })
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityTable UniversityTableColumn={UniversityTableColumn} univertyTableData={univertyTableData} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}
export default index