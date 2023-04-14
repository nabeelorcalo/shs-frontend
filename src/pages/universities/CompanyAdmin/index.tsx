import React, { useState } from 'react'
import { Select,Row,Col } from 'antd'
import { IconAngleDown } from '../../../assets/images';
import { BoxWrapper, DropDown, Notifications, PageHeader, SearchBar } from '../../../components'
import flag from '../../../assets/images/universities/flag.svg'
import flag2 from '../../../assets/images/universities/flag2.svg'
import flag3 from '../../../assets/images/universities/flag3.svg'
import flag4 from '../../../assets/images/universities/flag4.svg'
import flag5 from '../../../assets/images/universities/flag5.svg'
import flag6 from '../../../assets/images/universities/flag6.svg'
import UniversityTable from './universityTable';
import useCustomHook from './actionHandler';
import './style.scss'

const index: React.FC = () => {
  const TableColumn = ['No.', 'Avater', 'University Name', 'Univerity Rep', 'Email', 'Contact', 'City']
  const escalatedByMeTableData = [
    {
      no: '01',
      logo: flag,
      universityName: 'University of Lincoln',
      universityRep: 'Mino Marina',
      email: 'enquiries@linclon.ac.uk',
      contact: '+44 7700 900077',
      city: 'Linclon',
    },
    {
      no: '02',
      logo: flag2,
      universityName: 'University of London',
      universityRep: 'Craig Donin',
      email: 'enquiries@london.ac.uk',
      contact: '+44 2078 628009',
      city: 'London',
    },
    {
      no: '03',
      logo: flag3,
      universityName: 'University of Birmingham',
      universityRep: 'Omar Schleifer',
      email: 'enquiries@birmingham.ac.uk',
      contact: '+44 2078 628009',
      city: 'Birmingham',
    },
    {
      no: '04',
      logo: flag4,
      universityName: 'University of Lincoln',
      universityRep: 'Mino Marina',
      email: 'enquiries@linclon.ac.uk',
      contact: '+44 7700 900077',
      city: 'Linclon',
    },
    {
      no: '05',
      logo: flag5,
      universityName: 'University of London',
      universityRep: 'Craig Donin',
      email: 'enquiries@london.ac.uk',
      contact: '+44 2078 628009',
      city: 'London',
    },
    {
      no: '06',
      logo: flag6,
      universityName: 'University of Birmingham',
      universityRep: 'Omar Schleifer',
      email: 'enquiries@birmingham.ac.uk',
      contact: '+44 2078 628009',
      city: 'Birmingham',
    },

  ]
  const dropdownValue = ["London", "Bristol", "Manchester", "Oxford", "Belfast"]
  const action = useCustomHook();
  const [value, setValue] = useState<any>()
  const handleChange = () => { };
  return (
    <div className='company-university '>
      <PageHeader title="Universities" actions bordered />
      <Row className="mt-8" gutter={[20, 20]} >
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleChange} />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24} className="flex gap-4 md:justify-end" >
          <Select className='w-[200px] select' placeholder="Country" suffixIcon={<IconAngleDown />}>
            {dropdownValue.map((item , index)=><Select.Option key={index} value={item}>{item}</Select.Option> )}
          
          </Select>
          <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              setValue={()=>{action.downloadPdfOrCsv(event,TableColumn,escalatedByMeTableData,"Report" )
              Notifications({title:"Success", description:"University list downloaded ",type:'success'})}}
            />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityTable escalatedByMeTableData={escalatedByMeTableData}  />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}
export default index