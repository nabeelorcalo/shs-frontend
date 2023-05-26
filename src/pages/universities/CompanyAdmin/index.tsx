import React, { useEffect, useState } from 'react'
import { Select, Row, Col, Input } from 'antd'
import { GlassMagnifier, IconAngleDown } from '../../../assets/images';
import { BoxWrapper, DropDown, Notifications, PageHeader, SearchBar } from '../../../components'
import UniversityTable from './universityTable';
import useCustomHook from './actionHandler';
import DropDownNew from '../../../components/Dropdown/DropDownNew'
import { ThreeDots } from '../../../assets/images'
import { NavLink, useNavigate } from 'react-router-dom'
import './style.scss'
import { ROUTES_CONSTANTS } from '../../../config/constants';

const index: React.FC = () => {
  const [Country, setCountry] = useState("");
  const [searchValue, setSearchValue] = useState("");


  const TableColumn = ['No.', 'Avater', 'University Name', 'Univerity Rep', 'Email', 'Contact', 'City']
  const dropdownValue = ["London", "Bristol", "Manchester", "Oxford", "Belfast"]
  const action = useCustomHook();

  const navigate = useNavigate()
  const { getUniversities, universitiesData, debouncedSearch }: any = useCustomHook();

  useEffect(() => {
    getUniversities(Country, searchValue)
  }, [searchValue])
  
  console.log(searchValue, "searchvale");

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
        dataIndex: 'action',
      },
    ]

  const univertyTableData = universitiesData?.map((item: any, index: number) => {
    return (
      {
        key: index,
        no: universitiesData?.length < 10 && `0${index + 1}`,
        id: item?.id,
        universityName: item?.university?.name,
        universityRep: `${item?.contact?.firstName} ${item?.contact?.lastName}`,
        email: item?.university?.email,
        contact: item?.university?.phoneNumber,
        city: item?.university?.city,
        action: <DropDownNew placement={'bottomRight'}
          items={[
            {
              label:
                <p onClick={() => navigate(`/${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}`, { state: item?.id })}>
                  View Details
                </p>,
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
      }
    )
  })


  const handleChangeSearch = (e: any) => {
    setSearchValue(e)
  };

  return (
    <div className='company-university '>
      <PageHeader title="Universities" actions bordered />
      <Row className="mt-8" gutter={[20, 20]} >
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleChangeSearch} />
          {/* <Input
            className='search-bar'
            placeholder="Search"
            onChange={handleChangeSearch}
            prefix={<GlassMagnifier />}
          /> */}
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className="flex max-sm:flex-col gap-4 justify-end">
          <Select onChange={(e: any) => setCountry(e)} className='md:w-[200px] select' placeholder="Country" suffixIcon={<IconAngleDown />}>
            {universitiesData.map((item: any, index: any) => <Select.Option key={index} value={item.university.country}>{item.university.country}</Select.Option>)}
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