
import React, { useState } from 'react'
import { BoxWrapper, DropDown, FiltersButton, PageHeader, SearchBar, Drawer, Notifications } from '../../../components'
import Image from '../../../assets/images/Grievances/avater-1.svg'
import useCustomHook from '../actionHandler';
import UniversityRepReportTable from './reportTable';
import Filters from './filter';
import { Col, Row } from 'antd';

const index = () => {
  const action = useCustomHook();
  const TableColumn = ['No.', 'Avater', ' Name', 'Department', 'Company', 'Reviewer']
  const reportTableData = [
    {
      no: '01',
      avater: Image,
      name: "Mino Marina",
      department: 'Design',
      company: 'Power Source',
      reviewer: 'Amilia Clark',
    },
    {
      no: '02',
      name: "Craig Donin",
      avater: Image,
      department: 'Research',
      company: 'DevSpot',
      reviewer: 'Jacob Jones',
    },
    {
      no: '03',
      name: "Gustavo Korsgaard",
      avater: Image,
      department: 'Business',
      company: 'Abacus',
      reviewer: 'Savannah',
    },
    {
      no: '04',
      name: "Omar Schleifer",
      avater: Image,
      department: 'Management',
      company: 'Orcalo Holdings',
      reviewer: 'Albert Flores',
    },
    {
      no: '05',
      avater: Image,
      name: "Adison Donin",
      department: 'Development',
      company: 'Poer Source',
      reviewer: 'Leslie Alexander',

    },
    {
      no: '06',
      name: "Lindsey Mango",
      avater: Image,
      department: 'Development',
      company: 'Poer Source',
      reviewer: 'Wade Warren',

    },
  ]
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  // const [value, setValue] = useState<any>()
  // const [selectedTab, setSelectedTab] = useState<any>(1)
  const handleChange = () => { };
  return (
    <div>
      <PageHeader title="Report" actions bordered />
      <Row gutter={[20,20]}>
        <Col xl={6} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xl={18} md={24} sm={24} xs={24} className='flex max-sm:flex-col justify-end gap-4'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(event, TableColumn, reportTableData, "Report")
              Notifications({ title: "Success", description: "Report list downloaded ", type: 'success' })
            }}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityRepReportTable reportTableData={reportTableData} />
          </BoxWrapper>
        </Col>
      </Row>
      <Drawer
        closable={() => setShowDrawer(false)}
        onClose={() => setShowDrawer(false)}
        title="Filters"
        open={showDrawer}>
        <React.Fragment key=".0">
          <Filters />
        </React.Fragment>
      </Drawer>

    </div>
  )
}

export default index