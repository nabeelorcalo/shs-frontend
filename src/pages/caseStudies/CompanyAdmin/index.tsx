
import React, { useState } from 'react'
import { BoxWrapper, Drawer, DropDown, FiltersButton, Notifications, PageHeader, SearchBar } from '../../../components'
import Image from '../../../assets/images/Grievances/avater-1.svg';
import CaseStudiesTable from '../Common/caseStudiesTable';
import Filters from '../Common/filter';
import useCustomHook from '../actionHandler';
import { Row, Col } from 'antd';
import './style.scss'

const index = () => {
  const caseStudyTableData = [
    {
      no: '01',
      avater: Image,
      name: "Mino Marina",
      ReportName: 'September 2022',
      department: 'Design',
      assessmentDate: '20/09/2022',
      reportingManager: 'Savannah Nguyen',
      status: 'Pending',
    },
    {
      no: '02',
      name: "Craig Donin",
      avater: Image,
      ReportName: 'September 2022',
      department: 'Research',
      assessmentDate: '20/09/2022',
      reportingManager: 'Annette Black',
      status: 'Pending',
    },
    {
      no: '03',
      name: "Gustavo Korsgaard",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Business',
      assessmentDate: '20/09/2022',
      reportingManager: 'Wade Warren',
      status: 'Pending',
    },
    {
      no: '04',
      name: "Omar Schleifer",
      avater: Image,
      ReportName: 'September 2022',
      department: 'Management',
      assessmentDate: '20/09/2022',
      reportingManager: 'Savannah Nguyen',
      status: 'Pending',
    },
    {
      no: '05',
      avater: Image,
      name: "Adison Donin",
      ReportName: 'University of London',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: 'Kathryn Murphy',
      status: 'Approved',
    },
    {
      no: '06',
      name: "Lindsey Mango",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: 'Albert Flores',
      status: 'Rejected',
    },
    {
      no: '07',
      name: "Lindsey Mango",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: 'Albert Flores',
      status: 'Rejected',
    },
  ]
  const TableColumn = ['No.', 'Avater', ' Name', 'Report Name', 'Department', 'Assessment Date', 'Reporting Manager', 'Status']
  const action = useCustomHook();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const handleChange = () => { };

  return (
    <div className='manager-case-studies'>
      <PageHeader title="Case Studies" actions bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col justify-end gap-4'>
          <FiltersButton label="Filters" onClick={() => { setShowDrawer(!showDrawer) }} />
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(event, TableColumn, caseStudyTableData, "Case Studies ")
              Notifications({ title: "Success", description: "Case-studies list downloaded ", type: 'success' })
            }} />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <CaseStudiesTable caseStudyTableData={caseStudyTableData} />
          </BoxWrapper>
        </Col>
      </Row>
      <Drawer
        closable={() => setShowDrawer(false)}
        onClose={() => setShowDrawer(false)}
        title="Filters"
        open={showDrawer}
      >
        <React.Fragment key=".0">
          <Filters  setShowDrawer={setShowDrawer} />
        </React.Fragment>
      </Drawer>
    </div>
  )
}

export default index